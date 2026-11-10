//Email Standard
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Validate Email
export function validateEmail(email: string) : string | null {
    if(!email) return 'Email is required.';
    if(!EMAIL_REGEX.test(email)) return 'Enter a valid Email Address.';
    return null;
}

//Validate Password
export function validatePassword(password: string): string | null {
    if(!password) return 'Password is empty';
    if(password.length < 8) return 'Passord should be atleast 8 characters.';
    if (!/[A-Z]/.test(password)) return 'Include at least one uppercase letter.';
    if (!/[0-9]/.test(password)) return 'Include at least one number.';
    return null;
}

//Validate Name
export function validateName(name: string): string | null {
    if(!name.trim()) return 'Name is required';
    if(name.trim().length < 2) return 'Name should be atleast 2 characters.';
    return null;
}


//Validate Confirm Password
export function validateConfirmPassword(password: string, confirm: string): string | null {
    if(!confirm) return 'Confirm your password.';
    if(password !== confirm) return 'Password is not match.';
    return null;

}
//Validate Password Strength
export function passwordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}