import { api, handleRequest, createAuthorizationHeader } from '.';

const prefix: string = 'users';

export const UserMainAPI = {
  deleteUserRequest: (data: { email: string }) =>
    handleRequest(api.delete(`/${prefix}/${data.email}`)),
  toggleActivateAccount: (data: { email: string }) =>
    handleRequest(api.post(`/${prefix}/deactivate-account`, data, createAuthorizationHeader())),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`, createAuthorizationHeader())),
};
