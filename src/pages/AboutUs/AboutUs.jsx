import { useState } from "react";

const aboutTabs = [
  {
    title: "Story",
    content: [
      "ZapShift was founded in 2018 with a simple vision—to make parcel delivery across Bangladesh fast, reliable, and hassle-free. We recognized that individuals and businesses needed a logistics partner they could trust, whether they were sending a personal package or fulfilling hundreds of customer orders every day.",

      "From our very first delivery, our focus has been on combining technology with exceptional customer service. Real-time parcel tracking, secure handling, transparent pricing, and nationwide coverage (64 Districts) have helped us build lasting relationships with merchants and customers alike.",

      "Today, ZapShift continues to expand its network of service centers and delivery partners across the country. Our goal remains the same: delivering every parcel safely, efficiently, and on time while creating a better logistics experience for everyone.So, we start `New Smart Logistics` in 2025",
    ],
  },

  {
    title: "Mission",
    content: [
      "Our mission is to simplify parcel delivery through innovative technology, dependable logistics, and customer-focused service that businesses and individuals can rely on every day.",

      "We strive to connect every district of Bangladesh with a delivery network that is fast, transparent, and affordable, enabling merchants to grow their businesses while ensuring customers receive their parcels without delay.",

      "By continuously improving our operations, investing in smart logistics solutions, and supporting our delivery partners, we aim to set a new standard for courier services across the nation.",
    ],
  },

  {
    title: "Success",
    content: [
      `Over the years, ZapShift has successfully delivered '1 Million'   parcels for individuals, online businesses, and corporate clients throughout Bangladesh.`,

      "Our growing network of service centers, experienced delivery personnel, and modern tracking system has helped us maintain a high delivery success rate while earning the trust of merchants and customers alike.",

      "Every successful delivery represents another step toward our vision of becoming Bangladesh's most reliable and technology-driven parcel delivery platform.",
    ],
  },

  {
    title: "Team & Others",
    content: [
      "Behind every successful delivery is a dedicated team of logistics experts, customer support specialists, warehouse staff, software engineers, and delivery riders working together with a shared purpose.",

      "We believe great service begins with great people. That's why we invest in continuous training, modern tools, and a collaborative work environment that empowers every team member to deliver excellence.",

      "As we continue to grow, we remain committed to innovation, sustainability, and building meaningful partnerships that help businesses thrive and communities stay connected.",
    ],
  },
];
const AboutUs = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="mx-2 md:mx-14 bg-white rounded-4xl py-20 px-6 md:px-27 mt-4">
      <h2 className="text-5xl font-extrabold text-secondary mb-4">About Us</h2>
      <p className="text-gray-500 font-normal mb-12.5">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal <br /> packages to business shipments — we deliver
        on time, every time.
      </p>
      <div className="py-12.5 border-t-2 border-dashed border-gray-200 flex gap-8">
        {aboutTabs.map((tab, index) => (
          <button
            key={tab.title}
            onClick={() => setActiveTab(index)}
            className={`font-semibold ${
              activeTab === index
                ? "text-secondary"
                : "text-gray-500 hover:text-secondary"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div>
        {aboutTabs[activeTab].content.map((para, i) => (
          <p key={i} className="text-gray-500 leading-8">
            <span className="mr-3 text-secondary">{i + 1}</span>.{para}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
