import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdAssignmentAdd } from "react-icons/md";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa6";
import { FaMapMarkerAlt, FaTimes, FaPhone, FaMotorcycle } from "react-icons/fa";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-orange-100 text-orange-600";
    case "ready for pickup":
    case "ready pick up":
    case "ready-for-pickup":
      return "bg-amber-100 text-amber-600";
    case "driver_rejected":
      return "bg-red-100 text-red-600";
    case "in transit":
    case "intransit":
      return "bg-blue-100 text-blue-600";
    case "delivered":
      return "bg-green-100 text-green-600";
    case "waiting":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const AssignRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const assignModalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const queryClient = useQueryClient();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", "admin-dispatch-pool"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=ready-for-pickup,driver-rejected",
      );
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["rider", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`,
      );
      return res.data;
    },
  });

  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    assignModalRef.current.showModal();
  };

  const handleAssignRider = async (rider) => {
    const riderInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      riderContact: rider.phone,
      trackingId: selectedParcel.trackingId,
    };

    try {
      const res = await axiosSecure.patch(
        `/parcels/${selectedParcel._id}`,
        riderInfo,
      );

      if (res.data.modifiedCount > 0) {
        await queryClient.invalidateQueries({
          queryKey: ["rider"],
        });
        assignModalRef.current.close();

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Rider assigned successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to assign rider. Please try again.",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      {/* Header */}
      <div className="pb-6 mb-10 border-b border-gray-100 gap-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-secondary flex items-center gap-3">
          <MdAssignmentAdd className="text-gray-500" />
          Assign Riders: {parcels.length}
        </h2>
        <p className="text-base text-gray-500 mt-2">
          Dispatch and manage available delivery personnel for pending parcels
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="table w-full text-left border-collapse">
          {/* table Head */}
          <thead>
            <tr className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider font-semibold border-b border-gray-200">
              <th className="py-4 px-6">Parcel Info</th>
              <th className="py-4 px-6">Sender Info</th>
              <th className="py-4 px-6">Tracking Number</th>
              <th className="py-4 px-6">Created At</th>
              <th className="py-4 px-6">Delivery Status</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>

          {/* table Body */}
          <tbody className="divide-y divide-gray-100 text-sm">
            {parcels.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-12 text-gray-400 font-medium"
                >
                  No parcels ready for pickup found.
                </td>
              </tr>
            ) : (
              parcels.map((parcel) => (
                <tr
                  key={parcel._id}
                  className="hover:bg-gray-50/80 transition-colors duration-150 even:bg-gray-100"
                >
                  {/* Parcel Info */}
                  <td className="py-4 px-6 font-semibold text-secondary">
                    <div>{parcel?.parcelName || "N/A"}</div>

                    {/* Display previously rejected riders if any */}
                    {parcel.rejectedRiders &&
                      parcel.rejectedRiders.length > 0 && (
                        <div className="text-xs text-red-500 font-normal mt-1">
                          ⚠️ Rejected by: {parcel.rejectedRiders.join(", ")}
                        </div>
                      )}
                  </td>

                  {/* Sender Info (Name + Address) */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-gray-800 flex items-center gap-1.5">
                        <FaUser className="text-gray-500 text-xs shrink-0" />
                        {parcel?.senderName || "N/A"}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1.5 truncate max-w-xs">
                        <FaMapMarkerAlt className="text-gray-400 text-xs shrink-0" />
                        {parcel?.senderAddress || "Address not provided"}
                      </span>
                    </div>
                  </td>

                  {/* Tracking Number */}
                  <td className="py-4 px-6 text-sm text-gray-600 font-mono">
                    {parcel.trackingId || parcel.transactionId || "N/A"}
                  </td>

                  {/* Created At Info */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-xs font-bold text-secondary">
                        {parcel.createdAt
                          ? new Date(parcel.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Delivery Status */}
                  <td className="text-gray-700">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                        parcel.deliveryStatus || "pending",
                      )}`}
                    >
                      {parcel.deliveryStatus || "Pending"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => openAssignRiderModal(parcel)}
                      className="btn btn-sm hover:bg-primary/50 text-secondary hover:text-black border-none transition-all duration-200 gap-1.5 font-semibold"
                      title="Find Rider"
                    >
                      Find Rider
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Assign Rider Modal */}
      <dialog ref={assignModalRef} className="modal">
        <div className="modal-box w-11/12 max-w-3xl rounded-2xl p-6 bg-white shadow-2xl">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <h3 className="font-extrabold text-xl text-secondary flex items-center gap-2">
              <FaMotorcycle className="text-primary" /> Available Riders:{" "}
              {riders.length}
            </h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-gray-100">
                <FaTimes size={16} />
              </button>
            </form>
          </div>

          {/* Riders Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-100 max-h-96">
            <table className="table w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider font-semibold border-b border-gray-200">
                  <th className="py-3 px-4">Rider Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {riders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-8 text-gray-400 font-medium"
                    >
                      No available riders found in this district.
                    </td>
                  </tr>
                ) : (
                  riders.map((rider) => (
                    <tr
                      key={rider._id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-secondary">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-400 text-xs shrink-0" />
                          {rider.name || "N/A"}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {rider.email || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <FaPhone className="text-gray-400 text-xs shrink-0" />
                          {rider.phone || "N/A"}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {rider.district || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="btn btn-sm bg-primary hover:bg-primary/80 text-secondary border-none font-bold"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AssignRiders;
