// import React from "react";

// const severityLevels = [
//     {
//         level: "P0",
//         label: "Critical",
//         color: "bg-error-500 text-white",
//         badgeColor: "bg-red-100 text-red-800",
//         description:
//             "The platform is blocked, money or security is at risk, or a core access flow is broken.",
//         rules: [
//             "Blocks login, registration, verification, payments, or access",
//             "Affects a large portion of users or the entire platform",
//             "Requires immediate action and highest priority",
//         ],
//     },
//     {
//         level: "P1",
//         label: "Major",
//         color: "bg-warning-500 text-white",
//         badgeColor: "bg-orange-100 text-orange-800",
//         description:
//             "Core functionality is degraded, but the platform is still usable.",
//         rules: [
//             "Affects key user flows partially",
//             "Causes strong UX, trust, or operational impact",
//             "Must be fixed quickly, but does not require emergency rollback in all cases",
//         ],
//     },
//     {
//         level: "P2",
//         label: "Minor",
//         color: "bg-success-500 text-white",
//         badgeColor: "bg-green-100 text-green-800",
//         description: "Non-blocking issues with limited impact.",
//         rules: [
//             "Cosmetic bugs, UI issues, or minor inconsistencies",
//             "Does not block users or revenue",
//             "Can be planned and fixed as part of regular releases",
//         ],
//     },
// ];

// const moduleSeverity = [
//     {
//         module: "Authentication / Login",
//         issues: [
//             { name: "Users cannot log in (mass issue)", severity: "P0" },
//             { name: "Login works only for some users", severity: "P1" },
//             { name: "Session / logout issues", severity: "P1" },
//             { name: "Login UI bugs", severity: "P2" },
//         ],
//     },
//     {
//         module: "Verification (Email / Business)",
//         issues: [
//             { name: "Verification cannot be completed / stuck", severity: "P0" },
//             { name: "Business verification blocked", severity: "P0" },
//             { name: "Email delivery delays", severity: "P1" },
//             { name: "Verification status UI bug", severity: "P2" },
//         ],
//     },
//     {
//         module: "Payments / Subscriptions",
//         issues: [
//             { name: "Payments failing", severity: "P0" },
//             { name: "Payment webhooks not processing", severity: "P0" },
//             { name: "Subscription paid but not activated", severity: "P0" },
//             { name: "Incorrect payment status shown", severity: "P1" },
//             { name: "Transaction history incorrect", severity: "P1" },
//             { name: "Checkout UI issues", severity: "P2" },
//         ],
//     },
//     {
//         module: "Messaging / Chats",
//         issues: [
//             { name: "Messages not sending (mass issue)", severity: "P1" },
//             { name: "Chats not opening", severity: "P1" },
//             { name: "Message delivery delays", severity: "P1" },
//             { name: "Read receipts / counters incorrect", severity: "P2" },
//             { name: "Chat UI bugs", severity: "P2" },
//         ],
//     },
//     {
//         module: "Profiles / Photos",
//         issues: [
//             { name: "Profile changes not saved", severity: "P1" },
//             { name: "Photos not uploading (mass issue)", severity: "P1" },
//             { name: "Photos not displaying correctly", severity: "P2" },
//             { name: "Crop / preview UI issues", severity: "P2" },
//         ],
//     },
//     {
//         module: "Events / Tickets",
//         issues: [
//             { name: "Tickets cannot be purchased", severity: "P0" },
//             { name: "Events cannot be created", severity: "P1" },
//             { name: "Purchased tickets missing", severity: "P1" },
//             { name: "Attendance or stats inaccuracies", severity: "P2" },
//         ],
//     },
//     {
//         module: "Admin Panel / Dashboard",
//         issues: [
//             { name: "Admin panel unavailable", severity: "P0" },
//             { name: "Core metrics incorrect", severity: "P1" },
//             { name: "Dashboard data not updating", severity: "P1" },
//             { name: "Chart or UI glitches", severity: "P2" },
//         ],
//     },
//     {
//         module: "Analytics",
//         issues: [
//             { name: "Incorrect metrics used for decisions", severity: "P1" },
//             { name: "Data delay or partial sync", severity: "P2" },
//             { name: "Visual inconsistencies in charts", severity: "P2" },
//         ],
//     },
//     {
//         module: "System / Infrastructure",
//         issues: [
//             { name: "Production environment down", severity: "P0" },
//             { name: "Mass 5xx errors", severity: "P0" },
//             {
//                 name: "Errors introduced after deployment",
//                 severity: "P0 / P1",
//             },
//             { name: "Errors in logs without user impact", severity: "P2" },
//         ],
//     },
// ];

