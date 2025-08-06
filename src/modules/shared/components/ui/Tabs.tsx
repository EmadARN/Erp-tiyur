import { useState } from "react";
import { motion } from "framer-motion";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultIndex?: number;
};

const Tabs: React.FC<TabsProps> = ({ tabs, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex space-x-4 border-b border-gray-200 relative">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative py-2 px-4 text-sm font-medium transition-colors ${
              activeIndex === index
                ? "text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            {activeIndex === index && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded"
              />
            )}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="mt-4">{tabs[activeIndex].content}</div>
    </div>
  );
};

export default Tabs;
