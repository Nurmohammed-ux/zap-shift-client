import { useQuery } from "@tanstack/react-query";
import {
  FaCheck,
  FaMapMarkerAlt,
  FaTasks,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-orange-100 text-orange-600";
    case "ready for pickup":
    case "ready pick up":
    case "ready-for-pickup":
      return "bg-amber-100 text-amber-600";
    case "driver-assigned":
    case "driver_assigned":
      return "bg-blue-100 text-blue-600";
    case "rider-arriving":
    case "rider_arriving":
      return "bg-indigo-100 text-indigo-600";
    case "parcel-picked-up":
      return "bg-purple-100 text-purple-600";
    case "parcel-delivered":
    case "delivered":
      return "bg-green-100 text-green-600";
    case "waiting":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const formatWeight = (parcel) => {
  if (parcel.parcelType === "document") return "---";
  return parcel.parcelWeight ? `${parcel.parcelWeight} kg` : "-";
};

const AssignedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const [page, setPage] = useState(1);

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "active-deliveries"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned,rider-arriving,parcel-picked-up`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const PAGE_SIZE = 9;

  const totalPages = Math.max(1, Math.ceil(parcels.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = parcels.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderEmail: user?.email,
      trackingId: parcel.trackingId,
    };

    const message = status
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();

          Swal.fire({
            position: "center",
            icon: "success",
            title: `Status updated to ${message}!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleRejectParcel = (parcel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this delivery assignment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const statusInfo = {
          deliveryStatus: "driver-rejected",
          riderEmail: user.email,
        };

        axiosSecure
          .patch(`/parcels/${parcel._id}/status`, statusInfo)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();

              Swal.fire({
                position: "center",
                icon: "success",
                title: "Delivery assignment rejected and returned to pool.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="pb-6 mb-10 border-b border-gray-100 gap-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-secondary flex items-center gap-3">
          <FaTasks className="text-gray-500 text-2xl" />
          Assigned Deliveries
        </h2>
        <p className="text-base text-gray-500 mt-2">
          Always prioritize safety on the road by strictly following traffic
          laws and properly securing every parcel before starting your delivery.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full align-middle">
          <thead>
            <tr className="text-gray-800 font-normal bg-gray-100 text-sm">
              <th className="font-medium py-3 px-4">ID</th>
              <th className="font-medium py-3 px-4">Parcel</th>
              <th className="font-medium py-3 px-4">Sender</th>
              <th className="font-medium py-3 px-4">Weight</th>
              <th className="font-medium py-3 px-4">Price</th>
              <th className="font-medium py-3 px-4">Delivery Status</th>
              <th className="font-medium py-3 px-4">Actions</th>
              <th className="font-medium py-3 px-4">Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-gray-400 py-8">
                  No parcels yet.
                </td>
              </tr>
            ) : (
              pageRows.map((parcel) => (
                <tr
                  key={parcel._id}
                  className="border-t border-gray-100 even:bg-gray-50"
                >
                  <td className="text-gray-500 py-4 px-4">
                    #{parcel._id?.slice(-6).toUpperCase()}
                  </td>
                  <td className="font-medium text-secondary py-4 px-4">
                    {parcel.parcelName}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-gray-800 flex items-center gap-1.5">
                        <FaUser className="text-gray-500 text-xs shrink-0" />
                        {parcel.senderName}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1.5 truncate max-w-xs">
                        <FaMapMarkerAlt className="text-gray-400 text-xs shrink-0" />
                        {parcel.senderAddress}
                      </span>
                    </div>
                  </td>
                  <td className="text-gray-500 py-4 px-4">
                    {formatWeight(parcel)}
                  </td>
                  <td className="text-gray-700 py-4 px-4">
                    ${Number(parcel.cost ?? 0).toFixed(2)}
                  </td>
                  <td className="text-gray-700 py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase whitespace-nowrap ${getStatusBadge(
                        parcel.deliveryStatus || "pending",
                      )}`}
                    >
                      {parcel.deliveryStatus || "Pending"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3 text-gray-500">
                      {parcel.deliveryStatus === "driver-assigned" ||
                      parcel.deliveryStatus === "driver_assigned" ? (
                        <>
                          <button
                            onClick={() =>
                              handleDeliveryStatusUpdate(
                                parcel,
                                "rider-arriving",
                              )
                            }
                            title="Parcel Accept"
                            className="text-green-600 hover:text-green-800 bg-green-50 btn btn-xs"
                          >
                            <FaCheck size={16} />
                          </button>
                          <button
                            onClick={() => handleRejectParcel(parcel)}
                            title="Parcel Reject"
                            className="text-red-400 bg-red-50 btn btn-xs hover:text-red-600"
                          >
                            <FaTimes size={16} />
                          </button>
                        </>
                      ) : parcel.deliveryStatus === "driver-rejected" ||
                        parcel.deliveryStatus === "driver_rejected" ? (
                        <p className="px-2 py-1 rounded-full text-red-700 bg-red-50 text-xs font-semibold">
                          Rejected
                        </p>
                      ) : (
                        <p className="px-2 py-1 rounded-full text-green-700 bg-green-50 text-xs font-semibold">
                          Accepted
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel-picked-up")
                        }
                        disabled={
                          parcel.deliveryStatus === "driver-assigned" ||
                          parcel.deliveryStatus === "driver-rejected" ||
                          parcel.deliveryStatus === "parcel-picked-up"
                        }
                        title="Parcel Picked Up"
                        className="text-secondary bg-green-50 hover:bg-green-100 btn btn-xs pt-0.5 disabled:opacity-45 disabled:cursor-not-allowed"
                      >
                        Picked Up
                      </button>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel-delivered")
                        }
                        disabled={
                          parcel.deliveryStatus === "driver-assigned" ||
                          parcel.deliveryStatus === "driver-rejected" ||
                          parcel.deliveryStatus === "rider-arriving" ||
                          parcel.deliveryStatus !== "parcel-picked-up"
                        }
                        title="Parcel Delivered"
                        className="text-secondary bg-green-50 hover:bg-green-100 btn btn-xs pt-0.5 disabled:opacity-45 disabled:cursor-not-allowed"
                      >
                        Delivered
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {parcels.length > PAGE_SIZE && (
        <div className="flex justify-between items-center mt-8">
          <button
            className="btn btn-sm bg-white border border-gray-200 rounded-full"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`size-7 rounded-full text-sm ${
                  currentPage === n
                    ? "bg-primary font-semibold"
                    : "text-gray-500 bg-gray-100"
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            className="btn btn-sm bg-white border border-gray-200 rounded-full"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignedDeliveries;
