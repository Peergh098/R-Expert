import { ReactNode } from 'react';
  import { Navigate } from 'react-router-dom';                                                        
  import { Spin } from 'antd';
  import { useAuth } from '../context/AuthContext';

  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();
    const hasToken = !!localStorage.getItem('admin_token');

    if (loading || (hasToken && !user)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Spin size="large" />
        </div>
      );
    }

    return user ? <>{children}</> : <Navigate to="/admin/login" replace />;
  };

  export default ProtectedRoute;
