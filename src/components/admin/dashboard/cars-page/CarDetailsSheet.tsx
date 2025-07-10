import { useState } from "react";
import { Car } from "@/lib/data/CarDB";
import Image from "next/image";
import { Calendar, Edit3, Gauge, MapPin, Save, User, X } from "lucide-react";
import InputComponent from "@/components/admin/common/InputComponent";
import { useForm } from "react-hook-form";
import useUiHelper from "@/hooks/useUiHelper";
import { useAdminManager } from "@/context/AdminProvider";
import { motion, AnimatePresence } from "framer-motion";
import { getStatusColor } from "@/pages/admin/dashboard/cars";
import { format } from "date-fns";
import { updateCar } from "@/lib/api.service";

const CarDetailsSheet = ({
  selectedCar,
  onSelectedCar,
  onCarUpdate,
}: {
  selectedCar: Car;
  onSelectedCar: (cardata: Car | null) => void;
  onCarUpdate: (updatedCar: Car) => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const { ui } = useAdminManager();
  const { handleModal } = useUiHelper();
  const [newFeature, setNewFeature] = useState("");
  const { register, handleSubmit, reset, watch, setValue } = useForm<Car>({
    defaultValues: selectedCar,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Watch status val
  const status = watch("status");

  // Watch features arr
  const features = watch("features", selectedCar.features);

  const handleEditMode = () => {
    if (isEdit) {
      reset(selectedCar);
    }
    setIsEdit(!isEdit);
  };

  const onSubmit = async (data: Car) => {
    // console.log("Saving changes:", data);
    try {
      setIsLoading(true);
      const updatedData = {
        ...data,
        lastUpdated: new Date().toISOString(),
      };
      const updateCarRes = await updateCar({ carData: updatedData });
      console.log("updated car response", updateCarRes);

      if (updateCarRes.success) {
        handleModal(false);
        onCarUpdate(updateCarRes.data);
      }
    } catch (err) {
      console.error("Error updating car", err);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(status);

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setValue("features", [...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setValue(
      "features",
      features.filter((feature) => feature !== featureToRemove)
    );
  };

  return (
    <AnimatePresence>
      {ui.isModalOpen && (
        <motion.div
          key="car-details-sheet"
          initial={{ x: 640 }}
          animate={{ x: 0 }}
          exit={{ x: 640 }}
          transition={{ type: "tween" }}
          className="z-20 right-0 absolute bg-accent inset-y-0 w-full md:w-160 shadow-2xl border-l border-accent"
        >
          <form
            className="flex flex-col h-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-600">
              <div className="flex items-center space-x-3">
                <Gauge className="w-6 h-6 text-orange-500" />

                <h2 className="text-xl font-semibold text-orange-500">
                  {selectedCar.make} {selectedCar.model}
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                {isEdit ? (
                  <>
                    <button
                      type="submit"
                      className="flex items-center space-x-2 px-4 py-1 rounded-full bg-green-500 text-white cursor-pointer disabled:bg-gray-300"
                      disabled={isLoading}
                    >
                      <Save className="w-4 h-4" />
                      <span>{isLoading ? "Saving..." : "Save"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleEditMode}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-1 rounded-full bg-gray-500 text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleEditMode}
                    className="flex items-center space-x-2 px-4 py-1 rounded-full bg-orange-500 text-white cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
                <button
                  type="button"
                  className="p-2 hover:bg-gray-200 hover:dark:bg-card rounded-full transition-colors cursor-pointer"
                  onClick={() => {
                    handleModal(false);
                    onSelectedCar(null);
                  }}
                  disabled={isLoading}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Banner*/}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={selectedCar.imageUrl || "/placeholder.svg"}
                    alt={`${selectedCar.make} ${selectedCar.model}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col space-y-2">
                    {isEdit ? (
                      <select
                        {...register("status")}
                        value={status}
                        className={`px-2 py-1 text-xs font-medium rounded-full border border-gray-400 dark:border-gray-600 focus:outline-none ${getStatusColor(
                          status
                        )}`}
                        style={{ maxWidth: "fit-content" }}
                      >
                        {["pending", "approved", "rejected"].map(
                          (statusOption) => (
                            <option
                              key={statusOption}
                              value={statusOption}
                              className="bg-card text-black dark:text-white"
                            >
                              {statusOption.charAt(0).toUpperCase() +
                                statusOption.slice(1)}
                            </option>
                          )
                        )}
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          status
                        )}`}
                        style={{ maxWidth: "fit-content" }}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <span>• {selectedCar.color}</span>
                    <span>• {selectedCar.mileage.toLocaleString()} miles</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{selectedCar.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {isEdit ? (
                      <>
                        <InputComponent
                          label="Price"
                          type="number"
                          {...register("price", { valueAsNumber: true })}
                        />
                        <InputComponent
                          label="Daily Rate"
                          type="number"
                          {...register("dailyRate", { valueAsNumber: true })}
                        />
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-lg">
                            {selectedCar.price}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                          <span>{selectedCar.dailyRate}/day</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Description</h3>
                {isEdit ? (
                  <textarea
                    {...register("description")}
                    className="w-full p-2 border border-primary dark:border-orange-400 rounded-md focus:outline-none min-h-[100px] resize-none"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedCar.description}
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Features</h3>
                {isEdit ? (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Add new feature"
                        className="flex-1 p-2 border border-primary dark:border-orange-400 rounded-md focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="px-4 py-2 bg-orange-500 text-white rounded-md"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-600 text-gray-200 text-sm rounded-full"
                        >
                          <span className="px-3 py-1">{feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(feature)}
                            className="px-2 py-1 rounded-r-full hover:bg-gray-500"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-600 text-gray-200 text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Owner Infor - Not Editable */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Owner Information</h3>
                <div className="bg-card rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">
                      {selectedCar.owner.name}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>Email: {selectedCar.owner.email}</p>
                    <p>Phone: {selectedCar.owner.phone}</p>
                    <p>
                      Member since:
                      {format(
                        new Date(selectedCar.owner.joinDate),
                        "dd MMM yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Submitted
                      </p>
                      <p className="font-medium">
                        {format(
                          new Date(selectedCar.submissionDate),
                          "dd MMM yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last Updated
                      </p>
                      <p className="font-medium">
                        {format(
                          new Date(selectedCar.lastUpdated),
                          "dd MMM yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CarDetailsSheet;
