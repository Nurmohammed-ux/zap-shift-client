import { useForm } from "react-hook-form";

const divisions = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

const SendParcel = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { parcelType: "document" },
  });

  const parcelType = watch("parcelType");

  const handleSendParcel = (data) => {
    console.log("after sending parcel", data);
  };

  return (
    <div className="bg-white rounded-3xl mx-2 mt-4 px-6 py-14 md:py-20 md:mx-14 md:px-25">
      <h2 className="text-4xl md:text-5xl font-extrabold text-secondary">
        Send A Parcel
      </h2>
      <h4 className="text-secondary text-2xl font-extrabold mt-10">
        Enter your parcel details
      </h4>
      <div className="border-t border-dashed border-gray-200 my-7.5" />

      <form onSubmit={handleSubmit(handleSendParcel)}>
        <div className="flex gap-5 mb-4">
          <label className="label cursor-pointer flex gap-2 font-medium">
            <input
              type="radio"
              value="document"
              className="radio radio-primary"
              {...register("parcelType", { required: true })}
            />
            <span className="label-text">Document</span>
          </label>

          <label className="label cursor-pointer flex gap-2 font-medium">
            <input
              type="radio"
              value="non-document"
              className="radio radio-primary"
              {...register("parcelType", { required: true })}
            />
            <span className="label-text">Non-document</span>
          </label>
        </div>

        <div className="flex gap-7.5">
          <div className="flex-1">
            {/* Parcel Name */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-1">
              Parcel Name
            </label>
            <input
              type="text"
              placeholder="Parcel Name"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("parcelName", {
                required: "Parcel name is required",
              })}
            />
            {errors.parcelName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.parcelName.message}
              </p>
            )}
          </div>

          <div className="flex-1">
            {/* Weight */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-1">
              Parcel Weight (KG)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              placeholder="Parcel"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("parcelWeight", {
                required:
                  parcelType === "non-document" ? "Weight is required" : false,
                min: { value: 0, message: "Weight can't be negative" },
              })}
            />
            {errors.parcelWeight && (
              <p className="text-red-500 text-xs mt-1">
                {errors.parcelWeight.message}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-dashed border-gray-200 my-7.5" />

        <div className="flex gap-10">
          <div className="flex-1">
            <h5 className="text-[18px] font-extrabold text-secondary">
              Sender Details
            </h5>
            {/* Sender's name */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Sender Name
            </label>
            <input
              type="text"
              placeholder="Sender Name"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("senderName", {
                required: "Sender name is required",
              })}
            />
            {errors.senderName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.senderName.message}
              </p>
            )}
            {/* Sender's Address */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("senderAddress", {
                required: "Address is required",
              })}
            />
            {errors.senderAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.senderAddress.message}
              </p>
            )}
            {/* Sender Phone No */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Sender Phone No
            </label>
            <input
              type="text"
              placeholder="Sender Phone No"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("senderPhone", {
                required: "Phone number is required",
              })}
            />
            {errors.senderPhone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.senderPhone.message}
              </p>
            )}
            {/* Your District */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Your District
            </label>
            <select
              defaultValue=""
              className="select select-bordered border border-gray-200 rounded-lg w-full focus:outline-primary text-gray-400 font-normal"
              {...register("senderDistrict", {
                required: "Please select a district",
              })}
            >
              <option value="" className="hidden" disabled>
                Select your District
              </option>
              {divisions.map((division) => (
                <option
                  className="bg-gray-200 w-50 text-black pt-3 font-semibold"
                  key={division}
                  value={division}
                >
                  {division}
                </option>
              ))}
            </select>
            {errors.senderDistrict && (
              <p className="text-error text-xs mt-1">
                {errors.senderDistrict.message}
              </p>
            )}
            {/* Pickup Instruction */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Pickup Instruction
            </label>
            <textarea
              rows={3}
              placeholder="Pickup Instruction"
              className="textarea textarea-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("pickupInstruction")}
            />
          </div>

          <div className="flex-1">
            <h5 className="text-[18px] font-extrabold text-secondary">
              Receiver Details
            </h5>
            {/* Receiver Name's */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Receiver Name
            </label>
            <input
              type="text"
              placeholder="Receiver Name"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("receiverName", {
                required: "Receiver name is required",
              })}
            />
            {errors.receiverName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.receiverName.message}
              </p>
            )}
            {/* Receiver's Address */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Receiver Address
            </label>
            <input
              type="text"
              placeholder="Receiver"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("receiverAddress", {
                required: "Address is required",
              })}
            />
            {errors.receiverAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.receiverAddress.message}
              </p>
            )}
            {/* Receiver Phone No */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Receiver Contact No
            </label>
            <input
              type="text"
              placeholder="Receiver Contact No"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("receiverPhone", {
                required: "Phone number is required",
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "Enter a valid BD phone number",
                },
              })}
            />
            {errors.receiverPhone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.receiverPhone.message}
              </p>
            )}
            {/* Receiver District */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Receiver District
            </label>
            <select
              defaultValue=""
              className="select select-bordered border border-gray-200 rounded-lg w-full focus:outline-primary text-gray-400 font-normal"
              {...register("receiverDistrict", {
                required: "Please select a district",
              })}
            >
              <option value="" className="hidden" disabled>
                Select your District
              </option>
              {divisions.map((division) => (
                <option
                  className="bg-gray-200 w-50 text-black pt-3 font-semibold"
                  key={division}
                  value={division}
                >
                  {division}
                </option>
              ))}
            </select>
            {errors.receiverDistrict && (
              <p className="text-error text-xs mt-1">
                {errors.receiverDistrict.message}
              </p>
            )}
            {/* Delivery Instruction */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Delivery Instruction
            </label>
            <textarea
              rows={3}
              placeholder="Pickup Instruction"
              className="textarea textarea-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("deliveryInstruction")}
            />
          </div>
        </div>
        <p className="my-12.5">* PickUp Time 4pm-7pm Approx.</p>
        <button className="btn bg-primary border-0 font-semibold px-6 rounded-lg">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
