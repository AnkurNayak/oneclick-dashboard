import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationComponent = ({
  pagination,
  onPageChange,
}: {
  pagination: {
    currentPage: number;
    totalCars: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  onPageChange: (newPage: number) => void;
}) => {
  return (
    <div className="z-10 bg-accent border border-card sm:bottom-0 sm:inset-x-0 sm:absolute">
      <div
        className="flex items-center justify-center space-x-4"
        style={{ height: "72px" }}
      >
        <button
          className={
            "h-6 w-6 rounded-full hover:bg-primary flex items-center justify-center cursor-pointer"
          }
          onClick={() => onPageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
        >
          <ChevronLeft height={16} width={16} />
        </button>
        {Array.from({ length: pagination.totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`w-8 h-8 rounded-md hover:bg-primary cursor-pointer ${
              pagination.currentPage === index + 1 && "bg-card"
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="h-6 w-6 rounded-full hover:bg-primary flex items-center justify-center cursor-pointer"
          onClick={() => onPageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
        >
          <ChevronRight height={16} width={16} />
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
