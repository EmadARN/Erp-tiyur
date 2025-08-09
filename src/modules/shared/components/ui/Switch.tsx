import React from "react";
import { useThemeSettings } from "../../hooks/useThemeSettings";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  trackClassName?: string;
  thumbClassName?: string;
};

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  containerClassName = "",
  labelClassName = "",
  trackClassName = "",
  thumbClassName = "",
}) => {
  // get rtl state from redux
  const { rtl } = useThemeSettings();

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer select-none ${containerClassName}`}
    >
      {label && (
        <span
          className={`text-sm text-gray-700 dark:text-gray-200 ${labelClassName}`}
        >
          {label}
        </span>
      )}

      <div
        className={`
          w-8 h-5 flex items-center rounded-full p-1 transition-colors duration-300
          ${checked ? "bg-gray-600" : "bg-gray-600 "}
          ${trackClassName}
        `}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`
            bg-white dark:bg-gray-200 w-3 h-3 rounded-full shadow-md transform transition-transform duration-300
            ${
              checked
                ? rtl
                  ? "translate-x-3" // move left in RTL
                  : "translate-x-3" // move right in LTR
                : "translate-x-0"
            }
            ${thumbClassName}
          `}
        />
      </div>
    </label>
  );
};

export default Switch;
