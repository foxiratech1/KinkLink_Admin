import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";

const weeklyData = [150, 230, 280, 250, 310, 360, 420];
const monthlyData = [1200, 1600, 1800, 2100, 2300, 2600, 3100];

export default function ActiveUsersChart() {
    const [view, setView] = useState<"W" | "M">("M");

    const options: ApexOptions = {
        chart: {
            type: "area",
            height: 300,
            toolbar: { show: false },
            zoom: { enabled: false },
            fontFamily: "Outfit, sans-serif",
        },
        colors: ["#A50134"],
        stroke: {
            curve: "smooth",
            width: 3,
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.2,
                stops: [0, 90, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: "#A50134",
                        opacity: 0.6,
                    },
                    {
                        offset: 100,
                        color: "#979ECA",
                        opacity: 0.1,
                    },
                ]
            },
        },
        grid: {
            borderColor: "rgba(0,0,0,0.05)",
            strokeDashArray: 4,
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
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 10
            }
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#9CA3AF",
                    fontSize: "12px",
                    fontWeight: 500,
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#9CA3AF",
                    fontSize: "12px",
                    fontWeight: 500,
                },
                formatter: (value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString(),
            },
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: function (val) {
                    return val.toString();
                }
            },
            style: {
                fontSize: '12px',
                fontFamily: 'Outfit, sans-serif',
            },
            marker: {
                show: true,
            },
            x: {
                show: false,
            }
        },
        markers: {
            size: 0,
            hover: {
                size: 6,
                sizeOffset: 3
            }
        }
    };

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 h-full relative overflow-hidden group">
            <div
                className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-500/5 to-transparent rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"
            />

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">
                        Active Users
                    </h3>
                    <p className="text-sm text-gray-400 font-medium">
                        (+23% than last week)
                    </p>
                </div>

                <div className="flex bg-gray-100/80 p-1 rounded-xl">
                    {["W", "M"].map(v => (
                        <button
                            key={v}
                            onClick={() => setView(v as "W" | "M")}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${view === v
                                ? "bg-white text-brand-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {v === "W" ? "Week" : "Month"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative z-10 -ml-2">
                <Chart
                    options={options}
                    series={[
                        {
                            name: "Active Users",
                            data: view === "W" ? weeklyData : monthlyData,
                        },
                    ]}
                    type="area"
                    height={300}
                />
            </div>
        </div>
    );
}