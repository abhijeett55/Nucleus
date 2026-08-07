import axios, { AxiosError } from 'axios';
import type { AuthResponse, LoginPayLoad, SignupPayLoad } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL as string;
const SERVER_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});



function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string }>;
    if (err.response?.data?.message) return err.response.data.message;
    if (err.response?.status === 401) return 'Incorrect email or password.';
    if (err.response?.status === 409) return 'An account with this email already exists.';
    if (!err.response) return 'Cannot reach the server. Check your connection and try again.';
  }
  return 'Something went wrong. Please try again.';
}

export async function loginRequest(payload: LoginPayLoad): Promise<AuthResponse> {
  try {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
    return data;
  } catch (error) {
    // eslint-disable-next-line preserve-caught-error
    throw new Error(extractErrorMessage(error));
  }
}

export async function signupRequest(payload: SignupPayLoad): Promise<AuthResponse> {
  try {
    const { data } = await apiClient.post<AuthResponse>('/auth/signup', payload);
    return data;
  } catch (error) {
    // eslint-disable-next-line preserve-caught-error
    throw new Error(extractErrorMessage(error));
  }
}

export function getOAuthUrl(provider: 'google' | 'github'): string {
  return `${SERVER_BASE_URL}/oauth2/authorization/${provider}`;
}


export default apiClient;