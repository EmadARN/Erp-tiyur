import { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { cn } from "../../helpers";

interface SearchInputProps {
  value?: string;
  placeholder?: string;
  className?: string;
  onSearch: (query: string) => void;
  debounceTime?: number;
}

export const SearchInput = ({
  value = "",
  placeholder = "جستجو...",
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
        "relative flex items-center w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-sm ",
        className
      )}
    >
      <FiSearch className="w-5 h-5 text-gray-400 ml-3" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 py-2 pr-3 bg-transparent outline-none text-sm text-gray-800"
      />
      {query && (
        <button
          className="absolute left-3 text-gray-400 hover:text-gray-600"
          onClick={() => setQuery("")}
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
