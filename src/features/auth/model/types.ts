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
export interface BackendFieldError {
  field: string;
  message: string;
}
export interface BackendError {
  message?: string;
  details?: BackendFieldError[];
}
export interface RegisterState {
  loading: boolean;
  success: boolean;
  message: string | null;
  errors: Record<string, string> | null;
}
