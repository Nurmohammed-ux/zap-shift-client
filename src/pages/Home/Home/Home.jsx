import Hero from "../HomeComponents/Hero/Hero";
import HowItWorks from "../HomeComponents/HowItWorks/HowItWorks";
import OurServices from "../HomeComponents/OurServices/OurServices";
import ClientLogos from "../HomeComponents/ClientLogos/ClientLogos";
import FeatureHighlights from "../HomeComponents/FeatureHighlights/FeatureHighlights";
import MerchantCTA from "../HomeComponents/MerchantCTA/MerchantCTA";
// import Testimonials from "../HomeComponents/Testimonials/Testimonials";
import FAQ from "../HomeComponents/FAQS/FAQ";
import Reviews from "../HomeComponents/Reviews/Reviews";
// import Banner from "../HomeComponents/Banner/Banner";
const Home = () => {
  return (
    <div>
      <div className="md:px-12 pt-4">
        <Hero />
        {/* <Banner /> */}
        <HowItWorks />
        <OurServices />
        <ClientLogos />
        <FeatureHighlights />
        <MerchantCTA />
      </div>
      {/* <Testimonials /> */}
      <Reviews />
      <div>
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
