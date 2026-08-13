import { Link } from "react-router";
import { FaTimesCircle, FaRedo, FaArrowLeft } from "react-icons/fa";

const PaymentCancelled = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center flex flex-col items-center">
        {/* Cancelled Icon */}
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <FaTimesCircle size={60} />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-secondary mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Your payment session was cancelled, and no charges were made to your
          account. You can try again whenever you are ready.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Link
            to={-1}
            className="btn bg-primary text-black font-semibold w-full hover:bg-primary/90 flex items-center justify-center gap-2 shadow-sm"
          >
            <FaRedo size={12} /> Try Again
          </Link>
          <Link
            to="/dashboard/my-parcels"
            className="btn btn-ghost border border-gray-200 text-gray-800 hover:text-secondary w-full flex items-center justify-center gap-2"
          >
            <FaArrowLeft size={12} /> Back to My Parcels
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
