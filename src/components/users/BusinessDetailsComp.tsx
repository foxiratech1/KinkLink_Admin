import { useState } from "react";
import toast from "react-hot-toast";
import { UserDetail, BusinessDetails } from "../../types/user.types";
import { updateUserRegiStatusApi, updateUserBlockStatus } from "../../api/usersapi";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";

type BusinessDetailsCompProps = {
    user: UserDetail;
    businessProfile: BusinessDetails;
    onUpdate: () => void;
};

const BusinessDetailsComp = ({ user, businessProfile, onUpdate }: BusinessDetailsCompProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleApprove = async () => {
        setLoading(true);
        try {
            await updateUserRegiStatusApi(user._id, "Approve");
            toast.success("Business approved successfully");
            onUpdate();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to approve business");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        setLoading(true);
        try {
            await updateUserRegiStatusApi(user._id, "Reject");
            toast.success("Business rejected successfully");
            onUpdate();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to reject business");
        } finally {
            setLoading(false);
        }
    };

    const handleBlockToggle = async () => {
        setLoading(true);
        try {
            const newBlockStatus = !user.isBlocked;
            await updateUserBlockStatus(user._id, newBlockStatus);
            toast.success(newBlockStatus ? "Business blocked successfully" : "Business unblocked successfully");
            onUpdate();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to update block status");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Approve":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
            case "Pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
            case "Reject":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
        }
    };

    const formatBusinessCategory = (category: string) => {
        return category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="space-y-6">
            {/* Header with Back Button and Actions */}
            <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => navigate("/users/all")}>
                    ← Back to Users
                </Button>
                <div className="flex gap-3">
                    {user.status !== "Approve" ? (
                        <>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleApprove}
                                disabled={loading}
                            >
                                Approve
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReject}
                                disabled={loading}
                            >
                                Reject
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant={user.isBlocked ? "primary" : "outline"}
                            size="sm"
                            onClick={handleBlockToggle}
                            disabled={loading}
                        >
                            {user.isBlocked ? "Unblock" : "Block"}
                        </Button>
                    )}
                </div>
            </div>

            {/* User Basic Information Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    User Information
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
                        <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                            {user.role}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(user.status)}`}>
                            {user.status}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Online Status</p>
                        <div className="flex items-center gap-2">
                            <span className={`inline-block h-2 w-2 rounded-full ${user.isOnline ? "bg-green-500" : "bg-gray-400"}`}></span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.isOnline ? "Online" : "Offline"}
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Joined</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Blocked Status</p>
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${user.isBlocked ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`}>
                            {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Business Profile Details Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Business Profile
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Business Name</p>
                        <p className="font-medium text-gray-900 dark:text-white">{businessProfile.businessName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Business Category</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {formatBusinessCategory(businessProfile.businessCategory)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Telephone</p>
                        <p className="font-medium text-gray-900 dark:text-white">{businessProfile.telephone}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Subscription Plan</p>
                        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                            {businessProfile.subscriptionPlan}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">First Month Free</p>
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${businessProfile.isFirstMonthFreeUsed ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`}>
                            {businessProfile.isFirstMonthFreeUsed ? "Used" : "Available"}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Profile Created</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(businessProfile.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Additional Information Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Additional Information
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Terms Agreed</p>
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${user.isAgreed ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}>
                            {user.isAgreed ? "Yes" : "No"}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Profile Complete</p>
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${user.isProfileComplete ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}`}>
                            {user.isProfileComplete ? "Complete" : "Incomplete"}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {new Date(user.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessDetailsComp;
