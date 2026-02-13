// interface FunnelStep {
//     label: string;
//     value: number;
//     change?: string;
// }

// const funnel: FunnelStep[] = [
//     { label: "Registered", value: 658 },
//     { label: "Verified", value: 592, change: "-10%" },
//     { label: "Completed Profile", value: 503, change: "-15%" },
//     { label: "First Action", value: 463, change: "-8%" },
// ];

// export default function UserFunnel() {
//     return (
//         <div
//             className="rounded-2xl bg-white p-5 sm:p-6"
//             style={{ border: "1px solid #9B43BB40" }}
//         >
//             <h3 className="mb-6 text-lg font-semibold text-gray-800">
//                 Funnel
//             </h3>

//             <div className="space-y-4">
//                 {funnel.map((step) => (
//                     <div
//                         key={step.label}
//                         className="flex items-center justify-between rounded-xl px-5 py-4"
//                         style={{
//                             background:
//                                 "linear-gradient(135deg, #A50134, #979ECA)",
//                         }}
//                     >
//                         {/* Label */}
//                         <span className="uppercase tracking-wide text-white text-sm font-semibold">
//                             {step.label}
//                         </span>

//                         {/* Value + Change */}
//                         <div className="flex items-center gap-4">
//                             <span className="text-xl font-semibold text-gray-800">
//                                 {step.value}
//                             </span>

//                             {step.change && (
//                                 <span className="text-sm font-semibold text-[#A50134]">
//                                     {step.change}
//                                 </span>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


// interface FunnelStep {
//     label: string;
//     value: number;
//     change?: string;
// }

// const funnel: FunnelStep[] = [
//     { label: "Registered", value: 658 },
//     { label: "Verified", value: 592, change: "-10%" },
//     { label: "Completed Profile", value: 503, change: "-15%" },
//     { label: "First Action", value: 463, change: "-8%" },
// ];

// export default function UserFunnel() {
//     const gradients = [
//         "from-[#A50134] to-[#C44D76]",
//         "from-[#B91C4F] to-[#D8688F]",
//         "from-[#CD386A] to-[#EB84A9]",
//         "from-[#E25485] to-[#FCA0C3]",
//     ];

//     return (
//         <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 w-full">
//             <h3 className="mb-6 text-lg font-bold text-gray-800">
//                 Activation Funnel
//             </h3>

//             <div className="relative space-y-5">

//                 {/* Vertical Line */}
//                 <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

//                 {funnel.map((step, index) => (
//                     <div
//                         key={step.label}
//                         className={`relative flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${gradients[index]} text-white transition-all duration-300 hover:shadow-lg`}
//                         style={{
//                             marginLeft: `${index * 16}px`,   // small controlled shift
//                             maxWidth: `calc(100% - ${index * 16}px)`
//                         }}
//                     >
//                         {/* Step Indicator Dot */}
//                         <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-brand-500 shadow-md" />

//                         {/* Label */}
//                         <span className="text-xs font-bold uppercase tracking-wide">
//                             {step.label}
//                         </span>

//                         {/* Value + Change */}
//                         <div className="flex items-center gap-3">
//                             <span className="text-lg font-bold">
//                                 {step.value}
//                             </span>

//                             {step.change && (
//                                 <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
//                                     {step.change}
//                                 </span>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
interface FunnelStep {
    label: string;
    value: number;
    change?: string;
}

const funnel: FunnelStep[] = [
    { label: "Registered", value: 658 },
    { label: "Verified", value: 592, change: "-10%" },
    { label: "Completed Profile", value: 503, change: "-15%" },
    { label: "First Action", value: 463, change: "-8%" },
];

export default function UserFunnel() {
    const gradients = [
        "from-[#A50134] to-[#C44D76]",
        "from-[#B91C4F] to-[#D8688F]",
        "from-[#CD386A] to-[#EB84A9]",
        "from-[#E25485] to-[#FCA0C3]",
    ];

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 w-full">
            <h3 className="mb-6 text-lg font-bold text-gray-800">
                Activation Funnel
            </h3>

            <div className="relative pl-10 space-y-6">
                {/* Vertical Timeline Line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

                {funnel.map((step, index) => (
                    <div
                        key={step.label}
                        className={`relative p-4 rounded-xl bg-gradient-to-r ${gradients[index]
                            } text-white transition-all duration-300 hover:shadow-lg`}
                        style={{
                            marginLeft: `${index * 14}px`,
                        }}
                    >
                        {/* Timeline Circle */}
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center">
                                <div
                                    className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${gradients[index]}`}
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wide">
                                {step.label}
                            </span>

                            <div className="flex items-center gap-3">
                                <span className="text-lg font-bold">
                                    {step.value}
                                </span>

                                {step.change && (
                                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
                                        {step.change}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
