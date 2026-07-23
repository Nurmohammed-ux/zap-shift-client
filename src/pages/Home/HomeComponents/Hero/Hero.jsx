import { Link } from "react-router";
import heroImg from "../../../../assets/big-deliveryman.png";
import hero from "../../../../assets/tiny-deliveryman.png";
import arrow from "../../../../assets/Frame 4.png";

import "swiper/css";

const Hero = () => {
  return (
    <div>
      <div className="bg-white rounded-3xl px-4 mx-2 py-20 md:px-10 lg:px-25">
        <div className="flex flex-col items-center gap-10  lg:flex-row lg:justify-between">
          {/* Left Content */}
          <div className="w-full lg:w-160">
            <img
              src={hero}
              alt="Delivery icon"
              className="mb-6 h-16 w-auto sm:h-20"
            />

            <h1 className="text-4xl font-extrabold leading-tight text-secondary sm:text-5xl lg:text-6xl">
              We Make Sure Your{" "}
              <span className="text-primary">Parcel Arrives</span> On Time – No
              Fuss.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments—we
              deliver on time, every time.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-nowrap items-center gap-4">
              <div className="flex items-center">
                <Link className=" btn bg-primary border-0 rounded-xl">
                  Track Your Parcel
                </Link>
                <img className="h-9" src={arrow} alt="Arrow" />
              </div>

              <Link className="btn border border-gray-300 rounded-xl py-2 px-6 hover:bg-gray-200">
                Be a rider
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex w-full justify-center lg:w-118.25">
            <img src={heroImg} alt="Delivery Man" className="h-auto w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
