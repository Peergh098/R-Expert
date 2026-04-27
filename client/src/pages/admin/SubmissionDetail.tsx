import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Card, Descriptions, Tag, Button, Select, Form, Input,
  InputNumber, Drawer, Space, Typography, Divider, Badge,
  Tooltip, Modal, Spin, Row, Col, Alert, Result,
} from 'antd';
import {
  ArrowLeftOutlined, DownloadOutlined, MailOutlined, SaveOutlined,
  EditOutlined, CheckCircleOutlined, ClockCircleOutlined,
  SyncOutlined, CloseCircleOutlined, FileTextOutlined, ReloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  useGetSubmissionByIdQuery,
  useUpdateSubmissionStatusMutation,
  useDeleteSubmissionFileMutation,
} from '../../store/submissionsApi';
import type { SubmissionStatus } from '../../types';
import { SERVICE_LABELS } from '../../data/services';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { confirm } = Modal;

const STATUS_OPTIONS: { value: SubmissionStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pending', color: 'gold' },
  { value: 'in-progress', label: 'In Progress', color: 'blue' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
];
const STATUS_ICON: Record<SubmissionStatus, React.ReactNode> = {
  pending: <ClockCircleOutlined />,
  'in-progress': <SyncOutlined spin />,
  completed: <CheckCircleOutlined />,
  cancelled: <CloseCircleOutlined />,
};

const SubmissionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [emailDrawerOpen, setEmailDrawerOpen] = useState(false);

  // ── RTK Query hooks ─────────────────────────────────────────────────────
  const {
    data: submission,
    isLoading,
    isError,
    refetch,
  } = useGetSubmissionByIdQuery(id!, {
    skip: !id,
    // Pre-populate the form once data arrives
    selectFromResult: (result) => {
      if (result.data && !form.getFieldValue('status')) {
        form.setFieldsValue({
          status: result.data.status,
          adminNotes: result.data.adminNotes || '',
          estimatedPrice: result.data.estimatedPrice ?? undefined,
        });
      }
      return result;
    },
  });

  const [updateStatus, { isLoading: isSaving }] = useUpdateSubmissionStatusMutation();
  const [deleteFile, { isLoading: isDeletingFile }] = useDeleteSubmissionFileMutation();

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleUpdate = async (values: {
    status: SubmissionStatus;
    adminNotes: string;
    estimatedPrice?: number;
  }) => {
    try {
      await updateStatus({ id: id!, ...values }).unwrap();
      toast.success('Submission updated!');
    } catch {
      toast.error('Update failed. Try again.');
    }
  };

  const handleSendReply = async (values: { replyMessage: string }) => {
    try {
      const formValues = form.getFieldsValue();
      await updateStatus({ id: id!, ...formValues, replyMessage: values.replyMessage }).unwrap();
      setEmailDrawerOpen(false);
      emailForm.resetFields();
      toast.success('Email reply sent!');
    } catch {
      toast.error('Failed to send email.');
    }
  };

  const handleDeleteFile = () => {
    confirm({
      title: 'Delete uploaded file?',
      content: 'The file will be permanently removed from disk. The submission record will be kept.',
      okType: 'danger',
      okText: 'Delete File',
      onOk: async () => {
        try {
          await deleteFile(id!).unwrap();
          toast.success('File deleted successfully');
        } catch {
          toast.error('Failed to delete file');
        }
      },
    });
  };

  const handleStatusChange = (newStatus: SubmissionStatus) => {
    if (newStatus === 'cancelled' && submission?.status !== 'cancelled') {
      confirm({
        title: 'Cancel this submission?',
        content: 'This will mark the submission as cancelled.',
        okType: 'danger',
        okText: 'Yes, Cancel',
        onCancel: () => form.setFieldValue('status', submission?.status),
      });
    }
  };

  // ── Loading / Error states ───────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !submission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Result
          status="error"
          title="Failed to load submission"
          extra={[
            <Button key="retry" onClick={refetch} icon={<ReloadOutlined />}>Retry</Button>,
            <Button key="back" onClick={() => navigate('/admin/dashboard')}>Dashboard</Button>,
          ]}
        />
      </div>
    );
  }

  const statusConfig = STATUS_OPTIONS.find((s) => s.value === submission.status);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1e3a5f] text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Space size="middle">
            <Link to="/admin/dashboard">
              <Button icon={<ArrowLeftOutlined />} type="text" style={{ color: '#93c5fd' }} size="small">
                Dashboard
              </Button>
            </Link>
            <Divider type="vertical" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
            <Title level={5} style={{ color: 'white', margin: 0 }}>Submission Detail</Title>
          </Space>
          <Tag icon={STATUS_ICON[submission.status]} color={statusConfig?.color} className="capitalize text-sm">
            {submission.status}
          </Tag>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Row gutter={[24, 24]}>
          {/* ── Left: Info ── */}
          <Col xs={24} lg={15}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>

              {/* Client info */}
              <Card
                title={
                  <Space>
                    <Text strong style={{ color: '#1e3a5f' }}>Client Information</Text>
                    <Badge status="processing" text={submission.email} />
                  </Space>
                }
                className="rounded-2xl shadow-sm"
              >
                <Descriptions column={{ xs: 1, sm: 2 }} size="small">
                  <Descriptions.Item label="Full Name">
                    <Text strong>{submission.firstName} {submission.lastName}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    <a href={`mailto:${submission.email}`}>{submission.email}</a>
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">{submission.phone}</Descriptions.Item>
                  <Descriptions.Item label="Country">{submission.country}</Descriptions.Item>
                  <Descriptions.Item label="Submitted">
                    {new Date(submission.createdAt).toLocaleString('en-IN')}
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              {/* Request details */}
              <Card
                title={
                  <Space>
                    <FileTextOutlined style={{ color: '#1e3a5f' }} />
                    <Text strong style={{ color: '#1e3a5f' }}>Request Details</Text>
                  </Space>
                }
                className="rounded-2xl shadow-sm"
              >
                <Descriptions column={{ xs: 1, sm: 2 }} size="small">
                  <Descriptions.Item label="Service">
                    <Tag color="blue">{SERVICE_LABELS[submission.service] || submission.service}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Pages">
                    <Text strong>{submission.pages} pages</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Language">{submission.language}</Descriptions.Item>
                  {submission.estimatedPrice != null && (
                    <Descriptions.Item label="Quoted Price">
                      <Text strong style={{ color: '#16a34a' }}>
                        ₹{submission.estimatedPrice.toLocaleString('en-IN')}
                      </Text>
                    </Descriptions.Item>
                  )}
                </Descriptions>

                {submission.message && (
                  <>
                    <Divider style={{ margin: '12px 0' }} />
                    <Text type="secondary" style={{ fontSize: 12 }}>Client Notes</Text>
                    <Alert message={submission.message} type="info" showIcon={false} className="mt-2 text-sm" />
                  </>
                )}
              </Card>

              {/* File */}
              {submission.fileUrl ? (
                <Card
                  title={<Text strong style={{ color: '#1e3a5f' }}>Uploaded Document</Text>}
                  className="rounded-2xl shadow-sm"
                >
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                    <Space>
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileTextOutlined style={{ color: '#dc2626' }} />
                      </div>
                      <div>
                        <Text strong className="block text-sm">
                          {submission.originalFileName || submission.fileName}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>Uploaded document</Text>
                      </div>
                    </Space>
                    <Space>
                      <Tooltip title="Download file">
                        <a href={submission.fileUrl} target="_blank" rel="noreferrer">
                          <Button type="primary" icon={<DownloadOutlined />}>Download</Button>
                        </a>
                      </Tooltip>
                      <Tooltip title="Delete file from server">
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          loading={isDeletingFile}
                          onClick={handleDeleteFile}
                        >
                          Delete File
                        </Button>
                      </Tooltip>
                    </Space>
                  </div>
                </Card>
              ) : submission.fileDeletedAt ? (
                <Card
                  title={<Text strong style={{ color: '#1e3a5f' }}>Uploaded Document</Text>}
                  className="rounded-2xl shadow-sm"
                >
                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 text-gray-400">
                    <DeleteOutlined />
                    <div>
                      <Text type="secondary" className="block text-sm">File deleted</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Removed on {new Date(submission.fileDeletedAt).toLocaleString('en-IN')}
                      </Text>
                    </div>
                  </div>
                </Card>
              ) : null}

              {/* Internal notes preview */}
              {submission.adminNotes && (
                <Card
                  title={<Text strong style={{ color: '#1e3a5f' }}>Internal Notes</Text>}
                  className="rounded-2xl shadow-sm"
                  size="small"
                >
                  <Text className="text-sm text-gray-600 whitespace-pre-line">{submission.adminNotes}</Text>
                </Card>
              )}
            </Space>
          </Col>

          {/* ── Right: Admin actions ── */}
          <Col xs={24} lg={9}>
            <Card
              title={
                <Space>
                  <EditOutlined style={{ color: '#1e3a5f' }} />
                  <Text strong style={{ color: '#1e3a5f' }}>Admin Actions</Text>
                </Space>
              }
              className="rounded-2xl shadow-sm"
              style={{ position: 'sticky', top: 88 }}
            >
              <Form form={form} layout="vertical" onFinish={handleUpdate} requiredMark={false}>

                <Form.Item name="status" label="Status">
                  <Select size="large" onChange={handleStatusChange}>
                    {STATUS_OPTIONS.map((o) => (
                      <Select.Option key={o.value} value={o.value}>
                        <Tag icon={STATUS_ICON[o.value]} color={o.color} className="capitalize">
                          {o.label}
                        </Tag>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="estimatedPrice" label="Quoted Price (₹)">
                  <InputNumber
                    size="large"
                    min={0}
                    style={{ width: '100%' }}
                    placeholder="e.g. 1500"
                    formatter={(v) => (v ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '')}
                  />
                </Form.Item>

                <Form.Item name="adminNotes" label="Internal Notes">
                  <TextArea rows={4} placeholder="Internal notes (not sent to client)..." />
                </Form.Item>

                <Space direction="vertical" style={{ width: '100%' }} size="small">
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    icon={<SaveOutlined />}
                    loading={isSaving}
                  >
                    Save Changes
                  </Button>
                  <Button
                    block
                    size="large"
                    icon={<MailOutlined />}
                    onClick={() => setEmailDrawerOpen(true)}
                    style={{ borderColor: '#1e3a5f', color: '#1e3a5f' }}
                  >
                    Send Email Reply
                  </Button>
                </Space>
              </Form>
            </Card>
          </Col>
        </Row>
      </main>

      {/* ── Email Reply Drawer ── */}
      <Drawer
        title={
          <Space>
            <MailOutlined style={{ color: '#1e3a5f' }} />
            <span>Reply to {submission.firstName} {submission.lastName}</span>
          </Space>
        }
        placement="right"
        width={480}
        open={emailDrawerOpen}
        onClose={() => setEmailDrawerOpen(false)}
        extra={
          <Button
            type="primary"
            icon={<MailOutlined />}
            loading={isSaving}
            onClick={() => emailForm.submit()}
          >
            Send Email
          </Button>
        }
      >
        <Alert
          message={`Email will be sent to: ${submission.email}`}
          type="info"
          showIcon
          className="mb-5"
        />
        <Descriptions size="small" column={1} className="mb-5">
          <Descriptions.Item label="Service">
            {SERVICE_LABELS[submission.service] || submission.service}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={statusConfig?.color} className="capitalize">{submission.status}</Tag>
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Form form={emailForm} layout="vertical" onFinish={handleSendReply}>
          <Form.Item
            name="replyMessage"
            label="Message"
            rules={[{ required: true, message: 'Please write a reply' }]}
          >
            <TextArea
              rows={10}
              placeholder={`Dear ${submission.firstName},\n\nThank you for your submission...\n\nBest regards,\nResearch Experts Team`}
              size="large"
            />
          </Form.Item>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Sent as a professional HTML email from the Research Experts team.
          </Text>
        </Form>
      </Drawer>
    </div>
  );
};

export default SubmissionDetail;
