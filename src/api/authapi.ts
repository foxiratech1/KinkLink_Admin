import axiosInstance from "../utils/axios";
import { API_ROUTES } from "../config/api";
import { Profile } from "../types/profile.types";

/* ===================== TYPES ===================== */

export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginApiResponse {
  message: string;
  adminId: string;
}
export interface ForgotPasswordPayload {
  email: string;
}
export interface ForgotPasswordApiResponse {
  id: string;
  email: string;
  message: string;
}
export interface VerifyOtpPayload {
  otp: string;
}
export interface VerifyOtpApiResponse {
  message: string;
  token: string;
}
export interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
}
export interface ResetPasswordApiResponse {
  message: string;
}
export interface LogoutApiResponse {
  message: string;
}
/* ===================== API FUNCTIONS ===================== */
//  LOGIN
export const loginApi = async (
  payload: LoginPayload,
): Promise<LoginApiResponse> => {
  const res = await axiosInstance.post<LoginApiResponse>(
    API_ROUTES.AUTH.LOGIN,
    payload,
  );
  return res.data;
};
//  LOGOUT
export const logoutApi = async (): Promise<LogoutApiResponse> => {
  const res = await axiosInstance.post<LogoutApiResponse>(
    API_ROUTES.AUTH.LOGOUT,
  );
  return res.data;
};
//  FORGOT PASSWORD
export const forgotPasswordApi = async (
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordApiResponse> => {
  const res = await axiosInstance.post<ForgotPasswordApiResponse>(
    API_ROUTES.AUTH.FORGOT_PASSWORD,
    payload,
  );
  return res.data;
};
//  VERIFY OTP
export const verifyOtpApi = async (
  id: string,
  payload: VerifyOtpPayload,
): Promise<VerifyOtpApiResponse> => {
  const res = await axiosInstance.post<VerifyOtpApiResponse>(
    API_ROUTES.AUTH.VERIFY_OTP(id),
    payload,
  );
  return res.data;
};
//  LOGIN VERIFY OTP
export const loginVerifyOtpApi = async (
  id: string,
  payload: VerifyOtpPayload,
): Promise<VerifyOtpApiResponse> => {
  const res = await axiosInstance.post<VerifyOtpApiResponse>(
    API_ROUTES.AUTH.LOGIN_VERIFY_OTP(id),
    payload,
  );
  return res.data;
};
//  RESET PASSWORD
export const resetPasswordApi = async (
  token: string,
  payload: ResetPasswordPayload,
): Promise<ResetPasswordApiResponse> => {
  const res = await axiosInstance.post<ResetPasswordApiResponse>(
    API_ROUTES.AUTH.RESET_PASSWORD(token),
    payload,
  );
  return res.data;
};
//  RESEND OTP
export const resendOtpApi = async (id: string) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.RESEND_OTP(id));
  return res.data; // { message }
};
// GET PROFILE
export const getProfileApi = async (): Promise<Profile> => {
  const res = await axiosInstance.get(API_ROUTES.AUTH.GET_PROFILE);
  return res.data.data;
};
// UPDATE PROFILE
export const updateProfileApi = async (payload: Partial<Profile>) => {
  return axiosInstance.put(API_ROUTES.AUTH.UPDATE_PROFILE, payload);
};
