import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Logo = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img className="h-8" src={logo} alt="ZapShift Logo" />
      <Link
        to="/"
        className="text-2xl font-extrabold hover:text-[#CAEB66]transition-colors mt-4 -ml-1.5"
      >
        ZapShift
      </Link>
    </div>
  );
};

export default Logo;
