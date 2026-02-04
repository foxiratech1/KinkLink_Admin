// // Detailed user type (extends basic User type)
// export type UserDetail = {
//     isBlocked: boolean;
//     _id: string;
//     email: string;
//     role: "Person" | "Business";
//     username?: string;
//     name?: string;
//     registrationRole?: "Male" | "Female" | null;
//     isAgreed: boolean;
//     status: "Pending" | "Approve" | "Reject";
//     dob?: string;
//     telephone?: string;
//     isProfileComplete: boolean;
//     isOnline: boolean;
//     isDeleted: boolean;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
// };

// // Person profile types
// export type PersonDetails = {
//     lookingFor: {
//         ageRange: {
//             min: number;
//             max: number;
//         };
//         targets: string[]; // ["F", "M", "FF", "MM", etc.]
//     };
//     _id: string;
//     userId: string;
//     details: Array<{
//         height?: string;
//         sexuality?: string;
//         drinking?: string;
//         tattoos?: string;
//         piercings?: string;
//         _id: string;
//     }>;
//     aboutMe?: string;
//     hostingStatus?: string;
//     travelStatus?: string;
//     badges: string[];
//     interests: string[];
//     isProfileComplete: boolean;
//     isDeleted: boolean;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
// };

// // Business profile types
// export type BusinessDetails = {
//     _id: string;
//     userId: string;
//     businessName: string;
//     businessCategory: string;
//     telephone: string;
//     subscriptionPlan: string;
//     isFirstMonthFreeUsed: boolean;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
// };

// // API Response type for get-user-details endpoint
// export type UserDetailsResponse = {
//     user: UserDetail;
//     personProfile: PersonDetails | null;
//     businessProfile: BusinessDetails | null;
// };
