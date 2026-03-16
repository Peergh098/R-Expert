import { Form, Input, Button, Card, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError('');
    try {
      await login(values.email, values.password);
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #152844 100%)' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-xl"
            style={{ background: '#d97706' }}>
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <Title level={3} style={{ color: 'white', margin: 0 }}>Research Experts</Title>
          <Text style={{ color: '#93c5fd' }}>Admin Dashboard</Text>
        </div>

        <Card className="shadow-2xl rounded-2xl" bodyStyle={{ padding: '36px 32px' }}>
          <Title level={4} style={{ color: '#1e3a5f', textAlign: 'center', marginBottom: 28 }}>
            Sign In
          </Title>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              className="mb-5"
              closable
              onClose={() => setError('')}
            />
          )}

          <Form layout="vertical" onFinish={handleFinish} requiredMark={false}>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Enter a valid email' },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="admin@researchexperts.com"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              style={{ marginTop: 8 }}
            >
              Sign In
            </Button>
          </Form>
        </Card>

        <p className="text-center mt-5 text-sm" style={{ color: '#93c5fd' }}>
          Admin access only. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
