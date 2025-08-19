import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { sidebarItems } from "../../constants/data";

const SearchDropdown = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredItems = sidebarItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigation = (path: string) => {
    window.location.href = path;
    setOpen(false);
  };

  return (
    <>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200"
        onClick={() => setOpen(true)}
      >
        <FiSearch className="text-gray-600 text-xl" />
      </div>

      <Dialog open={open} onOpenChange={setOpen} maxWidthClass="max-w-lg">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 text-lg border-b border-gray-200 outline-none rounded-t-lg focus:ring-2 focus:ring-blue-500"
          />
          <ul className="max-h-80 overflow-y-auto mt-2">
            {filteredItems.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleNavigation(item.path)}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center rounded-md"
              >
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-500">{item.path}</p>
                </div>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded-md">
                  Overview
                </span>
              </li>
            ))}
            {filteredItems.length === 0 && (
              <li className="px-4 py-3 text-gray-400 text-center">
                No results found
              </li>
            )}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchDropdown;
