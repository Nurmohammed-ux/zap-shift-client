import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUsers,
  FaEnvelope,
  FaShieldAlt,
  FaCalendarAlt,
  FaUserShield,
  FaUser,
  FaTimes,
} from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import { MdGridView } from "react-icons/md";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [inputValue, setInputValue] = useState("");

  // for searching issue
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchText(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const {
    data: users = [],
    // isPending,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to promote ${user.displayName} to Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Admin!",
      background: "#ffffff",
      color: "#1f2937",
      customClass: {
        popup: "rounded-2xl shadow-xl border border-gray-100 p-6",
        title: "text-xl font-extrabold text-secondary tracking-wide",
        htmlContainer: "text-gray-500 text-sm mt-1",
        icon: "scale-90",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "admin" };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Role Updated Successfully!",
              text: `${user.displayName} marked as an Admin`,
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              background: "#ffffff",
              color: "#1f2937",
              customClass: {
                popup: "rounded-2xl shadow-xl border border-gray-100 p-6",
                title: "text-xl font-extrabold text-secondary tracking-wide",
                htmlContainer: "text-gray-500 text-sm mt-1",
                icon: "scale-90",
              },
            });
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change ${user.displayName}'s role to User?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove Admin!",
      background: "#ffffff",
      color: "#1f2937",
      customClass: {
        popup: "rounded-2xl shadow-xl border border-gray-100 p-6",
        title: "text-xl font-extrabold text-secondary tracking-wide",
        htmlContainer: "text-gray-500 text-sm mt-1",
        icon: "scale-90",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "user" };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Role Updated Successfully!",
              text: `${user.displayName} role changed to User`,
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              background: "#ffffff",
              color: "#1f2937",
              customClass: {
                popup: "rounded-2xl shadow-xl border border-gray-100 p-6",
                title: "text-xl font-extrabold text-secondary tracking-wide",
                htmlContainer: "text-gray-500 text-sm mt-1",
                icon: "scale-90",
              },
            });
          }
        });
      }
    });
  };
  // if (isPending) {
  //   return (
  //     <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-gray-100">
  //       <span className="loading loading-spinner loading-lg text-primary"></span>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-10 border-b border-gray-100 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-secondary flex items-center gap-3">
            <FaUsers size={30} className="text-gray-500 text-2xl" />
            Manage Users
          </h2>
          <p className="text-gray-500 text-base mt-2">
            View and manage all registered system users, roles, and profiles.
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              className="grow rounded-2xl"
              placeholder="Search Users"
            />

            <span className="w-5 h-5 flex items-center justify-center">
              <span
                className={`loading loading-spinner loading-sm transition-opacity ${
                  isFetching ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          </label>
        </form>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="table w-full text-left border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider font-semibold border-b border-gray-200">
              <th className="py-4 px-6">User Profile</th>
              <th className="py-4 px-6">Email Address</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6">Admin Action</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 text-sm">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-12 text-gray-400 font-medium"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50/80 transition-colors duration-150 even:bg-gray-100"
                >
                  {/* User Profile (Avatar & Name) */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 bg-gray-200">
                          <img
                            src={
                              user.photoURL ||
                              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            }
                            alt={user.displayName || "User Avatar"}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-secondary">
                          {user.displayName || "N/A"}
                        </div>
                        <div className="text-xs text-gray-400 font-mono">
                          ID: {user._id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-4 px-6 text-gray-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <FaEnvelope className="text-gray-400 text-xs shrink-0" />
                      {user.email || "N/A"}
                    </span>
                    <span className="flex items-center py-2 text-gray-500 text-xs gap-1.5 font-medium">
                      <FaCalendarAlt className="text-gray-400 text-xs shrink-0" />
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </td>

                  {/* Role */}
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-600"
                          : user.role === "rider"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <FaShieldAlt className="text-xs" />
                      {user.role || "user"}
                    </span>
                  </td>

                  {/* Admin Action */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-start gap-2">
                      {user.role === "admin" ? (
                        <button
                          onClick={() => handleRemoveAdmin(user)}
                          className="btn btn-sm bg-purple-100 hover:bg-purple-200 text-purple-700 border-none transition-all duration-200 font-semibold px-3"
                          title="Remove Admin Role"
                        >
                          <FiShieldOff size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-sm hover:bg-primary/50 text-secondary hover:text-black border-none transition-all duration-200 font-semibold px-3"
                          title="Make Admin"
                        >
                          <FaUserShield size={16} />
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="btn btn-sm hover:bg-primary/50 text-secondary hover:text-black border-none transition-all duration-200 font-semibold px-4"
                      title="View User Details"
                    >
                      <MdGridView />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <dialog className="modal modal-open">
          <div className="modal-box w-11/12 max-w-xl rounded-2xl p-6 bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-xl text-secondary flex items-center gap-2">
                <FaUser className="text-gray-400" /> User Profile Details
              </h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-gray-100"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Modal Avatar Section */}
            <div className="flex flex-col items-center py-6 border-b border-gray-100">
              <div className="avatar mb-3">
                <div className="mask mask-squircle h-20 w-20 bg-gray-200 shadow-md">
                  <img
                    src={
                      selectedUser.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt={selectedUser.displayName || "Avatar"}
                  />
                </div>
              </div>
              <h4 className="text-lg font-bold text-secondary">
                {selectedUser.displayName || "N/A"}
              </h4>
              <span className="text-xs text-gray-400 font-mono mt-0.5">
                {selectedUser._id}
              </span>
            </div>

            {/* Modal Body Info Grid */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-1">
                <span className="text-xs text-gray-400 uppercase font-bold">
                  Email Address
                </span>
                <span className="font-medium text-gray-800">
                  {selectedUser.email || "N/A"}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-1">
                <span className="text-xs text-gray-400 uppercase font-bold">
                  System Role
                </span>
                <span className="font-bold text-secondary uppercase">
                  {selectedUser.role || "user"}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-1 md:col-span-2">
                <span className="text-xs text-gray-400 uppercase font-bold">
                  Account Registration Date
                </span>
                <span className="font-medium text-gray-800">
                  {selectedUser.createdAt
                    ? new Date(selectedUser.createdAt).toLocaleString()
                    : "N/A"}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-action pt-4 border-t border-gray-100 m-0">
              <button
                onClick={() => setSelectedUser(null)}
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 border-none px-6"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default UsersManagement;
