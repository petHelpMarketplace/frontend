export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface AuthState {
  id: string | null;
  name: string | null;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
  phone: string;
}

export interface RegisterResponse {
  id: string;
  message: string;
}
