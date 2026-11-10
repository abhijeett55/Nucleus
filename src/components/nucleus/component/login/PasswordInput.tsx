import type { PasswordInputProps } from '../../types/auth';
import { useId, useState } from 'react';
import { passwordStrength } from '../../validation/validations';

const STRENGTH_LABELS = ['very weak','weak','fair','good','strong'];


export function PasswordInput ({
    label,
    value,
    onChange,
    error,
    autoComplete = 'current-password',
    showStrength = false,
} : PasswordInputProps) {
    const[visible, setVisible] = useState(false);
    const id = useId();
    const strength = showStrength ? passwordStrength(value) : 0;

 
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="password-field">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          className="toggle-visibility"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
 
      {showStrength && value.length > 0 && (
        <div className="strength-meter" aria-hidden="true">
          <div className="strength-bars">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`bar ${i < strength ? `filled level-${strength}` : ''}`} />
            ))}
          </div>
          <span className="strength-label">{STRENGTH_LABELS[strength]}</span>
        </div>
      )}
 
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}