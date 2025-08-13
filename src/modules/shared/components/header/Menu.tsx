import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { navItems, treeData } from "../../constants/sidebarData";
import { RiMenu2Fill } from "react-icons/ri";
import { useThemeSettings } from "../../hooks/useThemeSettings";
import { cn } from "../../helpers";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openNodes, setOpenNodes] = useState<{ [key: string]: boolean }>({});
  const { rtl } = useThemeSettings();

  const toggleNode = (id: string) => {
    setOpenNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* دکمه همبرگر */}
      {!isOpen && (
        <button
          className={cn(
            "fixed top-4 z-50 text-2xl text-gray-800 cursor-pointer",
            rtl ? "right-4 rotate-180" : "left-4"
          )}
          onClick={() => setIsOpen(true)}
        >
          <RiMenu2Fill />
        </button>
      )}

      {/* منو با framer-motion */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* منوی کشویی */}
            <motion.div
              initial={{ x: rtl ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: rtl ? "100%" : "-100%" }}
              transition={{ duration: 0.3 }}
              className={cn(
                "fixed top-0 h-full bg-white shadow-lg z-40 p-4 w-64",
                rtl ? "right-0" : "left-0"
              )}
            >
              {/* لینک‌های ساده */}
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center text-gray-800 hover:text-blue-500",
                        rtl
                          ? "flex-row-reverse space-x-reverse space-x-2"
                          : "flex-row space-x-2"
                      )}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* درخت */}
              <ul className="mt-6 space-y-2">
                {treeData.map((node) => (
                  <li key={node.id}>
                    <div
                      className={cn(
                        "flex items-center justify-between cursor-pointer text-gray-800 hover:text-blue-500",
                        rtl && "flex-row-reverse"
                      )}
                      onClick={() => toggleNode(node.id)}
                    >
                      <div
                        className={cn(
                          "flex items-center",
                          rtl
                            ? "flex-row-reverse space-x-reverse space-x-2"
                            : "flex-row space-x-2"
                        )}
                      >
                        <span className="text-xl">{node.icon}</span>
                        <span>{node.label}</span>
                      </div>
                      <span>
                        {openNodes[node.id] ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </div>

                    <AnimatePresence>
                      {openNodes[node.id] && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className={cn(
                            "mt-2 space-y-1 overflow-hidden",
                            rtl ? "mr-6" : "ml-6"
                          )}
                        >
                          {node.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                to={child.path}
                                className={cn(
                                  "flex items-center text-sm text-gray-600 hover:text-blue-500",
                                  rtl
                                    ? "flex-row-reverse space-x-reverse space-x-2"
                                    : "flex-row space-x-2"
                                )}
                              >
                                <span className="text-lg">{child.icon}</span>
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* اورلی محو شونده */}
            <motion.div
              className="fixed inset-0 bg-black z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