// const SystemIssueComp: React.FC = () => {
//     return (
//         <div className="space-y-6">
//             {/* Platform Health Overview */}
//             <div className="p-6 bg-white border border-gray-200 rounded-2xl dark:bg-gray-900 dark:border-gray-800">
//                 <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white/90">
//                     System Status
//                 </h2>
//                 <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
//                     Platform health and stability overview.
//                 </p>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//                     <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
//                         <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                             Uptime
//                         </h3>
//                         <p className="mt-2 text-2xl font-bold text-green-500">99.98%</p>
//                         <p className="text-xs text-gray-400">Last 30 days</p>
//                     </div>
//                     <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
//                         <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                             Active Issues
//                         </h3>
//                         <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
//                             0
//                         </p>
//                         <p className="text-xs text-gray-400">Everything is running smoothly</p>
//                     </div>
//                     <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
//                         <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                             Avg Response Time
//                         </h3>
//                         <p className="mt-2 text-2xl font-bold text-blue-500">120ms</p>
//                         <p className="text-xs text-gray-400">Global average</p>
//                     </div>
//                     <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
//                         <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                             Last Incident
//                         </h3>
//                         <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
//                             None
//                         </p>
//                         <p className="text-xs text-gray-400">Since last deployment</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Severity Matrix Definition */}
//             <div className="p-6 bg-white border border-gray-200 rounded-2xl dark:bg-gray-900 dark:border-gray-800">
//                 <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white/90">
//                     Severity Matrix
//                 </h2>
//                 <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
//                     Default severity levels for issues on the KinkLink platform, used for
//                     prioritisation and response.
//                 </p>

//                 <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//                     {severityLevels.map((level) => (
//                         <div
//                             key={level.level}
//                             className="p-5 border border-gray-100 rounded-xl bg-gray-50 dark:bg-black/20 dark:border-gray-800"
//                         >
//                             <div className="flex items-center gap-3 mb-3">
//                                 <span
//                                     className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${level.level === "P0"
//                                         ? "bg-red-500 text-white"
//                                         : level.level === "P1"
//                                             ? "bg-orange-500 text-white"
//                                             : "bg-blue-500 text-white"
//                                         }`}
//                                 >
//                                     {level.level}
//                                 </span>
//                                 <span
//                                     className={`text-sm font-semibold uppercase tracking-wide ${level.level === "P0"
//                                         ? "text-red-500"
//                                         : level.level === "P1"
//                                             ? "text-orange-500"
//                                             : "text-blue-500"
//                                         }`}
//                                 >
//                                     {level.label}
//                                 </span>
//                             </div>
//                             <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
//                                 {level.description}
//                             </p>
//                             <ul className="space-y-2">
//                                 {level.rules.map((rule, idx) => (
//                                     <li
//                                         key={idx}
//                                         className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400"
//                                     >
//                                         <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
//                                         {rule}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Severity by Module Table */}
//             <div className="overflow-hidden bg-white border border-gray-200 rounded-2xl dark:bg-gray-900 dark:border-gray-800">
//                 <div className="p-6 border-b border-gray-100 dark:border-gray-800">
//                     <h2 className="text-lg font-bold text-gray-800 dark:text-white/90">
//                         Severity Classification by Module
//                     </h2>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
//                         <thead className="bg-gray-50 dark:bg-gray-800/50">
//                             <tr>
//                                 <th
//                                     scope="col"
//                                     className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
//                                 >
//                                     Module / Issue
//                                 </th>
//                                 <th
//                                     scope="col"
//                                     className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
//                                 >
//                                     Default Severity
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
//                             {moduleSeverity.map((mod) => (
//                                 <React.Fragment key={mod.module}>
//                                     <tr className="bg-gray-50/50 dark:bg-gray-800/20">
//                                         <td
//                                             colSpan={2}
//                                             className="px-6 py-3 text-xs font-bold text-gray-800 uppercase dark:text-gray-300"
//                                         >
//                                             {mod.module}
//                                         </td>
//                                     </tr>
//                                     {mod.issues.map((issue, issueIdx) => (
//                                         <tr
//                                             key={issueIdx}
//                                             className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
//                                         >
//                                             <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400 pl-10">
//                                                 {issue.name}
//                                             </td>
//                                             <td className="px-6 py-3 text-sm font-medium text-right">
//                                                 <span
//                                                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${issue.severity.includes("P0")
//                                                         ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
//                                                         : issue.severity.includes("P1")
//                                                             ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
//                                                             : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
//                                                         }`}
//                                                 >
//                                                     {issue.severity}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </React.Fragment>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SystemIssueComp;
import React, { useState } from "react";

