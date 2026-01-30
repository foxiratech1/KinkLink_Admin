import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";

const weeklyData = [20, 60, 100, 140, 170, 200, 220];
const monthlyData = [120, 160, 180, 200, 230, 260, 300];

export default function UserGrowthMini() {
    const [view, setView] = useState<"W" | "M">("M");

    const options: ApexOptions = {
        chart: {
            type: "area",
            height: 220,
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        colors: ["#A50134"],
        stroke: {
            curve: "smooth",
            width: 3,
        },
        fill: {
            type: "solid",
            colors: ["#A5013440"], // 40 = 25% opacity in hex
        },
        grid: {
            borderColor: "#F1F1F1",
            strokeDashArray: 0,
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: ["2 Apr", "3 Apr", "4 Apr", "5 Apr", "6 Apr", "7 Apr", "8 Apr"],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#666666",
                    fontSize: "12px",
                },
            },
        },
        yaxis: {
            min: 0,
            max: 300,
            tickAmount: 6,
            labels: {
                style: {
                    colors: "#666666",
                    fontSize: "12px",
                },
                formatter: (value) => value.toString(),
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
        },
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 h-full">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                    User Growth
                </h3>

                <div className="flex rounded-md border border-gray-200 overflow-hidden h-full">
                    {["W", "M"].map(v => (
                        <button
                            key={v}
                            onClick={() => setView(v as "W" | "M")}
                            className={`px-3 py-1 text-sm font-medium ${view === v
                                ? "bg-brand-500 text-white"
                                : "text-black hover:bg-gray-100"
                                }`}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>

            <Chart
                options={options}
                series={[
                    {
                        name: "Users",
                        data: view === "W" ? weeklyData : monthlyData,
                    },
                ]}
                type="area"
                height={220}
            />
        </div>
    );
}