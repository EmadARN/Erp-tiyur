import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { FiInbox } from "react-icons/fi";

interface NoDataProps {
  /** Main title */
  title?: string;
  /** Description text */
  description?: string;
  /** Custom icon */
  icon?: ReactNode;
  /** Additional classes for container styling */
  className?: string;
}

const NoData: React.FC<NoDataProps> = ({
  title = "No Data",
  description = "Please try again later",
  icon,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full py-20 text-gray-500 ${className}`}
    >
      <motion.div
        className="p-6 rounded-full bg-gray-100"
        animate={{ scale: [0.8, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {icon || <FiInbox className="w-12 h-12" />}
      </motion.div>
      <motion.p
        className="mt-4 text-lg font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {title}
      </motion.p>
      <motion.p
        className="mt-2 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
      >
        {description}
      </motion.p>
    </div>
  );
};

export default NoData;
