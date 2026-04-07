import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '1rem',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        fontFamily: 'inherit',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: '5rem', fontWeight: 700, color: 'var(--color-text-strong)', lineHeight: 1 }}>404</p>
      <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>Page not found</p>
      <Link
        to="/"
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1.25rem',
          background: 'var(--color-primary)',
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '0.875rem',
        }}
      >
        Go home
      </Link>
    </div>
  );
}
