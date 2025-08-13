import { useEffect, type PropsWithChildren } from "react";
import { useThemeSettings } from "../hooks/useThemeSettings";

export function ThemeProvider({ children }: PropsWithChildren) {
  const { mode, preset, font, fontSize, direction, sidebarColor } = useThemeSettings();

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
    root.style.setProperty("--app-color-preset", preset);
    root.style.setProperty("--app-sidebar-color", sidebarColor);

  }, [mode, preset, font, fontSize, direction, sidebarColor]);

  return <>{children}</>;
}
