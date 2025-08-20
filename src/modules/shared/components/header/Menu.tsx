import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { cn } from "../../helpers";
import { useThemeSettings } from "../../hooks/useThemeSettings";
import { navItems, treeData } from "../../constants/sidebarData";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openNodes, setOpenNodes] = useState<{ [key: string]: boolean }>({});
  const { rtl } = useThemeSettings();
  const navigate = useNavigate();

  const toggleNode = (id: string) => {
    setOpenNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChildClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
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
                "fixed top-0 h-full bg-white shadow-lg z-40 p-4 w-64 overflow-y-auto scrollbar-ghost",
                rtl ? "right-0" : "left-0"
              )}
            >
              {/* لینک‌های ساده */}
              <ul className="space-y-2">
                {navItems.map(item => (
                  <li key={item.id}>
                    <div
                      onClick={() => {
                        navigate(item.path);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex items-center text-gray-800 hover:text-blue-500 cursor-pointer p-2 rounded",
                        rtl ? "flex-row-reverse space-x-reverse space-x-2" : "flex-row space-x-2"
                      )}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* درخت */}
              <ul className="mt-6">
                {treeData.map(node => {
                  const hasChildren = node.children && node.children.length > 0;
                  const isOpenNode = openNodes[node.id];

                  return (
                    <li key={node.id}>
                      {/* لینک node */}
                      <div
                        className={cn(
                          "flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer",
                          rtl ? "flex-row-reverse" : "flex-row"
                        )}
                        onClick={() => hasChildren && toggleNode(node.id)}
                      >
                        <div
                          className={cn(
                            "flex items-center",
                            rtl ? "flex-row-reverse space-x-reverse space-x-2" : "flex-row space-x-2"
                          )}
                        >
                          <span className="text-xl">{node.icon}</span>
                          <span>{node.label}</span>
                        </div>
                        {hasChildren && (
                          <span>
                            {isOpenNode ? <FaChevronDown /> : <FaChevronRight />}
                          </span>
                        )}
                      </div>

                      {/* زیرشاخه‌ها */}
                      <AnimatePresence>
                        {isOpenNode && hasChildren && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn("mt-2", rtl ? "mr-6" : "ml-6")}
                          >
                            {node.children.map((child, idx) => {
                              const isLast = idx === node.children.length - 1;
                              return (
                                <li key={child.id} className="relative pl-6">
                                  {/* خط عمودی */}
                                  <span
                                    className={cn(
                                      "absolute left-0 top-0 border-l border-gray-300",
                                      isLast ? "h-1/2" : "h-full"
                                    )}
                                  />
                                  {/* شاخه گرد */}
                                  <span className="absolute left-0 top-2 w-4 h-4 border-l border-b border-gray-300 rounded-bl" />

                                  <div
                                    onClick={() => handleChildClick(child.path)}
                                    className="flex items-center p-2 rounded hover:bg-gray-100 text-sm cursor-pointer"
                                  >
                                    <span className={rtl ? "mr-3" : "ml-3"}>{child.label}</span>
                                  </div>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
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
