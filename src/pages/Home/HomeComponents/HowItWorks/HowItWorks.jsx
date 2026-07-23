import {
  FaSearchLocation,
  FaWallet,
  FaWarehouse,
  FaTruckMoving,
} from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="px-6 md:px-14 mt-16">
      <h2 className="text-3xl text-secondary font-bold mb-6">How it Works</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Step 1 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md hover:border-0 hover:bg-primary/10 transition">
          <FaSearchLocation size={30} className="text-secondary mb-4" />
          <h3 className="font-semibold text-secondary text-xl mb-2">
            Booking Pick & Drop
          </h3>
          <p className="text-base text-gray-500 leading-relaxed">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md hover:border-0 hover:bg-primary/10 transition">
          <FaWallet size={30} className="text-secondary mb-4" />
          <h3 className="font-semibold text-secondary text-xl mb-2">
            Cash On Delivery
          </h3>
          <p className="text-base text-gray-500 leading-relaxed">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md hover:border-0 hover:bg-primary/10 transition">
          <FaWarehouse size={30} className="text-secondary mb-4" />
          <h3 className="font-semibold text-secondary text-xl mb-2">
            Delivery Hub
          </h3>
          <p className="text-base text-gray-500 leading-relaxed">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md hover:border-0 hover:bg-primary/10 transition">
          <FaTruckMoving size={30} className="text-secondary mb-4" />
          <h3 className="font-semibold text-secondary text-xl mb-2">
            Booking SME & Corporate
          </h3>
          <p className="text-base text-gray-500 leading-relaxed">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
