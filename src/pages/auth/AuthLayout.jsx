import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ kicker, title, description, children, footer }) {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <Link className="auth-brand" to="/">KaniMath</Link>
        <p className="auth-kicker">{kicker}</p>
        <h1>{title}</h1>
        {description && <p className="auth-copy">{description}</p>}
        {children}
        {footer && <div className="auth-footer">{footer}</div>}
      </section>
    </main>
  );
}
