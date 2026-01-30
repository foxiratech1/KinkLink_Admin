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
    return (
        <div
            className="rounded-2xl bg-white p-5 sm:p-6"
            style={{ border: "1px solid #9B43BB40" }}
        >
            <h3 className="mb-6 text-lg font-semibold text-gray-800">
                Funnel
            </h3>

            <div className="space-y-4">
                {funnel.map((step) => (
                    <div
                        key={step.label}
                        className="flex items-center justify-between rounded-xl px-5 py-4"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(155, 67, 187, 25%) 5%, rgba(104, 142, 255, 25%) 100%)",
                        }}
                    >
                        {/* Label */}
                        <span className="uppercase tracking-wide text-gray-900 text-sm font-semibold">
                            {step.label}
                        </span>

                        {/* Value + Change */}
                        <div className="flex items-center gap-4">
                            <span className="text-xl font-semibold text-gray-800">
                                {step.value}
                            </span>

                            {step.change && (
                                <span className="text-sm font-semibold text-[#A50134]">
                                    {step.change}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

