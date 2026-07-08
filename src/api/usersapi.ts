import axiosInstance from "../utils/axios";
import { API_ROUTES } from "../config/api";
import {
  GetAllUsersResponse,
  GetUsersParams,
  UserActionResponse,
  UserDetailsResponse,
  GetUserVerificationsParams,
  GetUserVerificationsResponse,
  ReportUserDetailResponse,
} from "../types/user.types";

/* ===================== API FUNCTIONS ===================== */

//  GET ALL USERS
export const getAllUsersApi = async (
  params: GetUsersParams,
): Promise<GetAllUsersResponse> => {
  const res = await axiosInstance.get<GetAllUsersResponse>(
    API_ROUTES.USERS.GET_ALL,
    { params },
  );

  return res.data;
};

//  GET USER DETAILS BY ID
export const getUserDetailsApi = async (
  id: string,
): Promise<UserDetailsResponse> => {
  const res = await axiosInstance.get<UserDetailsResponse>(
    API_ROUTES.USERS.GET_USER_DETAILS(id),
  );
  return res.data;
};

//  APPROVE / REJECT USER (SINGLE API)
export const updateUserRegiStatusApi = async (
  userId: string,
  verificationId: string,
  type: "selfie" | "id" | "partnerSelfie" | "partnerId",
  status: "Approve" | "Rejected",
  rejectionReason?: string,
): Promise<UserActionResponse> => {
  const formattedStatus = status === "Approve" ? "Approved" : "Rejected";

  const res = await axiosInstance.patch<UserActionResponse>(
    API_ROUTES.USERS.APPROVEREJECT(verificationId),
    {
      status: formattedStatus,
      userId: userId,
      rejectionReason,
      type,
    },
  );

  return res.data;
};
export const varicationSuspend = async (
  id: string,
): Promise<UserActionResponse> => {
  const res = await axiosInstance.patch<UserActionResponse>(
    API_ROUTES.USERS.SUSPENDED(id),
  );

  return res.data;
};
// GET USER VERIFICATIONS
export const getUserVerificationsApi = async (
  params: GetUserVerificationsParams,
): Promise<GetUserVerificationsResponse> => {
  const res = await axiosInstance.get<GetUserVerificationsResponse>(
    "/api/admin/get-users-verifications",
    { params },
  );
  return res.data;
};

// DELETE USER VERIFICATION
export const deleteUserVerificationApi = async (
  verificationId: string,
): Promise<UserActionResponse> => {
  const res = await axiosInstance.delete<UserActionResponse>(
    `/api/admin/delete-user-verification/${verificationId}`,
  );

  return res.data;
};
export const deleteSpecificVerificationImageApi = async (
  verificationId: string,
  type: string,
): Promise<any> => {
  const res = await axiosInstance.post<any>(
    `/api/admin/delete-verification-image/${verificationId}`,
    { type },
  );
  return res.data;
};
export const getBlockedUsersApi = async (
  params: GetUsersParams,
): Promise<GetAllUsersResponse> => {
  const res = await axiosInstance.get<GetAllUsersResponse>(
    API_ROUTES.USERS.BLOCKED_USERS,
    { params },
  );

  return res.data;
};

//  GET PENDING USERS
export const getPendingUsersApi = async (
  params: GetUsersParams,
): Promise<GetAllUsersResponse> => {
  const res = await axiosInstance.get<GetAllUsersResponse>(
    API_ROUTES.USERS.GET_PENDING,
    { params },
  );

  return res.data;
};

// GET REJECT USERS
export const getRejectUsersApi = async (
  params: GetUsersParams,
): Promise<GetAllUsersResponse> => {
  const res = await axiosInstance.get<GetAllUsersResponse>(
    API_ROUTES.USERS.GET_REJECT,
    { params },
  );

  return res.data;
};

//  BLOCK / UNBLOCK USER (SINGLE API)
export const updateUserBlockStatus = async (
  id: string,
  isBlocked: boolean,
): Promise<UserActionResponse> => {
  const res = await axiosInstance.put<UserActionResponse>(
    API_ROUTES.USERS.BLOCK_UNBLOCK(id),
    { isBlocked },
  );
  return res.data;
};

export const updateVerificationStatusApi = async (
  userId: string,
  status: "Approved" | "Rejected",
) => {
  const response = await axiosInstance.patch(`/admin/verification/${userId}`, {
    status,
  });

  return response.data;
};

// ADMIN REQUEST USER ID VERIFICATION

export const adminRequestUserIdApi = (
  verificationId: string,
  userId: string,
) => {
  return axiosInstance.post(
    `/api/admin/admin-request-user-id/${verificationId}`,
    { userId },
  );
};

// UPDATE USER VERIFICATION NOTE
export const updateUserVerificationNoteApi = async (
  userId: string,
  adminNote: string,
): Promise<UserActionResponse> => {
  const res = await axiosInstance.patch<UserActionResponse>(
    `/api/admin/user-verification-note/${userId}`,
    { adminNote },
  );
  return res.data;
};

export type GetAllReportsResponse = {
  success: boolean;
  data: any[];
  pagination: {
    page: number;
    hasPrevious: boolean;
    previous: number;
    hasNext: boolean;
    next: number;
    totalPages: number;
    totalCount?: number;
  };
};

export const getAllReportsApi = async (
  params: any,
): Promise<GetAllReportsResponse> => {
  const res = await axiosInstance.get<GetAllReportsResponse>(
    API_ROUTES.USERS.GET_ALL_REPORTS,
    { params },
  );
  return res.data;
};

export const takeReportActionApi = async (payload: {
  reportId: string;
  action: "Dismiss" | "Warning_1" | "Warning_2" | "Suspension" | "Permanent_Ban" | "Delete_Content";
  reason?: string;
  suspensionDays?: number;
}): Promise<UserActionResponse> => {
  const res = await axiosInstance.post<UserActionResponse>(
    API_ROUTES.USERS.TAKE_REPORT_ACTION,
    payload,
  );
  return res.data;
};

export const getReportUserDetailApi = async (
  userId: string,
): Promise<ReportUserDetailResponse> => {
  const res = await axiosInstance.get<ReportUserDetailResponse>(
    API_ROUTES.USERS.GET_REPORT_USER_DETAIL(userId),
  );
  return res.data;
};

export const getTargetUserReportApi = async (
  userId: string,
  reporterId?: string,
): Promise<any> => {
  const res = await axiosInstance.get<any>(
    API_ROUTES.USERS.GET_TARGET_USER_REPORT(userId),
    {
      params: reporterId ? { reporterId } : undefined,
    },
  );
  return res.data;
};

// TOGGLE KINKLINK TRUSTED BUSINESS BADGE
export const toggleKinkLinkTrustedBusinessApi = async (
  id: string,
  isTrustedByKinkLink: boolean,
): Promise<UserActionResponse> => {
  const res = await axiosInstance.patch<UserActionResponse>(
    API_ROUTES.USERS.TRUSTED_BUSINESS(id),
    { isTrustedByKinkLink },
  );
  return res.data;
};


