import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { sidebarItems } from "../../constants/data";
import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import TextInput from "../ui/TextInput";

const SearchDropdown = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { rtl: isRtl, mode } = useThemeSettings();

  const filteredItems = sidebarItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigation = (path: string) => {
    window.location.href = path;
    setOpen(false);
  };

  const isDark = mode === "dark";

  return (
    <>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ring-1 ${
          isDark
            ? "ring-gray-700 hover:ring-gray-500 bg-gray-800"
            : "ring-gray-200 hover:ring-gray-400 bg-gray-100"
        }`}
        onClick={() => setOpen(true)}
      >
        <FiSearch
          className={`${isDark ? "text-gray-300" : "text-gray-600"} text-xl`}
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen} maxWidthClass="max-w-lg">
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className={`${isDark ? "text-gray-200" : "text-gray-800"} ${
                isRtl ? "text-right" : "text-left"
              }`}
            >
              Search
            </DialogTitle>
          </DialogHeader>

          <TextInput
            placeholder="Search..."
            value={query}
            onChange={setQuery}
            className="w-full mt-2"
            inputClassName={`text-lg rounded-t-lg ${
              isDark
                ? "bg-gray-900 text-gray-200 ring-gray-700 focus:ring-blue-600"
                : "bg-white text-gray-800 ring-gray-200 focus:ring-blue-500"
            }`}
            style={{ direction: isRtl ? "rtl" : "ltr" }}
          />

          <ul className="max-h-80 overflow-y-auto mt-2">
            {filteredItems.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleNavigation(item.path)}
                className={`px-4 py-3 cursor-pointer flex justify-between items-center rounded-md ${
                  isDark
                    ? "hover:bg-gray-800 text-gray-200"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
                style={{ direction: isRtl ? "rtl" : "ltr" }}
              >
                <div>
                  <p
                    className={`font-semibold text-lg ${
                      isDark ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {item.path}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded-md ${
                    isDark
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Overview
                </span>
              </li>
            ))}

            {filteredItems.length === 0 && (
              <li
                className={`px-4 py-3 text-center ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
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