const severityLevels = [
    {
        level: "P0",
        label: "Critical",
        color: "bg-error-500 text-white",
        badgeColor: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        description:
            "The platform is blocked, money or security is at risk, or a core access flow is broken.",
        rules: [
            "Blocks login, registration, verification, payments, or access",
            "Affects a large portion of users or the entire platform",
            "Requires immediate action and highest priority",
            "SLA: < 1 hour response time",
        ],
        icon: "🔴",
    },
    {
        level: "P1",
        label: "Major",
        color: "bg-warning-500 text-white",
        badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        description:
            "Core functionality is degraded, but the platform is still usable.",
        rules: [
            "Affects key user flows partially",
            "Causes strong UX, trust, or operational impact",
            "Must be fixed quickly, but does not require emergency rollback",
            "SLA: < 4 hours response time",
        ],
        icon: "🟠",
    },
    {
        level: "P2",
        label: "Minor",
        color: "bg-success-500 text-white",
        badgeColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        description: "Non-blocking issues with limited impact.",
        rules: [
            "Cosmetic bugs, UI issues, or minor inconsistencies",
            "Does not block users or revenue",
            "Can be planned and fixed as part of regular releases",
            "SLA: < 24 hours response time",
        ],
        icon: "🟢",
    },
    {
        level: "P3",
        label: "Cosmetic",
        color: "bg-gray-500 text-white",
        badgeColor: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
        description: "Visual issues, typos, or non-functional improvements.",
        rules: [
            "UI alignment, spacing, or color issues",
            "Text typos or translations",
            "Accessibility improvements",
            "SLA: Next release",
        ],
        icon: "⚪",
    },
];

