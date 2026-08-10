import { Link, NavLink, Outlet } from "react-router";
import Logo from "../componenets/Logo/Logo";
import logoImg from "../assets/logo.png";
import dashImg from "../assets/Group.png";
import { TbFileInvoice } from "react-icons/tb";
import { IoStorefrontOutline, IoPricetagsOutline } from "react-icons/io5";
import { PiMapPinAreaDuotone } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdHelpCircleOutline, IoIosLogOut } from "react-icons/io";
import DashboardNavbar from "../pages/Shared/DashboardNavbar/DashboardNavbar";
import UseAuth from "../hooks/useAuth";
import { FaMotorcycle } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import UseRole from "../hooks/useRole";

const linkBaseStyle =
  "is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full text-base px-3 py-2";

const getLinkClass = ({ isActive }) =>
  `${linkBaseStyle} ${
    isActive
      ? "bg-primary font-semibold rounded-full"
      : "text-black font-light hover:text-gray-900"
  }`;

const DashboardLayout = () => {
  const { logOut } = UseAuth();
  const { role } = UseRole();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle inline"
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <DashboardNavbar />

          {/* Page content here */}
          <div className="p-4 bg-base-300 grow min-h-screen">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible z-30">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          {/* Added bg-base-200 and shadow to prevent transparency/overlapping text */}
          <div className="flex min-h-full flex-col items-start w-64 lg:is-drawer-close:w-14 bg-white shadow-lg transition-all duration-300">
            {/* Sidebar content here */}
            <div className="p-4 w-full">
              {/* Shown only when open */}
              <span className="is-drawer-close:hidden">
                <Logo />
              </span>
              {/* Shown only when closed */}
              <Link to={"/"} className="hidden is-drawer-close:block">
                <img src={logoImg} alt="Logo" className="w-8 h-8" />
              </Link>
            </div>

            <div className="px-4 py-2 w-full">
              {/* Shown fully when the sidebar is open */}
              <h4 className="is-drawer-close:hidden px-2 text-base font-medium text-gray-900">
                Menu
              </h4>

              {/* Shown as a subtle divider or small dot when the sidebar is closed */}
              <div className="hidden is-drawer-close:flex justify-center my-2">
                <span className="h-0.5 w-3 bg-gray-300 rounded-full"></span>
              </div>
            </div>

            <ul className="menu w-full grow py-1 px-1.5 is-drawer-open:px-4 gap-2">
              {/* Homepage button styled consistently */}
              <li>
                <NavLink
                  to={"/"}
                  className={`${linkBaseStyle} text-black font-light hover:text-gray-900`}
                  data-tip="Homepage"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4 shrink-0"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden truncate">
                    Homepage
                  </span>
                </NavLink>
              </li>

              {/* Dashboard NavLink */}
              <li>
                <NavLink
                  to={"/dashboard/my-parcels"}
                  className={getLinkClass}
                  data-tip="Dashboard"
                >
                  <img
                    src={dashImg}
                    alt="Dashboard"
                    className="my-1.5 size-4 shrink-0"
                  />
                  <span className="is-drawer-close:hidden truncate">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              {role === "admin" && (
                <>
                  {/* Users Management NavLink */}
                  <li>
                    <NavLink
                      to={"/dashboard/users-management"}
                      className={getLinkClass}
                      data-tip="Users Management"
                    >
                      <FaUsers className="my-1.5 size-5 -ml-px shrink-0" />
                      <span className="is-drawer-close:hidden truncate">
                        Users Management
                      </span>
                    </NavLink>
                  </li>

                  {/* Riders NavLink */}
                  <li>
                    <NavLink
                      to={"/dashboard/approve-riders"}
                      className={getLinkClass}
                      data-tip="Approve Riders"
                    >
                      <FaMotorcycle className="my-1.5 size-5 -ml-px shrink-0" />
                      <span className="is-drawer-close:hidden truncate">
                        Approve Riders
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Payment History NavLink */}
              <li>
                <NavLink
                  to={"/dashboard/payment-history"}
                  className={getLinkClass}
                  data-tip="Payment History"
                >
                  <TbFileInvoice className="my-1.5 size-5 -ml-0.5 shrink-0" />
                  <span className="is-drawer-close:hidden truncate">
                    Payment History
                  </span>
                </NavLink>
              </li>

              {/* Stores NavLink */}
              <li>
                <NavLink
                  to={"/coverage"}
                  className={getLinkClass}
                  data-tip="Stores"
                >
                  <IoStorefrontOutline className="my-1.5 size-4.5 shrink-0" />
                  <span className="is-drawer-close:hidden truncate">
                    Stores
                  </span>
                </NavLink>
              </li>

              {/* Pricing Plan NavLink */}
              <li>
                <NavLink
                  to={"/services"}
                  className={getLinkClass}
                  data-tip="Pricing Plan"
                >
                  <IoPricetagsOutline className="my-1.5 size-4.5 shrink-0" />
                  <span className="is-drawer-close:hidden truncate">
                    Pricing Plan
                  </span>
                </NavLink>
              </li>

              {/* Coverage Area NavLink */}
              <li>
                <NavLink
                  to={"/coverage"}
                  className={getLinkClass}
                  data-tip="Coverage Area"
                >
                  <PiMapPinAreaDuotone className="my-1.5 size-4.5 shrink-0" />
                  <span className="is-drawer-close:hidden truncate">
                    Coverage Area
                  </span>
                </NavLink>
              </li>
            </ul>

            <div className="px-4 pt-40 pb-2 w-full">
              {/* Shown fully when the sidebar is open */}
              <h4 className="is-drawer-close:hidden px-2 text-base font-medium text-gray-900">
                GENERAL
              </h4>

              {/* Shown as a subtle divider or small dot when the sidebar is closed */}
              <div className="hidden is-drawer-close:flex justify-center my-2">
                <span className="h-0.5 w-3 bg-gray-300 rounded-full"></span>
              </div>
            </div>

            <ul className="menu w-full grow py-1 px-2 is-drawer-open:px-4 gap-2">
              {/* Settings button styled consistently */}
              <li>
                <NavLink
                  to={"/dashboard/settings"}
                  className={`${linkBaseStyle} text-black font-light hover:text-gray-900`}
                  data-tip="Settings"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4 shrink-0"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden truncate">
                    Settings
                  </span>
                </NavLink>
              </li>

              {/* Change Password styled  */}
              <li>
                <NavLink
                  to={"/login"}
                  className={`${linkBaseStyle} text-black font-light hover:text-gray-900`}
                  data-tip="Change Password"
                >
                  <RiLockPasswordLine className="my-1.5 size-4.5 shrink-0" />
                  <span className="is-drawer-close:hidden truncate">
                    Change Password
                  </span>
                </NavLink>
              </li>

              {/* Help NavLink styled  */}
              <li>
                <NavLink
                  to={"/dashboard/help"}
                  className={`${linkBaseStyle} text-black font-light hover:text-gray-900`}
                  data-tip="Help"
                >
                  <IoMdHelpCircleOutline className="my-1.5 size-4.5 shrink-0" />
                  <span className="is-drawer-close:hidden truncate">Help</span>
                </NavLink>
              </li>

              {/* LogOut NavLink styled  */}
              <li>
                <button
                  onClick={handleLogout}
                  className={`${linkBaseStyle} text-black font-light hover:text-gray-900`}
                  data-tip="LogOut"
                >
                  <IoIosLogOut className="my-1.5 size-4.5 shrink-0" />
                  <span className="is-drawer-close:hidden truncate">
                    LogOut
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
