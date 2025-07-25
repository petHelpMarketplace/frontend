import axios from 'axios';

// Створення екземпляра axios для авторизації
export const petsHelpApi = axios.create({
  baseURL: 'https://petbackend-a2vg.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});
