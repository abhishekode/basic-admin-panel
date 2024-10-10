import {
  AdminPopulateResponse,
  MongoResponse,
} from '@/components/common/Interfaces';
import { api, handleRequest, createAuthorizationHeader } from '.';


export interface AppData {
  chargeDetails: ChargeDetails
  _id: string
  isDeleted: boolean
  createdBy: CreatedBy
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ChargeDetails {
  platformFee: number
  taxRate: number
}

export interface CreatedBy {
  _id: string
  name: string
  email: string
}

export interface StateRate {
  _id: string
  name: string
  states: State[]
}

export interface State {
  _id: string
  name: string
  rate: number
}


export interface IAppData extends MongoResponse {
  appData: AppData
  state_rate: StateRate[]
  tripRequests: number
  drivers: number
  passengers: number
  confirmTrips: number
  tripPayments: number
  totalEarning: string
}

export interface AppData {
  chargeDetails: ChargeDetails
  _id: string
  isDeleted: boolean
  createdBy: AdminPopulateResponse
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ChargeDetails {
  platformFee: number
  taxRate: number
}


export interface StateRate {
  _id: string
  name: string
  state: State[]
}

export interface State {
  _id: string
  name: string
  rate: number
}


export interface CreateAppData {
  chargeDetails: {
    platformFee: number;
    taxRate: number;
  };
}

const prefix: string = 'app-data';

export const AppDataAPI = {
  create: (data: CreateAppData) =>
    handleRequest(api.post(`/${prefix}`, data, createAuthorizationHeader())),
  getAll: () => handleRequest(api.get(`/${prefix}`)),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`)),
  update: (id: string, updateReason: Partial<CreateAppData>) =>
    handleRequest(api.patch(`/${prefix}/${id}`, updateReason, createAuthorizationHeader())),
};
