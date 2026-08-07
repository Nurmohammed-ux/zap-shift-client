import { FaCheck, FaBox, FaFileAlt, FaTruck } from "react-icons/fa";

const PricingPlan = () => {
  const plans = [
    {
      title: "Document Delivery",
      description: "Fast and secure delivery for letters, papers, and legal documents.",
      icon: <FaFileAlt className="text-primary text-3xl mb-4" />,
      badge: "Flat Rate",
      features: [
        { label: "Within City", price: "$60" },
        { label: "Outside City / District", price: "$80" },
      ],
      highlight: false,
    },
    {
      title: "Non-Document (Up to 3kg)",
      description: "Standard parcels and packages weighing 3 kilograms or less.",
      icon: <FaBox className="text-primary text-3xl mb-4" />,
      badge: "Most Popular",
      features: [
        { label: "Within City", price: "$110" },
        { label: "Outside City / District", price: "$150" },
      ],
      highlight: true,
    },
    {
      title: "Non-Document (>3kg Heavy)",
      description: "For heavy packages exceeding 3kg. Extra weight charges apply.",
      icon: <FaTruck className="text-primary text-3xl mb-4" />,
      badge: "Heavy Cargo",
      features: [
        { label: "Within City (Base + Extra)", price: "$110 + $40/kg" },
        { label: "Outside City (Base + Extra)", price: "$150 + $40/kg" },
      ],
      note: "+$40 extra per kg over 3kg",
      highlight: false,
    },
  ];

  return (
    <div>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-secondary mb-3">
          Simple & Transparent Pricing
        </h2>
        <p className="text-gray-500   mb-12 text-base">
          Choose the right shipping tier for your parcels. No hidden fees, clear regional rates, and reliable doorstep delivery.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md ${
                plan.highlight
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-gray-100"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {plan.badge}
                </span>
              )}

              <div>
                {plan.icon}
                <h3 className="text-xl font-bold text-secondary mb-2">
                  {plan.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-4 mb-6">
                  {plan.features.map((feat, fIndex) => (
                    <div
                      key={fIndex}
                      className="flex items-center justify-between border-b border-gray-100 pb-3"
                    >
                      <span className="text-sm text-gray-600 font-medium flex items-center gap-2">
                        <FaCheck className="text-primary text-xs" /> {feat.label}
                      </span>
                      <span className="text-base font-bold text-secondary">
                        {feat.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {plan.note && (
                <div className="bg-amber-50 text-amber-900 text-sm font-medium p-3 rounded-lg mt-auto">
                  {plan.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;