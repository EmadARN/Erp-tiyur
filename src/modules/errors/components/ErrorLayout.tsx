import React from "react";
import { Button } from "@/modules/shared/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ErrorLayoutProps {
  code: string;
  title: string;
  description: string;
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({
  code,
  title,
  description,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            70% {
              background-position: 200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          .animate-shimmer {
            background-size: 200% 100%;
            animation: shimmer 6s infinite linear;
          }
        `}
      </style>

      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-center">
        {/* Error Code with shimmer animation */}
        <motion.h1
          className="text-7xl font-extrabold mb-4 relative inline-block
                     text-transparent bg-clip-text
                     bg-gradient-to-r from-violet-700 via-violet-400 to-violet-700
                     animate-shimmer"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {code}
        </motion.h1>

        {/* Title */}
        <motion.h2
          className="text-3xl font-semibold mb-3 text-gray-900"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-600 max-w-md mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {description}
        </motion.p>

        {/* Back Button */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 text-sm font-medium"
            variant="outline"
            size="sm"
          >
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default ErrorLayout;
