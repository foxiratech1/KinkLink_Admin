import axiosInstance from "../utils/axios";
import { API_ROUTES } from "../config/api";
import {
    GetAllUsersResponse,
    GetUsersParams,
    UserActionResponse,
    UserDetailsResponse
} from "../types/user.types";
// import { UserDetailsResponse } from "../types/userDetails.types";

/* ===================== API FUNCTIONS ===================== */

//  GET ALL USERS
export const getAllUsersApi = async (
    params?: GetUsersParams
): Promise<GetAllUsersResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.role && params.role !== "All") queryParams.append("role", params.role);
    if (params?.status) queryParams.append("status", params.status);

    const url = `${API_ROUTES.USERS.GET_ALL}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const res = await axiosInstance.get<GetAllUsersResponse>(url);
    return res.data;
};

//  GET BLOCKED USERS
export const getBlockedUsersApi = async (
    params?: GetUsersParams
): Promise<GetAllUsersResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.role && params.role !== "All") queryParams.append("role", params.role);
    if (params?.status) queryParams.append("status", params.status);

    const url = `${API_ROUTES.USERS.BLOCKED_USERS}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const res = await axiosInstance.get<GetAllUsersResponse>(url);
    return res.data;
};

//  GET PENDING USERS
export const getPendingUsersApi = async (
    params?: GetUsersParams
): Promise<GetAllUsersResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.role && params.role !== "All") queryParams.append("role", params.role);
    if (params?.status) queryParams.append("status", params.status);

    const url = `${API_ROUTES.USERS.GET_PENDING}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const res = await axiosInstance.get<GetAllUsersResponse>(url);
    return res?.data;
};

// GET REJECT USERS
export const getRejectUsersApi = async (
    params?: GetUsersParams
): Promise<GetAllUsersResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.role && params.role !== "All") queryParams.append("role", params.role);
    if (params?.status) queryParams.append("status", params.status);

    const url = `${API_ROUTES.USERS.GET_REJECT}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const res = await axiosInstance.get<GetAllUsersResponse>(url);
    return res?.data;
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
    id: string,
    status: "Approve" | "Reject"
): Promise<UserActionResponse> => {
    const res = await axiosInstance.patch<UserActionResponse>(
        API_ROUTES.USERS.APPROVEREJECT(id),
        { status }
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

