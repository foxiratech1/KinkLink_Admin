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

import React, { useEffect, useRef, useState } from "react";

type DetailItemProps = {
  label: string;
  value?: string | number | null | boolean;
  highlight?: boolean;
};

const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value,
  highlight = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Ye function check karta hai ki text overflow ho raha hai ya nahi
    const checkOverflow = () => {
      if (textRef.current) {
        const element = textRef.current;
        // Agar scrollHeight (poori height) clientHeight (dikhaayi dene wali height) se badi hai
        // iska matlab text clamp ho raha hai (3 line se zyada hai)
        if (element.scrollHeight > element.clientHeight) {
          setShowSeeMore(true);
        } else {
          // Agar expanded nahi hai tabhi button chupao
          if (!isExpanded) setShowSeeMore(false);
        }
      }
    };

    checkOverflow();
    // Screen resize hone par bhi check karega
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [value, isExpanded]);

  if (!value) return null;

  return (
    <div className="space-y-1 min-w-0">
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {label}
      </p>

      <div className="relative">
        <p
          ref={textRef}
          className={`text-sm font-medium break-words whitespace-pre-wrap transition-all duration-300 ${
            highlight
              ? "text-brand-600 dark:text-brand-400"
              : "text-gray-900 dark:text-white"
          } ${!isExpanded ? "line-clamp-3" : ""}`}
        >
          {value.toString()}
        </p>

        {/* Button tabhi dikhega jab showSeeMore true ho */}
        {showSeeMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline mt-1 block"
          >
            {isExpanded ? "Show Less" : "See More"}
          </button>
        )}
      </div>
    </div>
  );
};
