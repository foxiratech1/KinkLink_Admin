import { useState } from "react";

type FilterType = "All" | "Verified" | "Premium";

interface CityData {
    name: string;
    value: number;
}

const data: Record<FilterType, CityData[]> = {
    All: [
        { name: "Dublin", value: 5401 },
        { name: "Cork", value: 1054 },
        { name: "Galway", value: 985 },
        { name: "Limerick", value: 452 },
        { name: "Dublin", value: 5401 },
        { name: "Cork", value: 1054 },
        { name: "Galway", value: 985 },

    ],
    Verified: [
        { name: "Dublin", value: 4201 },
        { name: "Cork", value: 804 },
        { name: "Galway", value: 612 },
        { name: "Limerick", value: 301 },
        { name: "Dublin", value: 4201 },
        { name: "Cork", value: 804 },
        { name: "Galway", value: 612 },

    ],
    Premium: [
        { name: "Dublin", value: 1200 },
        { name: "Cork", value: 250 },
        { name: "Galway", value: 210 },
        { name: "Limerick", value: 90 },
        { name: "Dublin", value: 1200 },
        { name: "Cork", value: 250 },
        { name: "Galway", value: 210 },

    ],
};

export default function TopCities() {
    const [filter, setFilter] = useState<FilterType>("All");

    const cities = data[filter];
    const maxValue = Math.max(...cities.map((c) => c.value));

    const barGradient: Record<FilterType, string> = {
        All: "linear-gradient(135deg, #A50134, #979ECA)",
        Verified: "linear-gradient(90deg, #E1003340 -2.57%, rgba(255, 205, 113, 0) 112.5%)",
        Premium: "linear-gradient(90deg, #0084C640 -2.57%, rgba(255, 205, 113, 0) 112.5%)",
    };

    return (
        <div
            className="rounded-2xl bg-white p-5 sm:p-6 h-full"
            style={{ border: "1px solid #9B43BB40" }}
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-800">
                    Top Cities
                </h3>

                {/* Filter Pills */}
                <div className="flex overflow-hidden rounded-lg bg-[#fffff] p-1">
                    {(["All", "Verified", "Premium"] as FilterType[]).map((item) => {
                        const activeBg =
                            item === "All"
                                ? "bg-brand-500 text-[#ffffff]"
                                : item === "Verified"
                                    ? "bg-[#E1003340] text-[#7A001A]"
                                    : "bg-[#0084C640] text-[#003B5C]";

                        return (
                            <button
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition
          ${filter === item
                                        ? activeBg
                                        : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bars */}
            <div className="space-y-4">
                {cities.map((city) => {
                    const width = (city.value / maxValue) * 100;

                    return (
                        <div key={city.name} className="relative">
                            {/* Background */}
                            <div className="h-10 w-full rounded-lg bg-gray-100" />

                            {/* Filled Bar */}
                            <div
                                className="absolute inset-y-0 left-0 flex items-center justify-between rounded-lg px-4 text-sm font-semibold"
                                style={{
                                    width: `${width}%`,
                                    background: barGradient[filter],
                                }}
                            >
                                {/* City Name */}
                                <span className="uppercase tracking-wide text-white">
                                    {city.name}
                                </span>

                                {/* Value */}
                                <span className="ml-4 text-gray-900">
                                    {city.value}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
