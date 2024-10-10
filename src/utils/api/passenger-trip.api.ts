import { api, handleRequest, createAuthorizationHeader } from '.';


export interface CreateNewState {
  name: string;
  country: string;
  isActive?: boolean;
}
export interface passengerPreferenceFilterParam {
  passengerId?: string;
}

const prefix: string = 'passenger-preference';

export const passengerPreferenceAPI = {
  create: (data: CreateNewState) =>
    handleRequest(api.post(`/${prefix}`, data, createAuthorizationHeader())),
  getAll: (query?: passengerPreferenceFilterParam) =>
    handleRequest(
      api.get(`/${prefix}`, { params: query, ...createAuthorizationHeader() }),
    ),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`)),
  update: (id: string, updateReason: Partial<CreateNewState>) =>
    handleRequest(api.patch(`/${prefix}/${id}`, updateReason, createAuthorizationHeader())),
};
