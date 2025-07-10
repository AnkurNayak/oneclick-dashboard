import { useState } from "react";
import { getCarLists } from "@/lib/api.service";
import { Car } from "@/lib/data/CarDB";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ReceiptText } from "lucide-react";
import useUiHelper from "@/hooks/useUiHelper";
import CarDetailsSheet from "@/components/admin/dashboard/cars-page/CarDetailsSheet";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  // Get curr page from cookies don't want to dirty url by adding page_nos
  const currPage = req.cookies.currentpage
    ? parseInt(req.cookies.currentpage)
    : 1;

  try {
    const response = await getCarLists({ currPage });

    return {
      props: {
        initialCars: response.cars,
        initialPagination: response.pagination,
        initialPage: currPage,
      },
    };
  } catch (err) {
    console.error("Error fetching cars", err);
    return {
      props: {
        initialCars: [],
        initialPagination: null,
        initialPage: currPage,
      },
    };
  }
};

interface AdminCarsPageProps {
  initialCars: Car[];
  initialPagination: {
    currentPage: number;
    totalCars: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  initialPage: number;
}

const AdminCarsPage = ({
  initialCars,
  initialPagination,
}: AdminCarsPageProps) => {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // console.log(initialCars);

  // Optimization : selected row update : state change until next req
  const handleCarUpdate = (updatedCar: Car) => {
    setCars((prevCars) =>
      prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
    );
    setSelectedCar(null);
  };

  const handleSelectedCar = (cardata: Car | null) => {
    setSelectedCar(cardata);
  };

  const handlePageChange = async (newPage: number) => {
    if (isLoading || !pagination || newPage === pagination.currentPage) return;

    setIsLoading(true);
    try {
      // Update cookie
      document.cookie = `currentpage=${newPage}; path=/`;
      // Fetch new data
      const response = await getCarLists({ currPage: newPage });
      setCars(response.cars);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Error pagination:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card flex min-w-0 flex-auto flex-col dark:bg-transparent sm:absolute w-full inset-0">
      <div className="relative flex flex-0 flex-col border-b border-gray-200 dark:border-accent px-6 py-8 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <h4 className="text-4xl font-extrabold tracking-tight">Car Listing</h4>
      </div>
      <CarsTable cars={cars} onSelectedCar={handleSelectedCar} />
      <PaginationComponent
        pagination={pagination}
        onPageChange={handlePageChange}
      />
      {selectedCar && (
        <CarDetailsSheet
          selectedCar={selectedCar}
          onSelectedCar={handleSelectedCar}
          onCarUpdate={handleCarUpdate}
        />
      )}
    </div>
  );
};

// statis color
export const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-600";
  }
};

const CarsTable = ({
  cars,
  onSelectedCar,
}: {
  cars: Car[];
  onSelectedCar: (car: Car) => void;
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
          {cars.map((car, index) => (
            <div
              className="car-table-grid grid items-center gap-4 border-b border-gray-200 dark:border-accent px-6 py-3 md:px-8"
              key={index}
            >
              <div className="relative mr-6 flex h-12 w-12 flex-0 items-center justify-center overflow-hidden rounded border border-gray-300">
                <Image
                  src={car.imageUrl}
                  height={96}
                  width={96}
                  loading="eager"
                  alt="car"
                />
              </div>

              <div>
                {car.make}-{car.model}
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
                >
                  <ReceiptText height={16} width={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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

export default AdminCarsPage;
