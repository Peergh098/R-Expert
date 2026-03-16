import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Form, Input, Select, Button, Upload, InputNumber,
  Steps, Result, Typography, Card, Row, Col, Divider, Alert,
} from 'antd';
import {
  UploadOutlined, CheckCircleOutlined, UserOutlined,
  MailOutlined, PhoneOutlined, GlobalOutlined, FileTextOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd';
import toast from 'react-hot-toast';
import { useCreateSubmissionMutation } from '../store/submissionsApi';
import type { ServiceId } from '../types';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const SERVICE_OPTIONS: { value: ServiceId; label: string; icon: string }[] = [
  { value: 'plagiarism-check', label: 'Plagiarism Check', icon: '🔍' },
  { value: 'plagiarism-removal', label: 'Plagiarism Removal', icon: '✏️' },
  { value: 'proofreading', label: 'Proofreading', icon: '📝' },
  { value: 'citation-formatting', label: 'Citation Formatting', icon: '📋' },
  { value: 'thesis-writing', label: 'Thesis Writing', icon: '📚' },
  { value: 'document-formatting', label: 'Document Formatting', icon: '📄' },
];

const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Singapore', 'UAE', 'Saudi Arabia', 'Egypt', 'Other',
];

const STEPS = [
  { title: 'Service', description: 'Choose service' },
  { title: 'Document', description: 'Upload file' },
  { title: 'Details', description: 'Your info' },
];

