import { ReactNode } from 'react';

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
  isLoggedIn: boolean;
  isRefreshing: boolean;
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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export type LoginFormProps = {
  onClose: () => void;
};

export type PrivateRouteProps = {
  children: ReactNode;
};
