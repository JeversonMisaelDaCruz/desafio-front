// src/plugins/axios.js
import axios from 'axios';
import store from '../store';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/', // URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar um interceptor para incluir o token JWT nas requisições
apiClient.interceptors.request.use((config) => {
  const token = store.getters['auth/token'];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
