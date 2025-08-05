import type { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ToggleButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  isCollapsed,
  onToggle,
}) => (
  <div className="p-4 flex justify-end">
    <button
      onClick={onToggle}
      className="p-1 rounded-full hover:bg-gray-200 focus:outline-none cursor-pointer bg-gray-100"
    >
      {isCollapsed ? (
        <FaChevronRight color="#555" />
      ) : (
        <FaChevronLeft color="#555" />
      )}
    </button>
  </div>
);
