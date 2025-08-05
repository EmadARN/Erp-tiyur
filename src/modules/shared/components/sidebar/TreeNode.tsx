import type { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Popover from "../ui/Popover";
import { MdChevronRight } from "react-icons/md";
import { cn } from "../../helpers";

interface TreeChild {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
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

          const nodeLink = (
            <a
              href={node.path}
              onClick={(e) => {
                e.preventDefault();
                handleNodeClick(node);
              }}
              className="flex items-center justify-between p-4 rounded hover:bg-gray-700 cursor-pointer whitespace-nowrap"
            >
              <div
                className={cn("flex items-center justify-center", {
                  "flex-col": isCollapsed,
                })}
              >
                <span className="text-xl">{node.icon}</span>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      className="ml-3 "
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

              {/* Chevron if collapsed & has children */}
              {hasChildren && isCollapsed && (
                <span className="ml-2 mt-0.5 text-sm text-gray-400">
                  <MdChevronRight className="w-4 h-4" />
                </span>
              )}
            </a>
          );

          // Child list inside popover
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
                  className="flex items-center p-2 rounded hover:bg-gray-700 text-sm whitespace-nowrap"
                >
                  <span className="text-xl">{child.icon}</span>
                  <span className="ml-2">{child.label}</span>
                </a>
              ))}
            </div>
          );

          return (
            <li key={node.id}>
              {isCollapsed && hasChildren ? (
                <Popover content={childList} position="right">
                  {nodeLink}
                </Popover>
              ) : (
                <>
                  {nodeLink}
                  <AnimatePresence>
                    {openNodes[node.id] && (
                      <motion.ul
                        className="ml-6"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {node.children.map((child) => (
                          <li key={child.id}>
                            <a
                              href={child.path}
                              onClick={(e) => {
                                e.preventDefault();
                                handleChildClick(child.path);
                              }}
                              className="flex items-center p-2 rounded hover:bg-gray-700"
                            >
                              <span className="text-xl">{child.icon}</span>
                              <motion.span
                                className="ml-3"
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
                        ))}
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
