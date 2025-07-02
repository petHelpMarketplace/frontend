import type { RegisterResponse } from '@/features/auth/model/types';
export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
  phone: string;
}

export async function registerUserApi(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const res = await fetch(
    `https://petbackend-a2vg.onrender.com/api/v1/specialist/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );
  const result = await res.json();
  if (!res.ok) throw result;

  // Перевіряємо, чи прийшов правильний об'єкт
  if (
    typeof result === 'object' &&
    result !== null &&
    'id' in result &&
    'message' in result &&
    typeof result.id === 'string' &&
    typeof result.message === 'string'
  ) {
    return result as RegisterResponse;
  }

  // Якщо не той shape — кидаємо помилку
  throw { message: 'Unexpected response from server' };
}
