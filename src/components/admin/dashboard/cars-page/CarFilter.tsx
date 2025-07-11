import { AnimatePresence, motion } from "framer-motion";
import { ListFilter } from "lucide-react";
import { useState } from "react";

const CarFilterer = ({
  onFilterChange,
}: {
  onFilterChange: (filter: string | undefined) => void;
}) => {
  const filters = ["All", "pending", "approved", "rejected"];
  const [selected, setSelected] = useState<null | string>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col relative text-sm">
      <button
        className="rounded-md px-4 h-10 bg-primary flex items-center gap-2 cursor-pointer z-30 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <ListFilter height={16} width={16} />
        Filters
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="absolute top-full left-0 mt-1 w-full bg-accent shadow-md rounded-md z-20 overflow-hidden"
          >
            {filters.map((filter) => (
              <div
                key={filter}
                className={`px-4 py-2 cursor-pointer hover:bg-orange-500 ${
                  selected === filter ? "bg-accent font-medium" : ""
                }`}
                onClick={() => {
                  setSelected(filter);
                  setIsOpen(false);
                  onFilterChange(filter);
                }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarFilterer;
