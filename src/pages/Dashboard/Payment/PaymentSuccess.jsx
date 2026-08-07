import { useEffect, useState, useRef } from "react";
import { FaCheckCircle, FaArrowRight, FaCopy, FaCheck } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = UseAxiosSecure();
  const sessionId = searchParams.get("session_id");
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [copiedField, setCopiedField] = useState(null); 
  const hasFetched = useRef(false);

  useEffect(() => {
    if (sessionId && !hasFetched.current) {
      hasFetched.current = true;

      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            trackingId: res.data.trackingId,
            transactionId: res.data.transactionId,
          });
        })
        .catch((err) => {
          console.error(err);
          hasFetched.current = false;
        });
    }
  }, [sessionId, axiosSecure]);

  // Copy handler function
  const handleCopy = (text, fieldName) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000); // Reset icon back after 2 seconds
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center flex flex-col items-center">
        {/* Success Icon Animation */}
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <FaCheckCircle size={45} />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-secondary mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-500 text-base mb-6">
          Thank you! Your payment has been processed successfully and your
          shipment is confirmed.
        </p>

        {/* Dynamic Payment & Tracking Details Box */}
        {paymentInfo && (
          <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 text-left space-y-2">
            <div className="text-base">
              <span className="text-gray-400 block font-medium">
                Tracking ID:
              </span>
              <p className="flex justify-between items-center mt-2">
                <span className="font-mono font-semibold text-secondary">
                  {paymentInfo.trackingId || "Generating..."}
                </span>
                <button
                  onClick={() => handleCopy(paymentInfo.trackingId, "tracking")}
                  className="text-gray-400 hover:text-secondary transition-colors cursor-pointer p-1"
                  title="Copy Tracking ID"
                >
                  {copiedField === "tracking" ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaCopy />
                  )}
                </button>
              </p>
            </div>

            <div className="text-base mt-4">
              <span className="text-gray-400 block font-medium">
                Transaction ID:
              </span>
              <p className="flex justify-between items-center mt-2 gap-2">
                <span className="font-mono text-secondary font-semibold truncate block">
                  {paymentInfo.transactionId}
                </span>
                <button
                  onClick={() =>
                    handleCopy(paymentInfo.transactionId, "transaction")
                  }
                  className="text-gray-400 hover:text-secondary transition-colors cursor-pointer p-1 shrink-0"
                  title="Copy Transaction ID"
                >
                  {copiedField === "transaction" ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaCopy />
                  )}
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Link
            to="/dashboard/my-parcels"
            className="btn bg-primary text-black font-semibold w-full hover:bg-primary/90 flex items-center justify-center gap-2 shadow-sm"
          >
            Go to My Parcels <FaArrowRight size={12} />
          </Link>
          <Link
            to="/"
            className="btn btn-ghost text-gray-500 hover:text-secondary w-full"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
