import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { ReactNode } from "react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
}: DialogProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog Container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {title && (
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {title}
                </h2>
              )}

              {/* Body */}
              <div className="text-gray-700 dark:text-gray-300">{children}</div>

              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                onClick={onClose}
              >
                &#10005;
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
