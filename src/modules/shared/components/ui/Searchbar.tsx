import React from "react";
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="flex items-center w-full max-w-xl rounded-md border border-slate-200 bg-white px-4 py-2 shadow-sm focus-within:border-slate-400">
      <CiSearch className="h-5 w-5 text-slate-400 mr-2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
