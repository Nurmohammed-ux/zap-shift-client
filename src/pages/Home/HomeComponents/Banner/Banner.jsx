import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../../assets/banner/banner1.png";
import banner2 from "../../../../assets/banner/banner2.png";
import banner3 from "../../../../assets/banner/banner3.png";
import { Link } from "react-router";
import arrow from "../../../../assets/Frame 4.png";

const Banner = () => {
  return (
    <section className="px-2 mt-4">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        swipeable={true}
        emulateTouch={true}
      >
        {/* Slide 1 */}
        <div className="relative rounded-2xl overflow-hidden">
          <img src={banner1} alt="We make sure your parcel arrives on time" />
          <div className="absolute left-6 md:left-12 lg:left-25 bottom-12 md:bottom-6 lg:bottom-20 text-left max-w-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Link className=" btn bg-primary border-0 rounded-xl">
                  Track Your Parcel
                </Link>
                <img className="h-9" src={arrow} alt="Arrow" />
              </div>
              <button className="border border-gray-300 text-secondary font-semibold text-sm px-6 py-2 rounded-full hover:bg-secondary hover:text-white transition flex items-center gap-2">
                Be a Rider
              </button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative rounded-2xl overflow-hidden">
          <img src={banner2} alt="Fastest delivery and easy pickup" />
          <div className="absolute left-6 md:left-12 lg:left-25 bottom-12 md:bottom-6 lg:bottom-20 text-left max-w-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Link className=" btn bg-primary border-0 rounded-xl">
                  Track Your Parcel
                </Link>
                <img className="h-9" src={arrow} alt="Arrow" />
              </div>
              <button className="border border-gray-300 text-secondary font-semibold text-sm px-6 py-2 rounded-full hover:bg-secondary hover:text-white transition flex items-center gap-2">
                Be a Rider
              </button>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative rounded-2xl overflow-hidden">
          <img src={banner3} alt="Delivery in 30 minutes at your doorstep" />
          <div className="absolute left-6 md:left-12 lg:left-25 bottom-12 md:bottom-6 lg:bottom-20 text-left max-w-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Link className=" btn bg-primary border-0 rounded-xl">
                  Track Your Parcel
                </Link>
                <img className="h-9" src={arrow} alt="Arrow" />
              </div>
              <button className="border border-gray-300 text-secondary font-semibold text-sm px-6 py-2 rounded-full hover:bg-secondary hover:text-white transition flex items-center gap-2">
                Be a Rider
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Banner;
