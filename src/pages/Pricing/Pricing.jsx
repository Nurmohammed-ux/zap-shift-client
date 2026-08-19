import { useLocation, useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Pricing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { parcelInfo, cost, sameCity } = location.state || {};
  const axiosSecure = useAxiosSecure();
  // console.log(parcelInfo);

  // Guard against someone landing here directly (refresh, bookmark, etc.)
  // instead of arriving from the SendParcel submit — there's nothing to
  // confirm without that data.
  if (!parcelInfo) {
    return (
      <div className="bg-white rounded-2xl mx-2 mt-4 px-6 py-14 md:py-20 md:mx-14 md:px-25 text-center">
        <h2 className="text-3xl font-extrabold text-secondary mb-4">
          No parcel to review
        </h2>
        <p className="text-gray-500 mb-8">
          Please fill out the parcel form first.
        </p>
        <Link
          to="/sendParcel"
          className="btn bg-primary font-semibold px-10 py-2 rounded-lg"
        >
          Go to Send A Parcel
        </Link>
      </div>
    );
  }

  const handleConfirm = async () => {
    const result = await Swal.fire({
      title: "Confirm this booking?",
      html: `You're about to book a <b>${parcelInfo.parcelType}</b> parcel for <b>$ ${cost}</b>.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#CAEB66",
    });

    if (!result.isConfirmed) return;

    // 1. Create a brand NEW object with all parcelInfo data + the cost
    const finalParcelData = {
      ...parcelInfo,
      cost: cost,
    };

    // 2. Send the NEW object to the database
    axiosSecure.post("/parcels", finalParcelData).then((result) => {
      console.log(result.data);
    });

    await Swal.fire({
      title: "Booking Confirmed!",
      text: "Your parcel has been booked successfully.",
      icon: "success",
      confirmButtonColor: "#CAEB66",
      customClass: {
        confirmButton: "text-black font-semibold",
      },
    });

    navigate("/dashboard/my-parcels");
  };

  return (
    <div className="bg-white rounded-2xl mx-2 mt-4 px-6 py-14 md:py-20 md:mx-14 md:px-25">
      <h2 className="text-4xl md:text-5xl font-extrabold text-secondary">
        Confirm Your Booking Price
      </h2>
      <p className="text-gray-500 text-base mt-5">
        Review the details below before confirming your parcel booking.
      </p>

      <div className="border-t border-dashed border-gray-200 my-10" />

      <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-24">
        {/* Summary */}
        <div className="w-full max-w-lg space-y-6">
          <div>
            <h5 className="text-[18px] font-extrabold text-secondary mb-2">
              Parcel
            </h5>
            <p className="text-gray-700">
              <span className="font-semibold">{parcelInfo.parcelName}</span> —{" "}
              {parcelInfo.parcelType}
              {parcelInfo.parcelType === "non-document" &&
                parcelInfo.parcelWeight &&
                ` (${parcelInfo.parcelWeight} kg)`}
            </p>
            <p className="text-gray-500 text-sm">
              {sameCity ? "Within the same region" : "Cross-region delivery"}
            </p>
          </div>

          <div>
            <h5 className="text-[18px] font-extrabold text-secondary mb-2">
              Sender
            </h5>
            <p className="text-gray-700">{parcelInfo.senderName}</p>
            <p className="text-gray-500 text-sm">{parcelInfo.senderPhone}</p>
            <p className="text-gray-500 text-sm">{parcelInfo.senderAddress}</p>
          </div>

          <div>
            <h5 className="text-[18px] font-extrabold text-secondary mb-2">
              Receiver
            </h5>
            <p className="text-gray-700">{parcelInfo.receiverName}</p>
            <p className="text-gray-500 text-sm">{parcelInfo.receiverPhone}</p>
            <p className="text-gray-500 text-sm">
              {parcelInfo.receiverAddress}
            </p>
          </div>
        </div>

        {/* Price + confirm */}
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-secondary font-semibold">Estimated Cost</p>
          <p className="text-6xl md:text-7xl font-extrabold text-secondary">
            $ {cost}{" "}
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn bg-white border border-primary/40 text-secondary rounded-lg px-6 hover:bg-gray-50"
            >
              Edit Details
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="btn bg-primary font-semibold px-8 rounded-lg hover:brightness-95"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
