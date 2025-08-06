import React from "react";

interface SectionTitleProps {
  title: string;
  className?: string; // در صورت نیاز به سفارشی‌سازی ظاهر
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  className = "",
}) => {
  return (
    <div className={`mb-6 text-left ${className}`}>
      <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
    </div>
  );
};

export default SectionTitle;
