import { useEffect, useState } from "react";
import {
  FaQuoteLeft,
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import customerTop from "../../../../assets/customer-top.png";

// Position offsets relative to the active card: -2 = far left, 0 = center, 2 = far right
const POSITIONS = [-2, -1, 0, 1, 2];

const getCardStyle = (offset) => {
  if (offset === 0) {
    return {
      wrapper: "w-full max-w-md shrink-0 z-10",
      card: "bg-white rounded-2xl shadow-xl p-8 text-left",
      quoteIcon: "text-primary mb-4",
      quoteIconSize: 22,
      quoteText: "text-base text-secondary leading-relaxed",
      nameText: "font-semibold text-secondary text-sm",
      roleText: "text-xs text-text-body",
      avatarSize: "w-11 h-11",
    };
  }
  if (Math.abs(offset) === 1) {
    return {
      wrapper: `hidden md:block w-80 shrink-0 opacity-40 scale-90 ${
        offset === -1 ? "-mr-16 lg:mr-10" : "-ml-16 lg:ml-10"
      } pointer-events-none select-none`,
      card: "bg-white/60 rounded-2xl p-8 text-left",
      quoteIcon: "text-primary/50 mb-4",
      quoteIconSize: 20,
      quoteText: "text-sm text-gray-400 leading-relaxed",
      nameText: "font-semibold text-gray-400 text-sm",
      roleText: "text-xs text-gray-400",
      avatarSize: "w-10 h-10",
    };
  }
  // farLeft / farRight
  return {
    wrapper: `hidden lg:block w-72 shrink-0 opacity-20 scale-75 ${
      offset === -2 ? "-mr-24" : "-ml-24"
    } pointer-events-none select-none`,
    card: "bg-white/50 rounded-2xl p-8 text-left",
    quoteIcon: "text-primary/40 mb-4",
    quoteIconSize: 18,
    quoteText: "text-sm text-gray-400 leading-relaxed",
    nameText: "font-semibold text-gray-400 text-sm",
    roleText: "text-xs text-gray-400",
    avatarSize: "w-10 h-10",
  };
};

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
      {/* <span className="text-[11px] text-gray-400 ml-1">
        {rating.toFixed(1)}
      </span> */}
    </div>
  );
};

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(0);
  const [lastAction, setLastAction] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch("/reviews.json");
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      } 
    };

    fetchReviews();
  }, []);

  const goPrev = () => {
    setLastAction("prev");
    setActive((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  const goNext = () => {
    setLastAction("next");
    setActive((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="px-6 mt-25 text-center">
      <div className="flex flex-col items-center">
        <img src={customerTop} alt="Package" />
        <h2 className="text-secondary text-[40px] font-extrabold">
          What our customers are sayings
        </h2>
        <p className="text-gray-500 text-base mt-3 max-w-xl">
          Enhance posture, mobility, and well-being effortlessly with our
          service. Achieve proper alignment, reduce pain, and strengthen your
          delivery experience with ease!
        </p>
      </div>

      {loading && <p className="text-gray-400 mt-16">Loading reviews...</p>}
      {error && <p className="text-red-500 mt-16">{error}</p>}

      {!loading && !error && reviews.length > 0 && (
        <>
          {/* Carousel */}
          <div className="relative mt-16 flex items-center justify-center gap-4 lg:gap-6 overflow-hidden py-4">
            {POSITIONS.map((offset) => {
              const idx = (active + offset + reviews.length) % reviews.length;
              const review = reviews[idx];
              const style = getCardStyle(offset);

              return (
                <div key={`${review.id}-${offset}`} className={style.wrapper}>
                  <div className={style.card}>
                    <FaQuoteLeft
                      className={style.quoteIcon}
                      size={style.quoteIconSize}
                    />
                    <p className={style.quoteText}>{review.review}</p>
                    <div className="border-t border-dashed border-gray-300 my-5" />
                    <div className="flex items-center gap-3">
                      <img
                        src={review.user_photoURL}
                        alt={review.userName}
                        className={`${style.avatarSize} rounded-full object-cover shrink-0`}
                      />
                      <div>
                        <p className={style.nameText}>{review.userName}</p>
                        {offset === 0 ? (
                          <StarRating rating={review.ratings} />
                        ) : (
                          <p className={style.roleText}>
                            {review.ratings.toFixed(1)} ★ Rating
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

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
              {reviews.map((review, idx) => (
                <button
                  key={review.id}
                  aria-label={`Show review from ${review.userName}`}
                  onClick={() => setActive(idx)}
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
        </>
      )}
    </div>
  );
};

export default Testimonials;
