import axiosInstance from "../utils/axios";
import {
    // EventType,
    GetEventListResponse,
    AddEventRequest,
    GetEventListRequest,
    UpdateEventRequest,
    EventActionResponse,
} from "../types/event.types";
import { API_ROUTES } from "../config/api";

/* ===================== API FUNCTIONS ===================== */

//  GET ALL EVENT TYPES
export const getEventTypeListApi = async (
    params?: GetEventListRequest
): Promise<GetEventListResponse> => {
    const res = await axiosInstance.get<GetEventListResponse>(
        API_ROUTES.EVENT.GET_EVENT_TYPE_LIST,
        { params }
    );

    return res.data;
};


//  ADD EVENT TYPE
export const addEventTypeApi = async (
    data: AddEventRequest
): Promise<EventActionResponse> => {
    const res = await axiosInstance.post<EventActionResponse>(
        API_ROUTES.EVENT.ADD_EVENT_TYPE,
        data
    );
    return res.data;
};

//  UPDATE EVENT TYPE
export const updateEventTypeApi = async (
    id: string,
    data: UpdateEventRequest
): Promise<EventActionResponse> => {
    const res = await axiosInstance.put<EventActionResponse>(
        API_ROUTES.EVENT.UPDATE_EVENT_TYPE(id),
        data
    );
    return res.data;
};

//  DELETE EVENT TYPE
export const deleteEventTypeApi = async (
    id: string
): Promise<EventActionResponse> => {
    const res = await axiosInstance.delete<EventActionResponse>(
        API_ROUTES.EVENT.DELETE_EVENT_TYPE(id)
    );
    return res.data;
};
