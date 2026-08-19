import { FaClipboardCheck, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import UseAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const formatWeight = (parcel) => {
  if (parcel.parcelType === "document") return "---";
  return parcel.parcelWeight ? `${parcel.parcelWeight} kg` : "-";
};

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const [page, setPage] = useState(1);

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "completed-deliveries"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered,delivered`,
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

  const calculatePayment = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.5;
    } else {
      return parcel.cost * 0.6;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      {/* Header */}
      <div className="pb-6 mb-10 border-b border-gray-100 gap-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-secondary flex items-center gap-3">
          <FaClipboardCheck className="text-gray-500" />
          Completed Deliveries: {parcels.length}
        </h2>
        <p className="text-base text-gray-500 mt-2">
          View and track your history of successfully delivered parcels.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full align-middle">
          <thead>
            <tr className="text-gray-800 font-normal bg-gray-100 text-sm">
              <th className="font-medium py-3 px-4">ID</th>
              <th className="font-medium py-3 px-4">Parcel</th>
              <th className="font-medium py-3 px-4">Sender</th>
              <th className="font-medium py-3 px-4">Receiver</th>
              <th className="font-medium py-3 px-4">Weight</th>
              <th className="font-medium py-3 px-4">Price</th>
              <th className="font-medium py-3 px-4">Payout</th>
              <th className="font-medium py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-8">
                  No completed deliveries yet.
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
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-gray-800 flex items-center gap-1.5">
                        <FaUser className="text-gray-500 text-xs shrink-0" />
                        {parcel.receiverName}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1.5 truncate max-w-xs">
                        <FaMapMarkerAlt className="text-gray-400 text-xs shrink-0" />
                        {parcel.receiverAddress}
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
                   ${Number(calculatePayment(parcel)).toFixed(2)}
                  </td>
                  <td className="text-gray-700 py-4 px-4">
                   <button className="btn btn-xs pt-0.5 hover:bg-primary/50">CashOut</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

export default CompletedDeliveries;
