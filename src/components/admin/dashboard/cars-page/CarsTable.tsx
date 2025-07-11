import useUiHelper from "@/hooks/useUiHelper";
import { Car } from "@/lib/data/CarDB";
import { getStatusColor } from "@/pages/admin/dashboard/cars";
import { ReceiptText } from "lucide-react";
import Image from "next/image";

const CarsTable = ({
  cars,
  onSelectedCar,
  isLoading,
}: {
  cars: Car[];
  onSelectedCar: (car: Car) => void;
  isLoading: boolean;
}) => {
  const { handleModal } = useUiHelper();

  const handleOpenCarDetails = (car: Car) => {
    handleModal(true);
    onSelectedCar(car);
  };

  return (
    <div className="flex flex-auto overflow-hidden">
      <div className="flex flex-auto flex-col overflow-hidden sm:mb-18 sm:overflow-y-auto">
        <div className="grid">
          <div className="car-table-grid sticky top-0 z-10 grid gap-4 bg-gray-50 px-6 py-4 text-md font-semibold shadow dark:bg-black dark:bg-opacity-5 md:px-8">
            <div></div>
            <div>Car</div>
            <div className="hidden lg:block">Daily Rate</div>
            <div className="hidden lg:block">Color</div>
            <div className="hidden md:block">Location</div>
            <div className="hidden sm:block">Status</div>
            <div>Details</div>
          </div>

          {isLoading ? (
            Array.from({ length: 15 }, (_, index) => (
              <CarsTableLoader key={`loader-${index}`} />
            ))
          ) : cars && cars.length > 0 ? (
            cars.map((car) => (
              <div
                className="car-table-grid grid items-center gap-4 border-b border-gray-200 dark:border-accent px-6 py-3 md:px-8"
                key={car.id} // Better to use a unique ID from the car object if available
              >
                <div className="relative mr-6 flex h-12 w-12 flex-0 items-center justify-center overflow-hidden rounded border border-gray-300">
                  <Image
                    src={car.imageUrl}
                    height={96}
                    width={96}
                    loading="eager"
                    alt={`${car.make} ${car.model}`}
                    className="object-cover"
                  />
                </div>

                <div>
                  {car.make} - {car.model}
                </div>
                <div className="hidden lg:block">{car.dailyRate}</div>
                <div className="hidden lg:block">{car.color}</div>
                <div className="hidden md:block">{car.location}</div>
                <div
                  className={`rounded-full hidden sm:flex items-center justify-center font-medium ${getStatusColor(
                    car.status
                  )}`}
                >
                  {car.status}
                </div>
                <div className="ml-3">
                  <button
                    className="hover:text-primary cursor-pointer h-full flex items-center justify-center"
                    onClick={() => handleOpenCarDetails(car)}
                    aria-label={`View details for ${car.make} ${car.model}`}
                  >
                    <ReceiptText height={16} width={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-gray-500">
              No cars found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CarsTableLoader = () => {
  return (
    <div className="car-table-grid grid items-center gap-4 border-b border-gray-200 dark:border-accent px-6 py-3 md:px-8">
      <div className="relative mr-6 flex h-12 w-12 flex-0 items-center justify-center overflow-hidden rounded border border-gray-300 dark:border-gray-600">
        <div className="h-full w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      </div>
      <div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-24" />
      </div>
      <div className="hidden lg:block">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-16" />
      </div>
      <div className="hidden lg:block">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-12" />
      </div>
      <div className="hidden md:block">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-20" />
      </div>
      <div className="hidden sm:block">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full w-16" />
      </div>
      <div className="ml-3">
        <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      </div>
    </div>
  );
};

export default CarsTable;
