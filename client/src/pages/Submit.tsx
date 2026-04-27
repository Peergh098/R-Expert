import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Form, Input, Select, Button, Upload, Result, Typography, Card, Row, Col,
} from 'antd';
import { UploadOutlined, CheckCircleOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import toast from 'react-hot-toast';
import { useCreateSubmissionMutation } from '../store/submissionsApi';
import type { ServiceId } from '../types';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const SERVICE_OPTIONS: { value: ServiceId; label: string; icon: string }[] = [
  { value: 'plagiarism-report', label: 'Plagiarism Report', icon: '📊' },
  { value: 'ai-detection-report', label: 'AI Detection Report', icon: '🤖' },
  { value: 'drillbit-report', label: 'Drillbit Report', icon: '🔎' },
  { value: 'ai-content-reduction', label: 'AI Content Reduction', icon: '✍️' },
  { value: 'writing-assistance', label: 'Writing Assistance', icon: '🖊️' },
  { value: 'data-analysis', label: 'Data Analysis', icon: '📈' },
  { value: 'document-formatting', label: 'Document Formatting', icon: '📄' },
  { value: 'proofreading', label: 'Proofreading & Editing', icon: '📝' },
  { value: 'grammar-enhancement', label: 'Grammar Enhancement', icon: '✅' },
  { value: 'reference-formatting', label: 'Reference Formatting', icon: '📑' },
  { value: 'presentation-design', label: 'Presentation Design', icon: '🎨' },
  { value: 'reviewer-comments-revision', label: 'Reviewer Comments Revision', icon: '💬' },
];

const Submit = () => {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const [createSubmission, { isLoading, isSuccess, reset: resetMutation }] =
    useCreateSubmissionMutation();

  useEffect(() => {
    const service = searchParams.get('service') as ServiceId | null;
    if (service) form.setFieldValue('service', service);
  }, [searchParams, form]);

  const handleFinish = async (values: Record<string, unknown>) => {
    const formData = new FormData();
    // Map simplified fields to backend expected fields
    formData.append('firstName', String(values.name ?? ''));
    formData.append('lastName', '');
    formData.append('email', String(values.email ?? ''));
    formData.append('phone', String(values.whatsapp ?? ''));
    formData.append('service', String(values.service ?? ''));
    formData.append('country', 'India');
    formData.append('pages', '1');
    formData.append('language', 'English');
    if (values.message) formData.append('message', String(values.message));
    if (fileList[0]?.originFileObj) {
      formData.append('file', fileList[0].originFileObj as File);
    }

    try {
      await createSubmission(formData).unwrap();
      setSubmittedEmail(values.email as string);
      toast.success('Submission received!');
    } catch (err: unknown) {
      const msg = (err as { data?: { message?: string } })?.data?.message;
      toast.error(msg || 'Submission failed. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md shadow-xl rounded-2xl" bodyStyle={{ padding: '40px' }}>
          <Result
            icon={<CheckCircleOutlined style={{ color: '#16a34a' }} />}
            title="Submission Received!"
            subTitle={
              <>
                <p>Our team will review and contact you within 24 hours with a quote.</p>
                <p className="mt-2">
                  Confirmation sent to <strong>{submittedEmail}</strong>
                </p>
              </>
            }
            extra={[
              <Button
                key="new"
                onClick={() => {
                  form.resetFields();
                  setFileList([]);
                  resetMutation();
                }}
              >
                New Submission
              </Button>,
              <Link to="/" key="home">
                <Button type="primary">Back to Home</Button>
              </Link>,
            ]}
          />
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#1e3a5f] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Title level={2} style={{ color: 'white', margin: 0 }}>Submit Your Document</Title>
          <Text style={{ color: '#93c5fd' }}>Fill in the form and upload your document to get started.</Text>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Card className="shadow-lg rounded-2xl" bodyStyle={{ padding: '40px' }}>
            <Form form={form} layout="vertical" onFinish={handleFinish} scrollToFirstError requiredMark="optional">

              <Row gutter={24}>
                {/* Service */}
                <Col xs={24} sm={12}>
                  <Form.Item name="service" label="Service Type"
                    rules={[{ required: true, message: 'Please select a service' }]}>
                    <Select size="large" placeholder="Select a service..." showSearch>
                      {SERVICE_OPTIONS.map((o) => (
                        <Option key={o.value} value={o.value}>{o.icon} {o.label}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                {/* Document Upload */}
                <Col xs={24} sm={12}>
                  <Form.Item label="Upload Document" help="Accepted: PDF, DOC, DOCX, TXT — Max 20 MB">
                    <Upload
                      fileList={fileList}
                      beforeUpload={(file) => {
                        const allowed = [
                          'application/pdf', 'application/msword',
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                          'text/plain',
                        ];
                        if (!allowed.includes(file.type)) {
                          toast.error('Only PDF, DOC, DOCX, TXT files allowed');
                          return Upload.LIST_IGNORE;
                        }
                        if (file.size > 20 * 1024 * 1024) {
                          toast.error('File must be under 20 MB');
                          return Upload.LIST_IGNORE;
                        }
                        setFileList([{ ...file, status: 'done', originFileObj: file }]);
                        return false;
                      }}
                      onRemove={() => setFileList([])}
                      maxCount={1}
                      accept=".pdf,.doc,.docx,.txt"
                    >
                      <Button icon={<UploadOutlined />} size="large"
                        style={{ width: '100%', height: 40, borderStyle: 'dashed' }}>
                        Click to Upload Document
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>

                {/* Email */}
                <Col xs={24} sm={12}>
                  <Form.Item name="email" label="Email Address"
                    rules={[
                      { required: true, message: 'Email is required' },
                      { type: 'email', message: 'Enter a valid email' },
                    ]}>
                    <Input size="large" prefix={<MailOutlined className="text-gray-400" />} placeholder="john@example.com" />
                  </Form.Item>
                </Col>

                {/* WhatsApp */}
                <Col xs={24} sm={12}>
                  <Form.Item name="whatsapp" label="WhatsApp Number"
                    rules={[{ required: true, message: 'WhatsApp number is required' }]}>
                    <Input size="large" prefix={<PhoneOutlined className="text-gray-400" />} placeholder="+91 98765 43210" />
                  </Form.Item>
                </Col>

                {/* Name */}
                <Col xs={24} sm={12}>
                  <Form.Item name="name" label="Your Name"
                    rules={[{ required: true, message: 'Name is required' }]}>
                    <Input size="large" prefix={<UserOutlined className="text-gray-400" />} placeholder="John Doe" />
                  </Form.Item>
                </Col>

                {/* Message */}
                <Col xs={24} sm={12}>
                  <Form.Item name="message" label="Additional Notes (optional)">
                    <TextArea rows={1} placeholder="Any specific instructions..." size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Button type="primary" size="large" block htmlType="submit" loading={isLoading}>
                Submit Document
              </Button>
            </Form>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Submit;
