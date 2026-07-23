import { useState } from "react";
import {
  FaBox,
  FaGlobeAmericas,
  FaBoxes,
  FaHandHoldingUsd,
  FaBuilding,
  FaUndo,
} from "react-icons/fa";

const OurServices = () => {
  const [selected, setSelected] = useState(2);

  return (
    <div className="mt-16">
      <div className="bg-secondary rounded-2xl px-8 md:px-16 lg:px-30 py-25">
        <h2 className="text-white text-[40px] font-bold text-center">
          Our Services
        </h2>
        <p className="text-gray-300 text-base text-center mt-3">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Card 1 */}
          <div
            onClick={() => setSelected(1)}
            className={`rounded-xl flex flex-col text-center items-center p-6 cursor-pointer hover:-translate-y-1 hover:shadow-md transition ${
              selected === 1 ? "bg-primary" : "bg-white"
            }`}
          >
            <div
              className={`p-3 rounded-full ${
                selected === 1 ? "" : "bg-gray-100"
              }`}
            >
              <FaBox size={22} className="text-secondary" />
            </div>
            <h3
              className={`font-bold text-center text-[24px] mt-4 mb-2 ${
                selected === 1 ? "text-secondary/80" : "text-secondary"
              }`}
            >
              Express & Standard Delivery
            </h3>
            <p className="text-base text-text-body leading-relaxed">
              We deliver parcels within 24-72 hours in Dhaka, Chittagong,
              Sylhet, Khulna, Rajshahi cities. Express delivery available in
              Dhaka within 4–6 hours from pick-up to drop-off.
            </p>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => setSelected(2)}
            className={`rounded-xl flex text-center flex-col items-center p-6 cursor-pointer hover:-translate-y-1 hover:shadow-md transition ${
              selected === 2 ? "bg-primary" : "bg-white"
            }`}
          >
            <div
              className={`p-3 rounded-full ${
                selected === 2 ? "" : "bg-gray-100"
              }`}
            >
              <FaGlobeAmericas size={22} className="text-secondary" />
            </div>
            <h3
              className={`font-bold text-center text-[24px] mt-4 mb-2 ${
                selected === 2 ? "text-secondary/80" : "text-secondary"
              }`}
            >
              Nationwide Delivery
            </h3>
            <p className="text-base text-text-body leading-relaxed">
              We deliver parcels nationwide with home delivery in every
              district, ensuring your products reach customers within 48–72
              hours.
            </p>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => setSelected(3)}
            className={`rounded-xl flex text-center flex-col items-center p-6 cursor-pointer hover:-translate-y-1 hover:shadow-md transition ${
              selected === 3 ? "bg-primary" : "bg-white"
            }`}
          >
            <div
              className={`p-3 rounded-full ${
                selected === 3 ? "" : "bg-gray-100"
              }`}
            >
              <FaBoxes size={22} className="text-secondary" />
            </div>
            <h3
              className={`font-bold text-center text-[24px] mt-4 mb-2 ${
                selected === 3 ? "text-secondary/80" : "text-secondary"
              }`}
            >
              Fulfillment Solution
            </h3>
            <p className="text-base text-text-body leading-relaxed">
              We also offer customized service with inventory management
              support, online order processing, packaging, and after sales
              support.
            </p>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => setSelected(4)}
            className={`rounded-xl flex flex-col text-center items-center p-6 cursor-pointer hover:-translate-y-1 hover:shadow-md transition ${
              selected === 4 ? "bg-primary" : "bg-white"
            }`}
          >
            <div
              className={`p-3 rounded-full ${
                selected === 4 ? "" : "bg-gray-100"
              }`}
            >
              <FaHandHoldingUsd size={22} className="text-secondary" />
            </div>
            <h3
              className={`font-bold text-center text-[24px] mt-4 mb-2 ${
                selected === 4 ? "text-secondary/80" : "text-secondary"
              }`}
            >
              Cash on Home Delivery
            </h3>
            <p className="text-base text-center text-text-body leading-relaxed">
              100% cash on delivery anywhere in Bangladesh with guaranteed
              safety of your product.
            </p>
          </div>

          {/* Card 5 */}
          <div
            onClick={() => setSelected(5)}
            className={`rounded-xl flex flex-col items-center p-6 cursor-pointer hover:-translate-y-1 hover:shadow-md transition ${
              selected === 5 ? "bg-primary" : "bg-white"
            }`}
          >
            <div
              className={`p-3 rounded-full ${
                selected === 5 ? "" : "bg-gray-100"
              }`}
            >
              <FaBuilding size={22} className="text-secondary" />
            </div>
            <h3
              className={`font-bold text-center text-[24px] mt-4 mb-2 ${
                selected === 5 ? "text-secondary/80" : "text-secondary"
              }`}
            >
              Corporate Service
            </h3>
            <p className="text-base text-center text-text-body leading-relaxed">
              Customized corporate services which includes warehouse and
              inventory management support.
            </p>
          </div>

          {/* Card 6 */}
          <div
            onClick={() => setSelected(6)}
            className={`rounded-xl flex flex-col items-center p-6 cursor-pointer hover:-translate-y-1 hover:shadow-md transition ${
              selected === 6 ? "bg-primary" : "bg-white"
            }`}
          >
            <div
              className={`p-3 rounded-full ${
                selected === 6 ? "" : "bg-gray-100"
              }`}
            >
              <FaUndo size={22} className="text-secondary" />
            </div>
            <h3
              className={`font-bold text-center text-[24px] mt-4 mb-2 ${
                selected === 6 ? "text-secondary/80" : "text-secondary"
              }`}
            >
              Parcel Return
            </h3>
            <p className="text-base text-center text-text-body leading-relaxed">
              Through our reverse logistics facility we allow end customers to
              return or exchange their products with online business merchants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