const moduleSeverity = [
    {
        module: "Authentication / Login",
        stats: { p0: 1, p1: 2, p2: 1, p3: 0 },
        issues: [
            {
                name: "Users cannot log in (mass issue)",
                severity: "P0",
                status: "active",
                lastOccurred: "2 minutes ago",
                frequency: "High"
            },
            {
                name: "Login works only for some users",
                severity: "P1",
                status: "resolved",
                lastOccurred: "1 hour ago",
                frequency: "Medium"
            },
            {
                name: "Session / logout issues",
                severity: "P1",
                status: "monitoring",
                lastOccurred: "30 minutes ago",
                frequency: "Medium"
            },
            {
                name: "Login UI bugs",
                severity: "P2",
                status: "resolved",
                lastOccurred: "2 days ago",
                frequency: "Low"
            },
            {
                name: "Password reset flow broken",
                severity: "P3",
                status: "backlog",
                lastOccurred: "5 days ago",
                frequency: "Low"
            },
        ],
    },
    {
        module: "Verification (Email / Business)",
        stats: { p0: 2, p1: 1, p2: 1, p3: 0 },
        issues: [
            {
                name: "Verification cannot be completed / stuck",
                severity: "P0",
                status: "critical",
                lastOccurred: "5 minutes ago",
                frequency: "High"
            },
            {
                name: "Business verification blocked",
                severity: "P0",
                status: "active",
                lastOccurred: "15 minutes ago",
                frequency: "High"
            },
            {
                name: "Email delivery delays",
                severity: "P1",
                status: "monitoring",
                lastOccurred: "45 minutes ago",
                frequency: "Medium"
            },
            {
                name: "Verification status UI bug",
                severity: "P2",
                status: "resolved",
                lastOccurred: "3 hours ago",
                frequency: "Low"
            },
        ],
    },
    {
        module: "Payments / Subscriptions",
        stats: { p0: 3, p1: 2, p2: 1, p3: 0 },
        issues: [
            {
                name: "Payments failing",
                severity: "P0",
                status: "critical",
                lastOccurred: "Just now",
                frequency: "High"
            },
            {
                name: "Payment webhooks not processing",
                severity: "P0",
                status: "active",
                lastOccurred: "10 minutes ago",
                frequency: "High"
            },
            {
                name: "Subscription paid but not activated",
                severity: "P0",
                status: "active",
                lastOccurred: "20 minutes ago",
                frequency: "High"
            },
            {
                name: "Incorrect payment status shown",
                severity: "P1",
                status: "monitoring",
                lastOccurred: "2 hours ago",
                frequency: "Medium"
            },
            {
                name: "Transaction history incorrect",
                severity: "P1",
                status: "investigating",
                lastOccurred: "4 hours ago",
                frequency: "Medium"
            },
            {
                name: "Checkout UI issues",
                severity: "P2",
                status: "resolved",
                lastOccurred: "1 day ago",
                frequency: "Low"
            },
        ],
    },
    {
        module: "Messaging / Chats",
        stats: { p0: 0, p1: 3, p2: 2, p3: 1 },
        issues: [
            {
                name: "Messages not sending (mass issue)",
                severity: "P1",
                status: "active",
                lastOccurred: "25 minutes ago",
                frequency: "High"
            },
            {
                name: "Chats not opening",
                severity: "P1",
                status: "monitoring",
                lastOccurred: "1 hour ago",
                frequency: "Medium"
            },
            {
                name: "Message delivery delays",
                severity: "P1",
                status: "investigating",
                lastOccurred: "2 hours ago",
                frequency: "Medium"
            },
            {
                name: "Read receipts / counters incorrect",
                severity: "P2",
                status: "backlog",
                lastOccurred: "2 days ago",
                frequency: "Low"
            },
            {
                name: "Chat UI bugs",
                severity: "P2",
                status: "backlog",
                lastOccurred: "3 days ago",
                frequency: "Low"
            },
            {
                name: "Emoji picker not working",
                severity: "P3",
                status: "backlog",
                lastOccurred: "1 week ago",
                frequency: "Low"
            },
        ],
    },
    {
        module: "Profiles / Photos",
        stats: { p0: 0, p1: 2, p2: 2, p3: 1 },
        issues: [
            {
                name: "Profile changes not saved",
                severity: "P1",
                status: "active",
                lastOccurred: "30 minutes ago",
                frequency: "Medium"
            },
            {
                name: "Photos not uploading (mass issue)",
                severity: "P1",
                status: "monitoring",
                lastOccurred: "1 hour ago",
                frequency: "Medium"
            },
            {
                name: "Photos not displaying correctly",
                severity: "P2",
                status: "resolved",
                lastOccurred: "5 hours ago",
                frequency: "Low"
            },
            {
                name: "Crop / preview UI issues",
                severity: "P2",
                status: "backlog",
                lastOccurred: "2 days ago",
                frequency: "Low"
            },
            {
                name: "Profile photo orientation",
                severity: "P3",
                status: "backlog",
                lastOccurred: "4 days ago",
                frequency: "Low"
            },
        ],
    },
    {
        module: "Events / Tickets",
        stats: { p0: 1, p1: 2, p2: 1, p3: 0 },
        issues: [
            {
                name: "Tickets cannot be purchased",
                severity: "P0",
                status: "critical",
                lastOccurred: "15 minutes ago",
                frequency: "High"
            },
            {
                name: "Events cannot be created",
                severity: "P1",
                status: "active",
                lastOccurred: "45 minutes ago",
                frequency: "Medium"
            },
            {
                name: "Purchased tickets missing",
                severity: "P1",
                status: "investigating",
                lastOccurred: "2 hours ago",
                frequency: "Medium"
            },
            {
                name: "Attendance or stats inaccuracies",
                severity: "P2",
                status: "backlog",
                lastOccurred: "1 day ago",
                frequency: "Low"
            },
        ],
    },
    {
        module: "Admin Panel / Dashboard",
        stats: { p0: 1, p1: 2, p2: 1, p3: 1 },
        issues: [
            {
                name: "Admin panel unavailable",
                severity: "P0",
                status: "active",
                lastOccurred: "5 minutes ago",
                frequency: "High"
            },
            {
                name: "Core metrics incorrect",
                severity: "P1",
                status: "investigating",
                lastOccurred: "30 minutes ago",
                frequency: "Medium"
            },
            {
                name: "Dashboard data not updating",
                severity: "P1",
                status: "monitoring",
                lastOccurred: "1 hour ago",
                frequency: "Medium"
            },
            {
                name: "Chart or UI glitches",
                severity: "P2",
                status: "resolved",
                lastOccurred: "6 hours ago",
                frequency: "Low"
            },
            {
                name: "Export functionality broken",
                severity: "P3",
                status: "backlog",
                lastOccurred: "3 days ago",
                frequency: "Low"
            },
        ],
    },
    {
        module: "Analytics",
        stats: { p0: 0, p1: 1, p2: 1, p3: 1 },
        issues: [
            {
                name: "Incorrect metrics used for decisions",
                severity: "P1",
                status: "investigating",
                lastOccurred: "2 hours ago",
                frequency: "Medium"
            },
            {
                name: "Data delay or partial sync",
                severity: "P2",
                status: "monitoring",
                lastOccurred: "4 hours ago",
                frequency: "Low"
            },
            {
                name: "Visual inconsistencies in charts",
                severity: "P2",
                status: "backlog",
                lastOccurred: "2 days ago",
                frequency: "Low"
            },
            {
                name: "Report generation timeout",
                severity: "P3",
                status: "backlog",
                lastOccurred: "5 days ago",
                frequency: "Low"
            },
        ],
    },
    {
        module: "System / Infrastructure",
        stats: { p0: 2, p1: 0, p2: 0, p3: 1 },
        issues: [
            {
                name: "Production environment down",
                severity: "P0",
                status: "resolved",
                lastOccurred: "3 hours ago",
                frequency: "Low"
            },
            {
                name: "Mass 5xx errors",
                severity: "P0",
                status: "monitoring",
                lastOccurred: "4 hours ago",
                frequency: "Medium"
            },
            {
                name: "Errors in logs without user impact",
                severity: "P3",
                status: "backlog",
                lastOccurred: "6 hours ago",
                frequency: "Low"
            },
        ],
    },
];

