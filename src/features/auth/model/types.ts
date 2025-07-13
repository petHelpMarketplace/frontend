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
export interface RegisterState {
  loading: boolean;
  success: boolean;
}
