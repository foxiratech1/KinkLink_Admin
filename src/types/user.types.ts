// User type based on API response
export type User = {
    _id: string;
    email: string;
    role: "Person" | "Business";
    username?: string;
    name?: string;
    businessName?: string;
    registrationRole?: "Male" | "Female" | null;
    status: "Pending" | "Approve" | "Reject";
    isBlocked: boolean;
    isOnline: boolean;
    createdAt: string;
    businessProfile?: {
        businessName?: string;
        profileImg?: string;
    };

    personProfile?: {
        profileImg?: string;
    };
};

// Response type for GET /api/admin/users
export type GetAllUsersResponse = {
    totalUsers: number;
    page: number;
    limit: number;
    users: User[];
};

// Response type for GET /api/admin/users-pending
export type GetPendingUsersResponse = {
    data: User[];
};

// Query params for fetching users
export type GetUsersParams = {
    page?: number;
    limit?: number;
    search?: string;
    role?: "Person" | "Business" | "All";
    status?: "Active" | "Inactive" | "Pending";
};

// Action response types
export type UserActionResponse = {
    message: string;
    success: boolean;
};
