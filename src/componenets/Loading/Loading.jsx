import { FaTruckFast } from "react-icons/fa6";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-36 gap-3">
      <div className="text-secondary animate-bounce">
        <FaTruckFast size={80} />
      </div>
      <span className="text-gray-400 text-sm font-medium tracking-wide">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
