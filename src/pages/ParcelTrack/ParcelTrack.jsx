import { useQuery } from "@tanstack/react-query";
import {
  FaSearch,
  FaBox,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaPlusCircle, // 👈 Import new icon for parcel creation
} from "react-icons/fa";
import { useParams } from "react-router";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { FaMotorcycle, FaPersonWalking } from "react-icons/fa6";

const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case "parcel-created":
      return <FaPlusCircle className="text-indigo-500" />; 
    case "ready-for-pickup":
      return <FaBox className="text-amber-500" />;
    case "driver-assigned":
      return <FaPersonWalking />;
    case "rider-arriving":
      return <FaMotorcycle className="text-blue-500" />;
    case "parcel-picked-up":
      return <FaMapMarkerAlt className="text-purple-500" />;
    case "parcel-delivered":
    case "delivered":
      return <FaCheckCircle className="text-green-500" />;
    default:
      return <FaClock className="text-gray-400" />;
  }
};

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosSecure = UseAxiosSecure();

  const { data: trackings = [], isLoading } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosSecure(`/trackings/${trackingId}/logs`);
      return res.data;
    },
    enabled: !!trackingId,
  });

  return (
    <div className="mx-2 md:mx-14 bg-white rounded-2xl shadow-sm border border-gray-100 mt-4 py-12 px-6 md:px-16 mb-12">
      {/* Header & Search Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-gray-100">
        <div>
          <h2 className="text-4xl md:text-5xl text-secondary font-extrabold text-center md:text-left">
            Track your parcel
          </h2>
          <p className="text-gray-500 text-base mt-3">
            Real-time updates and status history for your delivery.
          </p>
        </div>

        <form className="flex w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaSearch size={14} />
            </span>
            <input
              type="text"
              defaultValue={trackingId || ""}
              placeholder="Enter Tracking ID..."
              className="w-full h-12 pl-9 pr-3 text-sm rounded-l-xl rounded-r-none bg-gray-50 border border-gray-200 outline-none shadow-none focus:outline-primary focus:ring-0 focus:border-primary focus:shadow-none"
            />
          </div>
          <button
            type="submit"
            className="h-12 bg-primary text-secondary hover:bg-primary/90 font-semibold px-6 rounded-l-none rounded-r-xl"
          >
            Track
          </button>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Tracking ID Badge Summary */}
      {!isLoading && trackingId && (
        <div className="mt-8 bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Active Tracking ID
            </p>
            <p className="text-base font-bold text-secondary mt-0.5">
              {trackingId}
            </p>
          </div>
          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
            {trackings.length} Status Updates Found
          </div>
        </div>
      )}

      {/* DaisyUI Timeline Section */}
      {!isLoading && trackings.length > 0 && (
        <div className="mt-12 flex justify-center">
          <ul className="timeline timeline-vertical max-w-3xl w-full">
            {trackings.map((log, index) => {
              const formattedDate = log.createdAt
                ? new Date(log.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "";
              const formattedTime = log.createdAt
                ? new Date(log.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";
              const detailsText =
                log.details || log.status?.replace(/[-_]/g, " ");

              // Alternate sides: even index on left, odd index on right
              const isEven = index % 2 === 0;

              return (
                <li key={index} className="py-6">
                  {index > 0 && <hr className="bg-primary/35" />}

                  {/* Date & Time Side */}
                  <div
                    className={
                      isEven
                        ? "timeline-start text-right pr-4"
                        : "timeline-end text-left pl-4"
                    }
                  >
                    <span className="block text-xs font-bold text-secondary">
                      {formattedDate}
                    </span>
                    <span className="block text-[11px] text-gray-400">
                      {formattedTime}
                    </span>
                  </div>

                  {/* Middle Icon Node */}
                  <div className="timeline-middle bg-white p-1.5 rounded-full border border-gray-200 shadow-xs">
                    {getStatusIcon(log.status)}
                  </div>

                  {/* Status Box Side */}
                  <div
                    className={
                      isEven
                        ? "timeline-end timeline-box font-semibold text-secondary capitalize bg-primary/10 border-gray-200 shadow-xs py-3.5 px-5 rounded-xl"
                        : "timeline-start timeline-box font-semibold text-secondary capitalize bg-primary/10 border-gray-200 shadow-xs py-3.5 px-5 rounded-xl text-right"
                    }
                  >
                    {detailsText}
                  </div>

                  {index < trackings.length - 1 && (
                    <hr className="bg-primary/35" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && trackings.length === 0 && trackingId && (
        <div className="text-center py-20 text-gray-400">
          No tracking logs found for this ID.
        </div>
      )}

      {!trackingId && (
        <div className="text-center py-20 text-gray-400">
          Enter a tracking ID above to view history.
        </div>
      )}
    </div>
  );
};

export default ParcelTrack;
