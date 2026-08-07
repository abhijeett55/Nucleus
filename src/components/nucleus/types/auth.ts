//Interface User
export interface User {
    id: string;
    email: string;
    name: string;
    provider: 'local' | 'github' | 'google';
}

//Interface AuthRessponse
export interface AuthResponse {
    token: string;
    user: User;
}

//Interface loginPayload
export interface LoginPayLoad {
    email: string;
    password: string;
}

//Interface SignupLoad
export interface SignupPayLoad {
    name: string;
    email: string;
    password: string;
}

//Interface ApiError
export interface ApiError {
    message: string;
    field?: string;
}

//Interface PasswordInputProps
export interface PasswordInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
    autoComplete? : string;
    showStrength?: boolean;
}

//Interface AuthContextValue
export interface AuthContextValue {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;

}

export interface FieldErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
}
