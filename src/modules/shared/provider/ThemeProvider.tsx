import { useEffect, type PropsWithChildren } from "react";
import { useThemeSettings } from "../hooks/useThemeSettings";
import { type PresetColor } from "../store/slice/themeSlice";

const presetColorMap: Record<PresetColor, string> = {
  blue: "59 130 246",
  green: "34 197 94",
  purple: "139 92 246",
  orange: "249 115 22",
};

export function ThemeProvider({ children }: PropsWithChildren) {
  const { mode, preset, font, fontSize, direction, sidebarColor } =
    useThemeSettings();

  useEffect(() => {
    const root = document.documentElement;

    // Apply dark/light mode
    root.classList.remove("light", "dark");
    root.classList.add(mode);

    // Apply direction
    root.setAttribute("dir", direction);

    // Apply CSS variables
    root.style.setProperty("--app-font-family", font);
    root.style.setProperty("--app-font-size", `${fontSize}px`);

    // Apply preset color
    root.style.setProperty("--primary", presetColorMap[preset]);

    // Apply sidebar color
    if (sidebarColor === "white") {
      root.style.setProperty("--sidebar-bg", "#fff");
      root.style.setProperty("--sidebar-text", "#111827");
    } else {
      root.style.setProperty("--sidebar-bg", "rgb(16,24,40)");
      root.style.setProperty("--sidebar-text", "#fff");
    }
  }, [mode, preset, font, fontSize, direction, sidebarColor]);

  return <>{children}</>;
}