const Submit = () => {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [languages, setLanguages] = useState<{ name: string; flagUrl: string }[]>([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=languages,flags')
      .then((r) => r.json())
      .then((data: { languages?: Record<string, string>; flags?: { png?: string; svg?: string } }[]) => {
        const map = new Map<string, string>();
        data.forEach((c) => {
          if (c.languages) {
            Object.values(c.languages).forEach((l) => {
              if (!map.has(l)) map.set(l, c.flags?.png ?? c.flags?.svg ?? '');
            });
          }
        });
        setLanguages(
          [...map.entries()]
            .map(([name, flagUrl]) => ({ name, flagUrl }))
            .sort((a, b) => a.name.localeCompare(b.name))
        );
      })
      .catch(() =>
        setLanguages([
          { name: 'English', flagUrl: 'https://flagcdn.com/w40/gb.png' },
          { name: 'Hindi', flagUrl: 'https://flagcdn.com/w40/in.png' },
          { name: 'Tamil', flagUrl: 'https://flagcdn.com/w40/in.png' },
          { name: 'Other', flagUrl: '' },
        ])
      );
  }, []);

  // ── RTK Query mutation ──────────────────────────────────────────────────
  const [createSubmission, { isLoading, isSuccess, reset: resetMutation }] =
    useCreateSubmissionMutation();

  useEffect(() => {
    const service = searchParams.get('service') as ServiceId | null;
    if (service) {
      form.setFieldValue('service', service);
      setCurrentStep(1);
    }
  }, [searchParams, form]);

  const handleFinish = async (values: Record<string, unknown>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (val != null) formData.append(key, String(val));
    });
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

  // ── Success screen ──────────────────────────────────────────────────────
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
                  setCurrentStep(0);
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
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Title level={2} style={{ color: 'white', margin: 0 }}>Submit Your Document</Title>
          <Text style={{ color: '#93c5fd' }}>Fill in the form and upload your document to get started.</Text>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Steps current={currentStep} items={STEPS} className="mb-10" style={{ padding: '0 24px' }} />

          <Card className="shadow-lg rounded-2xl" bodyStyle={{ padding: '40px' }}>
            <Form form={form} layout="vertical" onFinish={handleFinish} scrollToFirstError requiredMark="optional">

              {/* ── Step 0: Service ── */}
              <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
                <Divider orientation="left">
                  <Text strong style={{ color: '#1e3a5f' }}>Service Details</Text>
                </Divider>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name="service" label="Service Type"
                      rules={[{ required: true, message: 'Please select a service' }]}>
                      <Select size="large" placeholder="Select a service..." showSearch>
                        {SERVICE_OPTIONS.map((o) => (
                          <Option key={o.value} value={o.value}>{o.icon} {o.label}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="pages" label="Number of Pages"
                      rules={[{ required: true, message: 'Enter number of pages' }]}>
                      <InputNumber size="large" min={1} max={9999} placeholder="e.g. 25"
                        style={{ width: '100%' }}
                        prefix={<FileTextOutlined className="text-gray-400" />} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="language" label="Document Language"
                      rules={[{ required: true, message: 'Select a language' }]}>
                      <Select size="large" placeholder="Select language..." showSearch loading={languages.length === 0}
                        optionFilterProp="label"
                        options={languages.map(({ name, flagUrl }) => ({
                          value: name,
                          label: name,
                          flagUrl,
                        }))}
                        optionRender={(opt) => (
                          <span className="flex items-center gap-2">
                            {(opt.data as { flagUrl: string }).flagUrl && (
                              <img
                                src={(opt.data as { flagUrl: string }).flagUrl}
                                alt=""
                                style={{ width: 24, height: 16, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }}
                              />
                            )}
                            {opt.label}
                          </span>
                        )}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Button type="primary" size="large" block
                  onClick={async () => {
                    try {
                      await form.validateFields(['service', 'pages', 'language']);
                      setCurrentStep(1);
                    } catch { /* antd displays field errors */ }
                  }}>
                  Next: Upload Document →
                </Button>
              </div>

              {/* ── Step 1: File Upload ── */}
              <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                <Divider orientation="left">
                  <Text strong style={{ color: '#1e3a5f' }}>Document Upload</Text>
                </Divider>
                <Form.Item label="Upload Document"
                  help="Accepted: PDF, DOC, DOCX, TXT — Max 20 MB">
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
                      style={{ width: '100%', height: 64, borderStyle: 'dashed' }}>
                      Click to Upload Document
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item name="message" label="Additional Notes (optional)">
                  <TextArea rows={3} placeholder="Any specific instructions..." size="large" />
                </Form.Item>

                <Row gutter={12}>
                  <Col span={12}>
                    <Button size="large" block onClick={() => setCurrentStep(0)}>← Back</Button>
                  </Col>
                  <Col span={12}>
                    <Button type="primary" size="large" block onClick={() => setCurrentStep(2)}>
                      Next: Your Details →
                    </Button>
                  </Col>
                </Row>
              </div>

              {/* ── Step 2: Personal Info ── */}
              <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                <Divider orientation="left">
                  <Text strong style={{ color: '#1e3a5f' }}>Personal Information</Text>
                </Divider>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="firstName" label="First Name"
                      rules={[{ required: true, message: 'First name is required' }]}>
                      <Input size="large" prefix={<UserOutlined className="text-gray-400" />} placeholder="John" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="lastName" label="Last Name"
                      rules={[{ required: true, message: 'Last name is required' }]}>
                      <Input size="large" prefix={<UserOutlined className="text-gray-400" />} placeholder="Doe" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="email" label="Email Address"
                      rules={[
                        { required: true, message: 'Email is required' },
                        { type: 'email', message: 'Enter a valid email' },
                      ]}>
                      <Input size="large" prefix={<MailOutlined className="text-gray-400" />} placeholder="john@example.com" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="phone" label="Phone Number"
                      rules={[{ required: true, message: 'Phone is required' }]}>
                      <Input size="large" prefix={<PhoneOutlined className="text-gray-400" />} placeholder="+91 98765 43210" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="country" label="Country"
                      rules={[{ required: true, message: 'Please select your country' }]}>
                      <Select size="large" placeholder="Select country..." showSearch
                        prefix={<GlobalOutlined />}>
                        {COUNTRIES.map((c) => <Option key={c} value={c}>{c}</Option>)}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={12}>
                  <Col span={12}>
                    <Button size="large" block onClick={() => setCurrentStep(1)}>← Back</Button>
                  </Col>
                  <Col span={12}>
                    <Button type="primary" size="large" block htmlType="submit" loading={isLoading}>
                      Submit Document
                    </Button>
                  </Col>
                </Row>

                {isLoading && (
                  <Alert
                    message="Uploading your document, please wait..."
                    type="info"
                    showIcon
                    className="mt-4"
                  />
                )}
              </div>
            </Form>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Submit;
