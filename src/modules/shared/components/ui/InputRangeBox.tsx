import React from "react";

type Props = {
  label?: string;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  valueFrom?: string | number;
  valueTo?: string | number;
  onChangeFrom?: (val: string) => void;
  onChangeTo?: (val: string) => void;
};

export const InputRangeBox: React.FC<Props> = ({
  label,
  fromPlaceholder = "from",
  toPlaceholder = "to",
  valueFrom,
  valueTo,
  onChangeFrom,
  onChangeTo,
}) => {
  return (
    <div className="w-full">
      {label && <div className="text-sm text-gray-300 mb-2">{label}</div>}
      <div className="flex gap-2">
        {/* from */}
        <div className="flex-1 relative">
          <input
            type="number"
            value={valueFrom}
            onChange={(e) => onChangeFrom?.(e.target.value)}
            placeholder={fromPlaceholder}
            className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 pr-3 text-black placeholder-gray-400 focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* to */}
        <div className="flex-1 relative">
          <input
            type="number"
            value={valueTo}
            onChange={(e) => onChangeTo?.(e.target.value)}
            placeholder={toPlaceholder}
            className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 pr-3 text-black placeholder-gray-400 focus:outline-none focus:border-gray-400"
          />
        </div>
      </div>
    </div>
  );
};
