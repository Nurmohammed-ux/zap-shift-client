import casio from "../../../../assets/brands/casio.png";
import amazon from "../../../../assets/brands/amazon_vector.png";
import moonStar from "../../../../assets/brands/moonstar.png";
import star from "../../../../assets/brands/star.png";
import starPeople from "../../../../assets/brands/start_people.png";
import randStad from "../../../../assets/brands/randstad.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const baseLogos = [
  { src: casio, alt: "Casio" },
  { src: amazon, alt: "Amazon" },
  { src: moonStar, alt: "MoonStar" },
  { src: star, alt: "Star" },
  { src: starPeople, alt: "StarPeople" },
  { src: randStad, alt: "RandStad" },
];

// Duplicate the array so Swiper has enough slides for loop mode with slidesPerView={4}
const logos = [...baseLogos, ...baseLogos, ...baseLogos];

const ClientLogos = () => {
  return (
    <div className="px-6 mt-16 lg:mx-16">
      <p className="text-secondary text-center font-extrabold text-[40px] mb-8">
        We've helped thousands of sales teams
      </p>

      <Swiper
        direction="horizontal"
        spaceBetween={25}
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        loopAddBlankSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        // Responsive breakpoints configuration
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 15,
          },        
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {logos.map((logo, i) => (
          <SwiperSlide key={i} className="flex items-center justify-center">
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ClientLogos;
