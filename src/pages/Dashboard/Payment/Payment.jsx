import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaShieldAlt, FaCreditCard, FaArrowLeft } from "react-icons/fa";

const Payment = () => {
  const { parcelId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      parcelName: parcel.parcelName,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      cost: parcel.cost,
    }

    const res = await axiosSecure.post(`/create-checkout-session`, paymentInfo);
    // console.log(res.data.url);
    window.location.href = res.data.url;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-secondary font-medium mb-6 transition-colors"
      >
        <FaArrowLeft size={14} /> Back to My Parcels
      </button>

      {/* Main Payment Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-secondary">
              Complete Your Payment
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Review your shipment details and securely process the payment.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
            <FaShieldAlt /> Secure Checkout
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Parcel Summary Box */}
          <div className="bg-gray-50/70 p-6 rounded-xl border border-gray-100 flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-secondary border-b border-gray-200 pb-3">
              Parcel Summary
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Parcel Name:</span>
              <span className="font-semibold text-secondary capitalize">
                {parcel.parcelName}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Parcel Type:</span>
              <span className="font-semibold text-secondary capitalize">
                {parcel.parcelType}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Weight: </span>
              <span className="font-semibold text-secondary">
                {parcel.parcelWeight} kg
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Destination:</span>
              <span className="font-semibold text-secondary truncate max-w-50">
                {parcel.receiverAddress}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
              <span className="font-bold text-secondary">Total Due:</span>
              <span className="text-2xl font-extrabold text-primary">
                {parcel.cost} Tk
              </span>
            </div>
          </div>

          {/* Right: Payment Action Box */}
          <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl border border-dashed border-gray-200">
            <div className="p-4 bg-primary/10 rounded-full text-secondary mb-4">
              <FaCreditCard size={36} />
            </div>
            <h4 className="font-bold text-secondary text-lg mb-1">
              Ready to Pay?
            </h4>
            <p className="text-gray-500 text-sm mb-6">
              Clicking below will initiate the secure gateway payment for this
              shipment.
            </p>
            <button onClick={handlePayment} className="btn bg-primary text-black font-semibold w-full max-w-xs hover:bg-primary/90 shadow-md">
              Pay {parcel.cost} Tk Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
