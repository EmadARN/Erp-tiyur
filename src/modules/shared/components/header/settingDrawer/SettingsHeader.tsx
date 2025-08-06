import { FiX, FiRefreshCw } from "react-icons/fi";
import { LuExpand, LuShrink } from "react-icons/lu";

type Props = {
  onClose: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
};

export function SettingsHeader({
  onClose,
  onToggleFullscreen,
  isFullscreen,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold">Settings</h2>
      <div className="flex items-center gap-3 text-gray-500">
        {isFullscreen ? (
          <LuShrink
            className="cursor-pointer hover:text-black"
            onClick={onToggleFullscreen}
          />
        ) : (
          <LuExpand
            className="cursor-pointer hover:text-black"
            onClick={onToggleFullscreen}
          />
        )}
        <FiRefreshCw className="cursor-pointer hover:text-black" />
        <FiX className="cursor-pointer hover:text-black" onClick={onClose} />
      </div>
    </div>
  );
}
