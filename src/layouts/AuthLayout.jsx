import { Outlet } from "react-router";
import Logo from "../componenets/Logo/Logo";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row min-h-screen lg:h-188.75">
      <div className="order-1 pt-8 sm:pt-8 lg:pt-15 bg-gray-50 px-6 sm:px-8 md:pl-18 flex-1 h-full">
        <Logo />
        <div>
          <Outlet />
        </div>
      </div>
      <div className="order-2 bg-primary/10 flex flex-1 justify-center items-center py-6 lg:py-0 lg:h-full">
        <img src={authImage} alt="Image" className="w-40 lg:w-full" />
      </div>
    </div>
  );
};

export default AuthLayout;
