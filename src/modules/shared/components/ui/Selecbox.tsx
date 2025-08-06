import React from "react";

type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const SelectBox: React.FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <div className="w-full max-w-sm min-w-[200px]">
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700 pointer-events-none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </div>
  );
};

export default SelectBox;




//how to use
//  const [selected, setSelected] = useState("london");

// const cities = [
//     { value: "brazil", label: "Brazil" },
//     { value: "bucharest", label: "Bucharest" },
//     { value: "london", label: "London" },
//     { value: "washington", label: "Washington" },
//   ];


{/* <Select
options={cities}
value={selected}
onChange={(val) => setSelected(val)}
/> */}