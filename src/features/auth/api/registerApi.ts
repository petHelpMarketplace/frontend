export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
  phone: string;
}

export interface RegisterResponse {
  field: string;
  message: string;
}

export async function registerUserApi(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/specialist/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );
  const result = await res.json();
  if (!res.ok) throw result;
  return result;
}
