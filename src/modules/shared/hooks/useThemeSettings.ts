import { useSelector } from "react-redux";
import type { RootState } from "../types";

export function useThemeSettings() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const preset = useSelector((state: RootState) => state.theme.preset);
  const font = useSelector((state: RootState) => state.theme.font);
  const fontSize = useSelector((state: RootState) => state.theme.fontSize);
  const direction = useSelector((state: RootState) => state.theme.direction);
  const sidebarColor = useSelector((state: RootState) => state.theme.sidebarColor);

  return {
    mode,
    preset,
    font,
    fontSize,
    direction,
    rtl: direction === "rtl", 
    sidebarColor,

  };
}
