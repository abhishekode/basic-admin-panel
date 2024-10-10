import {
  CurrentUser,
  LoginRequest,
  NewAdminAddRequest,
} from '@/components/common/Interfaces';
import {
  PaginationQueryDto,
  UserQueryDto,
} from '@/components/common/Interfaces/api.request-interface';
import { server_url } from '@/config';
import axios from 'axios';

const API_BASE_URL = `${server_url}/api/v1`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

const getToken = () => {
  const admin: CurrentUser = JSON.parse(localStorage.getItem('admin') || '{}');
  return admin.token;
};

const createAuthorizationHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const createAuthorizationFormDataHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'multipart/form-data',
  },
});

const handleRequest = async (request: Promise<any>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Define AdminAPI object with methods
export const AdminAPI = {
  // Method to add a new admin
  addNew: (newAdminData: NewAdminAddRequest) =>
    handleRequest(api.post('/admin', newAdminData, createAuthorizationHeader())),

  // Method to get all admins with pagination support
  getAll: (query?: PaginationQueryDto) =>
    handleRequest(api.get('/admin', { params: query, ...createAuthorizationHeader() })),

  // Method to delete an admin by ID
  deleteById: (id: string) =>
    handleRequest(api.delete(`/admin/${id}`, createAuthorizationHeader())),

  // Method to login
  login: (loginData: LoginRequest) =>
    handleRequest(api.post('/admin/login', loginData)),

  // Method to update an admin
  updateById: (id: string, updateAdminData: NewAdminAddRequest) =>
    handleRequest(api.patch(`/admin/${id}`, updateAdminData, createAuthorizationHeader())),
};


export const listAllUsers = (query?: UserQueryDto) =>
  handleRequest(
    api.get('/users/lists', { params: query, ...createAuthorizationHeader() }),
  );
export const getUserProfile = (id: string) =>
  handleRequest(api.get(`/users/data/${id}`, createAuthorizationHeader()));



export default api;
