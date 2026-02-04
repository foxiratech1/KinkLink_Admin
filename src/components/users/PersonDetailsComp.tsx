import { useState } from "react";
import toast from "react-hot-toast";
import { UserDetail, PersonDetails } from "../../types/user.types";
import { updateUserRegiStatusApi, updateUserBlockStatus } from "../../api/usersapi";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";

type PersonDetailsCompProps = {
    user: UserDetail;
    personProfile: PersonDetails;
    onUpdate: () => void;
};

const PersonDetailsComp = ({ user, personProfile, onUpdate }: PersonDetailsCompProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleApprove = async () => {
        setLoading(true);
        try {
            await updateUserRegiStatusApi(user._id, "Approve");
            toast.success("User approved successfully");
            onUpdate();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to approve user");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        setLoading(true);
        try {
            await updateUserRegiStatusApi(user._id, "Reject");
            toast.success("User rejected successfully");
            onUpdate();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to reject user");
        } finally {
            setLoading(false);
        }
    };

    const handleBlockToggle = async () => {
        setLoading(true);
        try {
            const newBlockStatus = !user.isBlocked;
            await updateUserBlockStatus(user._id, newBlockStatus);
            toast.success(newBlockStatus ? "User blocked successfully" : "User unblocked successfully");
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

    const personDetailsArray = personProfile.details[0] || {};

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
                    {user.username && (
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Username</p>
                            <p className="font-medium text-gray-900 dark:text-white">{user.username}</p>
                        </div>
                    )}
                    {user.name && (
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                            <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
                        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {user.role}
                        </span>
                    </div>
                    {user.registrationRole && (
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Gender</p>
                            <p className="font-medium text-gray-900 dark:text-white">{user.registrationRole}</p>
                        </div>
                    )}
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
                    {user.dob && (
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Date of Birth</p>
                            <p className="font-medium text-gray-900 dark:text-white">
                                {new Date(user.dob).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Blocked Status</p>
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${user.isBlocked ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`}>
                            {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Person Profile Details Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Person Profile
                </h2>
                <div className="space-y-4">
                    {/* About Me */}
                    {personProfile.aboutMe && (
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">About Me</p>
                            <p className="text-gray-900 dark:text-white">{personProfile.aboutMe}</p>
                        </div>
                    )}

                    {/* Physical Details */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {personDetailsArray.height && (
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Height</p>
                                <p className="font-medium text-gray-900 dark:text-white">{personDetailsArray.height}</p>
                            </div>
                        )}
                        {personDetailsArray.sexuality && (
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Sexuality</p>
                                <p className="font-medium text-gray-900 dark:text-white">{personDetailsArray.sexuality}</p>
                            </div>
                        )}
                        {personDetailsArray.drinking && (
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Drinking</p>
                                <p className="font-medium text-gray-900 dark:text-white">{personDetailsArray.drinking}</p>
                            </div>
                        )}
                        {personDetailsArray.tattoos && (
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Tattoos</p>
                                <p className="font-medium text-gray-900 dark:text-white">{personDetailsArray.tattoos}</p>
                            </div>
                        )}
                        {personDetailsArray.piercings && (
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Piercings</p>
                                <p className="font-medium text-gray-900 dark:text-white">{personDetailsArray.piercings}</p>
                            </div>
                        )}
                    </div>

                    {/* Status */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {personProfile.hostingStatus && (
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Hosting Status</p>
                                <p className="font-medium text-gray-900 dark:text-white">{personProfile.hostingStatus}</p>
                            </div>
                        )}
                        {personProfile.travelStatus && (
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Travel Status</p>
                                <p className="font-medium text-gray-900 dark:text-white">{personProfile.travelStatus}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Looking For Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Looking For
                </h2>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Age Range</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {personProfile.lookingFor.ageRange.min} - {personProfile.lookingFor.ageRange.max} years
                        </p>
                    </div>
                    {personProfile.lookingFor.targets.length > 0 && (
                        <div>
                            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Targets</p>
                            <div className="flex flex-wrap gap-2">
                                {personProfile.lookingFor.targets.map((target, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                    >
                                        {target}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Interests & Badges */}
            {(personProfile.interests.length > 0 || personProfile.badges.length > 0) && (
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Interests & Badges
                    </h2>
                    <div className="space-y-4">
                        {personProfile.interests.length > 0 && (
                            <div>
                                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Interests</p>
                                <div className="flex flex-wrap gap-2">
                                    {personProfile.interests.map((interest, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {personProfile.badges.length > 0 && (
                            <div>
                                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Badges</p>
                                <div className="flex flex-wrap gap-2">
                                    {personProfile.badges.map((badge, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonDetailsComp;
