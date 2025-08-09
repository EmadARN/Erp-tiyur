import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../helpers";
import { ToggleButton } from "./ToggleButton";
import { NavSection } from "./NavSection";
import { TreeNode } from "./TreeNode";
import { navItems, treeData } from "../../constants/sidebarData";
import { useThemeSettings } from "../../hooks/useThemeSettings";

interface OpenNodes {
  [key: string]: boolean;
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [openNodes, setOpenNodes] = useState<OpenNodes>({});
  const { sidebarColor, rtl } = useThemeSettings();

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const toggleNode = (nodeId: string) => {
    setOpenNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const sidebarVariants = {
    expanded: { width: "250px" },
    collapsed: { width: "110px" },
  };

  const textVariants = {
    expanded: { opacity: 1, display: "inline" },
    collapsed: { opacity: 0, display: "none" },
  };

  // رنگ و متن بر اساس حالت
  const sidebarBgClass =
    sidebarColor === "white"
      ? "bg-white text-gray-900"
      : "bg-[rgb(16,24,40)] text-white";

  return (
    <motion.aside
      className={cn(
        "relative top-0 h-screen flex flex-col transition-colors duration-300",
        sidebarBgClass,
        rtl ? "right-0 text-right" : "left-0 text-left",
        { "items-center": isCollapsed }
      )}
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3 }}
    >
      {/* دکمه باز/بستن در سمت مخالف */}
      <div className={cn("absolute top-5", rtl ? "-left-8.5" : "-right-8.5")}>
        <ToggleButton isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      </div>

      <div className="mt-20">
        <NavSection
          isCollapsed={isCollapsed}
          navItems={navItems}
          textVariants={textVariants}
          title="OVERWIEW"
        />
        <TreeNode
          isCollapsed={isCollapsed}
          nodes={treeData}
          openNodes={openNodes}
          toggleNode={toggleNode}
          textVariants={textVariants}
          title="MANAGEMENT"
        />
      </div>
    </motion.aside>
  );
};

export default Sidebar;
