// User type based on API response
export type User = {
    _id: string;
    verificationId: string;
    email: string;
    role: "Person" | "Business";
    username?: string;
    name?: string;
    businessName?: string;
    registrationRole?: "Male" | "Female" | null;
    status: "Pending" | "Approved" | "Reject";
    isBlocked: boolean;
    isOnline: boolean;
    createdAt: string;
    verification?: {
        overallStatus:
        | "Pending"
        | "Approved"
        | "Manual_Review"
        | "Rejected";

    };
    businessProfile?: {
        businessName?: string;
        profileImg?: string;
    };

    personProfile?: {
        profileImg?: string;
    };
    adminNote?: string;
};

// Response type for GET /api/admin/users
export type GetAllUsersResponse = {
    totalUsers: number;
    page: number;
    limit: number;
    users: User[];
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
// Detailed user type (extends basic User type)
export type UserDetail = {
    isBlocked: boolean;
    _id: string;
    verificationId: string;
    email: string;
    role: "Person" | "Business";
    overallStatus: "Approved" | "Verification Requested" | "Rejected" | "Under Review" | "Verification Suspended";
    username?: string;
    name?: string;
    registrationRole?: "Male" | "Female" | null;
    isAgreed: boolean;
    status: "Pending" | "Approve" | "Reject";
    dob?: string;
    telephone?: string;
    isProfileComplete: boolean;
    isOnline: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    adminNote?: string;
};

// Person profile types

export type PersonDetails = {
    _id: string;
    userId: string;
    profileImg?: string;

    lookingFor: {
        ageRange: {
            min: number;
            max: number;
        };
        targets: string[];
    };

    locations?: {
        country: string;
        city: string;
    };

    details: Array<{
        dob?: string;
        status?: string;
        name?: string;
        height?: string;
        bodyType?: string;
        smoking?: string;
        sexuality?: string;
        drinking?: string;
        tattoos?: string;
        piercings?: string;
        _id: string;
    }>;

    aboutMe?: string;
    hostingStatus?: string;
    travelStatus?: string;

    interests: string[]; // <-- FIXED
    badges: string[];

    isProfileComplete: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
};


// Business profile types
export type BusinessDetails = {
    _id: string;
    userId: string;
    verificationId: string;
    businessName: string;
    businessCategory: string;
    telephone: string;
    subscriptionPlan: string;
    isFirstMonthFreeUsed: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

// API Response type for get-user-details endpoint
export type UserDetailsResponse = {
    verification: VerificationUser;
    user: UserDetail;
    personProfile: PersonDetails | null;
    businessProfile: BusinessDetails | null;
};

// Verification types
export type VerificationUser = {
    _id: string;
    user: {
        _id: string;
        email: string;
        name: string;
        role: string;
        registrationRole: string;
        type: string;
        isVerified: boolean;
    };
    businessName: string;
    attempts: number;
    overallStatus:
    | "Approved"
    | "Rejected"
    | "Verification Requested"
    | "Verification Suspended"
    | "Not Verified"
    | "Under Review";
    isDeleted: boolean;
    submittedAt?: string;
    lastUpdatedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    isSelfieCompleted?: boolean;
    isIdRequired?: boolean;
    metadata?: {
        history: Array<{
            status: string;
            action: string;
            date: string;
            reason?: string;
            _id: string;
            notes?: string;
            updatedBy?: string;
            timestamp?: string;
        }>;
        submissionDate?: string;
        reviewDate?: string;
        adminNotes?: string;
        reviewedBy?: string;
        rejectionReason?: string;
    };
    liveSelfieVerification?: {
        image: string;
        status: string;
        verifiedAt: string;
        failureReason: string | null;
    };
    selfieImage?: {
        image: string;
        status: string;
        uploadedAt: string;
        approvedAt: string;
        rejectedAt: string | null;
        rejectionReason: string | null;
    } | string; // Allow string for Business JSON
    verifyId?: {
        document?: string;
        status: string;
        verifiedAt?: string;
        failureReason?: string | null;
        ocrText?: string;
    };
};

export type GetUserVerificationsResponse = {
    success: boolean;
    data: VerificationUser[];
    totalCount: number;
    pagination: {
        page: number;
        hasPrevious: boolean;
        previous: number;
        hasNext: boolean;
        next: number;
        totalPages: number;
    };
};

export type GetUserVerificationsParams = {
    page?: number;
    limit?: number;
    status?: "Approved" | "Rejected" | "Pending" | "Verification Requested" | "Verification Suspended" | "Not Verified" | "Under Review";
    search?: string;
};
