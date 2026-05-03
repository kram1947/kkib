import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { session, loading } = useAuth();
  const location = useLocation();
  const redirectTo = `${location.pathname}${location.search}${location.hash}`;

  if (loading) {
    return (
      <main className="auth-shell">
        <section className="auth-card">
          <p className="auth-kicker">KaniMath</p>
          <h1>Checking your session</h1>
          <p className="auth-copy">One moment while we prepare your workspace.</p>
        </section>
      </main>
    );
  }

  if (!session) {
    return <Navigate to={`/login?redirectTo=${encodeURIComponent(redirectTo)}`} replace />;
  }

  return <Outlet />;
}
