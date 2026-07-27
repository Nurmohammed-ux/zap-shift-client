import { Link, NavLink } from "react-router";
import arrow from "../../../assets/Frame 4.png";
import Logo from "../../../componenets/Logo/Logo";
import UseAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = UseAuth();

  const handleLogOutUser = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error.message));
  };

  const getLinkClass = ({ isActive }) =>
    `font-semibold ${isActive ? "bg-primary text-base font-semibold py-2 px-4 rounded-full" : "text-gray-600 px-4 py-2 text-base font-semibold hover:text-gray-900"}`;
  const links = (
    <>
      <NavLink to={"/services"} className={getLinkClass}>
        Services
      </NavLink>
      <NavLink to={"/coverage"} className={getLinkClass}>
        Coverage
      </NavLink>
      <NavLink to={"/aboutUs"} className={getLinkClass}>
        About Us
      </NavLink>
      <NavLink to={"/sendParcel"} className={getLinkClass}>
        Send Parcel
      </NavLink>
      <NavLink to={"/beARider"} className={getLinkClass}>
        Be a Rider
      </NavLink>
    </>
  );
  return (
    <div className="px-2 md:px-14 py-4 lg:pt-6">
      <nav className="navbar bg-white px-18 py-5 md:px-6 rounded-xl flex flex-col md:flex-row  items-start  md:items-center gap-3 md:gap-0">
        <div className="navbar-start">
          <div className="dropdown mr-2">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 border-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-4 ml-12 md:ml-0">
          {user ? (
            <button
              onClick={handleLogOutUser}
              className="btn rounded-xl border border-gray-300 hover:bg-gray-200"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to={"/login"}
              className="btn rounded-xl border border-gray-300 hover:bg-gray-200"
            >
              Sign In
            </Link>
          )}
          <div className="flex items-center">
            <Link to={"/beARider"} className=" btn bg-primary rounded-xl">
              Be a rider
            </Link>
            <img className="h-9" src={arrow} alt="Arrow" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
