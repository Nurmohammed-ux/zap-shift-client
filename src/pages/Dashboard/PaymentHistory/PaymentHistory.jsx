import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaReceipt, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-gray-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-10 border-b border-gray-100 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-secondary flex items-center gap-3">
            <FaReceipt className="text-primary text-2xl" /> Payment History
          </h2>
          <p className="text-gray-500 text-base mt-2">
            Track and review all your completed shipping transactions and parcel
            details.
          </p>
        </div>
        <div className="bg-primary/10 text-secondary px-4 py-2 rounded-xl text-base font-bold border border-primary/20 w-fit">
          Total Transactions: {payments.length}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="table w-full text-left border-collapse">
          {/* table Head */}
          <thead>
            <tr className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider font-semibold border-b border-gray-200">
              <th className="py-4 px-6">Parcel Info</th>
              <th className="py-4 px-6">Recipient Info</th>
              <th className="py-4 px-6">Tracking Number</th>
              <th className="py-4 px-6">Payment Info</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>

          {/* table Body */}
          <tbody className="divide-y divide-gray-100 text-sm">
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-12 text-gray-400 font-medium"
                >
                  No payment history found.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-50/80 transition-colors duration-150 even:bg-gray-100"
                >
                  {/* Parcel Info */}
                  <td className="py-4 px-6 font-semibold text-secondary">
                    {payment.parcel?.parcelName || "N/A"}
                  </td>

                  {/* Recipient Info (Name + Address) */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-gray-800 flex items-center gap-1.5">
                        <FaUser className="text-gray-500 text-xs shrink-0" />
                        {payment.parcel?.receiverName || "N/A"}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1.5 truncate max-w-xs">
                        <FaMapMarkerAlt className="text-gray-400 text-xs shrink-0" />
                        {payment.parcel?.receiverAddress ||
                          "Address not provided"}
                      </span>
                    </div>
                  </td>

                  {/* Tracking / Transaction Number */}
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {payment.transactionId || "N/A"}
                  </td>

                  {/* Payment Info */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1 items-start">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                          payment.paymentStatus === "paid"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {payment.paymentStatus}
                      </span>
                      <span className="text-xs font-bold text-secondary">
                        ${payment.amount} {payment.currency?.toUpperCase()}
                      </span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-center">
                    <button className="btn btn-sm bg-primary/20 hover:bg-primary/50 text-secondary hover:text-black border-none transition-all duration-200 gap-1.5 font-semibold">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
