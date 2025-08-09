import type { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeSettings } from "../../hooks/useThemeSettings";

interface NavItem {
  id: string | number;
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface NavSectionProps {
  isCollapsed: boolean;
  navItems: NavItem[];
  textVariants: any;
  title: string;
}

export const NavSection: FC<NavSectionProps> = ({
  isCollapsed,
  navItems,
  textVariants,
  title,
}) => {
  const { rtl } = useThemeSettings();

  return (
    <nav className="flex-1 px-4">
      <h3
        className={`text-xs font-semibold ${
          isCollapsed ? "hidden" : "block"
        } mb-2`}
      >
        {title}
      </h3>
      <ul>
        {navItems.map((item) => (
          <li key={item.id} className="mb-2">
            <a
              href={item.path}
              className={`flex items-center p-4 rounded hover:bg-gray-700 ${
                rtl ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    className={rtl ? "mr-3" : "ml-3"}
                    variants={textVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
