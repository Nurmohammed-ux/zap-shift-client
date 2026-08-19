import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaHandHoldingHeart,
  FaMoneyBillWave,
  FaPlus,
  FaTruckMoving,
} from "react-icons/fa";
import ParcelTable from "../../../componenets/ParcelTable/ParcelTable";
import LateInvoices from "../../../componenets/LateInvoices/LateInvoices";
import ShipmentAlerts from "../../../componenets/ShipmentAlerts/ShipmentAlerts";
import { useMemo } from "react";
import Loading from "../../../componenets/Loading/Loading";

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

 const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });


  const stats = useMemo(() => {
    const toPay = parcels.filter((p) => p.paymentStatus !== "paid").length;
    const readyForPickup = parcels.filter(
      (p) => p.deliveryStatus === "ready-for-pickup",
    ).length;
    // "driver-assigned" + "rider-arriving" are both pre-pickup courier
    // movement — grouped together as one stage.
    const driverAssigned = parcels.filter((p) =>
      ["driver-assigned", "rider-arriving"].includes(p.deliveryStatus),
    ).length;
    const pickedUp = parcels.filter(
      (p) => p.deliveryStatus === "parcel-picked-up",
    ).length;
    const delivered = parcels.filter(
      (p) => p.deliveryStatus === "parcel-delivered",
    ).length;

    return { toPay, readyForPickup, driverAssigned, pickedUp, delivered };
  }, [parcels]);

  if (isLoading) return <Loading />;

  return (
    <div className="p-2 md:p-8">
      <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
        <div>
          <h2 className="text-3xl font-bold text-secondary">
            Parcels Overview
          </h2>
          <p className="text-gray-500">
            You can access all your data and information from here.{" "}
          </p>
        </div>
        <Link to={"/sendParcel"} className="btn bg-primary px-6">
          <FaPlus className="text-gray-500" />
          Add Parcel
        </Link>
      </div>
      <div className="border-t border-dashed border-gray-300 my-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* To Pay */}
        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <FaMoneyBillWave size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">To Pay</h5>
            <h4 className="text-3xl text-secondary font-extrabold">
              {stats.toPay}
            </h4>
          </div>
        </div>

        {/* Ready For Pickup */}
        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <FaBoxOpen size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">
              Ready For Pickup
            </h5>
            <h4 className="text-3xl text-secondary font-extrabold">
              {stats.readyForPickup}
            </h4>
          </div>
        </div>

        {/* Driver Assigned (covers driver-assigned + rider-arriving) */}
        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <FaTruckMoving size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">
              Driver Assigned
            </h5>
            <h4 className="text-3xl text-secondary font-extrabold">
              {stats.driverAssigned}
            </h4>
          </div>
        </div>

        {/* Picked Up */}
        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <FaHandHoldingHeart size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">Picked Up</h5>
            <h4 className="text-3xl text-secondary font-extrabold">
              {stats.pickedUp}
            </h4>
          </div>
        </div>

        {/* Delivered */}
        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <FaCheckCircle size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">Delivered</h5>
            <h4 className="text-3xl text-secondary font-extrabold">
              {stats.delivered}
            </h4>
          </div>
        </div>
      </div>

      <ParcelTable parcels={parcels} refetch={refetch} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <LateInvoices parcels={parcels} />
        <ShipmentAlerts parcels={parcels} />
      </div>
    </div>
  );
};

export default MyParcels;
