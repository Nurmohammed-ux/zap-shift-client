import { useForm } from "react-hook-form";
import rider from "../../assets/agent-pending.png";
import { useLoaderData } from "react-router";

const Rider = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const serviceCenters = useLoaderData();
  const selectedRegion = watch("region");

  // Unique, ordered list of regions from the JSON (e.g. Dhaka, Chattogram, Sylhet...)
  const regions = [...new Set(serviceCenters.map((center) => center.region))];

  // Districts that belong to whichever region is currently selected
  const districts = serviceCenters
    .filter((center) => center.region === selectedRegion)
    .map((center) => center.district);

  const handleRegionChange = (e) => {
    setValue("region", e.target.value);
    setValue("district", ""); // reset district whenever region changes
  };

  const handleRiderSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="mx-2 md:mx-14 bg-white rounded-2xl mt-4 py-20 px-6 md:px-27.5">
      <h2 className="text-5xl text-center md:text-left text-secondary font-extrabold mb-4">
        Be a Rider
      </h2>
      <p className="text-gray-500 font-normal lg:max-w-2xl mb-12.5">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver
        on time, every time.
      </p>
      <div className="lg:flex gap-50 border-t-2 border-dashed border-gray-200">
        <div className="card w-full mt-4 flex-1 shrink-0 ">
          <h3 className="text-2xl font-bold text-secondary mb-3">
            Tell us about yourself
          </h3>
          <form
            onSubmit={handleSubmit(handleRiderSubmit)}
            className="space-y-4"
          >
            <fieldset className="fieldset">
              {/* name */}
              <label className="label text-base font-semibold text-gray-700 my-1">
                Your Name
              </label>
              <input
                type="text"
                className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
                {...register("name", { required: true })}
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}

              {/* Driving License Number */}
              <label className="label text-base font-semibold text-gray-700 my-1">
                Driving License Number
              </label>
              <input
                type="text"
                className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
                {...register("license", { required: true })}
                placeholder="Driving License Number"
              />
              {errors.license?.type === "required" && (
                <p className="text-red-500">
                  Driving license number is required
                </p>
              )}

              {/* email */}
              <label className="label text-base font-semibold text-gray-700 my-1">
                Your Email
              </label>
              <input
                type="email"
                className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
                {...register("email", { required: true })}
                placeholder="Your Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}

              {/* Your Region */}
              <label className="label text-base font-semibold text-gray-700 my-1">
                Your Region
              </label>
              <select
                className="select select-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
                {...register("region", { required: true })}
                onChange={handleRegionChange}
                defaultValue=""
              >
                <option value="" className="hidden" disabled>
                  Select your Region
                </option>
                {regions.map((region) => (
                  <option
                    className="w-50 py-2 font-semibold"
                    key={region}
                    value={region}
                  >
                    {region}
                  </option>
                ))}
              </select>
              {errors.region?.type === "required" && (
                <p className="text-red-500">Region is required</p>
              )}

              {/* Your District */}
              <label className="label text-base font-semibold text-gray-700 my-1">
                Your District
              </label>
              <select
                className="select select-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
                {...register("district", { required: true })}
                defaultValue=""
                disabled={!selectedRegion}
              >
                <option value="" disabled>
                  {selectedRegion
                    ? "Select your District"
                    : "Select a region first"}
                </option>
                {districts.map((district) => (
                  <option
                    className="w-50 py-2 font-semibold"
                    key={district}
                    value={district}
                  >
                    {district}
                  </option>
                ))}
              </select>
              {errors.district?.type === "required" && (
                <p className="text-red-500">District is required</p>
              )}

              {/* NID No */}
              <label className="label text-base font-semibold text-gray-700 my-1">
                NID No
              </label>
              <input
                type="text"
                className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
                {...register("nid", { required: true })}
                placeholder="NID"
              />
              {errors.nid?.type === "required" && (
                <p className="text-red-500">NID number is required</p>
              )}

              {/* Phone Number */}
              <label className="label text-base font-semibold text-gray-700 my-1">
                Phone Number
              </label>
              <input
                type="text"
                className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
                {...register("phone", { required: true })}
                placeholder="Phone Number"
              />
              {errors.phone?.type === "required" && (
                <p className="text-red-500">Phone number is required</p>
              )}

              {/* Bike Brand Model and Year */}
              <label className="label text-base font-semibold text-gray-700 my-1">
                Bike Brand Model and Year
              </label>
              <input
                type="text"
                className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
                {...register("bikeModel", { required: true })}
                placeholder="Bike Brand Model and Year"
              />
              {errors.bikeModel?.type === "required" && (
                <p className="text-red-500">
                  Bike brand, model and year is required
                </p>
              )}

              {/* Bike Registration Number */}
              <label className="label text-base font-semibold text-gray-700 my-1">
                Bike Registration Number
              </label>
              <input
                type="text"
                className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
                {...register("bikeRegistration", { required: true })}
                placeholder="Bike Registration Number"
              />
              {errors.bikeRegistration?.type === "required" && (
                <p className="text-red-500">
                  Bike registration number is required
                </p>
              )}

              {/* Tell Us About Yourself */}
              <label className="label text-base font-semibold text-gray-700 my-1">
                Tell Us About Yourself
              </label>
              <input
                type="text"
                className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
                {...register("about", { required: true })}
                placeholder="Tell Us About Yourself"
              />
              {errors.about?.type === "required" && (
                <p className="text-red-500">This field is required</p>
              )}

              <button
                type="submit"
                className="btn bg-primary w-full mt-4 rounded-lg"
              >
                Submit
              </button>
            </fieldset>
          </form>
        </div>
        <div className="flex-1 w-full object-fit">
          <img src={rider} alt="Rider" />
        </div>
      </div>
    </div>
  );
};

export default Rider;
