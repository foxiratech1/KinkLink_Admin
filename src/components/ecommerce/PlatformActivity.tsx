// import { useEffect, useRef } from "react";
// import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
// import flatpickr from "flatpickr";
// import ChartTab from "../common/ChartTab";
// import { CalenderIcon } from "../../icons";

// export default function StatisticsChart() {
//   const datePickerRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (!datePickerRef.current) return;

//     const today = new Date();
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(today.getDate() - 6);

//     const fp = flatpickr(datePickerRef.current, {
//       mode: "range",
//       static: true,
//       monthSelectorType: "static",
//       dateFormat: "M d",
//       defaultDate: [sevenDaysAgo, today],
//       clickOpens: true,
//       prevArrow:
//         '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
//       nextArrow:
//         '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
//     });

//     return () => {
//       if (!Array.isArray(fp)) {
//         fp.destroy();
//       }
//     };
//   }, []);

//   const options: ApexOptions = {
//     legend: {
//       show: false, // Hide legend
//       position: "top",
//       horizontalAlign: "left",
//     },
//     colors: ["#A50134", "#28264D"], // Define line colors
//     chart: {
//       fontFamily: "Outfit, sans-serif",
//       height: 310,
//       type: "line", // Set the chart type to 'line'
//       toolbar: {
//         show: false, // Hide chart toolbar
//       },
//     },
//     stroke: {
//       curve: "straight", // Define the line style (straight, smooth, or step)
//       width: [2, 2], // Line width for each dataset
//     },

//     fill: {
//       type: "gradient",
//       gradient: {
//         opacityFrom: 0.55,
//         opacityTo: 0,
//       },
//     },
//     markers: {
//       size: 0, // Size of the marker points
//       strokeColors: "#fff", // Marker border color
//       strokeWidth: 2,
//       hover: {
//         size: 6, // Marker size on hover
//       },
//     },
//     grid: {
//       xaxis: {
//         lines: {
//           show: false, // Hide grid lines on x-axis
//         },
//       },
//       yaxis: {
//         lines: {
//           show: true, // Show grid lines on y-axis
//         },
//       },
//     },
//     dataLabels: {
//       enabled: false, // Disable data labels
//     },
//     tooltip: {
//       enabled: true, // Enable tooltip
//       x: {
//         format: "dd MMM yyyy", // Format for x-axis tooltip
//       },
//     },
//     xaxis: {
//       type: "category", // Category-based x-axis
//       categories: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//       axisBorder: {
//         show: false, // Hide x-axis border
//       },
//       axisTicks: {
//         show: false, // Hide x-axis ticks
//       },
//       tooltip: {
//         enabled: false, // Disable tooltip for x-axis points
//       },
//     },
//     yaxis: {
//       labels: {
//         style: {
//           fontSize: "12px", // Adjust font size for y-axis labels
//           colors: ["#6B7280"], // Color of the labels
//         },
//       },
//       title: {
//         text: "", // Remove y-axis title
//         style: {
//           fontSize: "0px",
//         },
//       },
//     },
//   };

//   const series = [
//     {
//       name: "Messages Sent",
//       data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
//     },
//     {
//       name: "Events Created",
//       data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
//     },
//   ];
//   return (
//     <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
//       <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
//         <div className="w-full">
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//             Statistics
//           </h3>
//           <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
//             Platform activity across messaging and events
//           </p>
//         </div>
//         <div className="flex items-center gap-3 sm:justify-end">
//           <ChartTab />
//           <div className="relative inline-flex items-center">
//             <CalenderIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-3 lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 size-5 text-gray-500 dark:text-gray-400 pointer-events-none z-10" />
//             <input
//               ref={datePickerRef}
//               className="h-10 w-10 lg:w-40 lg:h-auto  lg:pl-10 lg:pr-3 lg:py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-transparent lg:text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:lg:text-gray-300 cursor-pointer"
//               placeholder="Select date range"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="max-w-full overflow-x-auto custom-scrollbar">
//         <div className="min-w-[1000px] xl:min-w-full">
//           <Chart options={options} series={series} type="area" height={310} />
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type FilterType = "day" | "week" | "month";

export default function StatisticsChart() {
  const [filter, setFilter] = useState<FilterType>("week");
  const [selectedMonth, setSelectedMonth] = useState("Jan");

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 320,
      toolbar: { show: false },
    },
    colors: ["#A50134", "#28264D", "#16A34A"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories:
        filter === "day"
          ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          : filter === "week"
            ? ["Week 1", "Week 2", "Week 3", "Week 4"]
            : [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
    },
  };

  const series = [
    {
      name: "Messages Sent",
      data: filter === "day" ? [20, 30, 25, 40, 35, 50, 45] :
        filter === "week" ? [120, 150, 130, 180] :
          [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
    },
    {
      name: "Events Created",
      data: filter === "day" ? [5, 10, 8, 12, 9, 15, 11] :
        filter === "week" ? [30, 40, 35, 50] :
          [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
    },
    {
      name: "Posts Created",
      data: filter === "day" ? [12, 18, 15, 20, 22, 25, 19] :
        filter === "week" ? [80, 95, 90, 110] :
          [90, 100, 85, 95, 105, 98, 120, 135, 150, 140, 165, 170],
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Platform Analytics</h3>
          <p className="text-sm text-gray-500">
            Messages, Events & Posts Activity
          </p>
        </div>

        <div className="flex gap-3">
          {/* Time Filter Buttons */}
          {["day", "week", "month"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item as FilterType)}
              className={`px-3 py-1 rounded-lg text-sm ${filter === item
                  ? "bg-brand-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800"
                }`}
            >
              {item.toUpperCase()}
            </button>
          ))}

          {/* Month Dropdown (only when month selected) */}
          {filter === "month" && (
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm dark:bg-gray-800"
            >
              {[
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
              ].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <Chart options={options} series={series} type="area" height={320} />
    </div>
  );
}
