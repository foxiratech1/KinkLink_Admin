// Interest entity type
export type Interest = {
    _id: string;
    interestName: string; // Using 'interestName' to match API spelling
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};

// API Response types
export type GetInterestListResponse = {
    message: string;
    total: number;
    page: number;
    limit: number;
    data: Interest[];
} | {
    data?: Interest[];
    interests?: Interest[];
    message?: string;
    success?: boolean;
};

export type GetInterestListRequest = {
    page: number;
    limit: number;
    search?: string;
};

export type AddInterestRequest = {
    interestName: string;
};

export type UpdateInterestRequest = {
    interestName: string;
};

export type InterestActionResponse = {
    message: string;
    success: boolean;
    data?: Interest;
};
