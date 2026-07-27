import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import banner1 from "../../../../assets/banner/my-banner.png";
import banner2 from "../../../../assets/banner/my-banner-1.png";
import banner3 from "../../../../assets/banner/my-banner-2.png";
import arrow from "../../../../assets/Frame 4.png";

const Hero = () => {
  return (
    <div>
      <div className="bg-white rounded-3xl mx-2 overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          slidesPerView={1}
          className="heroSwiper"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative">
              <img
                src={banner1}
                alt="Delivery in 30 minutes at your doorstep"
                className="w-full h-auto"
              />
              <div className="absolute left-4 sm:left-10 lg:left-25 bottom-0 md:bottom-6 lg:bottom-20 flex flex-nowrap items-center gap-2 sm:gap-4">
                <div className="flex items-center">
                  <Link className="btn btn-xs sm:btn-sm md:btn-md text-[10px] sm:text-sm bg-primary rounded-xl pt-1 px-3 sm:px-6">
                    Track Your Parcel
                  </Link>
                  <img className="h-5 sm:h-7 md:h-9" src={arrow} alt="Arrow" />
                </div>
                <Link to={"/beARider"} className="hidden md:inline-flex btn border border-gray-300 rounded-xl py-2 px-6 hover:bg-gray-200">
                  Be a rider
                </Link>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative">
              <img
                src={banner2}
                alt="Fastest delivery and easy pickup"
                className="w-full h-auto"
              />
              <div className="absolute left-4 sm:left-10 lg:left-25 bottom-2 md:bottom-6 lg:bottom-20 flex flex-nowrap items-center gap-2 sm:gap-4">
                <div className="flex items-center">
                  <Link className="btn btn-xs sm:btn-sm md:btn-md text-[10px] sm:text-sm bg-primary rounded-xl pt-1 px-3 sm:px-6">
                    Track Your Parcel
                  </Link>
                  <img className="h-5 sm:h-7 md:h-9" src={arrow} alt="Arrow" />
                </div>
                <Link  to={"/beARider"} className="hidden md:inline-flex btn border border-gray-300 rounded-xl py-2 px-6 hover:bg-gray-200">
                  Be a rider
                </Link>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative">
              <img
                src={banner3}
                alt="We make sure your parcel arrives on time"
                className="w-full h-auto"
              />
              <div className="absolute left-4 sm:left-10 lg:left-25 bottom-2 md:bottom-6 lg:bottom-20 flex flex-nowrap items-center gap-2 sm:gap-4">
                <div className="flex items-center">
                  <Link className="btn btn-xs sm:btn-sm md:btn-md text-[10px] sm:text-sm bg-primary rounded-xl pt-1 px-3 sm:px-6">
                    Track Your Parcel
                  </Link>
                  <img className="h-5 sm:h-7 md:h-9" src={arrow} alt="Arrow" />
                </div>
                <Link to={"/beARider"} className="hidden md:inline-flex btn border border-gray-300 rounded-xl py-2 px-6 hover:bg-gray-200">
                  Be a rider
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
