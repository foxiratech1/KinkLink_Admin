// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import toast from "react-hot-toast";
// import { getUserDetailsApi } from "../../api/usersapi";
// import { UserDetailsResponse } from "../../types/user.types";
// import PersonDetailsComp from "../../components/users/PersonDetailsComp";
// import BusinessDetailsComp from "../../components/users/BusinessDetailsComp";
// import PageBreadcrumb from "../../components/common/PageBreadCrumb";

// const UserDetailsPage = () => {
//     const { id } = useParams<{ id: string }>();
//     const [userDetails, setUserDetails] = useState<UserDetailsResponse | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const fetchUserDetails = async () => {
//         if (!id) {
//             setError("User ID is missing");
//             setLoading(false);
//             return;
//         }

//         setLoading(true);
//         setError(null);
//         try {
//             const data = await getUserDetailsApi(id);
//             setUserDetails(data);
//         } catch (err: any) {
//             const errorMessage = err?.response?.data?.message || "Failed to fetch user details";
//             setError(errorMessage);
//             toast.error(errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUserDetails();
//     }, [id]);

//     if (loading) {
//         return (
//             <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//                 <div className="flex min-h-[400px] items-center justify-center">
//                     <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
//                 </div>
//             </div>
//         );
//     }

//     if (error || !userDetails) {
//         return (
//             <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//                 <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
//                     <div className="text-center">
//                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                             Error Loading User Details
//                         </h2>
//                         <p className="mt-2 text-gray-600 dark:text-gray-400">
//                             {error || "User not found"}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

//             <PageBreadcrumb
//                 pageTitle="User Details"
//                 description="View and manage user information"
//             />
//             {/* Conditionally render Person or Business details component */}
//             {userDetails.user.role === "Person" && userDetails.personProfile ? (
//                 <PersonDetailsComp
//                     user={userDetails.user}
//                     personProfile={userDetails.personProfile}
//                     verification={userDetails.verification}
//                     onUpdate={fetchUserDetails}
//                 />
//             ) : userDetails.user.role === "Business" && userDetails.businessProfile ? (
//                 <BusinessDetailsComp
//                     user={userDetails.user}
//                     businessProfile={userDetails.businessProfile}
//                     onUpdate={fetchUserDetails}
//                 />
//             ) : (
//                 <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
//                     <p className="text-center text-gray-600 dark:text-gray-400">
//                         No profile data available for this user.
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserDetailsPage;
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { getUserDetailsApi } from "../../api/usersapi";
import { UserDetailsResponse } from "../../types/user.types";
import PersonDetailsComp from "../../components/users/PersonDetailsComp";
import BusinessDetailsComp from "../../components/users/BusinessDetailsComp";

const UserDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [userDetails, setUserDetails] = useState<UserDetailsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserDetails = async () => {
        if (!id) {
            setError("User ID is missing");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getUserDetailsApi(id);
            setUserDetails(data);
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || "Failed to fetch user details";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading user details...</p>
                </div>
            </div>
        );
    }

    if (error || !userDetails) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                    <div className="mb-4">
                        <svg className="w-16 h-16 text-rose-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Error Loading User Details
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {error || "User not found"}
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            {userDetails.user.role === "Person" && userDetails.personProfile ? (
                <PersonDetailsComp
                    user={userDetails.user}
                    personProfile={userDetails.personProfile}
                    verification={userDetails.verification}
                    onUpdate={fetchUserDetails}
                />
            ) : userDetails.user.role === "Business" && userDetails.businessProfile ? (
                <BusinessDetailsComp
                    user={userDetails.user}
                    businessProfile={userDetails.businessProfile}
                    onUpdate={fetchUserDetails}
                />
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            No profile data available for this user.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetailsPage;