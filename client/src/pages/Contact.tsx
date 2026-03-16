import { Form, Input, Button, Card, Typography, Row, Col, Alert } from 'antd';
import {
  MailOutlined, UserOutlined, MessageOutlined,
  PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined, WhatsAppOutlined,
} from '@ant-design/icons';
import toast from 'react-hot-toast';
import { useCreateContactMutation } from '../store/contactApi';

const { Title, Text } = Typography;
const { TextArea } = Input;

const contactInfo = [
  { icon: <MailOutlined className="text-2xl" />, label: 'Email', value: 'peergh098@hmail.com', href: 'mailto:peergh098@hmail.com' },
  { icon: <PhoneOutlined className="text-2xl" />, label: 'Phone', value: '+91 9149797692', href: 'tel:+919149797692' },
  { icon: <WhatsAppOutlined className="text-2xl" />, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/919149797692' },
  { icon: <EnvironmentOutlined className="text-2xl" />, label: 'Location', value: 'Chennai, Tamil Nadu, India', href: undefined },
  { icon: <ClockCircleOutlined className="text-2xl" />, label: 'Working Hours', value: 'Mon–Sat, 9am – 7pm IST', href: undefined },
];

const Contact = () => {
  const [form] = Form.useForm();

  // ── RTK Query mutation ──────────────────────────────────────────────────
  const [createContact, { isLoading, isSuccess, isError, reset }] = useCreateContactMutation();

  const handleFinish = async (values: {
    name: string; email: string; subject: string; message: string;
  }) => {
    try {
      await createContact(values).unwrap();
      toast.success("Message sent! We'll reply within 24 hours.");
      form.resetFields();
    } catch (err: unknown) {
      const msg = (err as { data?: { message?: string } })?.data?.message;
      toast.error(msg || 'Failed to send. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-[#1e3a5f] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Title level={1} style={{ color: 'white', margin: 0 }}>Contact Us</Title>
          <Text style={{ color: '#93c5fd', fontSize: 16 }}>
            Have a question or need a custom quote? We're here to help.
          </Text>
        </div>
      </div>

      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Row gutter={[32, 32]}>
            {/* Info sidebar */}
            <Col xs={24} lg={8}>
              <div className="space-y-4">
                <Title level={3} style={{ color: '#1e3a5f' }}>Get in Touch</Title>
                <Text className="text-gray-600 block mb-4">
                  Available Mon–Sat, 9am–7pm IST. We typically respond within 2 hours.
                </Text>
                {contactInfo.map(({ icon, label, value, href }) => (
                  <Card key={label} size="small" className="shadow-sm hover:shadow-md transition-shadow"
                    bodyStyle={{ padding: '16px' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center text-[#1e3a5f] shrink-0">
                        {icon}
                      </div>
                      <div>
                        <Text className="text-xs text-gray-400 uppercase tracking-wide block">{label}</Text>
                        {href ? (
                          <a href={href} className="font-semibold text-[#1e3a5f] hover:text-amber-600 transition-colors text-sm">
                            {value}
                          </a>
                        ) : (
                          <Text className="font-semibold text-[#1e3a5f] text-sm">{value}</Text>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Col>

            {/* Form */}
            <Col xs={24} lg={16}>
              <Card className="shadow-lg rounded-2xl" bodyStyle={{ padding: '40px' }}>
                <Title level={3} style={{ color: '#1e3a5f', marginBottom: 24 }}>Send Us a Message</Title>

                {isSuccess && (
                  <Alert
                    message="Message sent successfully!"
                    description="Our team will reply within 24 hours."
                    type="success"
                    showIcon
                    closable
                    onClose={reset}
                    className="mb-5"
                  />
                )}
                {isError && (
                  <Alert
                    message="Failed to send message. Please try again."
                    type="error"
                    showIcon
                    closable
                    onClose={reset}
                    className="mb-5"
                  />
                )}

                <Form form={form} layout="vertical" onFinish={handleFinish} requiredMark="optional">
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item name="name" label="Full Name"
                        rules={[{ required: true, message: 'Name is required' }]}>
                        <Input size="large"
                          prefix={<UserOutlined className="text-gray-400" />}
                          placeholder="Your full name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="email" label="Email"
                        rules={[
                          { required: true, message: 'Email is required' },
                          { type: 'email', message: 'Enter a valid email' },
                        ]}>
                        <Input size="large"
                          prefix={<MailOutlined className="text-gray-400" />}
                          placeholder="your@email.com" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item name="subject" label="Subject"
                    rules={[{ required: true, message: 'Subject is required' }]}>
                    <Input size="large"
                      prefix={<MessageOutlined className="text-gray-400" />}
                      placeholder="How can we help you?" />
                  </Form.Item>

                  <Form.Item name="message" label="Message"
                    rules={[{ required: true, message: 'Message is required' }]}>
                    <TextArea rows={6} size="large" placeholder="Write your message here..." />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" size="large" block
                    loading={isLoading} icon={<MailOutlined />}>
                    Send Message
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Contact;
