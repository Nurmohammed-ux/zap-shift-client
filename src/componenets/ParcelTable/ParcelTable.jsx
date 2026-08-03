import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuCalendar, LuChevronDown, LuFilter, LuPencil } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
// import { Link } from "react-router";

const PAGE_SIZE = 6;

// const typeStyles = {
//   document: "bg-blue-100 text-blue-600",
//   "non-document": "bg-green-100 text-green-600",
// };

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-orange-100 text-orange-600";
    case "ready for pickup":
    case "ready pick up":
    case "ready-for-pickup":
      return "bg-amber-100 text-amber-600";
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

const formatDate = (isoString) => {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatWeight = (parcel) => {
  if (parcel.parcelType === "document") return "---";
  return parcel.parcelWeight ? `${parcel.parcelWeight} kg` : "-";
};

const ParcelTable = ({ parcels = [], refetch }) => {
  const [page, setPage] = useState(1);
  const axiosSecure = UseAxiosSecure();

  const totalPages = Math.max(1, Math.ceil(parcels.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = parcels.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleParcelDelete = (id) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/parcels/${id}`).then((result) => {
          // console.log(result.data);
          if (result.data.deletedCount) {
            // refresh the ui by refetch
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      parcelName: parcel.parcelName,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      cost: parcel.cost,
    };

    const res = await axiosSecure.post(
      `/payment-checkout-session`,
      paymentInfo,
    );

    // console.log(res.data.url);

    window.location.assign(res.data.url);
  };

  return (
    <div className="bg-white rounded-2xl p-6 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-secondary">Shipping Reports</h3>
        <div className="flex items-center gap-3">
          <button className="btn btn-sm bg-white border border-gray-200 rounded-full gap-2 font-normal">
            <LuCalendar className="text-gray-400" /> This Week
            <LuChevronDown className="text-gray-400" />
          </button>
          <LuFilter className="text-gray-400 cursor-pointer" />
          <HiOutlineDotsVertical className="text-gray-400 cursor-pointer" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-gray-800 font-normal bg-gray-100 text-sm">
              <th className="font-medium">ID</th>
              <th className="font-medium">Parcel</th>
              <th className="font-medium">Sender</th>
              <th className="font-medium">Date</th>
              <th className="font-medium">Weight</th>
              <th className="font-medium">Shipper</th>
              <th className="font-medium">Price</th>
              <th className="font-medium">Payment</th>
              <th className="font-medium">Delivery Status</th>
              <th className="font-medium">Action</th>
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
                  className="border-t border-gray-100 even:bg-gray-100"
                >
                  <td className="text-gray-500">
                    #{parcel._id?.slice(-6).toUpperCase()}
                  </td>
                  <td className="font-medium text-secondary">
                    {parcel.parcelName}
                  </td>
                  <td className="text-gray-500">{parcel.senderName}</td>
                  <td className="text-gray-500">
                    {formatDate(parcel.createdAt)}
                  </td>
                  <td className="text-gray-500">{formatWeight(parcel)}</td>
                  <td>ZapShift</td>
                  <td className="text-gray-700">
                    ${Number(parcel.cost ?? 0).toFixed(2)}
                  </td>
                  <td>
                    {parcel.paymentStatus === "paid" ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      // <Link to={`/dashboard/payment/${parcel._id}`}>
                      //   <button className="btn btn-xs btn-primary text-black">
                      //     Pay
                      //   </button>
                      // </Link>

                      <button
                        onClick={() => handlePayment(parcel)}
                        className="btn btn-xs btn-primary text-black"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td className="text-gray-700">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                        parcel.deliveryStatus || "pending",
                      )}`}
                    >
                      {parcel.deliveryStatus || "Pending"}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-4 text-gray-500">
                      <button className=" hover:text-secondary">
                        <LuPencil size={14} />
                      </button>
                      <button
                        onClick={() => handleParcelDelete(parcel._id)}
                        className="text-red-300 hover:text-red-600"
                      >
                        <RiDeleteBin5Line size={18} />
                      </button>
                      <button className=" hover:text-secondary">
                        <HiOutlineDotsVertical className="cursor-pointer" />
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
        <div className="flex justify-between items-center mt-4">
          <button
            className="btn btn-sm bg-white border border-gray-200 rounded-full"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`size-7 rounded-full text-sm ${
                  currentPage === n
                    ? "bg-primary font-semibold"
                    : "text-gray-500"
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

export default ParcelTable;
