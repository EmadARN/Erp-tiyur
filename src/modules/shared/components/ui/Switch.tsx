import React from "react";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <div
        className={`w-6 h-4 flex items-center bg-gray-300 rounded-full p-1 transition-colors duration-300 ${
          checked ? "bg-indigo-500" : ""
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`bg-white w-2 h-2 rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? "translate-x-2" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
};

export default Switch;
