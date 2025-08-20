import type { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Popover from "../ui/Popover";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { cn } from "../../helpers";
import { useThemeSettings } from "../../hooks/useThemeSettings";

interface TreeChild {
  id: string;
  label: string;
  path: string;
}

interface TreeNodeData {
  id: string;
  label: string;
  icon: React.ReactNode;
  children: TreeChild[];
  path?: string;
}

interface TreeNodeProps {
  isCollapsed: boolean;
  nodes: TreeNodeData[];
  openNodes: { [key: string]: boolean };
  toggleNode: (id: string) => void;
  textVariants: any;
  title: string;
}

export const TreeNode: FC<TreeNodeProps> = ({
  isCollapsed,
  nodes,
  openNodes,
  toggleNode,
  textVariants,
  title,
}) => {
  const navigate = useNavigate();
  const { rtl } = useThemeSettings();

  const handleNodeClick = (node: TreeNodeData) => {
    toggleNode(node.id);
    node.path && navigate(node.path);
  };

  const handleChildClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex-1 px-4 mt-6 w-full">
      {!isCollapsed && <h3 className="text-xs font-semibold mb-2">{title}</h3>}

      <ul>
        {nodes.map((node) => {
          const hasChildren = node.children && node.children.length > 0;

          // لینک اصلی هر node
          const nodeLink = (
            <a
              href={node.path}
              onClick={(e) => {
                e.preventDefault();
                handleNodeClick(node);
              }}
              className={cn(
                "flex items-center justify-between p-3 rounded hover:bg-gray-600 cursor-pointer whitespace-nowrap transition",
                { "flex-row-reverse": rtl, "flex-row": !rtl }
              )}
            >
              <div
                className={cn("flex items-center justify-center", {
                  "flex-col": isCollapsed,
                  "flex-row-reverse": rtl && !isCollapsed,
                  "flex-row": !rtl && !isCollapsed,
                })}
              >
                <span className="text-xl">{node.icon}</span>
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
                      {node.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Chevron */}
              {hasChildren && (
                <span
                  className={cn("mt-0.5 text-sm text-gray-400", {
                    "mr-2": rtl,
                    "ml-2": !rtl,
                  })}
                >
                  {rtl ? (
                    <MdChevronLeft
                      className={cn("w-4 h-4 transition-transform", {
                        "rotate-90": openNodes[node.id],
                      })}
                    />
                  ) : (
                    <MdChevronRight
                      className={cn("w-4 h-4 transition-transform", {
                        "rotate-90": openNodes[node.id],
                      })}
                    />
                  )}
                </span>
              )}
            </a>
          );

          // لیست بچه‌ها برای Popover در حالت collapse
          const childList = (
            <div className="min-w-[200px]">
              {node.children.map((child) => (
                <a
                  key={child.id}
                  href={child.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleChildClick(child.path);
                  }}
                  className={cn(
                    "flex items-center p-2 rounded hover:bg-gray-600 text-sm whitespace-nowrap cursor-pointer",
                    { "flex-row-reverse": rtl, "flex-row": !rtl }
                  )}
                >
                  <span className={rtl ? "mr-2" : "ml-2"}>{child.label}</span>
                </a>
              ))}
            </div>
          );

          return (
            <li key={node.id}>
              {isCollapsed && hasChildren ? (
                // حالت collapse → بچه‌ها داخل Popover
                <Popover content={childList} position={rtl ? "left" : "right"}>
                  {nodeLink}
                </Popover>
              ) : (
                <>
                  {nodeLink}
                  {/* حالت باز → tree با شاخه گرد */}
                  <AnimatePresence>
                    {openNodes[node.id] && hasChildren && (
                      <motion.ul
                        className={cn("relative", rtl ? "mr-6" : "ml-6")}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
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

                              <a
                                href={child.path}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleChildClick(child.path);
                                }}
                                className="flex items-center p-2 rounded hover:bg-gray-600 text-sm cursor-pointer"
                              >
                                <motion.span
                                  className={rtl ? "mr-3" : "ml-3"}
                                  variants={textVariants}
                                  initial="collapsed"
                                  animate="expanded"
                                  exit="collapsed"
                                  transition={{ duration: 0.2 }}
                                >
                                  {child.label}
                                </motion.span>
                              </a>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
