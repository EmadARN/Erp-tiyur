import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // How many pages to show on each side of the current page
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
      {/* Previous */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FiChevronLeft />
      </Button>

      {/* Page numbers */}
      {pageRange.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        )
      )}

      {/* Next */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <FiChevronRight />
      </Button>
    </div>
  );
};
