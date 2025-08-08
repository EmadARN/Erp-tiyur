import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { cn } from "../../helpers";
import { CiSearch } from "react-icons/ci";

interface SearchInputProps {
  value?: string;
  placeholder?: string;
  className?: string;
  onSearch: (query: string) => void;
  debounceTime?: number;
}

export const SearchInput = ({
  value = "",
  placeholder = "search",
  className,
  onSearch,
  debounceTime = 300,
}: SearchInputProps) => {
  const [query, setQuery] = useState(value);
  const [debouncedQuery, setDebouncedQuery] = useState(value);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [query, debounceTime]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div
      className={cn(
        "relative flex items-center  w-full max-w-md rounded-md border border-slate-200 bg-white px-4 py-2 shadow-sm focus-within:border-slate-400 hover:border-black",
        className
      )}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none "
      />
      {query && (
        <button
          className="absolute  left-0 text-gray-400 hover:text-gray-600"
          onClick={() => setQuery("")}
        >
          <FiX className="w-4 h-4" />
        </button>
      )}

      <CiSearch className="h-5 w-5 text-slate-400 mr-2 " />
    </div>
  );
};
