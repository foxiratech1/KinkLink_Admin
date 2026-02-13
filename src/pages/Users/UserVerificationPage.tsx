import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import UserVerificationList from "../../components/users/UserVerificationList";

type TabType = "Verified" | "Unverified" | "Pending";

const UserVerificationPage = () => {
    const [activeTab, setActiveTab] = useState<TabType>("Verified");

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 rounded-lg">
            <PageBreadcrumb
                pageTitle="User Verification"
                description="Manage user verification requests"
            />

            <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                {/* TABS */}
                <div className="border-b border-gray-200 px-6 pt-4 dark:border-gray-700">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab("Verified")}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === "Verified"
                                ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                        >
                            Verified Users
                        </button>
                        {/* <button
                            onClick={() => setActiveTab("Manual_Review")}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === "Manual_Review"
                                ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                        >
                            Manual Review
                        </button> */}
                        <button
                            onClick={() => setActiveTab("Pending")}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === "Pending"
                                ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                        >
                            Pending Users
                        </button>
                        <button
                            onClick={() => setActiveTab("Unverified")}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === "Unverified"
                                ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                        >
                            Unverified/Rejected Users
                        </button>
                    </div>
                </div>

                {/* CONTENT */}
                {activeTab === "Verified" ? (
                    <UserVerificationList status="Approved" />
                ) : activeTab === "Pending" ? (
                    <UserVerificationList status="Pending" />
                ) : (
                    <UserVerificationList status="Rejected" />
                )}

            </div>
        </div>
    );
};

export default UserVerificationPage;
