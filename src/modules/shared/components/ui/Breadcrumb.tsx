import React from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="w-max">
      <ol className="flex w-full flex-wrap items-center rounded-md  px-4 py-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800"
          >
            {item.href ? (
              <a href={item.href} className="cursor-pointer">
                {item.label}
              </a>
            ) : (
              <span className="text-slate-800">{item.label}</span>
            )}

            {index < items.length - 1 && (
              <span className="pointer-events-none mx-2 text-slate-800">.</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;




// //items :   const breadcrumbItems = [
//     { label: "Docs", href: "/docs" },
//     { label: "Components", href: "/docs/components" },
//     { label: "Breadcrumbs" }, // آیتم آخر معمولاً لینک نداره
//   ];