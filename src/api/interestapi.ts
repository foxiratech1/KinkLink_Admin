import axiosInstance from "../utils/axios";
import { API_ROUTES } from "../config/api";
import {
    Interest,
    GetInterestListResponse,
    AddInterestRequest,
    UpdateInterestRequest,
    InterestActionResponse,
} from "../types/interest.types";

/* ===================== API FUNCTIONS ===================== */

//  GET ALL INTERESTS
export const getInterestListApi = async (): Promise<Interest[]> => {
    const res = await axiosInstance.get<GetInterestListResponse>(
        API_ROUTES.INTERESTS.GET_LIST
    );
    return res.data.data || res.data.interests || [];
};

//  ADD INTEREST
export const addInterestApi = async (
    data: AddInterestRequest
): Promise<InterestActionResponse> => {
    const res = await axiosInstance.post<InterestActionResponse>(
        API_ROUTES.INTERESTS.ADD,
        data
    );
    return res.data;
};

//  UPDATE INTEREST
export const updateInterestApi = async (
    id: string,
    data: UpdateInterestRequest
): Promise<InterestActionResponse> => {
    const res = await axiosInstance.put<InterestActionResponse>(
        API_ROUTES.INTERESTS.UPDATE(id),
        data
    );
    return res.data;
};

//  DELETE INTEREST
export const deleteInterestApi = async (
    id: string
): Promise<InterestActionResponse> => {
    const res = await axiosInstance.delete<InterestActionResponse>(
        API_ROUTES.INTERESTS.DELETE(id)
    );
    return res.data;
};
