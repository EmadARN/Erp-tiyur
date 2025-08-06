import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // چند صفحه اطراف صفحه فعلی نمایش داده شود
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) => {
  if (totalPages === 0) return null;

  const createPageRange = () => {
    const pages: (number | "...")[] = [];
    const totalNumbers = siblingCount * 2 + 5; // start, end, siblings, dots

    if (totalPages <= totalNumbers) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const startPage = Math.max(2, currentPage - siblingCount);
      const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

      pages.push(1);
      if (startPage > 2) pages.push("...");
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageRange = createPageRange();

  return (
    <div className="flex justify-center items-center gap-2 mt-4 select-none">
      {/* قبلی */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        <FiChevronLeft />
      </button>

      {/* شماره صفحات */}
      {pageRange.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded border 
              ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }
            `}
          >
            {page}
          </button>
        )
      )}

      {/* بعدی */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};
