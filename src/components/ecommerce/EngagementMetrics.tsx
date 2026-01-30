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
}

const metrics: EngagementMetric[] = [
    { label: "Messages (24h / 7d)", value: "12,480 / 84,230", icon: FaComments },
    { label: "Avg Messages / User", value: "18.4", icon: FaUserFriends },
    { label: "Active Chats", value: "1,246", icon: FaBolt },
    { label: "Posts / Comments", value: "3,982", icon: FaPenFancy },
    { label: "Events Created", value: "214", icon: FaCalendarAlt },
];

export default function EngagementMetrics() {
    return (
        <div
            className="rounded-2xl bg-white p-5 sm:p-6"
            style={{ border: "1px solid #9B43BB40" }}
        >
            {/* Header */}
            <div className="mb-5">
                <h3 className="text-base font-semibold text-black">
                    Engagement
                </h3>
                <p className="text-xs text-black mt-1">
                    Last 7 days activity
                </p>
            </div>

            {/* Metrics list */}
            <div className="space-y-4">
                {metrics.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="flex items-center gap-4 rounded-xl px-4 py-3"
                            style={{
                                background:
                                    "linear-gradient(135deg, #A50134, #979ECA)",
                            }}
                        >
                            {/* Icon */}
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                                <Icon className="text-[#9B43BB] text-sm" />
                            </div>

                            {/* Text */}
                            <div className="flex-1">
                                <p className="text-xs font-medium text-white">
                                    {item.label}
                                </p>
                                <p className="text-base font-semibold text-gray-900">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
