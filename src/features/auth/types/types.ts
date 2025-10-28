import { ReactNode } from 'react';

export type SpecProfileResponse = {
  id: number | null;
  name: string | null;
  family_name: string | null;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  description: string | null;
  experience: number | null;
  is_active: boolean;
  is_verified: boolean;
  phone: string | null;
  position: string | null;
};

export interface AuthState {
  id: number | null;
  name: string | null;
  email: string | null;
  accessToken: string | null;
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
  id: number;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export type LoginFormProps = {
  onClose: () => void;
  onOpenPwdRecovery: () => void;
};

export type PrivateRouteProps = {
  children: ReactNode;
};

export interface RefreshResponse {
  access_token: string;
}

export type ModalType = 'login' | 'register' | 'pwdRecovery' | null;
