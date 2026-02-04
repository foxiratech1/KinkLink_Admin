import React from "react";

const severityLevels = [
    {
        level: "P0",
        label: "Critical",
        color: "bg-error-500 text-white",
        badgeColor: "bg-red-100 text-red-800",
        description:
            "The platform is blocked, money or security is at risk, or a core access flow is broken.",
        rules: [
            "Blocks login, registration, verification, payments, or access",
            "Affects a large portion of users or the entire platform",
            "Requires immediate action and highest priority",
        ],
    },
    {
        level: "P1",
        label: "Major",
        color: "bg-warning-500 text-white",
        badgeColor: "bg-orange-100 text-orange-800",
        description:
            "Core functionality is degraded, but the platform is still usable.",
        rules: [
            "Affects key user flows partially",
            "Causes strong UX, trust, or operational impact",
            "Must be fixed quickly, but does not require emergency rollback in all cases",
        ],
    },
    {
        level: "P2",
        label: "Minor",
        color: "bg-success-500 text-white",
        badgeColor: "bg-green-100 text-green-800",
        description: "Non-blocking issues with limited impact.",
        rules: [
            "Cosmetic bugs, UI issues, or minor inconsistencies",
            "Does not block users or revenue",
            "Can be planned and fixed as part of regular releases",
        ],
    },
];

const moduleSeverity = [
    {
        module: "Authentication / Login",
        issues: [
            { name: "Users cannot log in (mass issue)", severity: "P0" },
            { name: "Login works only for some users", severity: "P1" },
            { name: "Session / logout issues", severity: "P1" },
            { name: "Login UI bugs", severity: "P2" },
        ],
    },
    {
        module: "Verification (Email / Business)",
        issues: [
            { name: "Verification cannot be completed / stuck", severity: "P0" },
            { name: "Business verification blocked", severity: "P0" },
            { name: "Email delivery delays", severity: "P1" },
            { name: "Verification status UI bug", severity: "P2" },
        ],
    },
    {
        module: "Payments / Subscriptions",
        issues: [
            { name: "Payments failing", severity: "P0" },
            { name: "Payment webhooks not processing", severity: "P0" },
            { name: "Subscription paid but not activated", severity: "P0" },
            { name: "Incorrect payment status shown", severity: "P1" },
            { name: "Transaction history incorrect", severity: "P1" },
            { name: "Checkout UI issues", severity: "P2" },
        ],
    },
    {
        module: "Messaging / Chats",
        issues: [
            { name: "Messages not sending (mass issue)", severity: "P1" },
            { name: "Chats not opening", severity: "P1" },
            { name: "Message delivery delays", severity: "P1" },
            { name: "Read receipts / counters incorrect", severity: "P2" },
            { name: "Chat UI bugs", severity: "P2" },
        ],
    },
    {
        module: "Profiles / Photos",
        issues: [
            { name: "Profile changes not saved", severity: "P1" },
            { name: "Photos not uploading (mass issue)", severity: "P1" },
            { name: "Photos not displaying correctly", severity: "P2" },
            { name: "Crop / preview UI issues", severity: "P2" },
        ],
    },
    {
        module: "Events / Tickets",
        issues: [
            { name: "Tickets cannot be purchased", severity: "P0" },
            { name: "Events cannot be created", severity: "P1" },
            { name: "Purchased tickets missing", severity: "P1" },
            { name: "Attendance or stats inaccuracies", severity: "P2" },
        ],
    },
    {
        module: "Admin Panel / Dashboard",
        issues: [
            { name: "Admin panel unavailable", severity: "P0" },
            { name: "Core metrics incorrect", severity: "P1" },
            { name: "Dashboard data not updating", severity: "P1" },
            { name: "Chart or UI glitches", severity: "P2" },
        ],
    },
    {
        module: "Analytics",
        issues: [
            { name: "Incorrect metrics used for decisions", severity: "P1" },
            { name: "Data delay or partial sync", severity: "P2" },
            { name: "Visual inconsistencies in charts", severity: "P2" },
        ],
    },
    {
        module: "System / Infrastructure",
        issues: [
            { name: "Production environment down", severity: "P0" },
            { name: "Mass 5xx errors", severity: "P0" },
            {
                name: "Errors introduced after deployment",
                severity: "P0 / P1",
            },
            { name: "Errors in logs without user impact", severity: "P2" },
        ],
    },
];

const SystemIssueComp: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Platform Health Overview */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl dark:bg-gray-900 dark:border-gray-800">
                <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white/90">
                    System Status
                </h2>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Platform health and stability overview.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Uptime
                        </h3>
                        <p className="mt-2 text-2xl font-bold text-green-500">99.98%</p>
                        <p className="text-xs text-gray-400">Last 30 days</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Active Issues
                        </h3>
                        <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
                            0
                        </p>
                        <p className="text-xs text-gray-400">Everything is running smoothly</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Avg Response Time
                        </h3>
                        <p className="mt-2 text-2xl font-bold text-blue-500">120ms</p>
                        <p className="text-xs text-gray-400">Global average</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Last Incident
                        </h3>
                        <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
                            None
                        </p>
                        <p className="text-xs text-gray-400">Since last deployment</p>
                    </div>
                </div>
            </div>

            {/* Severity Matrix Definition */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl dark:bg-gray-900 dark:border-gray-800">
                <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
                    Severity Matrix
                </h2>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Default severity levels for issues on the KinkLink platform, used for
                    prioritisation and response.
                </p>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {severityLevels.map((level) => (
                        <div
                            key={level.level}
                            className="p-5 border border-gray-100 rounded-xl bg-gray-50 dark:bg-black/20 dark:border-gray-800"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span
                                    className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${level.level === "P0"
                                        ? "bg-red-500 text-white"
                                        : level.level === "P1"
                                            ? "bg-orange-500 text-white"
                                            : "bg-blue-500 text-white"
                                        }`}
                                >
                                    {level.level}
                                </span>
                                <span
                                    className={`text-sm font-semibold uppercase tracking-wide ${level.level === "P0"
                                        ? "text-red-500"
                                        : level.level === "P1"
                                            ? "text-orange-500"
                                            : "text-blue-500"
                                        }`}
                                >
                                    {level.label}
                                </span>
                            </div>
                            <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {level.description}
                            </p>
                            <ul className="space-y-2">
                                {level.rules.map((rule, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400"
                                    >
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Severity by Module Table */}
            <div className="overflow-hidden bg-white border border-gray-200 rounded-2xl dark:bg-gray-900 dark:border-gray-800">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white/90">
                        Severity Classification by Module
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Module / Issue
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
                                >
                                    Default Severity
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {moduleSeverity.map((mod) => (
                                <React.Fragment key={mod.module}>
                                    <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                                        <td
                                            colSpan={2}
                                            className="px-6 py-3 text-xs font-bold text-gray-800 uppercase dark:text-gray-300"
                                        >
                                            {mod.module}
                                        </td>
                                    </tr>
                                    {mod.issues.map((issue, issueIdx) => (
                                        <tr
                                            key={issueIdx}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                        >
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400 pl-10">
                                                {issue.name}
                                            </td>
                                            <td className="px-6 py-3 text-sm font-medium text-right">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${issue.severity.includes("P0")
                                                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                                        : issue.severity.includes("P1")
                                                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                                        }`}
                                                >
                                                    {issue.severity}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SystemIssueComp;
