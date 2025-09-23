import axios from 'axios';
import { ApiResponse, LoginRequest, RegisterRequest, CreateOrderRequest } from '../../../shared/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (data: LoginRequest): Promise<ApiResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<ApiResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<ApiResponse> => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  addReview: async (id: string, data: { rating: number; comment: string }): Promise<ApiResponse> => {
    const response = await api.post(`/products/${id}/reviews`, data);
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  create: async (data: CreateOrderRequest): Promise<ApiResponse> => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  getAll: async (params?: { page?: number; limit?: number }): Promise<ApiResponse> => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

// Payment API
export const paymentAPI = {
  createIntent: async (data: {
    amount: number;
    currency: string;
    orderId: string;
  }): Promise<ApiResponse> => {
    const response = await api.post('/payment/create-intent', data);
    return response.data;
  },

  confirmPayment: async (data: {
    paymentIntentId: string;
    orderId: string;
  }): Promise<ApiResponse> => {
    const response = await api.post('/payment/confirm', data);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  updateProfile: async (data: {
    name?: string;
    email?: string;
    address?: any;
  }): Promise<ApiResponse> => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse> => {
    const response = await api.put('/users/password', data);
    return response.data;
  },
};

export default api;