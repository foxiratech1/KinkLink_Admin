import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import UserVerificationList from "../../components/users/UserVerificationList";

type TabType = "All" | "Verified" | "Verification Requested" | "Under Review" | "Rejected" | "Suspended";

const UserVerificationPage = () => {
    const [activeTab, setActiveTab] = useState<TabType>("All");

    return (
        <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 rounded-lg">
            <PageBreadcrumb
                pageTitle="User Verification"
                description="Manage user verification requests"
            />

            <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                {/* TABS */}
                <div className="border-b border-gray-200 px-6 pt-4 dark:border-gray-700 overflow-x-auto">
                    <div className="flex gap-4 min-w-max">
                        <button
                            onClick={() => setActiveTab("All")}
                            className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === "All"
                                ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                        >
                            All Users
                        </button>
                        <button
                            onClick={() => setActiveTab("Verified")}
                            className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === "Verified"
                                ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                        >
                            Verified
                        </button>
                        <button
                            onClick={() => setActiveTab("Verification Requested")}
                            className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === "Verification Requested"
                                ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                        >
                            Verification Requested
                        </button>
                        <button
                            onClick={() => setActiveTab("Under Review")}
                            className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === "Under Review"
                                ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                        >
                            Under Review
                        </button>
                        <button
                            onClick={() => setActiveTab("Rejected")}
                            className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === "Rejected"
                                ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                        >
                            Rejected
                        </button>
                        <button
                            onClick={() => setActiveTab("Suspended")}
                            className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === "Suspended"
                                ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                }`}
                        >
                            Suspended
                        </button>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-1">
                    {activeTab === "All" && <UserVerificationList />}
                    {activeTab === "Verified" && <UserVerificationList status="Approved" />}
                    {activeTab === "Verification Requested" && <UserVerificationList status="Verification Requested" />}
                    {activeTab === "Under Review" && <UserVerificationList status="Under Review" />}
                    {activeTab === "Rejected" && <UserVerificationList status="Rejected" />}
                    {activeTab === "Suspended" && <UserVerificationList status="Suspended" />}
                </div>

            </div>
        </div>
    );
};

export default UserVerificationPage;
