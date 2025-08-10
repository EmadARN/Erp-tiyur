import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  id?: String | number;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const MotionSelectBox: React.FC<SelectProps> = ({
  id,
  options,
  value,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label || "";

  // بستن منو با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="w-full max-w-sm min-w-[200px] relative">
      {/* دکمه سلکت */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 flex justify-between items-center transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm"
      >
        {selectedLabel || "Select..."}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="h-5 w-5 text-slate-700"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </motion.svg>
      </button>

      {/* منوی بازشو */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded shadow-lg overflow-hidden"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-slate-100 ${
                  option.value === value ? "bg-slate-100" : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MotionSelectBox;
