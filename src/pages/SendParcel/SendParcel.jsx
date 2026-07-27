import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";

const FREE_WEIGHT_KG = 3;  
const EXTRA_PER_KG = 40; 
const OUTSIDE_CITY_OVERWEIGHT_SURCHARGE = 40; 

const BASE_RATE = {
  document: { sameCity: 60, outsideCity: 80 },
  "non-document": { sameCity: 110, outsideCity: 150 },
};

function calculateParcelCost({ parcelType, weight, sameCity }) {
  const rate = BASE_RATE[parcelType];
  if (!rate) return 0;

  const base = sameCity ? rate.sameCity : rate.outsideCity;

  if (parcelType === "document") {
    return base;
  }

  const numericWeight = Number(weight) || 0;
  const overWeight = Math.max(0, numericWeight - FREE_WEIGHT_KG);

  if (overWeight === 0) {
    return base;
  }

  let cost = base + overWeight * EXTRA_PER_KG;
  if (!sameCity) {
    cost += OUTSIDE_CITY_OVERWEIGHT_SURCHARGE;
  }
  return cost;
}

const SendParcel = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { parcelType: "document" },
  });

  const parcelType = useWatch({ control, name: "parcelType" });
  const selectedRegion = useWatch({ control, name: "senderRegion" });
  const selectedDistrict = useWatch({ control, name: "senderDistrict" });
  const selectedReceiverRegion = useWatch({ control, name: "receiverRegion" });
  const selectedReceiverDistrict = useWatch({
    control,
    name: "receiverDistrict",
  });

  const serviceCenters = useLoaderData();
  const regions = [...new Set(serviceCenters.map((center) => center.region))];

  const senderDistricts = serviceCenters
    .filter((center) => center.region === selectedRegion)
    .map((center) => center.district);

  const receiverDistricts = serviceCenters
    .filter((center) => center.region === selectedReceiverRegion)
    .map((center) => center.district);

  // Reset the dependent district whenever its region changes.
  const handleSenderRegionChange = () => {
    setValue("senderDistrict", "");
  };
  const handleReceiverRegionChange = () => {
    setValue("receiverDistrict", "");
  };

  // Auto-fill address once both region + district are picked.
  // Only re-runs when region/district change, so manual edits
  // to the address afterwards are left alone.
  useEffect(() => {
    if (selectedRegion && selectedDistrict) {
      setValue("senderAddress", `${selectedDistrict}, ${selectedRegion}`);
    }
    if (selectedReceiverRegion && selectedReceiverDistrict) {
      setValue(
        "receiverAddress",
        `${selectedReceiverDistrict}, ${selectedReceiverRegion}`,
      );
    }
  }, [
    selectedRegion,
    selectedDistrict,
    setValue,
    selectedReceiverRegion,
    selectedReceiverDistrict,
  ]);

  const handleSendParcel = (data) => {
    const sameCity = data.senderRegion === data.receiverRegion;
    const cost = calculateParcelCost({
      parcelType: data.parcelType,
      weight: data.parcelWeight,
      sameCity,
    });

    navigate("/pricing", {
      state: {
        parcelInfo: data,
        cost,
        sameCity,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl mx-2 mt-4 px-6 py-14 md:py-20 md:mx-14 md:px-25">
      <h2 className="text-4xl md:text-5xl font-extrabold text-secondary">
        Send A Parcel
      </h2>
      <h4 className="text-secondary text-2xl font-extrabold mt-10">
        Enter your parcel details
      </h4>
      <div className="border-t border-dashed border-gray-200 my-7.5" />

      <form onSubmit={handleSubmit(handleSendParcel)}>
        <div className="flex gap-8 mb-4">
          <label className="label cursor-pointer flex gap-2 font-semibold text-secondary">
            <input
              type="radio"
              value="document"
              className="radio radio-primary radio-sm"
              {...register("parcelType", { required: true })}
            />
            <span className="label-text">Document</span>
          </label>

          <label className="label cursor-pointer flex gap-2 font-semibold text-secondary">
            <input
              type="radio"
              value="non-document"
              className="radio radio-primary radio-sm"
              {...register("parcelType", { required: true })}
            />
            <span className="label-text">Non-document</span>
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-10">
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

        <div className="flex flex-col md:flex-row gap-10">
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
            {/* Sender's Email */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Sender Email
            </label>
            <input
              type="email"
              placeholder="Sender Email"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("senderEmail", {
                required: "Sender Email is required",
              })}
            />
            {errors.senderEmail && (
              <p className="text-red-500 text-xs mt-1">
                {errors.senderEmail.message}
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
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "Enter a valid BD phone number",
                },
              })}
            />
            {errors.senderPhone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.senderPhone.message}
              </p>
            )}
            {/* Your Region */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Your Region
            </label>
            <select
              defaultValue=""
              className="select select-bordered border border-gray-200 rounded-lg w-full focus:outline-primary text-gray-400 font-normal"
              {...register("senderRegion", {
                required: "Please select a region",
                onChange: handleSenderRegionChange,
              })}
            >
              <option value="" className="hidden" disabled>
                Select your Region
              </option>
              {regions.map((region) => (
                <option
                  className="w-50 text-black pt-3 font-semibold"
                  key={region}
                  value={region}
                >
                  {region}
                </option>
              ))}
            </select>
            {errors.senderRegion && (
              <p className="text-error text-xs mt-1">
                {errors.senderRegion.message}
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
              disabled={!selectedRegion}
            >
              <option value="" className="hidden" disabled>
                Select your District
              </option>
              {senderDistricts.map((division) => (
                <option
                  className="w-50 text-black pt-3 font-semibold"
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
            {/* Sender's Address */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Address (auto-filled, editable)"
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
            {/* Receiver's Email */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Receiver Email
            </label>
            <input
              type="email"
              placeholder="Receiver Email"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("receiverEmail", {
                required: "Receiver Email is required",
              })}
            />
            {errors.receiverEmail && (
              <p className="text-red-500 text-xs mt-1">
                {errors.receiverEmail.message}
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
            {/* Receiver Region */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Receiver Region
            </label>
            <select
              defaultValue=""
              className="select select-bordered border border-gray-200 rounded-lg w-full focus:outline-primary text-gray-400 font-normal"
              {...register("receiverRegion", {
                required: "Please select a region",
                onChange: handleReceiverRegionChange,
              })}
            >
              <option value="" className="hidden" disabled>
                Select Receiver Region
              </option>
              {regions.map((region) => (
                <option
                  className="w-50 text-black pt-3 font-semibold"
                  key={region}
                  value={region}
                >
                  {region}
                </option>
              ))}
            </select>
            {errors.receiverRegion && (
              <p className="text-error text-xs mt-1">
                {errors.receiverRegion.message}
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
              disabled={!selectedReceiverRegion}
            >
              <option value="" className="hidden" disabled>
                Select your District
              </option>
              {receiverDistricts.map((division) => (
                <option
                  className="w-50 text-black pt-3 font-semibold"
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
            {/* Receiver's Address */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Receiver Address
            </label>
            <input
              type="text"
              placeholder="Address (auto-filled, editable)"
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
            {/* Delivery Instruction */}
            <label className="label text-sm font-semibold text-gray-700 mt-4 mb-2">
              Delivery Instruction
            </label>
            <textarea
              rows={3}
              placeholder="Delivery Instruction"
              className="textarea textarea-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("deliveryInstruction")}
            />
          </div>
        </div>
        <p className="my-12.5">* PickUp Time 4pm-7pm Approx.</p>
        <button
          type="submit"
          className="btn bg-primary font-semibold px-10 py-2 rounded-lg"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;

// alternate method
// const districtsByRegion = (region) => {
//   const regionDistricts = serviceCenters.filter((c) => c.region === region);
//   const districts = regionDistricts.map((c) => c.district);
//   return districts;
// };
// const handleSendParcel = (data) => {
//     console.log("after sending parcel", data);

//     let cost = 0;
//     const sameCity = data.senderRegion === data.receiverRegion;
//     const isDocument = data.parcelType === "document";
//     const weight = parseFloat(data.parcelWeight) || 0;

//     if (isDocument) {
//       cost = sameCity ? 60 : 80;
//     } else {
//       // Base cost for non-document up to 3kg
//       const baseCost = sameCity ? 110 : 150;

//       if (weight <= 3) {
//         cost = baseCost;
//       } else {
//         const extraWeight = weight - 3;
//         if (sameCity) {
//           cost = baseCost + extraWeight * 40;
//         } else {
//           cost = baseCost + extraWeight * 40 + 40;
//         }
//       }
//     }
//     console.log(cost);

//     return cost;
//   };
