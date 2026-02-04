export type EventType = {
    _id: string;
    eventType: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};

// API Response types
export type GetEventListResponse = {
    data?: EventType[];
    eventTypes?: EventType[];
    message?: string;
    success?: boolean;
};

export type AddEventRequest = {
    eventType: string;
};

export type UpdateEventRequest = {
    eventType: string;
};

export type EventActionResponse = {
    message: string;
    success: boolean;
    data?: EventType;
};
