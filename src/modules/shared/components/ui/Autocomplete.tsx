import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

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

  // Debounced fetch
  const debouncedFetch = useCallback(
    debounce(async (q: string) => {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetchSuggestions(q);
        setResults(res);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }, 400),
    []
  );

  useEffect(() => {
    debouncedFetch(query);
  }, [query, debouncedFetch]);

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



//how to use

// const mockFetch = async (query: string): Promise<string[]> => {
//     const allItems = ["Apple", "Banana", "Blueberry", "Blackberry", "Mango", "Melon"];
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(allItems.filter((item) => item.toLowerCase().includes(query.toLowerCase())));
//       }, 500);
//     });
//   };

//   const handleSelect = (value: string) => {
//     console.log("Selected:", value);
//   };

//   <div className="p-6">
//   <AutoComplete fetchSuggestions={mockFetch} onSelect={handleSelect} />
// </div>