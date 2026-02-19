import React, { useState } from "react";
import DetailItem from "./DetailItem";

const IMAGE_URL = import.meta.env.VITE_API_BASE_URL;

type VerificationSectionProps = {
    verification: any;
    onApprove: (type: "selfie" | "id") => void;
    onReject: (type: "selfie" | "id", reason: string) => Promise<void>;
    onDelete: () => void;
    loadingStates: { [key: string]: boolean };
    onImageClick: (imageUrl: string) => void;
    loadingGlobal?: boolean;
};

const VerificationSection: React.FC<VerificationSectionProps> = ({
    verification,
    onApprove,
    onReject,
    onDelete,
    loadingStates,
    onImageClick,
    loadingGlobal,
}) => {
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [rejectType, setRejectType] = useState<"selfie" | "id" | null>(null);

    const handleOpenRejectModal = (type: "selfie" | "id") => {
        setRejectType(type);
        setRejectModalOpen(true);
    };

    const submitRejection = async () => {
        if (rejectType && rejectionReason.trim()) {
            try {
                await onReject(rejectType, rejectionReason);
                setRejectModalOpen(false);
                setRejectionReason("");
            } catch (error) {
                // Keep modal open if rejection fails
                console.error("Rejection failed", error);
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 px-6 py-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Verification Details
                </h2>

                <div className="flex items-center gap-2">
                    {verification?._id && (
                        <button
                            onClick={onDelete}
                            disabled={loadingGlobal}
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
                                ? new Date(verification.metadata.submissionDate).toLocaleString(
                                    "en-US",
                                    {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    }
                                )
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
                            {verification?.selfie?.status !== "Approved" && (
                                <button
                                    onClick={() => onApprove("selfie")}
                                    disabled={loadingStates["approve-selfie"]}
                                    className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loadingStates["approve-selfie"] ? "Approving..." : "Approve"}
                                </button>
                            )}
                            {verification?.selfie?.status !== "Rejected" && (
                                <button
                                    onClick={() => handleOpenRejectModal("selfie")}
                                    disabled={loadingStates["approve-selfie"]}
                                    className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    Reject
                                </button>
                            )}
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
                                onImageClick(
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
                        <p className="text-sm text-gray-500">No selfie image available</p>
                    )}
                </div>

                {/* ID Verification */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                            ID Verification
                        </h3>
                        <div className="flex gap-2">
                            {verification?.verifyId?.status !== "Approved" && (
                                <button
                                    onClick={() => onApprove("id")}
                                    disabled={loadingStates["approve-id"]}
                                    className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loadingStates["approve-id"] ? "Approving..." : "Approve"}
                                </button>
                            )}
                            {verification?.verifyId?.status !== "Rejected" && (
                                <button
                                    onClick={() => handleOpenRejectModal("id")}
                                    disabled={loadingStates["approve-id"]}
                                    className="px-3 py-1.5 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    Reject
                                </button>
                            )}
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
                                onImageClick(
                                    `${IMAGE_URL}/uploads/document/${verification.verifyId.image}`
                                )
                            }
                        >
                            <img
                                src={`${IMAGE_URL}/uploads/document/${verification.verifyId.image}`}
                                alt="ID Document"
                                className="w-32 h-32 object-cover rounded-lg border"
                            />
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No ID document available</p>
                    )}
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
                                onClick={submitRejection}
                                disabled={rejectType ? loadingStates[`reject-${rejectType}`] : false}
                                className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50"
                            >
                                {rejectType && loadingStates[`reject-${rejectType}`]
                                    ? "Rejecting..."
                                    : "Reject"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerificationSection;
