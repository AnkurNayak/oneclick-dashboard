import { useState } from "react";
import { getCarLists } from "@/lib/api.service";
import { Car } from "@/lib/data/CarDB";
import { GetServerSideProps } from "next";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import CarDetailsSheet from "@/components/admin/dashboard/cars-page/CarDetailsSheet";
import CarsTable from "@/components/admin/dashboard/cars-page/CarsTable";
import PaginationComponent from "@/components/admin/dashboard/cars-page/PaginationComponent";
import CarFilterer from "@/components/admin/dashboard/cars-page/CarFilter";

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

  // handle filter
  const handleFilterChange = async (filter: string | undefined) => {
    setIsLoading(true);
    try {
      document.cookie = `currentpage=1; path=/`;
      const response = await getCarLists({
        currPage: 1,
        statusFilter: filter,
      });
      setCars(response.cars);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Error filtering cars:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card flex min-w-0 flex-auto flex-col dark:bg-transparent sm:absolute w-full inset-0">
      <div className="relative flex flex-0 border-b border-gray-200 dark:border-accent px-6 py-8 items-center justify-between md:px-8">
        <h4 className="text-4xl font-extrabold tracking-tight">Car Listing</h4>
        <CarFilterer onFilterChange={handleFilterChange} />
      </div>
      <CarsTable
        cars={cars}
        onSelectedCar={handleSelectedCar}
        isLoading={isLoading}
      />
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

export default AdminCarsPage;
