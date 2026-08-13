import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuChevronDown } from "react-icons/lu";
import UseAuth from "../../../hooks/useAuth";
import UseRole from "../../../hooks/useRole";

const DashboardNavbar = () => {
  const { user } = UseAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { role } = UseRole();

  // Close the dropdown on outside click.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarSrc =
    user?.photoURL ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${user?.displayName || "User"}`;

  return (
    <nav className="navbar w-full bg-base-100 shadow-sm px-4 md:px-6">
      <div className="flex-1 flex items-center gap-3">
        <label
          htmlFor="my-drawer-4"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost drawer-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="my-1.5 inline-block size-4"
          >
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </label>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="btn btn-ghost btn-circle relative"
        >
          <IoNotificationsOutline size={22} className="text-gray-500" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500"></span>
        </button>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-2"
          >
            <img
              src={avatarSrc}
              alt={user?.displayName || "User"}
              className="size-9 rounded-full object-cover"
            />
            <div className="hidden md:flex flex-col items-start leading-tight">
              <span className="text-sm font-semibold text-secondary">
                {user?.displayName || "User"}
              </span>
              <span className="text-sm text-gray-500 uppercase font-medium">
                {role || "user"}
              </span>
            </div>
            <LuChevronDown
              size={20}
              className={`text-gray-400 transition-transform ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {menuOpen && (
            <ul className="menu absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-50">
              <li>
                <Link
                  to="/dashboard/settings"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/change-password"
                  onClick={() => setMenuOpen(false)}
                >
                  Change Password
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
