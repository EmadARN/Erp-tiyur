import React from "react";
import clsx from "clsx";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  color?: "slate" | "blue" | "green" | "red" | "purple" | "yellow";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const colorClasses = {
  slate: "checked:bg-slate-800 checked:border-slate-800",
  blue: "checked:bg-blue-600 checked:border-blue-600",
  green: "checked:bg-green-600 checked:border-green-600",
  red: "checked:bg-red-600 checked:border-red-600",
  purple: "checked:bg-purple-600 checked:border-purple-600",
  yellow: "checked:bg-yellow-500 checked:border-yellow-500",
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  id = "checkbox",
  color = "slate",
  size = "md",
  className = "",
}) => {
  return (
    <div className={clsx("inline-flex items-center", className)}>
      <label className="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={clsx(
            "peer cursor-pointer appearance-none rounded border border-slate-300 shadow hover:shadow-md transition-all",
            sizeClasses[size],
            colorClasses[color]
          )}
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
              size === "sm"
                ? "h-3 w-3"
                : size === "lg"
                ? "h-4 w-4"
                : "h-3.5 w-3.5"
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </label>
    </div>
  );
};

export default CustomCheckbox;
