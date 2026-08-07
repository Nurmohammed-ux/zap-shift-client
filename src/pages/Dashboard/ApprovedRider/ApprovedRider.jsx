import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUser,
  FaIdCard,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaRegTrashAlt,
} from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { MdPersonRemove } from "react-icons/md";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/useAuth";

const ApprovedRider = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = {
      status: status,
      email: rider.email,
    };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          title: status === "approved" ? "Approved!" : "Rejected!",
          text:
            status === "approved"
              ? "The rider application has been approved successfully."
              : "The rider application has been rejected.",
          icon: "success",
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
          background: "#ffffff",
          customClass: {
            popup: "rounded-2xl shadow-xl border border-gray-100 p-6",
            title: "text-xl font-extrabold text-secondary",
            htmlContainer: "text-gray-500 text-sm",
          },
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const handleDeleteRider = (rider) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure
          .delete(`/riders/${rider._id}?email=${user.email}`)
          .then((result) => {
            console.log(result.data);
            if (result.data.deletedCount) {
              refetch();

              Swal.fire({
                title: "Deleted!",
                text: "Your rider request has been deleted.",
                icon: "success",
              });
            }
          });
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-10 border-b border-gray-100 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-secondary flex items-center gap-3">
            <FaMotorcycle size={30} className="text-gray-500 text-2xl" />{" "}
            Pending Riders
          </h2>
          <p className="text-gray-500 text-base mt-2">
            Review and manage incoming rider applications and verification
            details.
          </p>
        </div>
        <div className="bg-primary/10 text-secondary px-4 py-2 rounded-xl text-base font-bold border border-primary/20 w-fit">
          Total Requests: {riders.length}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="table w-full text-left border-collapse">
          {/* table Head */}
          <thead>
            <tr className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider font-semibold border-b border-gray-200">
              <th className="py-4 px-6">Rider Info</th>
              <th className="py-4 px-6">Contact & Location</th>
              <th className="py-4 px-6">Bike & License</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>

          {/* table Body */}
          <tbody className="divide-y divide-gray-100 text-sm">
            {riders.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-12 text-gray-400 font-medium"
                >
                  No pending rider applications found.
                </td>
              </tr>
            ) : (
              riders.map((rider) => (
                <tr
                  key={rider._id}
                  className="hover:bg-gray-50/80 transition-colors duration-150 even:bg-gray-50/50"
                >
                  {/* Rider Info (Name & NID) */}
                  <td className="py-4 px-6 font-semibold text-secondary">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-gray-800 font-bold">
                        <FaUser className="text-gray-400 text-xs shrink-0" />
                        {rider.name || "N/A"}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1 font-normal">
                        <FaIdCard className="text-gray-400 text-xs shrink-0" />
                        NID: {rider.nid || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Contact & Location (Email, Phone, Address) */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-700 flex items-center gap-1.5 font-medium">
                        <FaEnvelope className="text-gray-400 text-xs shrink-0" />
                        {rider.email || "N/A"}
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1.5">
                        <FaPhone className="text-gray-400 text-xs shrink-0" />
                        {rider.phone || "N/A"}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1.5 truncate max-w-xs">
                        <FaMapMarkerAlt className="text-gray-400 text-xs shrink-0" />
                        {rider.yourAddress ||
                          `${rider.district}, ${rider.region}`}
                      </span>
                    </div>
                  </td>

                  {/* Bike & License Info */}
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-500 flex items-center gap-1">
                        <FaMotorcycle className="text-gray-400 text-xs shrink-0" />
                        {rider.bikeModel || "N/A"}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">
                        Reg: {rider.bikeRegistration || "N/A"}
                      </span>
                      <span className="text-xs text-gray-500">
                        Lic: {rider.license || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Status Info */}
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                        rider.status === "approved"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : rider.status === "rejected"
                            ? "bg-rose-100 text-rose-800 border-rose-200"
                            : "bg-orange-100 text-orange-600 border-orange-200"
                      }`}
                    >
                      {rider.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleApproval(rider)}
                        className="btn btn-sm bg-primary/20 hover:bg-primary/50 text-secondary hover:text-black border-none transition-all duration-200 font-semibold"
                        title="Approve Rider"
                      >
                        <FaUserCheck />
                      </button>
                      <button
                        onClick={() => handleRejection(rider)}
                        className="btn btn-sm bg-primary/20 hover:bg-primary/50 text-secondary hover:text-black border-none transition-all duration-200 font-semibold"
                        title="Reject Rider"
                      >
                        <MdPersonRemove size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteRider(rider)}
                        className="btn btn-sm bg-primary/20 hover:bg-primary/50 text-secondary hover:text-red-500 border-none transition-all duration-200 font-semibold"
                        title="Delete Rider"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedRider;
