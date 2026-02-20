// import React from "react";

// type DetailItemProps = {
//   label: string;
//   value?: string | number | null | boolean;
//   highlight?: boolean;
// };

// const DetailItem: React.FC<DetailItemProps> = ({
//   label,
//   value,
//   highlight = false,
// }) => (
//   <div className="space-y-1">
//     <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//       {label}
//     </p>
//     <p
//       className={`text-sm font-medium ${
//         highlight
//           ? "text-brand-600 dark:text-brand-400"
//           : "text-gray-900 dark:text-white"
//       }`}
//     >
//        {value?.toString() || "-"}
//     </p>
//   </div>
// );

// export default DetailItem;
import React, { useState } from "react";

interface DetailItemProps {
  label: string;
  value?: string | number;
  highlight?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value,
  highlight = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Agar value nahi hai toh "-" dikhayenge
  if (!value) {
    return (
      <div className="space-y-1 min-w-0">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">-</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 min-w-0">
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {label}
      </p>

      <div>
        <p
          className={`text-sm font-medium break-words whitespace-pre-wrap transition-all duration-300 ${
            highlight
              ? "text-brand-600 dark:text-brand-400"
              : "text-gray-900 dark:text-white"
          } ${!isExpanded ? "line-clamp-3" : ""}`}
        >
          {value.toString()}
        </p>

        {/* Button tabhi dikhega jab text bada ho (Approx logic) ya aap hamesha toggle de sakte hain */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-bold text-brand-500 hover:text-brand-700 mt-1 focus:outline-none"
        >
          {isExpanded ? "Show Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export default DetailItem;
