import { useState } from 'react';
import { Form, Input, Button, Card, Typography, Tag, Timeline, Empty, Divider } from 'antd';
import {
  MailOutlined, SearchOutlined, FileTextOutlined,
  ClockCircleOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined,
} from '@ant-design/icons';
import api from '../services/api';

const { Title, Text } = Typography;

const SERVICE_LABELS: Record<string, string> = {
  'plagiarism-check': 'Plagiarism Check',
  'plagiarism-removal': 'Plagiarism Removal',
  'proofreading': 'Proofreading',
  'citation-formatting': 'Citation Formatting',
  'thesis-writing': 'Thesis Writing',
  'document-formatting': 'Document Formatting',
};

const STATUS_CONFIG: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  pending:     { color: 'orange',  icon: <ClockCircleOutlined />,  label: 'Pending' },
  'in-progress': { color: 'blue',  icon: <SyncOutlined spin />,    label: 'In Progress' },
  completed:   { color: 'green',   icon: <CheckCircleOutlined />,  label: 'Completed' },
  cancelled:   { color: 'red',     icon: <CloseCircleOutlined />,  label: 'Cancelled' },
};

interface Submission {
  _id: string;
  service: string;
  status: string;
  pages: number;
  language: string;
  estimatedPrice: number | null;
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

const OrderStatus = () => {
  const [form] = Form.useForm();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async ({ email }: { email: string }) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/submissions/track', { email });
      setSubmissions(data.submissions);
      setSearched(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#1e3a5f] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Title level={1} style={{ color: 'white', margin: 0 }}>Track Your Order</Title>
          <Text style={{ color: '#93c5fd', fontSize: 16 }}>
            Enter your email address to check the status of your submissions.
          </Text>
        </div>
      </div>

      <section className="py-14 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          {/* Search Card */}
          <Card className="shadow-lg rounded-2xl mb-8" bodyStyle={{ padding: '32px' }}>
            <Form form={form} onFinish={handleSearch} layout="vertical">
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Enter a valid email' },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Enter the email you used when submitting"
                />
              </Form.Item>
              {error && <Text type="danger" className="block mb-3">{error}</Text>}
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                icon={<SearchOutlined />}
              >
                Track Orders
              </Button>
            </Form>
          </Card>

          {/* Results */}
          {searched && (
            submissions.length === 0 ? (
              <Card className="rounded-2xl shadow-sm">
                <Empty description="No submissions found for this email address." />
              </Card>
            ) : (
              <div className="space-y-4">
                <Text className="text-gray-500 text-sm">{submissions.length} order(s) found</Text>
                {submissions.map((s) => {
                  const status = STATUS_CONFIG[s.status] ?? STATUS_CONFIG['pending'];
                  return (
                    <Card key={s._id} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center text-[#1e3a5f]">
                            <FileTextOutlined className="text-lg" />
                          </div>
                          <div>
                            <Text strong className="text-[#1e3a5f] block">
                              {SERVICE_LABELS[s.service] || s.service}
                            </Text>
                            <Text className="text-xs text-gray-400">
                              Order ID: {s._id}
                            </Text>
                          </div>
                        </div>
                        <Tag color={status.color} icon={status.icon} className="text-sm px-3 py-1 rounded-full">
                          {status.label}
                        </Tag>
                      </div>

                      <Divider style={{ margin: '16px 0' }} />

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <Text className="text-xs text-gray-400 block">Pages</Text>
                          <Text strong>{s.pages}</Text>
                        </div>
                        <div>
                          <Text className="text-xs text-gray-400 block">Language</Text>
                          <Text strong>{s.language}</Text>
                        </div>
                        <div>
                          <Text className="text-xs text-gray-400 block">Submitted</Text>
                          <Text strong>{new Date(s.createdAt).toLocaleDateString('en-IN')}</Text>
                        </div>
                        <div>
                          <Text className="text-xs text-gray-400 block">Quoted Price</Text>
                          {s.estimatedPrice != null ? (
                            <Text strong style={{ color: '#16a34a' }}>
                              ₹{s.estimatedPrice.toLocaleString('en-IN')}
                            </Text>
                          ) : (
                            <Text className="text-gray-400 text-xs">Pending review</Text>
                          )}
                        </div>
                      </div>

                      {s.adminNotes && (
                        <>
                          <Divider style={{ margin: '16px 0' }} />
                          <div>
                            <Text className="text-xs text-gray-400 block mb-1">Message from Team</Text>
                            <Text className="text-sm text-gray-700">{s.adminNotes}</Text>
                          </div>
                        </>
                      )}

                      <Divider style={{ margin: '16px 0' }} />

                      <Timeline
                        items={[
                          { color: 'green', children: <Text className="text-xs text-gray-500">Order submitted — {new Date(s.createdAt).toLocaleString('en-IN')}</Text> },
                          { color: s.status !== 'pending' ? 'green' : 'gray', children: <Text className="text-xs text-gray-500">Under review</Text> },
                          { color: s.status === 'completed' ? 'green' : 'gray', children: <Text className="text-xs text-gray-500">Completed</Text> },
                        ]}
                      />
                    </Card>
                  );
                })}
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default OrderStatus;
