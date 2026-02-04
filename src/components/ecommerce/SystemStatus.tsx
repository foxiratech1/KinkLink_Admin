import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router";



type StatusType = "operational" | "degraded" | "down";

interface SystemItem {
    label: string;
    value: string;
    status?: StatusType;
}

const systemStatus: SystemItem[] = [
    {
        label: "Email Delivery Status",
        value: "Operational",
        status: "operational",
    },
    {
        label: "Payment System Status",
        value: "Operational",
        status: "operational",
    },
    {
        label: "Last Deployment",
        value: "2026-01-28 • v1.4.2",
    },
    {
        label: "Errors / Crashes (last 24h)",
        value: "3",
        status: "degraded",
    },
];

function StatusIcon({ status }: { status: StatusType }) {
    if (status === "operational") {
        return <FaCheckCircle className="text-green-600" />;
    }
    if (status === "degraded") {
        return <FaExclamationTriangle className="text-yellow-600" />;
    }
    return <FaTimesCircle className="text-red-600" />;
}

export default function SystemStatus() {
    const navigate = useNavigate();
    return (
        <div
            className="rounded-2xl bg-white p-6"
            style={{ border: "1px solid #9B43BB40" }}
        >
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                    System Status
                </h3>
                <p className="text-sm text-gray-500">
                    Platform health and stability overview
                </p>
            </div>

            {/* Status list */}
            <div className="divide-y divide-gray-200">
                {systemStatus.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center justify-between py-4"
                    >
                        {/* Label */}
                        <span className="text-sm font-medium text-gray-700">
                            {item.label}
                        </span>

                        {/* Value + status */}
                        <div
                            onClick={() => navigate("/system-issues")}
                            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1 transition"
                        >
                            {item.status && <StatusIcon status={item.status} />}
                            <span className="text-sm font-semibold text-gray-900">
                                {item.value}
                            </span>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
