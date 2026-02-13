// import {
//     FaComments,
//     FaUserFriends,
//     FaBolt,
//     FaPenFancy,
//     FaCalendarAlt,
// } from "react-icons/fa";

// interface EngagementMetric {
//     label: string;
//     value: string;
//     sub?: string;
//     icon: React.ElementType;
// }

// const metrics: EngagementMetric[] = [
//     {
//         label: "Messages (24h / 7d)",
//         value: "12,480 / 84,230",
//         icon: FaComments,
//     },
//     {
//         label: "Avg Messages / User",
//         value: "18.4",
//         icon: FaUserFriends,
//     },
//     {
//         label: "Active Chats",
//         value: "1,246",
//         icon: FaBolt,
//     },
//     {
//         label: "Posts / Comments",
//         value: "3,982",
//         icon: FaPenFancy,
//     },
//     {
//         label: "Events Created",
//         value: "214",
//         icon: FaCalendarAlt,
//     },
// ];

// export default function EngagementMetrics() {
//     return (
//         <div
//             className="rounded-2xl bg-white p-5 sm:p-6"
//             style={{ border: "1px solid #9B43BB40" }}
//         >
//             <h3 className="mb-6 text-lg font-semibold text-gray-800">
//                 Engagement
//             </h3>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
//                 {metrics.map((item) => {
//                     const Icon = item.icon;

//                     return (
//                         <div
//                             key={item.label}
//                             className="rounded-xl p-4"
//                             style={{
//                                 background:
//                                     "linear-gradient(90deg, #E290FF -2.57%, rgba(255, 205, 113, 0) 112.5%)",
//                             }}
//                         >
//                             <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
//                                 <Icon className="text-[#9B43BB] text-lg" />
//                             </div>

//                             <p className="text-sm font-medium text-gray-700">
//                                 {item.label}
//                             </p>

//                             <p className="mt-1 text-xl font-semibold text-gray-900">
//                                 {item.value}
//                             </p>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }





// import {
//     FaComments,
//     FaUserFriends,
//     FaBolt,
//     FaPenFancy,
//     FaCalendarAlt,
// } from "react-icons/fa";

// interface EngagementMetric {
//     label: string;
//     value: string;
//     icon: React.ElementType;
// }

// const metrics: EngagementMetric[] = [
//     { label: "Messages (24h / 7d)", value: "12,480 / 84,230", icon: FaComments },
//     { label: "Avg Messages / User", value: "18.4", icon: FaUserFriends },
//     { label: "Active Chats", value: "1,246", icon: FaBolt },
//     { label: "Posts / Comments", value: "3,982", icon: FaPenFancy },
//     { label: "Events Created", value: "214", icon: FaCalendarAlt },
// ];

// export default function EngagementMetrics() {
//     return (
//         <div
//             className="rounded-2xl bg-white p-5 sm:p-6"
//             style={{ border: "1px solid #9B43BB40" }}
//         >
//             {/* Header */}
//             <div className="mb-5">
//                 <h3 className="text-base font-semibold text-black">
//                     Engagement
//                 </h3>
//                 <p className="text-xs text-black mt-1">
//                     Last 7 days activity
//                 </p>
//             </div>

//             {/* Metrics list */}
//             <div className="space-y-4">
//                 {metrics.map((item) => {
//                     const Icon = item.icon;

//                     return (
//                         <div
//                             key={item.label}
//                             className="flex items-center gap-4 rounded-xl px-4 py-3"
//                             style={{
//                                 background:
//                                     "linear-gradient(135deg, #A50134, #979ECA)",
//                             }}
//                         >
//                             {/* Icon */}
//                             <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
//                                 <Icon className="text-[#9B43BB] text-sm" />
//                             </div>

//                             {/* Text */}
//                             <div className="flex-1">
//                                 <p className="text-xs font-medium text-white">
//                                     {item.label}
//                                 </p>
//                                 <p className="text-base font-semibold text-gray-900">
//                                     {item.value}
//                                 </p>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }
import {
    FaComments,
    FaUserFriends,
    FaBolt,
    FaPenFancy,
    FaCalendarAlt,
} from "react-icons/fa";

interface EngagementMetric {
    label: string;
    value: string;
    icon: React.ElementType;
    trend?: string;
    trendUp?: boolean;
}

const metrics: EngagementMetric[] = [
    { label: "Messages (24h)", value: "12,480", icon: FaComments, trend: "+12%", trendUp: true },
    { label: "Avg Msg/User", value: "18.4", icon: FaUserFriends, trend: "+5%", trendUp: true },
    { label: "Active Chats", value: "1,246", icon: FaBolt, trend: "-2%", trendUp: false },
    { label: "Posts Created", value: "3,982", icon: FaPenFancy, trend: "+8%", trendUp: true },
    { label: "Events Created", value: "214", icon: FaCalendarAlt, trend: "+15%", trendUp: true },
];

export default function EngagementMetrics() {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 h-full">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">
                        Engagement Snapshot
                    </h3>
                    <p className="text-sm text-gray-400 font-medium">
                        Last 7 days activity
                    </p>
                </div>
                <div className="p-2 bg-brand-50 rounded-lg">
                    <FaBolt className="text-brand-600" />
                </div>
            </div>

            {/* Metrics list */}
            <div className="grid grid-cols-1 gap-4">
                {metrics.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="flex items-center gap-4 rounded-xl px-4 py-3 border border-gray-100 bg-white hover:shadow-md hover:border-brand-200 transition-all duration-300 group"
                        >
                            {/* Icon */}
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg shadow-sm transition-colors duration-300 ${index === 0 ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                                    index === 1 ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' :
                                        index === 2 ? 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white' :
                                            index === 3 ? 'bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white' :
                                                'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white'
                                    }`}
                            >
                                <Icon className="text-lg" />
                            </div>

                            {/* Text */}
                            <div className="flex-1">
                                <p className="text-xs font-medium text-gray-500">
                                    {item.label}
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="text-lg font-bold text-gray-900">
                                        {item.value}
                                    </p>
                                    {item.trend && (
                                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${item.trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {item.trend}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}