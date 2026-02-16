import { VerificationUser } from "../../types/user.types";

interface VerificationHistoryCompProps {
    isOpen: boolean;
    onClose: () => void;
    verification: VerificationUser;
}

const VerificationHistoryComp = ({ isOpen, onClose, verification }: VerificationHistoryCompProps) => {
    if (!isOpen || !verification?.metadata) return null;

    const { metadata } = verification;

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Verification History
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                    {/* Metadata Summary */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div>
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Submission Date
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {metadata.submissionDate
                                    ? new Date(metadata.submissionDate).toLocaleString("en-US", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })
                                    : "-"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Review Date
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {metadata.reviewDate
                                    ? new Date(metadata.reviewDate).toLocaleString("en-US", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })
                                    : "-"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Admin Notes
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {metadata.adminNotes || "-"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Rejection Reason
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {metadata.rejectionReason || "-"}
                            </p>
                        </div>
                    </div>

                    {/* History Timeline */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                            Activity Timeline
                        </h4>
                        {metadata.history && metadata.history.length > 0 ? (
                            metadata.history
                                .slice()
                                .reverse()
                                .map((item: any, index: number) => (
                                    <div
                                        key={item._id || index}
                                        className="relative pl-8 pb-4 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0 last:pb-0"
                                    >
                                        <div
                                            className={`absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-[9px] ${item.status === "Approved"
                                                ? "bg-emerald-500"
                                                : item.status === "Rejected"
                                                    ? "bg-rose-500"
                                                    : item.status === "Under Review"
                                                        ? "bg-amber-500"
                                                        : item.status === "Verification Requested"
                                                            ? "bg-blue-500"
                                                            : "bg-gray-400"
                                                }`}
                                        ></div>
                                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === "Approved"
                                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                        : item.status === "Rejected"
                                                            ? "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400"
                                                            : item.status === "Under Review"
                                                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                                                : item.status === "Verification Requested"
                                                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                                                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {item.date
                                                        ? new Date(item.date).toLocaleString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })
                                                        : "-"}
                                                </span>
                                            </div>
                                            {item.action && (
                                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                                                    <span className="font-medium">Action:</span>{" "}
                                                    {item.action}
                                                </p>
                                            )}
                                            {item.reason && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="font-medium">Reason:</span>{" "}
                                                    {item.reason}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                No history available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationHistoryComp;
