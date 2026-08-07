import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
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

const MyParcels = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-secondary">
            Dashboard Overview
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
            <h4 className="text-3xl text-secondary font-extrabold">129</h4>
          </div>
        </div>

        {/* Ready Pick UP */}
        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <FaBoxOpen size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">Ready Pick UP</h5>
            <h4 className="text-3xl text-secondary font-extrabold">1320</h4>
          </div>
        </div>

        {/* In Transit */}
        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <FaTruckMoving size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">In Transit</h5>
            <h4 className="text-3xl text-secondary font-extrabold">50</h4>
          </div>
        </div>

        {/* Ready to Deliver */}
        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <FaHandHoldingHeart size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">
              Ready to Deliver
            </h5>
            <h4 className="text-3xl text-secondary font-extrabold">50</h4>
          </div>
        </div>

        {/* Delivered */}
        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <FaCheckCircle size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">Delivered</h5>
            <h4 className="text-3xl text-secondary font-extrabold">50</h4>
          </div>
        </div>
      </div>

      <ParcelTable parcels={parcels} refetch={refetch} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <LateInvoices />
        <ShipmentAlerts />
      </div>
    </div>
  );
};

export default MyParcels;
