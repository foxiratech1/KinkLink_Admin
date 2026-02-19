import React from "react";

type DetailItemProps = {
    label: string;
    value?: string | number | null | boolean;
    highlight?: boolean;
};

const DetailItem: React.FC<DetailItemProps> = ({
    label,
    value,
    highlight = false,
}) => (
    <div className="space-y-1">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {label}
        </p>
        <p
            className={`text-sm font-medium ${highlight
                    ? "text-brand-600 dark:text-brand-400"
                    : "text-gray-900 dark:text-white"
                }`}
        >
            {value?.toString() || "-"}
        </p>
    </div>
);

export default DetailItem;
