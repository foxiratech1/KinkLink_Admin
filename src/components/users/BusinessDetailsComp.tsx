import { useState } from "react";
import toast from "react-hot-toast";
import { UserDetail, BusinessDetails } from "../../types/user.types";
import { updateUserBlockStatus, updateUserRegiStatusApi, deleteUserVerificationApi } from "../../api/usersapi";
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

    const openImageModal = (img: string) => {
        setImageModal(img);
        setZoom(1);
    };

    const closeImageModal = () => {
        setImageModal(null);
    };

    const handleApprove = async () => {
        if (!verification?._id) {
            toast.error("Verification ID not found");
            return;
        }
        setLoading(true);
        try {
            await updateUserRegiStatusApi(user._id, verification._id, "Approve");
            toast.success("Business approved successfully");
            onUpdate();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to approve business");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        if (!verification?._id) {
            toast.error("Verification ID not found");
            return;
        }
        setLoading(true);
        try {
            await updateUserRegiStatusApi(user._id, verification._id, "Reject");
            toast.success("Business rejected successfully");
            onUpdate();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to reject business");
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
            toast.error(error?.response?.data?.message || "Failed to update block status");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Approve":
                return "bg-emerald-50 text-emerald-700 border border-emerald-200";
            case "Pending":
                return "bg-amber-50 text-amber-700 border border-amber-200";
            case "Reject":
                return "bg-rose-50 text-rose-700 border border-rose-200";
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

    const formatDateTime = (dateString?: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    const safeVerification = verification || {};
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
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
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

                {/* Verification Section */}
                {verification && (
                    <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                Verification Details
                            </h2>
                            <div className="flex items-center gap-2">
                                {verification?.metadata?.history &&
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
                                    )}
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
                            {/* Verification Basic Info */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                <DetailItem label="Overall Status" value={verification.overallStatus} highlight />
                                <DetailItem label="Verification ID" value={verification._id} />
                                <DetailItem label="Attempts" value={verification.attempts} />
                                <DetailItem label="Submitted At" value={formatDateTime(verification.submittedAt || verification.createdAt || verification.metadata?.submissionDate)} />
                                <DetailItem label="Last Updated" value={formatDateTime(verification.lastUpdatedAt || verification.updatedAt)} />
                            </div>

                            {/* Live Selfie Verification */}
                            {(verification?.selfieImage || verification?.isSelfieCompleted) && (
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Live Selfie Verification
                                        </h3>
                                        <div className="flex gap-2">
                                            {safeVerification.overallStatus === "Approved" && (
                                                <button
                                                    onClick={handleReject}
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
                                            {safeVerification.overallStatus === "Pending" && (
                                                <>
                                                    <button
                                                        onClick={handleApprove}
                                                        disabled={loading}
                                                        className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={handleReject}
                                                        disabled={loading}
                                                        className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        <DetailItem label="Status" value={verification.isSelfieCompleted ? "Completed" : "Pending"} highlight />
                                    </div>
                                    {typeof verification.selfieImage === "string" ? (
                                        <div>
                                            <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                                                Selfie Image
                                            </p>
                                            <div
                                                className="relative group w-32 h-32 cursor-pointer"
                                                onClick={() => openImageModal(`${IMAGE_URL}/uploads/selfie/${verification.selfieImage}`)}
                                            >
                                                <img
                                                    src={`${IMAGE_URL}/uploads/selfie/${verification.selfieImage}`}
                                                    alt="Selfie"
                                                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 group-hover:border-brand-500 transition-colors"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-xs font-medium">Zoom</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : verification.selfieImage?.image ? (
                                        <div>
                                            <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                                                Selfie Image
                                            </p>
                                            <div
                                                className="relative group w-32 h-32 cursor-pointer"
                                                onClick={() => openImageModal(`${IMAGE_URL}/uploads/selfie/${verification.selfieImage.image}`)}
                                            >
                                                <img
                                                    src={`${IMAGE_URL}/uploads/selfie/${verification.selfieImage.image}`}
                                                    alt="Selfie"
                                                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 group-hover:border-brand-500 transition-colors"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-xs font-medium">Zoom</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            No selfie image available
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* ID Verification */}
                            {verification?.verifyId && (
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                            </svg>
                                            ID Verification
                                        </h3>
                                        <div className="flex gap-2">
                                            {safeVerification.overallStatus === "Approved" && (
                                                <button
                                                    onClick={handleReject}
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
                                            {safeVerification.overallStatus === "Pending" && (
                                                <>
                                                    <button
                                                        onClick={handleApprove}
                                                        disabled={loading}
                                                        className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={handleReject}
                                                        disabled={loading}
                                                        className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        <DetailItem label="Status" value={verification.verifyId.status} highlight />
                                        <DetailItem label="Verified At" value={formatDateTime(verification.verifyId.verifiedAt)} />
                                        <DetailItem label="Failure Reason" value={verification.verifyId.failureReason} />
                                        <DetailItem label="OCR Text" value={verification.verifyId.ocrText} />
                                    </div>
                                    {verification.verifyId.document ? (
                                        <div>
                                            <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                                                ID Document
                                            </p>
                                            <div
                                                className="relative group w-32 h-32 cursor-pointer"
                                                onClick={() => openImageModal(`${IMAGE_URL}/uploads/id/${verification.verifyId.document}`)}
                                            >
                                                <img
                                                    src={`${IMAGE_URL}/uploads/id/${verification.verifyId.document}`}
                                                    alt="ID Document"
                                                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 group-hover:border-brand-500 transition-colors"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-xs font-medium">Zoom</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            No ID document available
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Verification History Modal */}
            {historyModalOpen && verification && (
                <VerificationHistoryComp
                    isOpen={historyModalOpen}
                    onClose={() => setHistoryModalOpen(false)}
                    verification={verification}
                />
            )}

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
        </div>
    );
};

export default BusinessDetailsComp;