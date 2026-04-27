import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Submit from './pages/Submit';
import RateZones from './pages/RateZones';
import OrderStatus from './pages/OrderStatus';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import SubmissionDetail from './pages/admin/SubmissionDetail';
import type { ReactNode } from 'react';

const antdTheme = {
  token: {
    colorPrimary: '#1e3a5f',
    colorLink: '#1e3a5f',
    colorLinkHover: '#d97706',
    borderRadius: 8,
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: 14,
  },
  components: {
    Button: {
      colorPrimary: '#1e3a5f',
      algorithm: true,
    },
    Table: {
      headerBg: '#f8fafc',
      headerColor: '#475569',
    },
    Tabs: {
      inkBarColor: '#1e3a5f',
      itemSelectedColor: '#1e3a5f',
      itemHoverColor: '#1e3a5f',
    },
  },
};

const PublicLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <AuthProvider>
        <Router>
          <Toaster
            position="top-center"
            containerStyle={{ top: 80 }}
            toastOptions={{
              duration: 3000,
              style: { background: '#1e3a5f', color: '#fff', borderRadius: '8px' },
            }}
          />
          <Routes>
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
            <Route path="/services/:serviceId" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
            <Route path="/submit" element={<PublicLayout><Submit /></PublicLayout>} />
            <Route path="/rate-zones" element={<PublicLayout><RateZones /></PublicLayout>} />
            <Route path="/order-status" element={<PublicLayout><OrderStatus /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
            />
            <Route
              path="/admin/submissions/:id"
              element={<ProtectedRoute><SubmissionDetail /></ProtectedRoute>}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
