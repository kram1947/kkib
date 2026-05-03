import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

function getRedirectTo(search) {
  const value = new URLSearchParams(search).get('redirectTo');
  return value && value.startsWith('/') ? value : '/';
}

export default function Login() {
  const { session, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTo = getRedirectTo(location.search);

  if (session) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    setIsSubmitting(true);
    const result = await signIn(username, password);

    if (result.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.error || 'Login failed');
    }
    setIsSubmitting(false);
  }

  return (
    <AuthLayout
      kicker="Welcome back"
      title="Log in to continue"
      description="Enter your credentials to access assessments and study materials."
      footer={null}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input 
            type="text" 
            value={username} 
            onChange={(event) => setUsername(event.target.value)} 
            required 
            autoComplete="username" 
          />
        </label>
        <label>
          Password
          <input 
            type="password" 
            value={password} 
            onChange={(event) => setPassword(event.target.value)} 
            required 
            autoComplete="current-password" 
          />
        </label>
        {error && <div className="auth-error" role="alert">{error}</div>}
        <button className="btn btn-primary auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  );
}
