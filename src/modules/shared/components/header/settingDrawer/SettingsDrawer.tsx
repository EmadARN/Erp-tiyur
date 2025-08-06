import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsHeader } from "./SettingsHeader";
import { ToggleSection } from "./ToggleSection";
import { ColorSection } from "./ColorSection";
import { PresetSection } from "./PresetSection";
import { FontSection } from "./FontSection";
import { FontSizeSection } from "./FontSizeSection";

type Props = {
  open: boolean;
  onClose: () => void;
  dashboardRef: React.RefObject<HTMLDivElement | null>;
};

export function SettingsDrawer({ open, onClose, dashboardRef }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [settings, setSettings] = useState({
    mode: false,
    contrast: false,
    rtl: false,
    compact: true,
    layout: "left",
    color: "integrate",
    preset: "green",
    font: "public",
    fontSize: 16,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        !isFullscreen
      ) {
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose, isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (dashboardRef.current && !isFullscreen) {
      try {
        await dashboardRef.current.requestFullscreen();
      } catch (err) {
        console.error("Failed to enter fullscreen:", err);
      }
    } else if (isFullscreen) {
      try {
        await document.exitFullscreen();
      } catch (err) {
        console.error("Failed to exit fullscreen:", err);
      }
    }
  };

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 rounded-l-2xl p-5 overflow-y-auto`}
          ref={drawerRef}
        >
          <SettingsHeader
            onClose={onClose}
            onToggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          />

          <ToggleSection settings={settings} updateSettings={updateSettings} />
          <ColorSection settings={settings} updateSettings={updateSettings} />
          <PresetSection settings={settings} updateSettings={updateSettings} />
          <FontSection settings={settings} updateSettings={updateSettings} />
          <FontSizeSection
            settings={settings}
            updateSettings={updateSettings}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
