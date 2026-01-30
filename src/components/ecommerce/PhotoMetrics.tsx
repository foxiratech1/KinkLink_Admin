// import { FaUserTie, FaUser } from "react-icons/fa";
// import { MdReportProblem } from "react-icons/md";
// import { HiArrowUp, HiArrowDown } from "react-icons/hi";

// import Badge from "../ui/badge/Badge";

// export default function PhotoMetrics() {
//   const metrics = [
//   {
//     title: "Total Users",
//     value: "128,450",
//     icon: FaUser,
//     trend: "up",
//     percentage: "2.1%",
//   },
//   {
//     title: "Personal Users",
//     value: "91,320",
//     icon: FaUser,
//     trend: "up",
//     percentage: "1.4%",
//   },
//   {
//     title: "Business Users",
//     value: "37,130",
//     icon: FaUserTie,
//     trend: "up",
//     percentage: "3.8%",
//   },
//   {
//     title: "Open Reports",
//     value: "184",
//     icon: MdReportProblem,
//     trend: "down",
//     percentage: "6.2%",
//   },
// ];


//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
//       {metrics.map((item, index) => {
//         const Icon = item.icon;

//         return (
//           <div
//             key={index}
//             className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
//           >
//             {/* Icon */}
//             <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
//               <Icon className="text-gray-800 text-xl dark:text-white/90" />
//             </div>

//             {/* Content */}
//             <div className="flex items-end justify-between mt-5">
//               <div>
//                 <span className="text-sm text-gray-500 dark:text-gray-400">
//                   {item.title}
//                 </span>
//                 <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
//                   {item.value}
//                 </h4>
//               </div>

//               <Badge color={item.trend === "up" ? "success" : "error"}>
//                 {item.trend === "up" ? (
//                   <HiArrowUp className="mr-1" />
//                 ) : (
//                   <HiArrowDown className="mr-1" />
//                 )}
//                 {item.percentage}
//               </Badge>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

interface Metric {
  title: string;
  value: string;
  trend?: "up" | "down";
  percentage?: string;
}

export default function PhotoMetrics() {
  const metrics: Metric[] = [
    {
      title: "Total users",
      value: "2,512",
      trend: "up",
      percentage: "0.3%",
    },
    {
      title: "Online now",
      value: "458",
    },
    {
      title: "DAU (24)",
      value: "1,024",
      trend: "down",
      percentage: "1.3%",
    },
    {
      title: "Premium sign-ups",
      value: "18",
      trend: "up",
      percentage: "0.5%",
    },
    {
      title: "Open Reports",
      value: "11",
      trend: "down",
      percentage: "5%",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {metrics.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl bg-white p-5"
          style={{ border: "1px solid #9B43BB40" }}
        >
          {/* Title */}
          <p className="text-sm font-medium text-gray-600">
            {item.title}
          </p>

          {/* Value + Trend */}
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-gray-900">
              {item.value}
            </h3>

            {item.trend && item.percentage && (
              <div
                className={`flex items-center gap-1 text-sm font-medium ${item.trend === "up"
                  ? "text-green-600"
                  : "text-[#A50134]"
                  }`}
              >
                {item.trend === "up" ? (
                  <HiArrowUp />
                ) : (
                  <HiArrowDown />
                )}
                {item.percentage}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
