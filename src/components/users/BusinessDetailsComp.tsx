import { useState } from "react";
import toast from "react-hot-toast";
import { UserDetail, BusinessDetails } from "../../types/user.types";
import { updateUserBlockStatus, updateUserRegiStatusApi, deleteUserVerificationApi, updateUserVerificationNoteApi } from "../../api/usersapi";
import { useNavigate } from "react-router";
import VerificationHistoryComp from "./VerificationHistoryComp";

type BusinessDetailsCompProps = {
    user: UserDetail;
    businessProfile: BusinessDetails;
    verification?: any;
    onUpdate: () => void;
};

const IMAGE_URL = import.meta.env.VITE_API_BASE_URL;

const DetailItem = ({
    label,
    value,
    highlight = false
}: {
    label: string;
    value?: string | number | null | boolean;
    highlight?: boolean;
}) => (
    <div className="space-y-1">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {label}
        </p>
        <p className={`text-sm font-medium ${highlight ? 'text-brand-600 dark:text-brand-400' : 'text-gray-900 dark:text-white'}`}>
            {value?.toString() || "-"}
        </p>
    </div>
);

const BusinessDetailsComp = ({ user, businessProfile, verification, onUpdate }: BusinessDetailsCompProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageModal, setImageModal] = useState<string | null>(null);
    const [zoom, setZoom] = useState(1);
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    const [noteModalOpen, setNoteModalOpen] = useState(false);
    const [noteText, setNoteText] = useState(user.adminNote || "");
    const [rejectType, setRejectType] = useState<"selfie" | "id" | null>(null);

    const handleUpdateNote = async () => {
        setLoading(true);
        try {
            await updateUserVerificationNoteApi(user._id, noteText);
            toast.success("Note updated successfully");
            setNoteModalOpen(false);
            onUpdate();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to update note");
        } finally {
            setLoading(false);
        }
    };



    const openImageModal = (img: string) => {
        setImageModal(img);
        setZoom(1);
    };

    const closeImageModal = () => {
        setImageModal(null);
    };

    // const handleApprove = async () => {
    //     if (!verification?._id) {
    //         toast.error("Verification ID not found");
    //         return;
    //     }
    //     setLoading(true);
    //     try {
    //         await updateUserRegiStatusApi(user._id, verification._id, "Approve");
    //         toast.success("Business approved successfully");
    //         onUpdate();
    //     } catch (err: any) {
    //         toast.error(err?.response?.data?.message || "Failed to approve business");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleApprove = async (type: "selfie" | "id") => {
        if (!verification?._id) {
            toast.error("Verification ID not found");
            return;
        }
        setLoading(true);
        try {
            await updateUserRegiStatusApi(user._id, verification._id, type, "Approve");
            toast.success(`${type === "selfie" ? "Selfie" : "ID"} approved successfully`);
            onUpdate();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed");
        } finally {
            setLoading(false);
        }
    };


    // const handleRejectConfirm = async () => {
    //     if (!verification?._id) {
    //         toast.error("Verification ID not found");
    //         return;
    //     }

    //     if (!rejectionReason.trim()) {
    //         toast.error("Please enter rejection reason");
    //         return;
    //     }

    //     setLoading(true);
    //     try {
    //         await updateUserRegiStatusApi(
    //             user._id,
    //             verification._id,
    //             "Reject",
    //             rejectionReason
    //         );

    //         toast.success("User rejected successfully");
    //         setRejectModalOpen(false);
    //         setRejectionReason("");
    //         onUpdate();
    //     } catch (err: any) {
    //         toast.error(err?.response?.data?.message || "Failed");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleRejectConfirm = async (type: "selfie" | "id") => {
        if (!verification?._id) {
            toast.error("Verification ID not found");
            return;
        }

        if (!rejectionReason.trim()) {
            toast.error("Please enter rejection reason");
            return;
        }

        setLoading(true);
        try {
            await updateUserRegiStatusApi(
                user._id,
                verification._id,
                type,
                "Reject",
                rejectionReason
            );

            toast.success(`${type === "selfie" ? "Selfie" : "ID"} rejected successfully`);
            setRejectModalOpen(false);
            setRejectionReason("");
            onUpdate();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteVerification = async () => {
        if (!verification?._id) {
            toast.error("Verification ID not found");
            return;
        }
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this verification?",
        );
        if (!confirmDelete) return;
        setLoading(true);
        try {
            await deleteUserVerificationApi(verification._id);
            toast.success("Verification deleted successfully");
            onUpdate();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Delete failed");
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
            toast.error(error?.response?.data?.message || "Failed to update block status !");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case "Approved":
                return "bg-emerald-50 text-emerald-700 border border-emerald-200";

            case "Rejected":
                return "bg-rose-50 text-rose-700 border border-rose-200";

            case "Under Review":
            case "Verification Requested":
                return "bg-amber-50 text-amber-700 border border-amber-200";

            case "Verification Suspended":
                return "bg-purple-50 text-purple-700 border border-purple-200";

            case "Not Verified":
                return "bg-gray-100 text-gray-700 border border-gray-300";

            default:
                return "bg-gray-50 text-gray-700 border border-gray-200";
        }
    };

    const formatBusinessCategory = (category: string) => {
        if (!category) return "-";
        return category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };



    // const safeVerification = verification || {};
    console.log("Verification prop:", verification);

    return (
        <div className="w-full">
            {/* Header Section - Full Width */}
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBlockToggle}
                            disabled={loading}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${user.isBlocked
                                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50"
                                : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50"
                                }`}
                        >
                            {user.isBlocked ? "Unblock Business" : "Block Business"}
                        </button>


                    </div>
                </div>
            </div>

            {/* Main Content - Full Width No Padding */}
            <div className="w-full">
                {/* User Information Section */}
                <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                            User Information
                        </h2>
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(verification?.overallStatus)}`}>
                            {verification?.overallStatus}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        <DetailItem label="User ID" value={user._id} />
                        <DetailItem label="Email" value={user.email} highlight />
                        <DetailItem label="Role" value={user.role} />
                        <DetailItem label="Telephone" value={user.telephone} />
                        <DetailItem label="Online Status" value={user.isOnline ? "Online" : "Offline"} />
                        <DetailItem label="Joined Date" value={formatDate(user.createdAt)} />
                        <DetailItem label="Last Updated" value={formatDate(user.updatedAt)} />
                        <DetailItem label="Blocked Status" value={user.isBlocked ? "Blocked" : "Active"} highlight={user.isBlocked} />
                        <DetailItem label="Terms Agreed" value={user.isAgreed ? "Yes" : "No"} />
                        <DetailItem label="Profile Complete" value={user.isProfileComplete ? "Complete" : "Incomplete"} />
                        <DetailItem label="Account Status" value={user.isDeleted ? "Deleted" : "Active"} />
                    </div>
                </div>

                {/* Business Profile Section */}
                <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
                    <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
                        Business Profile
                    </h2>

                    <div className="space-y-6">
                        {/* Business Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <DetailItem label="Business Name" value={businessProfile.businessName} highlight />
                            <DetailItem label="Business Category" value={formatBusinessCategory(businessProfile.businessCategory)} />
                            <DetailItem label="Telephone" value={businessProfile.telephone} />
                            <DetailItem label="Subscription Plan" value={businessProfile.subscriptionPlan} />
                            <DetailItem label="First Month Free" value={businessProfile.isFirstMonthFreeUsed ? "Used" : "Available"} />
                            <DetailItem label="Profile Created" value={formatDate(businessProfile.createdAt)} />
                            <DetailItem label="Last Updated" value={formatDate(businessProfile.updatedAt)} />
                            <DetailItem label="Verification ID" value={businessProfile.verificationId} />
                        </div>
                    </div>
                </div>


                <div className="bg-white dark:bg-gray-900 px-6 py-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                            Verification Details
                        </h2>

                        <div className="flex items-center gap-2">
                            {/* {verification?.metadata?.history &&
                                verification.metadata.history.length > 0 && (
                                    <button
                                        onClick={() => setHistoryModalOpen(true)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-lg transition-colors shadow-md"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        View History
                                    </button>
                                )} */}
                            {verification?._id && (
                                <button
                                    onClick={handleDeleteVerification}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    Delete Verification
                                </button>
                            )}
                        </div>

                    </div>

                    <div className="space-y-6">
                        {/* Overall Info */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            <DetailItem
                                label="Submitted At"
                                value={
                                    verification?.metadata?.submissionDate
                                        ? new Date(verification.metadata.submissionDate).toLocaleString("en-US", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })
                                        : "-"
                                }
                            />

                            <DetailItem
                                label="Last Updated"
                                value={
                                    verification?.updatedAt
                                        ? new Date(verification.updatedAt).toLocaleString("en-US", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })
                                        : "-"
                                }
                            />

                            <DetailItem
                                label="ID Required"
                                value={verification?.isIdRequired ? "Yes" : "No"}
                            />

                            <DetailItem
                                label="Selfie Completed"
                                value={verification?.isSelfieCompleted ? "Yes" : "No"}
                            />


                        </div>


                        {/* Live Selfie Verification */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                    Live Selfie Verification
                                </h3>
                                <div className="flex gap-2">
                                    {/* {safeVerification.overallStatus === "Approved" && (
                                        <button
                                            onClick={() => setRejectModalOpen(true)}

                                            disabled={loading}
                                            className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            Reject
                                        </button>
                                    )}
                                    {safeVerification.overallStatus === "Rejected" && (
                                        <button
                                            onClick={handleApprove}
                                            disabled={loading}
                                            className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    {["Under Review", "Verification Requested"].includes(safeVerification.overallStatus) && (

                                        <>
                                            <button
                                                onClick={handleApprove}
                                                disabled={loading}
                                                className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => setRejectModalOpen(true)}

                                                disabled={loading}
                                                className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )} */}
                                    <button
                                        onClick={() => handleApprove("selfie")}
                                        disabled={loading}
                                        className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => {
                                            setRejectType("selfie");
                                            setRejectModalOpen(true);
                                        }}

                                        disabled={loading}
                                        className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>


                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                <DetailItem
                                    label="Status"
                                    value={verification?.selfie?.status}
                                    highlight
                                />
                            </div>

                            {verification?.selfieImage ? (
                                <div
                                    className="relative group w-32 h-32 cursor-pointer"
                                    onClick={() =>
                                        openImageModal(
                                            `${IMAGE_URL}/uploads/selfie/${verification.selfieImage}`
                                        )
                                    }
                                >
                                    <img
                                        src={`${IMAGE_URL}/uploads/selfie/${verification.selfieImage}`}
                                        alt="Selfie"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No selfie image available
                                </p>
                            )}

                        </div>

                        {/* ID Verification */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                    ID Verification
                                </h3>
                                <div className="flex gap-2">
                                    {/* {safeVerification.overallStatus === "Approved" ? (
                                        <button
                                            onClick={() => setRejectModalOpen(true)}

                                            disabled={loading}
                                            className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            Reject
                                        </button>
                                    ) : safeVerification.overallStatus === "Rejected" ? (
                                        <button
                                            onClick={handleApprove}
                                            disabled={loading}
                                            className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            Approve
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleApprove}
                                                disabled={loading}
                                                className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => setRejectModalOpen(true)}

                                                disabled={loading}
                                                className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )} */}
                                    <button
                                        onClick={() => handleApprove("id")}

                                        disabled={loading}
                                        className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => {
                                            setRejectType("id");
                                            setRejectModalOpen(true);
                                        }}

                                        disabled={loading}
                                        className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        Reject
                                    </button>

                                </div>

                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                <DetailItem
                                    label="Status"
                                    value={verification?.verifyId?.status}
                                    highlight
                                />
                            </div>

                            {verification?.verifyId?.image ? (
                                <div
                                    className="relative group w-32 h-32 cursor-pointer"
                                    onClick={() =>
                                        openImageModal(
                                            `${IMAGE_URL}/uploads/id/${verification.verifyId.image}`
                                        )
                                    }
                                >
                                    <img
                                        src={`${IMAGE_URL}/uploads/id/${verification.verifyId.image}`}
                                        alt="ID Document"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No ID document available
                                </p>
                            )}

                        </div>


                    </div>
                </div>
            </div>

            {rejectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                            Reject Verification
                        </h3>

                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Enter rejection reason..."
                            className="w-full border rounded-lg p-3 text-sm dark:bg-gray-700 dark:text-white"
                            rows={4}
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => {
                                    setRejectModalOpen(false);
                                    setRejectionReason("");
                                }}
                                className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    if (rejectType) {
                                        handleRejectConfirm(rejectType);
                                    }
                                }}
                                disabled={loading}
                                className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50"
                            >
                                {loading ? "Rejecting..." : "Reject"}
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Verification History Modal */}
            {historyModalOpen && verification && (
                <VerificationHistoryComp
                    isOpen={historyModalOpen}
                    onClose={() => setHistoryModalOpen(false)}
                    verification={verification}
                />
            )}

            {/* Admin Internal Note Section */}
            <div className="bg-yellow-50 dark:bg-yellow-900/10 px-6 py-6 border-t border-yellow-100 dark:border-yellow-900/30">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-yellow-800 dark:text-yellow-500 uppercase tracking-wider">
                        Admin Internal Note
                    </h2>
                    <button
                        onClick={() => setNoteModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {user.adminNote ? "Edit Note" : "Add Note"}
                    </button>
                </div>

                {user.adminNote ? (
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-yellow-200 dark:border-yellow-900/30 shadow-sm">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {user.adminNote}
                        </p>
                    </div>
                ) : (
                    <p className="text-sm text-yellow-700 dark:text-yellow-500 italic">
                        No internal notes added yet.
                    </p>
                )}
            </div>

            {/* Image Modal */}
            {imageModal && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={closeImageModal}>
                    <div className="relative max-w-7xl w-full" onClick={e => e.stopPropagation()}>
                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                            <button
                                onClick={() => setZoom(z => z + 0.2)}
                                className="w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-lg flex items-center justify-center shadow-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setZoom(z => Math.max(1, z - 0.2))}
                                className="w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-lg flex items-center justify-center shadow-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                                </svg>
                            </button>
                            <button
                                onClick={closeImageModal}
                                className="w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-lg flex items-center justify-center shadow-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center justify-center min-h-[80vh]">
                            <img
                                src={imageModal}
                                alt="Preview"
                                style={{ transform: `scale(${zoom})` }}
                                className="max-w-full max-h-[80vh] object-contain transition-transform duration-200"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Admin Note Modal */}
            {noteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                            {user.adminNote ? "Edit Admin Note" : "Add Admin Note"}
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            This note is for internal use only and will not be visible to the user.
                        </p>

                        <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Enter internal note..."
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none resize-y min-h-[120px]"
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => {
                                    setNoteModalOpen(false);
                                    setNoteText(user.adminNote || "");
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdateNote}
                                disabled={loading}
                                className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save Note"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default BusinessDetailsComp;