const SystemIssueComp: React.FC = () => {
    const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Calculate stats
    const totalIssues = moduleSeverity.reduce((acc, mod) => acc + mod.issues.length, 0);
    const activeIssues = moduleSeverity.reduce((acc, mod) =>
        acc + mod.issues.filter(i => i.status === "active" || i.status === "critical" || i.status === "investigating").length, 0
    );
    const criticalIssues = moduleSeverity.reduce((acc, mod) =>
        acc + mod.issues.filter(i => i.severity === "P0" && (i.status === "active" || i.status === "critical")).length, 0
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "critical":
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400">Critical</span>;
            case "active":
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-400">Active</span>;
            case "investigating":
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-400">Investigating</span>;
            case "monitoring":
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400">Monitoring</span>;
            case "resolved":
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">Resolved</span>;
            case "backlog":
                return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">Backlog</span>;
            default:
                return null;
        }
    };

    const getSeverityBadge = (severity: string) => {
        const color = severity.includes("P0")
            ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400 border border-red-200 dark:border-red-800"
            : severity.includes("P1")
                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-400 border border-orange-200 dark:border-orange-800"
                : severity.includes("P2")
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400 border border-green-200 dark:border-green-800"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700";

        return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`}>
                {severity}
            </span>
        );
    };

    const filteredModules = moduleSeverity.map(mod => ({
        ...mod,
        issues: mod.issues.filter(issue => {
            const matchesSeverity = selectedSeverity === "all" || issue.severity === selectedSeverity;
            const matchesStatus = selectedStatus === "all" || issue.status === selectedStatus;
            const matchesSearch = searchTerm === "" ||
                issue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                mod.module.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSeverity && matchesStatus && matchesSearch;
        })
    })).filter(mod => mod.issues.length > 0);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">System Health & Issues</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Real-time platform monitoring and incident management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System Online</span>
                        </span>
                        <button className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-brand-500/20">
                            Create Incident
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Platform Health Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">System Uptime</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">99.98%</h3>
                                <p className="text-xs text-gray-400 mt-1">Last 30 days</p>
                            </div>
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Issues</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{activeIssues}</h3>
                                <p className="text-xs text-gray-400 mt-1">{criticalIssues} critical</p>
                            </div>
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Response Time</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">120ms</h3>
                                <p className="text-xs text-green-600 dark:text-green-400 mt-1">↓ 12% from last week</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Error Rate</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">0.02%</h3>
                                <p className="text-xs text-gray-400 mt-1">Below threshold</p>
                            </div>
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-5m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Severity Matrix Definition */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Severity Matrix</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Default severity levels for incident prioritization</p>
                        </div>
                        <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400">
                            Last updated: Today, 10:23 AM
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {severityLevels.map((level) => (
                            <div
                                key={level.level}
                                className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/50 p-5 hover:shadow-lg transition-shadow"
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-transparent dark:from-gray-800 rounded-bl-full"></div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">{level.icon}</span>
                                    <div>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${level.level === "P0" ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400" : level.level === "P1" ? "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-400" : level.level === "P2" ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"}`}>
                                            {level.level}
                                        </span>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">{level.label}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                                    {level.description}
                                </p>
                                <div className="space-y-2">
                                    {level.rules.map((rule, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5"></span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{rule}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Issues Dashboard */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Active Issues by Module</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Showing {filteredModules.reduce((acc, mod) => acc + mod.issues.length, 0)} of {totalIssues} total issues
                                </p>
                            </div>

                            {/* Filters */}
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search issues..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
                                    />
                                </div>

                                <select
                                    value={selectedSeverity}
                                    onChange={(e) => setSelectedSeverity(e.target.value)}
                                    className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
                                >
                                    <option value="all">All Severities</option>
                                    <option value="P0">P0 - Critical</option>
                                    <option value="P1">P1 - Major</option>
                                    <option value="P2">P2 - Minor</option>
                                    <option value="P3">P3 - Cosmetic</option>
                                </select>

                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="critical">Critical</option>
                                    <option value="active">Active</option>
                                    <option value="investigating">Investigating</option>
                                    <option value="monitoring">Monitoring</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="backlog">Backlog</option>
                                </select>
                            </div>
                        </div>

                        {/* Module Stats Summary */}
                        <div className="flex flex-wrap gap-3">
                            {moduleSeverity.map((mod) => {
                                const activeCount = mod.issues.filter(i => i.status === "active" || i.status === "critical").length;
                                if (activeCount === 0) return null;
                                return (
                                    <span key={mod.module} className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                        <span className="text-xs font-medium text-red-700 dark:text-red-400">{mod.module}</span>
                                        <span className="text-xs font-bold text-red-800 dark:text-red-300">{activeCount}</span>
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Issues Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                            <thead className="bg-gray-50 dark:bg-gray-800/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Module / Issue
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Severity
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Last Occurred
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Frequency
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                {filteredModules.map((mod) => (
                                    <React.Fragment key={mod.module}>
                                        <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                                            <td colSpan={6} className="px-6 py-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                                            {mod.module}
                                                        </span>
                                                        <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                                                            {mod.issues.length} issues
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {mod.stats.p0 > 0 && (
                                                            <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 rounded-full text-xs font-medium text-red-800 dark:text-red-400">
                                                                P0: {mod.stats.p0}
                                                            </span>
                                                        )}
                                                        {mod.stats.p1 > 0 && (
                                                            <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 rounded-full text-xs font-medium text-orange-800 dark:text-orange-400">
                                                                P1: {mod.stats.p1}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        {mod.issues.map((issue, issueIdx) => (
                                            <tr key={issueIdx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                                        <span className="text-sm text-gray-900 dark:text-white">
                                                            {issue.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getSeverityBadge(issue.severity)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(issue.status)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {issue.lastOccurred}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-xs font-medium ${issue.frequency === "High"
                                                            ? "text-red-600 dark:text-red-400"
                                                            : issue.frequency === "Medium"
                                                                ? "text-orange-600 dark:text-orange-400"
                                                                : "text-gray-600 dark:text-gray-400"
                                                        }`}>
                                                        {issue.frequency}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 text-xs font-medium transition-colors">
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Critical (P0)</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Major (P1)</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Minor (P2)</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Cosmetic (P3)</span>
                                </span>
                            </div>
                            <button className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-medium transition-colors">
                                View All Incidents →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemIssueComp;