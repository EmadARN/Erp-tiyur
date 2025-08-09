import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsHeader } from "./SettingsHeader";
import { ToggleSection } from "./ToggleSection";
import { ColorSection } from "./ColorSection";
import { PresetSection } from "./PresetSection";
import { FontSection } from "./FontSection";
import { FontSizeSection } from "./FontSizeSection";
import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import { cn } from "@/modules/shared/helpers";

type Props = {
  open: boolean;
  onClose: () => void;
  dashboardRef: React.RefObject<HTMLDivElement | null>;
};

export function SettingsDrawer({ open, onClose, dashboardRef }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { mode, rtl: isRtl } = useThemeSettings();

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: isRtl ? "-100%" : "100%" }}
          animate={{ x: 0 }}
          exit={{ x: isRtl ? "-100%" : "100%" }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed top-0 h-full w-[400px] shadow-lg z-50 p-5",
            isRtl
              ? "left-0 rounded-r-2xl overflow-y-auto"
              : "right-0 rounded-l-2xl overflow-y-auto",
            mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          )}
          ref={drawerRef}
        >
          <SettingsHeader
            onClose={onClose}
            onToggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          />

          <ToggleSection />
          <ColorSection />
          <PresetSection />
          <FontSection />
          <FontSizeSection />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
