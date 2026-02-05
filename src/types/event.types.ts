export type EventType = {
    _id: string;
    eventType: string;
    category: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};

// API Response types
// export type GetEventListResponse = {
//     message: string;
//     total: number;
//     page: number;
//     limit: number;
//     data: EventType[];
// } | {
//     // Keep fallback for potential old structure or error cases if needed, but primarily use the new one
//     data?: EventType[];
//     eventTypes?: EventType[];
//     category?: string;
//     message?: string;
//     success?: boolean;
// };
export type GetEventListResponse = {
    message: string;
    total: number;
    page: number;
    limit: number;
    data: EventType[];
};

export type GetEventListRequest = {
    page: number;
    limit: number;
    search?: string;
    category?: string;
};

export type AddEventRequest = {
    eventType: string;
    category: string;
};

export type UpdateEventRequest = {
    eventType: string;
    category: string;
};

export type EventActionResponse = {
    message: string;
    success: boolean;
    data?: EventType;
};
