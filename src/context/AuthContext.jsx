import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USER = 'admin';
const DEFAULT_PASSWORD = 'Kanimath@123';
const AUTH_STORAGE_KEY = 'kanimath_auth';

function isAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored === 'true') {
      setSession({ user: { username: DEFAULT_USER } });
      setUser({ username: DEFAULT_USER });
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(async (username, password) => {
    setAuthError('');
    
    if (username === DEFAULT_USER && password === DEFAULT_PASSWORD) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      const sessionData = { user: { username: DEFAULT_USER } };
      setSession(sessionData);
      setUser({ username: DEFAULT_USER });
      return { success: true };
    } else {
      setAuthError('Invalid username or password');
      return { success: false, error: 'Invalid username or password' };
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    session,
    user,
    loading,
    authError,
    configured: true,
    signIn,
    signOut
  }), [session, user, loading, authError, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
}
