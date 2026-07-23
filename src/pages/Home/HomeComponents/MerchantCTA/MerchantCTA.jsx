
import locationMerchant from "../../../../assets/location-merchant.png"

const MerchantCTA = () => {
  return (
    <div className="px-6 mt-10 lg:mx-14">
      <div className="bg-secondary rounded-4xl px-8 md:px-14 py-14 items-center overflow-hidden relative">
        <div>
          <h2 className="text-white text-[38px] font-bold">
            Merchant and Customer Satisfaction <br /> is Our First Priority
          </h2>
          <p className="text-gray-300 text-base mt-4">
            We offer the lowest delivery charge with the highest value along
            with<br /> 100% safety of your product. ZapShift delivers your product in
            every <br /> corner of Bangladesh right on time.
          </p>
          <div className="inline-flex flex-col lg:flex-row lg:items-center gap-4 mt-7">
            <button className="bg-primary text-secondary font-semibold text-sm px-8 py-3 rounded-full hover:brightness-95 transition">
              Become a Merchant
            </button>
            <button className="border border-primary text-primary font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary/10 transition">
              Earn with ZapShift Courier
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-6 lg:ml-75 md:-mt-10 lg:-mt-70 w-full">
          <img src={locationMerchant} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MerchantCTA;
