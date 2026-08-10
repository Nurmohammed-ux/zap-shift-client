import { Link } from "react-router";
import { FaLock, FaArrowLeft } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="bg-gray-50 md:py-50 flex items-center justify-center p-6 rounded-2xl">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center relative overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-100 rounded-full blur-2xl pointer-events-none opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-100 rounded-full blur-2xl pointer-events-none opacity-50"></div>

        {/* Icon Container */}
        <div className="relative z-10 flex justify-center mb-6">
          <div className="w-30 h-30 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shadow-inner border border-red-100 animate-pulse">
            <FaLock size={60} />
          </div>
        </div>

        {/* Error Code & Title */}
        <div className="relative z-10">
          <span className="inline-block px-6 py-2 bg-red-100 text-red-600 rounded-full text-base font-extrabold uppercase tracking-widest mb-3">
            Error 403
          </span>
          <h1 className="text-3xl font-extrabold text-secondary tracking-tight">
            Access Forbidden
          </h1>
          <p className="text-gray-500 text-lg mt-3 leading-relaxed">
            Oops! You don&apos;t have the necessary administrative privileges to
            view this page. If you think this is a mistake, please contact
            support.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={"/dashboard/my-parcels"}
            className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 border-none font-semibold flex items-center justify-center gap-2 rounded-xl"
          >
            <FaArrowLeft size={14} />
            Back to Dashboard
          </Link>

          <Link
            to="/"
            className="btn bg-primary hover:bg-primary/80 text-secondary border-none font-bold flex items-center justify-center gap-2 rounded-xl shadow-md"
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
            </svg>{" "}
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
