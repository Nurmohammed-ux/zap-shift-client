import { Link } from "react-router";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuFilter } from "react-icons/lu";

const formatTimeAgo = (isoString) => {
  if (!isoString) return "-";
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

const LateInvoices = ({ parcels = [] }) => {
  
  const invoices = [...parcels]
    .filter((p) => p.paymentStatus !== "paid")
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .slice(0, 6);

  return (
    <div className="bg-white rounded-2xl p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-secondary">Late Invoices</h3>
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/invoices"
            className="btn btn-sm bg-primary rounded-full font-semibold"
          >
            View All Invoices
          </Link>
          <LuFilter className="text-gray-400 cursor-pointer" />
          <HiOutlineDotsVertical className="text-gray-400 cursor-pointer" />
        </div>
      </div>

      <table className="table w-full">
        <thead>
          <tr className="text-gray-800 font-normal text-sm">
            <th className="font-medium">No</th>
            <th className="font-medium">Price</th>
            <th className="font-medium">Date</th>
            <th className="font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-gray-400 py-8">
                No late invoices — everything's paid up.
              </td>
            </tr>
          ) : (
            invoices.map((parcel) => (
              <tr key={parcel._id} className="border-t border-gray-100">
                <td className="text-gray-600">
                  {parcel.trackingId ||
                    `#${parcel._id?.slice(-6).toUpperCase()}`}
                </td>
                <td className="text-gray-600">
                  {Number(parcel.cost ?? 0).toFixed(2)}
                </td>
                <td className="text-gray-500">
                  {formatTimeAgo(parcel.createdAt)}
                </td>
                <td>
                  <HiOutlineDotsVertical className="text-gray-400 cursor-pointer" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LateInvoices;
