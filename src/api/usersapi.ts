import axiosInstance from "../utils/axios";
import { API_ROUTES } from "../config/api";
import {
    GetAllUsersResponse,
    GetUsersParams,
    UserActionResponse,
    UserDetailsResponse,
    GetUserVerificationsParams,
    GetUserVerificationsResponse
} from "../types/user.types";


/* ===================== API FUNCTIONS ===================== */

//  GET ALL USERS
export const getAllUsersApi = async (params: GetUsersParams): Promise<GetAllUsersResponse> => {
    const res = await axiosInstance.get<GetAllUsersResponse>(
        API_ROUTES.USERS.GET_ALL,
        { params }
    );

    return res.data;
};

//  GET USER DETAILS BY ID
export const getUserDetailsApi = async (id: string): Promise<UserDetailsResponse> => {
    const res = await axiosInstance.get<UserDetailsResponse>(
        API_ROUTES.USERS.GET_USER_DETAILS(id)
    );
    return res.data;
};

//  APPROVE / REJECT USER (SINGLE API)
export const updateUserRegiStatusApi = async (
    userId: string,
    verificationId: string,
    status: "Approve" | "Reject"
): Promise<UserActionResponse> => {

    const formattedStatus =
        status === "Approve" ? "Approved" : "Rejected";

    const res = await axiosInstance.patch<UserActionResponse>(
        API_ROUTES.USERS.APPROVEREJECT(verificationId),
        {
            status: formattedStatus,
            userId: userId,
        }
    );

    return res.data;
};

// GET USER VERIFICATIONS
export const getUserVerificationsApi = async (params: GetUserVerificationsParams): Promise<GetUserVerificationsResponse> => {
    const res = await axiosInstance.get<GetUserVerificationsResponse>(
        "/api/admin/get-users-verifications",
        { params }
    );
    return res.data;
};

// DELETE USER VERIFICATION
export const deleteUserVerificationApi = async (
    verificationId: string
): Promise<UserActionResponse> => {
    const res = await axiosInstance.delete<UserActionResponse>(
        `/api/admin/delete-user-verification/${verificationId}`
    );

    return res.data;
};









export const getBlockedUsersApi = async (params: GetUsersParams): Promise<GetAllUsersResponse> => {
    const res = await axiosInstance.get<GetAllUsersResponse>(
        API_ROUTES.USERS.BLOCKED_USERS,
        { params }
    );

    return res.data;
};

//  GET PENDING USERS
export const getPendingUsersApi = async (params: GetUsersParams): Promise<GetAllUsersResponse> => {
    const res = await axiosInstance.get<GetAllUsersResponse>(
        API_ROUTES.USERS.GET_PENDING,
        { params }
    );

    return res.data;
};

// GET REJECT USERS
export const getRejectUsersApi = async (params: GetUsersParams): Promise<GetAllUsersResponse> => {
    const res = await axiosInstance.get<GetAllUsersResponse>(
        API_ROUTES.USERS.GET_REJECT,
        { params }
    );

    return res.data;
};









//  BLOCK / UNBLOCK USER (SINGLE API)
export const updateUserBlockStatus = async (
    id: string,
    isBlocked: boolean
): Promise<UserActionResponse> => {
    const res = await axiosInstance.put<UserActionResponse>(
        API_ROUTES.USERS.BLOCK_UNBLOCK(id),
        { isBlocked }
    );
    return res.data;
};



export const updateVerificationStatusApi = async (
    userId: string,
    status: "Approved" | "Rejected"
) => {
    const response = await axiosInstance.patch(
        `/admin/verification/${userId}`,
        { status }
    );

    return response.data;
};

// ADMIN REQUEST USER ID VERIFICATION
export const adminRequestUserIdApi = async (
    userId: string,
    adminNote: string
): Promise<UserActionResponse> => {
    const res = await axiosInstance.post<UserActionResponse>(
        `/api/admin/admin-request-user-id/${userId}`,
        { userId, adminNote }
    );
    return res.data;
};


