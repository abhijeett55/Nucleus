import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../validation/validations';
import { PasswordInput } from './PasswordInput';
import { OAuthbuttons } from './OAuthbuttons';
import { loginRequest } from '../../api/authApi';


export function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();


    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[fieldErrors, setFieldErrors] = useState<{ email?: string, password?: string}>({});
    const[formError, setFormError] = useState<string | null>(null);
    const[submitting, setSubmitting] = useState(false);


    function validate(): boolean {
        const emailError = validateEmail(email);
        const passwordError = password ? null : 'Password is required!';
        setFieldErrors({ email: emailError ?? undefined, password: passwordError ?? undefined});
        return !emailError && !passwordError;
    }


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setFormError(null);

        if(!validate()) return;
        setSubmitting(true);
        try{
            const {token , user} = await loginRequest({ email, password });
            login(token , user);
            navigate("/home", { replace: true });
        } catch(err) {
            setFormError(err instanceof Error ? err.message : 'Login Failed.');
        } finally {
            setSubmitting(false);
        }
    }


  return (
    <div className="auth-card">
      <h1>Log in</h1>
      <p className="auth-subtitle">Welcome back.. !!!</p>
 
      <OAuthbuttons />
      <div className="divider"><span>or</span></div>
 
      {formError && (
        <div className="form-error" role="alert">
          {formError}
        </div>
      )}
 
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'login-email-error' : undefined}
          />
          {fieldErrors.email && (
            <p id="login-email-error" className="field-error" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>
 
        <PasswordInput
          label="Password"
          value={password}
          onChange={setPassword}
          error={fieldErrors.password}
          autoComplete="current-password"
        />
 
        <div className="form-row">
          <Link to="/forgot-password" className="link-muted">Forgot password?</Link>
        </div>
 
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>
 
      <p className="auth-footer">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
    


}