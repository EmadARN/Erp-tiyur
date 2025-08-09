import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineHome, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { useThemeSettings } from "../../hooks/useThemeSettings";

export function AccountDrawer() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { rtl } = useThemeSettings();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={drawerRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src="/avatars/01.png" alt="user" />
          <AvatarFallback>JF</AvatarFallback>
        </Avatar>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute mt-2 w-64 bg-white shadow-lg rounded-md p-4 z-50
              ${rtl ? "left-0" : "right-0"}`}
          >
            <div className="text-center space-y-1">
              <p className="font-medium text-sm">Jaydon Frankie</p>
              <p className="text-xs text-gray-500">demo@minimals.cc</p>
            </div>

            <div
              className={`flex justify-center my-4 ${
                rtl ? "flex-row-reverse gap-2" : "gap-2"
              }`}
            >
              {["01", "02", "03"].map((id) => (
                <Avatar key={id} className="w-8 h-8 border border-white">
                  <AvatarImage src={`/avatars/${id}.png`} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
              <Button variant="outline" size="icon" className="w-8 h-8">
                +
              </Button>
            </div>

            <div className="space-y-2 text-sm">
              <Button
                variant="ghost"
                className={`w-full gap-2 ${
                  rtl ? "flex-row-reverse justify-end" : "justify-start"
                }`}
              >
                <AiOutlineHome className="w-4 h-4" /> Home
              </Button>
              <Button
                variant="ghost"
                className={`w-full gap-2 ${
                  rtl ? "flex-row-reverse justify-end" : "justify-start"
                }`}
              >
                <AiOutlineUser className="w-4 h-4" /> Profile
              </Button>
            </div>

            <Button
              variant="destructive"
              className={`mt-4 w-full gap-2 ${
                rtl ? "flex-row-reverse justify-center" : "justify-center"
              }`}
            >
              <AiOutlineLogout className="w-4 h-4" /> Logout
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
