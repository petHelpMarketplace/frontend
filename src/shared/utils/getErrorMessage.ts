import axios, { AxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return (
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Axios error occurred'
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
}
