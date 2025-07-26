import axios from 'axios';

// Створення екземпляра axios для авторизації
export const petsHelpApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  //TODO This will be fixed once the CORS policy issue is resolved on the backend.
  // withCredentials: true,
});
