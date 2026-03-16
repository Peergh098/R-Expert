import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useGetMeQuery, useLoginMutation } from '../store/authApi';
import type { AdminUser } from '../types';

interface AuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AdminUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Track whether a token exists so we know when to fire getMe
  const [hasToken, setHasToken] = useState(() => !!localStorage.getItem('admin_token'));

  const [loginMutation] = useLoginMutation();

  // RTK Query: auto-fetch /auth/me whenever a token is present.
  // `skip` prevents the query from running if there's no token.
  const { data, isLoading, isError } = useGetMeQuery(undefined, { skip: !hasToken });

  // If the token is invalid (401 → RTK Query marks it as error), clear storage
  useEffect(() => {
    if (isError) {
      localStorage.removeItem('admin_token');
      setHasToken(false);
    }
  }, [isError]);

  const login = async (email: string, password: string): Promise<AdminUser> => {
    const result = await loginMutation({ email, password }).unwrap();
    localStorage.setItem('admin_token', result.token);
    setHasToken(true);
    return result.user;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setHasToken(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user: data?.user ?? null,
        // Show loading spinner only while token exists but user hasn't resolved yet
        loading: hasToken && isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
