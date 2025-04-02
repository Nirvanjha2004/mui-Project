import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '../api/client';
import { userService } from '../api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, role: 'user' | 'admin') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await userService.getCurrentUser();
          setUser(response.data.data);
        } catch (err) {
          console.error('Failed to fetch user:', err);
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userService.login({ email, password });
      const { token, data } = response.data;
      
      localStorage.setItem('auth_token', token);
      setToken(token);
      setUser(data);
      return data; // Return user data for redirect logic
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: 'user' | 'admin') => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userService.register({ name, email, password, role });
      const { token, data } = response.data;
      
      localStorage.setItem('auth_token', token);
      setToken(token);
      setUser(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        error,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
