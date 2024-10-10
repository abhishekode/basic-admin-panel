import { api, handleRequest, createAuthorizationHeader } from '.';

export interface GetDriverTripsDto {
  startDate?: Date;
  endDate?: Date;
  driverId?: string;
}
const prefix: string = 'confirmed-trips';

export const ConfirmTripAPI = {
  driverEarning: (query: GetDriverTripsDto) =>
    handleRequest(
      api.post(`/${prefix}/driver/earning`, query, createAuthorizationHeader()),
    ),
};
