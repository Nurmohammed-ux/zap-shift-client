import customer from "../../../../assets/Illustration.png";
import safeDelivery from "../../../../assets/safe-delivery.png";

const FeatureHighlights = () => {
  return (
    <div className="px-6 mt-16 lg:mx-14 py-10 flex flex-col gap-6">
      <div className="border mb-10 border-dashed border-gray-300" />
      {/* Feature 1 */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white hover:bg-primary/10 rounded-xl p-6">
        <div className="w-50 h-50 flex items-center justify-center shrink-0">
          <img src={customer} alt="Tracking" />
        </div>

        <div className="border w-40 md:w-0 md:h-30 border-dashed border-gray-300" />
        <div>
          <h3 className="font-semibold text-secondary text-2xl mb-2">
            Live Parcel Tracking
          </h3>
          <p className="text-base text-gray-500 leading-relaxed">
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment's journey and get
            instant status updates for complete peace of mind.
          </p>
        </div>
      </div>
      {/* Feature 2 */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white hover:bg-primary/10 rounded-xl p-6">
        <div className="w-50 h-50 flex items-center justify-center shrink-0">
          <img src={safeDelivery} alt="Safe Delivery" />
        </div>

        <div className="border w-40 md:w-0 md:h-30 border-dashed border-gray-300" />

        <div>
          <h3 className="font-semibold text-secondary text-2xl mb-2">
            100% Safe Delivery
          </h3>
          <p className="text-base text-gray-500 leading-relaxed">
            We ensure your parcels are handled with the utmost care and
            delivered securely to their destination. Our reliable process
            guarantees safe and damage-free delivery every time.
          </p>
        </div>
      </div>
      {/* Feature 3 */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white hover:bg-primary/10 rounded-xl p-6">
        <div className="w-50 h-50 flex items-center justify-center shrink-0">
          <img src={safeDelivery} alt="Call Center Support" />
        </div>

        <div className="border w-40 md:w-0 md:h-30 border-dashed border-gray-300" />

        <div>
          <h3 className="font-semibold text-secondary text-2xl mb-2">
            24/7 Call Center Support
          </h3>
          <p className="text-base text-gray-500 leading-relaxed">
            Our dedicated support team is available around the clock to assist
            you with any questions, updates, or delivery concerns you may have.
          </p>
        </div>
      </div>
      <div className="border mt-10 border-dashed border-gray-300" />
    </div>
  );
};

export default FeatureHighlights;
