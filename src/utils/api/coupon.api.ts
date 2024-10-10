import { MongoResponse } from '@/components/common/Interfaces';
import { api, handleRequest, createAuthorizationHeader } from '.';

export enum CouponType {
  Percentage = 'Percentage',
  Flat = 'Flat',
}

export enum CouponStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export interface ICoupon extends MongoResponse {
  code: string;
  shortDescription: string;
  type: CouponType;
  discount: number;
  minimumOrderAmount: number;
  expiryDateTime: Date;
  termsAndConditions: string;
  isEnabled: boolean;
  isDeleted: boolean;
  createdBy: string;
  user: string[];
  maxRedeemCount: number;
  redeemedCount: number;
  newUserAfterDate: Date;
	newUserOnly: boolean;
}

export interface ICouponResponse {
  coupons: ICoupon[];
  total: number;
}

export interface CreateNewCoupon {
  code: string;
  shortDescription: string;
  type: CouponType;
  discount: number;
  minimumOrderAmount: number;
  expiryDateTime: string;
  termsAndConditions: string;
  user: string[];
  maxRedeemCount: number;
  newUserAfterDate: string;
  newUserOnly: boolean;
  isEnabled?: boolean;
}
export interface CouponFilterParams {
  code?: string;
  status?: CouponStatus;
  createdBy?: string;
  creationDate?: string;
  expirationDate?: string;
  user?: string;
  couponId?: string;
  isEnabled?: boolean;
  isDeleted?: boolean;
  size?: number;
  page?: number;
}

const prefix: string = 'coupon';

export const CouponAPI = {
  create: (data: CreateNewCoupon) =>
    handleRequest(api.post(`/${prefix}`, data, createAuthorizationHeader())),
  getAll: (query?: CouponFilterParams) =>
    handleRequest(
      api.get(`/${prefix}`, { params: query, ...createAuthorizationHeader() }),
    ),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`, createAuthorizationHeader())),
  update: (id: string, updateReason: Partial<CreateNewCoupon>) =>
    handleRequest(api.put(`/${prefix}/${id}`, updateReason, createAuthorizationHeader())),
};
