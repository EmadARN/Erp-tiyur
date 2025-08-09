import { BsMoon } from "react-icons/bs";
import { MdOutlineFormatTextdirectionRToL } from "react-icons/md";
import { ToggleCard } from "./ToggleCard";
import { useDispatch } from "react-redux";
import {
  toggleMode,
  setDirection,
} from "@/modules/shared/store/slice/themeSlice";
import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";

export function ToggleSection() {
  const dispatch = useDispatch();
  const { mode, rtl: isRtl } = useThemeSettings();

  return (
    <div className="grid grid-cols-2 gap-4">
      <ToggleCard
        icon={<BsMoon />}
        label="Mode"
        value={mode === "dark"}
        onToggle={() => dispatch(toggleMode())}
      />
      <ToggleCard
        icon={<MdOutlineFormatTextdirectionRToL />}
        label="Right to left"
        value={isRtl}
        onToggle={() => dispatch(setDirection(isRtl ? "ltr" : "rtl"))}
      />
    </div>
  );
}
