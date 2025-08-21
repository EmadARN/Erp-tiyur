import type { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";

interface ToggleButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  isCollapsed,
  onToggle,
}) => {
  const { rtl, mode } = useThemeSettings();
  const isDark = mode === "dark";

  return (
    <div className="p-4 flex justify-end">
      <button
        onClick={onToggle}
        className={`p-1 rounded-full focus:outline-none cursor-pointer transition-all
          ring-1 ${
            isDark
              ? "ring-gray-500 hover:ring-gray-300 bg-gray-800"
              : "ring-gray-300 hover:ring-gray-500 bg-gray-50"
          }`}
      >
        {isCollapsed ? (
          rtl ? (
            <FaChevronLeft color={isDark ? "#ddd" : "#555"} size={10} />
          ) : (
            <FaChevronRight color={isDark ? "#ddd" : "#555"} size={10} />
          )
        ) : rtl ? (
          <FaChevronRight color={isDark ? "#ddd" : "#555"} size={10} />
        ) : (
          <FaChevronLeft color={isDark ? "#ddd" : "#555"} size={10} />
        )}
      </button>
    </div>
  );
};
