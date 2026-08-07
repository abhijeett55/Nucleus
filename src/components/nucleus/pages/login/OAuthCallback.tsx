import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { User } from '../../types/auth';

export function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);  // ← fixed

  useEffect(() => {
    const token = searchParams.get('token');
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const provider = searchParams.get('provider');
    
    if (!token || !id || !email || !name || !provider) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError('Sign-in was cancelled or failed.');
      return;
    }

    const user: User = {
      id,
      email,
      name,
      provider: provider as User['provider'],
    };

    login(token, user);
    navigate('/login', { replace: true});
  }, [searchParams, navigate, login]);

  if (error) {
    return (
      <div className="auth-card">
        <h1>Sign-in failed</h1>
        <p className="auth-subtitle">{error}</p>
        <button className="btn-primary" onClick={() => navigate('/login')}>
          Back to login
        </button>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <p className="auth-subtitle">Signing you in...</p>
    </div>
  );
}