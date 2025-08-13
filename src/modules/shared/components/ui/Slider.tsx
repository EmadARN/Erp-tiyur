import React from "react";

type SliderProps = {
  value: number | [number, number];
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number | [number, number]) => void;
  formatNumber?: (value: number) => string;
};

const Slider: React.FC<SliderProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  formatNumber,
}) => {
  const isRange = Array.isArray(value);

  const format = (val: number) => {
    return formatNumber ? formatNumber(val) : String(val);
  };

  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: 0 | 1
  ) => {
    const val = Number(e.target.value);
    const newValue: [number, number] = Array.isArray(value)
      ? [...value]
      : [min, max];

    newValue[index] = val;

    // Prevent overlap
    if (index === 0 && val > newValue[1]) return;
    if (index === 1 && val < newValue[0]) return;

    onChange(newValue);
  };

  const calculatePercent = (val: number) => ((val - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col space-y-2">
      {isRange ? (
        <>
          {/* Value Labels */}
          <div className="flex justify-between text-sm text-gray-700 font-medium px-1">
            <span>{format(value[0])}</span>
            <span>{format(value[1])}</span>
          </div>

          {/* Range Slider */}
          <div className="relative w-full h-6">
            {/* Track Background */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-200 rounded" />

            {/* Active Track */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-2 bg-blue-500 rounded"
              style={{
                left: `${calculatePercent(value[0])}%`,
                width: `${
                  calculatePercent(value[1]) - calculatePercent(value[0])
                }%`,
              }}
            />

            {/* Left Thumb */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value[0]}
              onChange={(e) => handleRangeChange(e, 0)}
              className="absolute w-full h-6 appearance-none bg-transparent pointer-events-none
    [&::-webkit-slider-thumb]:pointer-events-auto
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-blue-600
    [&::-moz-range-thumb]:pointer-events-auto
    [&::-moz-range-thumb]:w-4
    [&::-moz-range-thumb]:h-4
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-blue-600"
            />

            {/* Right Thumb */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value[1]}
              onChange={(e) => handleRangeChange(e, 1)}
              className="absolute w-full h-6 appearance-none bg-transparent pointer-events-none
    [&::-webkit-slider-thumb]:pointer-events-auto
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-blue-600
    [&::-moz-range-thumb]:pointer-events-auto
    [&::-moz-range-thumb]:w-4
    [&::-moz-range-thumb]:h-4
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-blue-600"
            />
          </div>
        </>
      ) : (
        <>
          {/* Single Value */}
          <div className="text-sm text-gray-700 font-medium text-right">
            {format(value)}
          </div>

          <input
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={handleSingleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-blue-600
    [&::-moz-range-thumb]:w-4
    [&::-moz-range-thumb]:h-4
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-blue-600"
          />
        </>
      )}
    </div>
  );
};

export default Slider;
