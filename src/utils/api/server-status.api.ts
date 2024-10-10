import {
  AdminPopulateResponse,
  MongoResponse,
} from '@/components/common/Interfaces';
import { api, handleRequest, createAuthorizationHeader } from '.';

export enum ServerStatusEnum {
  UP = 'UP',
  DOWN = 'DOWN',
  MAINTENANCE = 'MAINTENANCE',
}

export interface IServerStatus extends MongoResponse {
  status: ServerStatusEnum;
  startTime: Date;
  endTime: Date;
  reason: string;
  createdBy: AdminPopulateResponse;
}

export interface IServerStatusResponse {
  serverStatus: IServerStatus[];
  total: number;
}

export interface NewServerStatus {
    status?: ServerStatusEnum;
    startTime?: string;
    endTime?: string;
    reason?: string;
}
export interface ServerStatusFilterParams {
  size?: number;
  page?: number;
}

const prefix: string = 'server-status';

export const ServerStatusAPI = {
  create: (data: NewServerStatus) =>
    handleRequest(api.post(`/${prefix}`, data, createAuthorizationHeader())),
  getAll: (query?: ServerStatusFilterParams) =>
    handleRequest(
      api.get(`/${prefix}`, { params: query, ...createAuthorizationHeader() }),
    ),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`, createAuthorizationHeader())),
  update: (id: string, updateReason: Partial<NewServerStatus>) =>
    handleRequest(
      api.patch(`/${prefix}/${id}`, updateReason, createAuthorizationHeader()),
    ),
};
