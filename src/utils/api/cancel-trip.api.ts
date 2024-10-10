import { CancelTripReasonRequest } from '@/components/common/Interfaces';
import { api, handleRequest, createAuthorizationHeader } from '.';
import { CancelTripQueryDto } from '@/components/common/Interfaces/api.request-interface';

interface CancelTripReasonAPI {
  create: (data: CancelTripReasonRequest) => Promise<any>;
  getAll: (query?: CancelTripQueryDto) => Promise<any>;
  delete: (id: string) => Promise<any>;
  update: (
    id: string,
    updateReason: { reason: string; isActive: boolean },
  ) => Promise<any>;
}

const createCancelTripReasonAPI = (prefix: string): CancelTripReasonAPI => ({
  create: (data) => handleRequest(api.post(`/${prefix}`, data, createAuthorizationHeader())),
  getAll: (query) => handleRequest(api.get(`/${prefix}`, {params: query,...createAuthorizationHeader()})),
  delete: (id) => handleRequest(api.delete(`/${prefix}/${id}`)),
  update: (id, updateReason) =>
    handleRequest(api.put(`/${prefix}/${id}`, updateReason, createAuthorizationHeader())),
});

export const CancelTripReasonByDriverAPI = createCancelTripReasonAPI(
  'cancellation-driver-trip-reason',
);
export const CancelTripReasonByPassengerAPI = createCancelTripReasonAPI(
  'cancellation-passenger-trip-reason',
);
