export const getVerificationStatusColor = (status?: string | null) => {
    switch (status) {
        case "Approved":
            return "bg-emerald-50 text-emerald-700 border border-emerald-200";
        case "Rejected":
            return "bg-rose-50 text-rose-700 border border-rose-200";
        case "Under Review":
        case "Verification Requested":
        case "Pending":
            return "bg-amber-50 text-amber-700 border border-amber-200";
        case "Verification Suspended":
            return "bg-purple-50 text-purple-700 border border-purple-200";
        case "Manual_Review":
            return "bg-blue-50 text-blue-700 border border-blue-200";
        case "Not Verified":
            return "bg-gray-100 text-gray-700 border border-gray-300";
        default:
            return "bg-gray-50 text-gray-700 border border-gray-200";
    }
};
