import { useState, type FormEvent } from 'react';
import { useNavigate, Link} from 'react-router-dom';

import { signupRequest } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validateName, validatePassword, validateConfirmPassword } from '../../validation/validations';
import { PasswordInput } from './PasswordInput';
import { OAuthbuttons } from './OAuthbuttons';
import type { FieldErrors } from '../../types/auth';



export function SignForm() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[agreedToTerms, setAgreedToTerms] = useState(false);



    const[fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const[formError, setFormError] = useState<string | null>(null);
    const[submitting, setSubmitting] = useState(false);



    function validate(): boolean {
        const errors: FieldErrors = {
            name: validateName(name) ?? undefined,
            email: validateEmail(email) ?? undefined,
            password: validatePassword(password) ?? undefined,
            confirmPassword: validateConfirmPassword(password, confirmPassword) ?? undefined,
            terms: agreedToTerms ? undefined : 'You must agree to the terms to continue.',
        };

        setFieldErrors(errors);
        return !Object.values(errors).some(Boolean);
    }


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setFormError(null);
        if(!validate()) return;


        setSubmitting(true);
        try {
            const { token , user } = await signupRequest( { name , email, password});
            login(token, user);
            navigate('/dashboard');
        } catch(err) {
            setFormError(err instanceof Error ? err.message : 'Signup failed.');
        } finally {
            setSubmitting(false);
        }
    }


  return (
    <div className="auth-card">
      <h1>Create your account</h1>
      <p className="auth-subtitle">Get started in under a minute.</p>
 
      <OAuthbuttons />
      <div className="divider"><span>or</span></div>
 
      {formError && (
        <div className="form-error" role="alert">
          {formError}
        </div>
      )}
 
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="signup-name">Full name</label>
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? 'signup-name-error' : undefined}
          />
          {fieldErrors.name && (
            <p id="signup-name-error" className="field-error" role="alert">{fieldErrors.name}</p>
          )}
        </div>
 
        <div className="field">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'signup-email-error' : undefined}
          />
          {fieldErrors.email && (
            <p id="signup-email-error" className="field-error" role="alert">{fieldErrors.email}</p>
          )}
        </div>
 
        <PasswordInput
          label="Password"
          value={password}
          onChange={setPassword}
          error={fieldErrors.password}
          autoComplete="new-password"
          showStrength
        />
 
        <PasswordInput
          label="Confirm password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={fieldErrors.confirmPassword}
          autoComplete="new-password"
        />
 
        <div className="field checkbox-field">
          <label>
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              aria-invalid={!!fieldErrors.terms}
            />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>
          {fieldErrors.terms && (
            <p className="field-error" role="alert">{fieldErrors.terms}</p>
          )}
        </div>
 
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
 
      <p className="auth-footer">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
 
}