import { useEffect, useRef, useState } from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import customerTop from "../../../../assets/customer-top.png";
import {
  FaQuoteLeft,
  FaRegStar,
  FaStar,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const StarRating = ({ rating }) => {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {[1, 2, 3, 4, 5].map((n) =>
        n <= rounded ? (
          <FaStar key={n} size={12} className="text-primary" />
        ) : (
          <FaRegStar key={n} size={12} className="text-gray-300" />
        ),
      )}
    </div>
  );
};

const Reviews = () => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(0);
  const [lastAction, setLastAction] = useState("");
  const swiperRef = useRef(null);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  const goPrev = () => {
    setLastAction("prev");
    swiperRef.current?.slidePrev();
  };
  const goNext = () => {
    setLastAction("next");
    swiperRef.current?.slideNext();
  };

  // Duplicate data array if it has fewer than 8 items to satisfy Swiper's loop requirement
  const extendedData =
    data.length > 0 && data.length <= 8 ? [...data, ...data, ...data] : data;

  return (
    <div className="px-6 mt-25 text-center">
      <div className="flex flex-col items-center">
        <img src={customerTop} alt="Package" />
        <h2 className="text-secondary text-[40px] font-extrabold">
          What our customers are sayings
        </h2>
        <p className="text-gray-500 text-base mt-3 mb-16">
          Enhance posture, mobility, and well-being effortlessly with our
          service. Achieve proper alignment, reduce pain, and strengthen your
          delivery experience with ease!
        </p>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        loopAddBlankSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        {extendedData.map((review, i) => (
          <SwiperSlide key={i}>
            <div className={"bg-white/80 rounded-2xl p-8 text-left"}>
              <FaQuoteLeft className={"text-primary mb-4"} size={18} />
              <p className={"text-base text-gray-900 leading-relaxed"}>
                {review.review}
              </p>
              <div className="border-t border-dashed border-gray-300 my-5" />
              <div className="flex items-center gap-3">
                <img
                  src={review.user_photoURL}
                  alt={review.userName}
                  className={`w-11 h-11 rounded-full object-cover shrink-0`}
                />
                <div>
                  <p className={"font-semibold text-gray-700 text-base"}>
                    {review.userName}
                  </p>
                  <StarRating rating={review.ratings} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          aria-label="Previous testimonial"
          onClick={goPrev}
          className={`w-11 h-11 rounded-full shadow flex items-center justify-center hover:bg-primary transition ${
            lastAction === "prev" ? "bg-primary" : "bg-white"
          }`}
        >
          <FaArrowLeft size={14} className="text-secondary" />
        </button>

        <div className="flex items-center gap-2">
          {data.map((review, idx) => (
            <button
              key={review.id || idx}
              aria-label={`Show review from ${review.userName}`}
              onClick={() => {
                swiperRef.current?.slideToLoop(idx);
                setActive(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition ${
                active === idx ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          aria-label="Next testimonial"
          onClick={goNext}
          className={`w-11 h-11 rounded-full shadow flex items-center justify-center hover:bg-primary transition ${
            lastAction === "next" ? "bg-primary" : "bg-white"
          }`}
        >
          <FaArrowRight size={14} className="text-secondary" />
        </button>
      </div>
    </div>
  );
};

export default Reviews;
