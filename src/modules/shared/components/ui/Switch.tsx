import React from "react";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;

  // کلاس‌های سفارشی برای بخش‌های مختلف
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
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer select-none ${containerClassName}`}
    >
      {label && (
        <span className={`text-sm text-gray-700 ${labelClassName}`}>
          {label}
        </span>
      )}

      <div
        className={`
          w-8 h-5 flex items-center rounded-full p-1 transition-colors duration-300
          ${checked ? "bg-indigo-500" : "bg-gray-300"}
          ${trackClassName}
        `}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`
            bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300
            ${checked ? "translate-x-3" : "translate-x-0"}
            ${thumbClassName}
          `}
        />
      </div>
    </label>
  );
};

export default Switch;
