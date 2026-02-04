import axiosInstance from "../utils/axios";
import {
    EventType,
    GetEventListResponse,
    AddEventRequest,
    UpdateEventRequest,
    EventActionResponse,
} from "../types/event.types";

/* ===================== API FUNCTIONS ===================== */

//  GET ALL EVENT TYPES
export const getEventTypeListApi = async (): Promise<EventType[]> => {
    // Note: User specified 'get: api/admin/event-type-list'
    // I am assuming a base URL or prefix handling in axiosInstance, usually it's /api/v1 or similar.
    // Based on user request, the path is exactly api/admin/event-type-list
    const res = await axiosInstance.get<GetEventListResponse>(
        "/api/admin/event-type-list"
    );
    // Handle potential response structures
    return res.data.data || res.data.eventTypes || [];
};

//  ADD EVENT TYPE
export const addEventTypeApi = async (
    data: AddEventRequest
): Promise<EventActionResponse> => {
    // User specified 'post: api/admin/event-type'
    const res = await axiosInstance.post<EventActionResponse>(
        "/api/admin/event-type",
        data
    );
    return res.data;
};

//  UPDATE EVENT TYPE
export const updateEventTypeApi = async (
    id: string,
    data: UpdateEventRequest
): Promise<EventActionResponse> => {
    // User specified 'put: api/admin/update-event-type/:eventTypeId'
    const res = await axiosInstance.put<EventActionResponse>(
        `/api/admin/update-event-type/${id}`,
        data
    );
    return res.data;
};

//  DELETE EVENT TYPE
export const deleteEventTypeApi = async (
    id: string
): Promise<EventActionResponse> => {
    // User specified 'delete: api/admin/delete-event-type/ID'
    const res = await axiosInstance.delete<EventActionResponse>(
        `/api/admin/delete-event-type/${id}`
    );
    return res.data;
};
