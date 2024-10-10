import { MongoResponse } from '@/components/common/Interfaces';
import { api, handleRequest, createAuthorizationHeader } from '.';

export interface CreateNewDriverBank {
  name: string;
  country: string;
  isActive?: boolean;
}
export interface DriverTripFilterParam {
  driverId?: string;
  size?: number;
  page?: number;
}

export interface IDriverBank extends MongoResponse {
  driverId: string;
  stripeAccountId: string;
  stripeBankToken: string;
  isDefault: boolean;
  isAccountVerified: boolean;
  isDeleted: boolean;
  bankName: string;
  accountNumber: string;
}
export interface GetDriverTripsDto {
  startDate?: Date;
  endDate?: Date;
  driverId?: string;
}
const prefix: string = 'bank-details';

export const DriverBankAPI = {
  create: (data: CreateNewDriverBank) =>
    handleRequest(api.post(`/${prefix}`, data, createAuthorizationHeader())),
  getAll: (query?: DriverTripFilterParam) =>
    handleRequest(
      api.get(`/${prefix}`, { params: query, ...createAuthorizationHeader() }),
    ),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`)),
  update: (id: string, updateReason: Partial<CreateNewDriverBank>) =>
    handleRequest(
      api.patch(`/${prefix}/${id}`, updateReason, createAuthorizationHeader()),
    ),
  driverEarning: (query: GetDriverTripsDto) => handleRequest(
    api.get(`/confirmed-trips/driver/earning`, { params: query,...createAuthorizationHeader() }),
  )
};
