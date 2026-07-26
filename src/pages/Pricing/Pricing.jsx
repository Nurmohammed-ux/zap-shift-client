import { useState } from "react";
import { useForm } from "react-hook-form";

// Simple, editable pricing rules — adjust to match your real rate card.
const baseRate = {
  document: { same_city: 60, outside_city: 80 },
  "non-document": { same_city: 110, outside_city: 150 },
};
const FREE_WEIGHT_KG = 3; // weight included in the base rate
const EXTRA_PER_KG = 40; // charge per kg above the free weight

const Pricing = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [price, setPrice] = useState(50);

  const calculatePrice = (data) => {
    const base = baseRate[data.parcelType][data.destination];
    const weight = Number(data.weight) || 0;
    const extraWeight = Math.max(0, weight - FREE_WEIGHT_KG);
    const total = base + extraWeight * EXTRA_PER_KG;
    setPrice(total);
  };

  const handleReset = () => {
    reset();
    setPrice(50);
  };

  return (
    <div className="bg-white rounded-3xl mx-2 mt-4 px-6 py-14 md:py-20 md:mx-14 md:px-25">
      {/* Header */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-secondary">
        Pricing Calculator
      </h2>
      <p className="text-gray-500 text-base mt-5">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal <br /> packages to business shipments — we deliver on
        time, every time.
      </p>

      <div className="border-t border-dashed border-gray-200 my-10" />

      <h3 className="text-2xl font-bold text-secondary text-center mb-10">
        Calculate Your Cost
      </h3>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-50">
        {/* Form */}
        <form
          onSubmit={handleSubmit(calculatePrice)}
          className="w-full max-w-lg"
        >
          {/* Parcel type */}
          <label className="label text-sm font-semibold text-gray-700 mb-1">
            Parcel type
          </label>
          <select
            className="select select-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
            defaultValue=""
            {...register("parcelType", { required: true })}
          >
            <option value="" className="hidden" disabled>
              Select Parcel type
            </option>
            <option
              className="bg-gray-200 w-50 pt-3 font-semibold"
              value="document"
            >
              Document
            </option>
            <option
              className="bg-gray-200 w-50 pb-2 font-semibold"
              value="non-document"
            >
              Non-Document
            </option>
          </select>
          {errors.parcelType && (
            <p className="text-red-500 text-sm mt-1">Parcel type is required</p>
          )}

          {/* Delivery destination */}
          <label className="label text-sm font-semibold text-gray-700 mt-4 mb-1">
            Delivery Destination
          </label>
          <select
            className="select select-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
            defaultValue=""
            {...register("destination", { required: true })}
          >
            <option value="" className="hidden" disabled>
              Select Delivery Destination
            </option>
            <option
              className="bg-gray-200 w-50 pt-3 font-semibold"
              value="same_city"
            >
              Inside City
            </option>
            <option
              className="bg-gray-200 w-50 pb-3 font-semibold"
              value="outside_city"
            >
              Outside City
            </option>
          </select>
          {errors.destination && (
            <p className="text-red-500 text-sm mt-1">
              Delivery destination is required
            </p>
          )}

          {/* Weight */}
          <label className="label text-sm font-semibold text-gray-700 mt-4 mb-1">
            Weight (KG)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            placeholder="Weight in KG"
            className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
            {...register("weight", { required: true, min: 0 })}
          />
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">Weight is required</p>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="btn bg-white border border-primary/40 text-secondary rounded-lg px-6 hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn bg-primary border-0 text-secondary font-semibold rounded-lg flex-1 hover:brightness-95"
            >
              Calculate
            </button>
          </div>
        </form>

        {/* Result */}
        <div className="flex items-center justify-center lg:translate-y-20">
          <p className="text-6xl md:text-7xl font-extrabold text-secondary">
            {price} Tk
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
