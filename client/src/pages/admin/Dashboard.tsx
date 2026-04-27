import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Table, Tabs, Statistic, Tag, Input, Select,
  Button, Space, Typography, Badge, Tooltip, Row, Col, Spin, Alert,
  Card, Modal, Form,
} from 'antd';
import {
  FileTextOutlined, ClockCircleOutlined, SyncOutlined,
  CheckCircleOutlined, CloseCircleOutlined, SearchOutlined,
  EyeOutlined, DownloadOutlined, LogoutOutlined, GlobalOutlined,
  ReloadOutlined, MailOutlined, SendOutlined,
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import {
  useGetSubmissionsQuery,
  useGetSubmissionStatsQuery,
  type GetSubmissionsParams,
} from '../../store/submissionsApi';
import {
  useGetContactsQuery,
  useReplyToContactMutation,
} from '../../store/contactApi';
import type { Submission, SubmissionStatus, ContactMessage } from '../../types';
import { SERVICE_LABELS } from '../../data/services';

const { Title, Text } = Typography;
const { Search } = Input;

const STATUS_COLOR: Record<SubmissionStatus, string> = {
  pending: 'gold',
  'in-progress': 'blue',
  completed: 'green',
  cancelled: 'red',
};
const STATUS_ICON: Record<SubmissionStatus, React.ReactNode> = {
  pending: <ClockCircleOutlined />,
  'in-progress': <SyncOutlined spin />,
  completed: <CheckCircleOutlined />,
  cancelled: <CloseCircleOutlined />,
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ── Filter state — drives RTK Query cache key ────────────────────────────
  const [queryParams, setQueryParams] = useState<GetSubmissionsParams>({
    page: 1,
    limit: 15,
    status: '',
    search: '',
  });
  const [activeTab, setActiveTab] = useState('overview');

  // ── RTK Query ────────────────────────────────────────────────────────────
  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats,
  } = useGetSubmissionStatsQuery();

  const {
    data: submissionsData,
    isLoading: subsLoading,
    isFetching: subsFetching,
    isError: subsError,
    refetch: refetchSubs,
  } = useGetSubmissionsQuery(queryParams);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out');
  };

  const handleTableChange = (pag: TablePaginationConfig) =>
    setQueryParams((p) => ({ ...p, page: pag.current ?? 1 }));

  const handleSearch = (value: string) =>
    setQueryParams((p) => ({ ...p, search: value, page: 1 }));

  const handleStatusFilter = (value: string) =>
    setQueryParams((p) => ({ ...p, status: value ?? '', page: 1 }));

  const handleDownloadCsv = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('http://localhost:5000/api/submissions/export', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `submissions-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error('Failed to download CSV');
    }
  };

  // ── Columns ──────────────────────────────────────────────────────────────
  const submissionColumns: ColumnsType<Submission> = [
    {
      title: 'Client',
      key: 'client',
      render: (_, r) => (
        <div>
          <div className="font-medium">{r.firstName} {r.lastName}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>{r.email}</Text>
        </div>
      ),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      render: (s: string) => <Text style={{ fontSize: 12 }}>{SERVICE_LABELS[s] || s}</Text>,
    },
    { title: 'Pages', dataIndex: 'pages', key: 'pages', width: 70, align: 'center' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (s: SubmissionStatus) => (
        <Tag icon={STATUS_ICON[s]} color={STATUS_COLOR[s]} className="capitalize">{s}</Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 105,
      render: (d: string) => (
        <Text style={{ fontSize: 12 }}>{new Date(d).toLocaleDateString('en-IN')}</Text>
      ),
    },
    {
      title: 'File',
      key: 'file',
      width: 70,
      align: 'center',
      render: (_, r) =>
        r.fileUrl ? (
          <Tooltip title="Download">
            <a href={r.fileUrl} target="_blank" rel="noreferrer">
              <Button type="text" icon={<DownloadOutlined />} size="small" />
            </a>
          </Tooltip>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 90,
      align: 'center',
      render: (_, r) => (
        <Link to={`/admin/submissions/${r._id}`}>
          <Button type="primary" ghost size="small" icon={<EyeOutlined />}>View</Button>
        </Link>
      ),
    },
  ];

  const recentColumns: ColumnsType<Submission> = [
    { title: 'Client', key: 'client', render: (_, r) => `${r.firstName} ${r.lastName}` },
    { title: 'Service', dataIndex: 'service', render: (s: string) => SERVICE_LABELS[s] || s },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (s: SubmissionStatus) => (
        <Tag icon={STATUS_ICON[s]} color={STATUS_COLOR[s]} className="capitalize">{s}</Tag>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 80,
      render: (_, r) => (
        <Link to={`/admin/submissions/${r._id}`}>
          <Button type="link" size="small" icon={<EyeOutlined />}>View</Button>
        </Link>
      ),
    },
  ];

  // ── Messages state ───────────────────────────────────────────────────────
  const [replyModal, setReplyModal] = useState<ContactMessage | null>(null);
  const [replyForm] = Form.useForm();
  const { data: contactsData, isLoading: contactsLoading, refetch: refetchContacts } = useGetContactsQuery({});
  const [replyToContact, { isLoading: replyLoading }] = useReplyToContactMutation();

  const handleReply = async ({ replyMessage }: { replyMessage: string }) => {
    if (!replyModal) return;
    try {
      await replyToContact({ id: replyModal._id, replyMessage }).unwrap();
      toast.success('Reply sent!');
      replyForm.resetFields();
      setReplyModal(null);
    } catch {
      toast.error('Failed to send reply.');
    }
  };

  const unreadCount = contactsData?.contacts.filter((c) => !c.isRead).length ?? 0;

  // ── Stat cards ────────────────────────────────────────────────────────────
  const statCards = statsData
    ? [
        { title: 'Total', value: statsData.total, icon: <FileTextOutlined />, color: '#1e3a5f', bg: '#eff6ff' },
        { title: 'Pending', value: statsData.pending, icon: <ClockCircleOutlined />, color: '#d97706', bg: '#fffbeb' },
        { title: 'In Progress', value: statsData.inProgress, icon: <SyncOutlined />, color: '#2563eb', bg: '#eff6ff' },
        { title: 'Completed', value: statsData.completed, icon: <CheckCircleOutlined />, color: '#16a34a', bg: '#f0fdf4' },
      ]
    : [];

  // ── Tab items ─────────────────────────────────────────────────────────────
  const tabItems = [
    {
      key: 'overview',
      label: <span className="flex items-center gap-2"><FileTextOutlined /> Overview</span>,
      children: statsLoading ? (
        <div className="flex justify-center py-16"><Spin size="large" /></div>
      ) : statsError ? (
        <Alert type="error" message="Failed to load stats"
          action={<Button size="small" onClick={refetchStats} icon={<ReloadOutlined />}>Retry</Button>}
        />
      ) : (
        <>
          <Row gutter={[16, 16]} className="mb-8">
            {statCards.map((s) => (
              <Col xs={12} lg={6} key={s.title}>
                <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                  bodyStyle={{ padding: 24 }} style={{ background: s.bg }}>
                  <Statistic
                    title={<Text style={{ color: s.color, fontSize: 13 }}>{s.title}</Text>}
                    value={s.value}
                    prefix={<span style={{ color: s.color, fontSize: 20 }}>{s.icon}</span>}
                    valueStyle={{ color: s.color, fontSize: 32, fontWeight: 800 }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <Card
            title={<Text strong style={{ color: '#1e3a5f' }}>Recent Submissions</Text>}
            extra={<Button type="link" onClick={() => setActiveTab('submissions')}>View All →</Button>}
            className="rounded-2xl shadow-sm"
          >
            <Table
              columns={recentColumns}
              dataSource={statsData?.recentSubmissions}
              rowKey="_id"
              pagination={false}
              size="small"
            />
          </Card>
        </>
      ),
    },
    {
      key: 'submissions',
      label: (
        <Badge count={statsData?.pending ?? 0} size="small" color="gold">
          <span className="pr-1">All Submissions</span>
        </Badge>
      ),
      children: (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <Search
              placeholder="Search by name or email..."
              allowClear
              style={{ maxWidth: 300 }}
              onSearch={handleSearch}
              onChange={(e:any) => { if (!e.target.value) handleSearch(''); }}
              prefix={<SearchOutlined />}
            />
            <Select
              value={queryParams.status || undefined}
              onChange={handleStatusFilter}
              placeholder="Filter by status"
              allowClear
              style={{ minWidth: 170 }}
            >
              <Select.Option value="pending"><Tag color="gold">Pending</Tag></Select.Option>
              <Select.Option value="in-progress"><Tag color="blue">In Progress</Tag></Select.Option>
              <Select.Option value="completed"><Tag color="green">Completed</Tag></Select.Option>
              <Select.Option value="cancelled"><Tag color="red">Cancelled</Tag></Select.Option>
            </Select>
            <Button
              icon={<ReloadOutlined />}
              onClick={refetchSubs}
              loading={subsFetching && !subsLoading}
            >
              Refresh
            </Button>
            <Button icon={<DownloadOutlined />} onClick={handleDownloadCsv}>
              Download CSV
            </Button>
          </div>

          {subsError && (
            <Alert type="error" message="Failed to load submissions"
              action={<Button size="small" onClick={refetchSubs}>Retry</Button>}
              className="mb-4"
            />
          )}

          <Card className="rounded-2xl shadow-sm">
            <Table
              columns={submissionColumns}
              dataSource={submissionsData?.submissions}
              rowKey="_id"
              loading={subsLoading || subsFetching}
              pagination={{
                current: queryParams.page,
                pageSize: queryParams.limit,
                total: submissionsData?.pagination.total ?? 0,
                showSizeChanger: false,
                showTotal: (total:any) => `${total} submissions`,
              }}
              onChange={handleTableChange}
              scroll={{ x: 700 }}
              size="middle"
            />
          </Card>
        </>
      ),
    },
    {
      key: 'messages',
      label: (
        <Badge count={unreadCount} size="small">
          <span className="flex items-center gap-2 pr-1"><MailOutlined /> Messages</span>
        </Badge>
      ),
      children: contactsLoading ? (
        <div className="flex justify-center py-16"><Spin size="large" /></div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <Button icon={<ReloadOutlined />} onClick={refetchContacts}>Refresh</Button>
          </div>
          <Card className="rounded-2xl shadow-sm">
            <Table
              dataSource={contactsData?.contacts}
              rowKey="_id"
              pagination={{ pageSize: 15, showTotal: (t) => `${t} messages` }}
              size="middle"
              columns={[
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: (name: string, r: ContactMessage) => (
                    <div>
                      <div className="font-medium">{name}</div>
                      <Text type="secondary" style={{ fontSize: 12 }}>{r.email}</Text>
                    </div>
                  ),
                },
                { title: 'Subject', dataIndex: 'subject', key: 'subject' },
                {
                  title: 'Message',
                  dataIndex: 'message',
                  key: 'message',
                  render: (msg: string) => (
                    <Text ellipsis style={{ maxWidth: 220 }}>{msg}</Text>
                  ),
                },
                {
                  title: 'Date',
                  dataIndex: 'createdAt',
                  key: 'createdAt',
                  width: 105,
                  render: (d: string) => new Date(d).toLocaleDateString('en-IN'),
                },
                {
                  title: 'Status',
                  key: 'status',
                  width: 110,
                  render: (_: unknown, r: ContactMessage) =>
                    r.repliedAt ? (
                      <Tag color="green" icon={<CheckCircleOutlined />}>Replied</Tag>
                    ) : (
                      <Tag color="orange" icon={<ClockCircleOutlined />}>Unread</Tag>
                    ),
                },
                {
                  title: 'Action',
                  key: 'action',
                  width: 100,
                  render: (_: unknown, r: ContactMessage) => (
                    <Button
                      type="primary"
                      ghost
                      size="small"
                      icon={<SendOutlined />}
                      onClick={() => { setReplyModal(r); replyForm.resetFields(); }}
                    >
                      Reply
                    </Button>
                  ),
                },
              ] as ColumnsType<ContactMessage>}
            />
          </Card>

          <Modal
            open={!!replyModal}
            title={replyModal ? `Reply to ${replyModal.name}` : ''}
            onCancel={() => setReplyModal(null)}
            footer={null}
            destroyOnClose
          >
            {replyModal && (
              <>
                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                  <Text type="secondary" className="block mb-1">Their message:</Text>
                  <Text>{replyModal.message}</Text>
                </div>
                <Form form={replyForm} onFinish={handleReply} layout="vertical">
                  <Form.Item name="replyMessage" label="Your Reply"
                    rules={[{ required: true, message: 'Reply cannot be empty' }]}>
                    <Input.TextArea rows={5} placeholder="Type your reply..." />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" block loading={replyLoading} icon={<SendOutlined />}>
                    Send Reply
                  </Button>
                </Form>
              </>
            )}
          </Modal>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1e3a5f] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Space>
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-sm">R</div>
            <Title level={5} style={{ color: 'white', margin: 0 }}>Admin Dashboard</Title>
          </Space>
          <Space>
            <Text style={{ color: '#93c5fd' }} className="hidden sm:block">👋 {user?.name || user?.email}</Text>
            <a href="/" target="_blank" rel="noreferrer">
              <Button type="text" icon={<GlobalOutlined />} style={{ color: '#93c5fd' }} size="small">Site</Button>
            </a>
            <Button
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              size="small"
              style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'transparent', color: 'white' }}
            >
              Logout
            </Button>
          </Space>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" />
      </main>
    </div>
  );
};

export default AdminDashboard;
