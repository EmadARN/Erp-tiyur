import { FiX, FiRefreshCw } from "react-icons/fi";
import { LuExpand, LuShrink } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { resetTheme } from "@/modules/shared/store/slice/themeSlice";
import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import { Button } from "../../ui/Button";

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
  const dispatch = useDispatch();
  const { mode, rtl } = useThemeSettings();

  const handleRefresh = () => {
    dispatch(resetTheme());
  };

  const baseIcon = mode === "dark" ? "text-gray-300" : "text-gray-500";
  const hoverIcon =
    mode === "dark"
      ? "hover:text-white focus:ring-white/40"
      : "hover:text-black focus:ring-black/10";

  return (
    <div
      className={`flex items-center justify-between mb-6 ${
        rtl ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <h2 className="text-xl font-semibold">Settings</h2>

      <div className={`flex items-center ${rtl ? "flex-row-reverse" : ""}`}>
        <Button
          variant="ghost"
          size="icon"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          onClick={onToggleFullscreen}
          className={`${baseIcon} ${hoverIcon}`}
        >
          {isFullscreen ? <LuShrink size={18} /> : <LuExpand size={18} />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Reset theme"
          onClick={handleRefresh}
          className={`${baseIcon} ${hoverIcon}`}
        >
          <FiRefreshCw size={18} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Close settings"
          onClick={onClose}
          className={`${baseIcon} ${hoverIcon}`}
        >
          <FiX size={18} />
        </Button>
      </div>
    </div>
  );
}
