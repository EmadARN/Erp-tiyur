import React, { useEffect, useState, useRef } from "react";

interface AutoCompleteProps {
  fetchSuggestions: (query: string) => Promise<string[]>;
  onSelect: (value: string) => void;
  placeholder?: string;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  fetchSuggestions,
  onSelect,
  placeholder = "Search...",
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchSuggestions(query);
        setResults(res);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query, fetchSuggestions]);

  return (
    <div className="w-full max-w-md relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-slate-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-slate-500"
      />

      {loading && (
        <div className="absolute right-2 top-2.5 h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
      )}

      {results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg">
          {results.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(item);
                setQuery(item);
                setResults([]);
              }}
              className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
