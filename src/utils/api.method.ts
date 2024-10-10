import {
  CarColor,
  CarCompany,
  CarModel,
  CurrentUser,
  LoginRequest,
  NewAdminAddRequest,
  NewAppVersionHistory,
  NewDriverFaq,
  NewPassengerFaq,
  IFaq,
} from '@/components/common/Interfaces';
import {
  PaginationQueryDto,
  UpdateDriverDocumentArgs,
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
  updateById: (id: string, updateAdminData: { name: string; isActive: boolean }) =>
    handleRequest(api.patch(`/admin/${id}`, updateAdminData, createAuthorizationHeader())),
};


export const DriverDocumentAPI = {
  listAll: (driverId: string) =>
    handleRequest(
      api.get(`/driver-documents?driverId=${driverId}`, createAuthorizationHeader()),
    ),
  getOne: (id: string) =>
    handleRequest(api.get(`/driver-documents/${id}`, createAuthorizationHeader())),
  update: (id: string, data: UpdateDriverDocumentArgs) =>
    handleRequest(
      api.put(`/driver-documents/approve/${id}`, data, createAuthorizationHeader()),
    ),
};

export const listAllUsers = (query?: UserQueryDto) =>
  handleRequest(
    api.get('/users/lists', { params: query, ...createAuthorizationHeader() }),
  );
export const getUserProfile = (id: string) =>
  handleRequest(api.get(`/users/data/${id}`, createAuthorizationHeader()));

export const listAllDriverCars = (driverId: string) =>
  handleRequest(api.get(`/cars/?driverId=${driverId}`, createAuthorizationHeader()));

export const approvedDriverCar = (
  carId: string,
  data: { isApproved: boolean },
) => handleRequest(api.put(`/cars/approve/${carId}`, data, createAuthorizationHeader()));

// app-version-history
export const getAppVersionHistory = (query?: PaginationQueryDto) =>
  handleRequest(
    api.get('/app-version-history', { params: query, ...createAuthorizationHeader() }),
  );

export const addAppVersionHistory = (AppVersionData: NewAppVersionHistory) =>
  handleRequest(
    api.post('/app-version-history', AppVersionData, createAuthorizationHeader()),
  );

export const updateAppVersionHistory = (
  id: string,
  updateData: Partial<NewAppVersionHistory>,
) => {
  return handleRequest(
    api.patch(`/app-version-history/${id}`, updateData, createAuthorizationHeader()),
  );
};

export const deleteAppVersionHistory = (id: string) =>
  handleRequest(api.delete(`app-version-history/${id}`));

// frequently asked questions

// for driver
export const getFaqDriver = (query?: PaginationQueryDto) =>
  handleRequest(api.get(`driver-faq`, { params: query, ...createAuthorizationHeader() }));

export const addFaqDriver = (FaqDriverData: IFaq) =>
  handleRequest(api.post('driver-faq', FaqDriverData, createAuthorizationHeader()));

export const updateDriverFaq = (id: string, updateData: NewDriverFaq) => {
  return handleRequest(
    api.patch(`driver-faq/${id}`, updateData, createAuthorizationHeader()),
  );
};

export const deleteDriverFaq = (id: string) =>
  handleRequest(api.delete(`driver-faq/${id}`));

// for passenger
export const getFaqPassenger = (query?: PaginationQueryDto) =>
  handleRequest(
    api.get('passenger-faq', { params: query, ...createAuthorizationHeader() }),
  );

export const addFaqPassenger = (FaqPassengerData: IFaq) =>
  handleRequest(api.post('passenger-faq', FaqPassengerData, createAuthorizationHeader()));

export const updatePassengerFaq = (id: string, updateData: NewPassengerFaq) => {
  return handleRequest(
    api.patch(`passenger-faq/${id}`, updateData, createAuthorizationHeader()),
  );
};

export const deletePassengerFaq = (id: string) =>
  handleRequest(api.delete(`passenger-faq/${id}`));

// car company
export const getCarCompany = (query?: PaginationQueryDto) =>
  handleRequest(
    api.get('/car-company', { params: query, ...createAuthorizationHeader() }),
  );
export const addCarCompany = (Data: CarCompany) =>
  handleRequest(api.post('/car-company', Data, createAuthorizationHeader()));
export const updateCarCompany = (id: string, updateData: CarCompany) => {
  return handleRequest(
    api.patch(`/car-company/${id}`, updateData, createAuthorizationHeader()),
  );
};
export const deleteCarCompany = (id: string) =>
  handleRequest(api.delete(`/car-company/${id}`));

// car colors
export const getCarColor = (query?: PaginationQueryDto) =>
  handleRequest(api.get('/car-color', { params: query, ...createAuthorizationHeader() }));
export const addCarColor = (Data: CarColor) =>
  handleRequest(api.post('/car-color', Data, createAuthorizationHeader()));
export const updateCarColor = (id: string, updateData: CarColor) => {
  return handleRequest(
    api.patch(`/car-color/${id}`, updateData, createAuthorizationHeader()),
  );
};
export const deleteCarColor = (id: string) =>
  handleRequest(api.delete(`/car-color/${id}`));

// car model
export const getCarModel = (query?: PaginationQueryDto) =>
  handleRequest(api.get('/car-model', { params: query, ...createAuthorizationHeader() }));
export const addCarModel = (Data: CarModel) =>
  handleRequest(api.post('/car-model', Data, createAuthorizationHeader()));
export const updateCarModel = (id: string, updateData: CarModel) => {
  return handleRequest(
    api.patch(`/car-model/${id}`, updateData, createAuthorizationHeader()),
  );
};
export const deleteCarModel = (id: string) =>
  handleRequest(api.delete(`/car-model/${id}`));

export default api;
