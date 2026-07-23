import { useState } from "react";
import { Link } from "react-router";
import arrow from "../../../../assets/Frame 4.png";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(1);

  return (
    <div className="px-6 lg:mx-25 mt-16 text-center">
      <h2 className="text-secondary text-[40px] font-extrabold">
        Frequently Asked Question (FAQ)
      </h2>
      <p className="text-gray-500 text-base mt-3">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle, built for both individuals and businesses. This service also provides a convenient and trusted payment option for both businesses and customers.
      </p>

      <div className="mt-8 flex flex-col gap-3 text-left">
        {/* Question 1 */}
        <div
          className={`collapse collapse-arrow p-6 rounded-xl border ${
            openQuestion === 1
              ? "border-primary bg-primary/5"
              : "border-gray-200 bg-white"
          }`}
        >
          <input
            type="radio"
            name="faq-accordion"
            checked={openQuestion === 1}
            onChange={() => setOpenQuestion(1)}
          />
          <div className="collapse-title text-base font-bold text-secondary">
            How long does parcel delivery usually take?
          </div>
          <div className="collapse-content text-sm text-gray-500">
            <p>
              Delivery times vary depending on the pickup and destination
              locations. Within the same city, most parcels are delivered within
              24 hours. Nationwide deliveries generally take between 2 and 3
              business days, while deliveries to remote areas may require an
              additional day. Once your parcel is picked up, you can monitor its
              progress through our real-time tracking system and receive status
              updates until it reaches its destination.
            </p>
          </div>
        </div>

        {/* Question 2 */}
        <div
          className={`collapse collapse-arrow p-6 rounded-xl border ${
            openQuestion === 2
              ? "border-primary bg-primary/5"
              : "border-gray-200 bg-white"
          }`}
        >
          <input
            type="radio"
            name="faq-accordion"
            checked={openQuestion === 2}
            onChange={() => setOpenQuestion(2)}
          />
          <div className="collapse-title text-base font-bold text-secondary">
            How can I track my parcel?
          </div>
          <div className="collapse-content text-sm text-gray-500">
            <p>
              After your parcel has been booked, you'll receive a unique
              tracking ID through email or SMS. Simply enter this tracking ID on
              the "Track Parcel" page to view your shipment's current location,
              delivery progress, pickup confirmation, transit updates, and
              estimated delivery time. The tracking information is updated
              regularly so you always know where your parcel is.
            </p>
          </div>
        </div>

        {/* Question 3 */}
        <div
          className={`collapse collapse-arrow p-6 rounded-xl border ${
            openQuestion === 3
              ? "border-primary bg-primary/5"
              : "border-gray-200 bg-white"
          }`}
        >
          <input
            type="radio"
            name="faq-accordion"
            checked={openQuestion === 3}
            onChange={() => setOpenQuestion(3)}
          />
          <div className="collapse-title text-base font-bold text-secondary">
            What items are prohibited for delivery?
          </div>
          <div className="collapse-content text-sm text-gray-500">
            <p>
              For safety and legal compliance, we do not transport hazardous
              chemicals, explosives, flammable materials, firearms, illegal
              substances, live animals, or other restricted items prohibited by
              law. Fragile, valuable, or perishable products may require special
              packaging or handling. If you're unsure whether your parcel can be
              shipped, our customer support team will be happy to assist you
              before booking your delivery.
            </p>
          </div>
        </div>

        {/* Question 4 */}
        <div
          className={`collapse collapse-arrow p-6 rounded-xl border ${
            openQuestion === 4
              ? "border-primary bg-primary/5"
              : "border-gray-200 bg-white"
          }`}
        >
          <input
            type="radio"
            name="faq-accordion"
            checked={openQuestion === 4}
            onChange={() => setOpenQuestion(4)}
          />
          <div className="collapse-title text-base font-bold text-secondary">
            Do you offer Cash on Delivery (COD)?
          </div>
          <div className="collapse-content text-sm text-gray-500">
            <p>
              Yes. Our Cash on Delivery (COD) service allows merchants to
              collect payments from customers at the time of delivery. Once the
              parcel has been successfully delivered and the payment has been
              collected, the amount is securely processed and transferred to the
              merchant according to the scheduled settlement cycle. This service
              provides a convenient and trusted payment option for both
              businesses and customers.
            </p>
          </div>
        </div>

        {/* Question 5 */}
        <div
          className={`collapse collapse-arrow p-6 rounded-xl border ${
            openQuestion === 5
              ? "border-primary bg-primary/5"
              : "border-gray-200 bg-white"
          }`}
        >
          <input
            type="radio"
            name="faq-accordion"
            checked={openQuestion === 5}
            onChange={() => setOpenQuestion(5)}
          />
          <div className="collapse-title text-base font-bold text-secondary">
            What should I do if my parcel is delayed or damaged?
          </div>
          <div className="collapse-content text-sm text-gray-500">
            <p>
              If your parcel has not arrived within the expected delivery
              timeframe or reaches its destination in a damaged condition,
              please contact our customer support team immediately with your
              tracking ID and order details. Our team will investigate the
              issue, coordinate with the assigned delivery personnel, and
              provide regular updates throughout the resolution process.
              Depending on the situation and our service policy, you may also be
              eligible for compensation or other appropriate assistance.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 mb-25 items-center">
        <Link className=" btn bg-primary px-6 border-0 rounded-xl">
          See More FAQ’s
        </Link>
        <img className="h-9" src={arrow} alt="Arrow" />
      </div>
    </div>
  );
};

export default FAQ;
