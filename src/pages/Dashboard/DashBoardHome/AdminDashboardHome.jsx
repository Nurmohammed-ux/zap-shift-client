import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  RiShip2Line,
  RiUserLine,
  RiMotorbikeLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuCalendar, LuChevronDown, LuFilter, LuPackage } from "react-icons/lu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../componenets/Loading/Loading";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const PAGE_SIZE = 6;

// Real deliveryStatus values, confirmed from /parcels/delivery-status/stats:
// "pending" (stored as null in the DB), "ready-for-pickup",
// "driver-assigned", "parcel-delivered". Add more keys here as you confirm
// further statuses (e.g. "rider-arriving", "picked-up").
const deliveryStatusStyles = {
  pending: "bg-gray-100 text-gray-500",
  "ready-for-pickup": "bg-yellow-100 text-yellow-600",
  "driver-assigned": "bg-purple-100 text-purple-600",
  "rider-arriving": "bg-indigo-100 text-indigo-600",
  "picked-up": "bg-blue-100 text-blue-600",
  "parcel-delivered": "bg-green-100 text-green-600",
};

const paymentStatusStyles = {
  paid: "bg-green-100 text-green-600",
  unpaid: "bg-red-100 text-red-500",
  pending: "bg-orange-100 text-orange-500",
};

const formatStatusLabel = (status = "") =>
  status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const formatDate = (isoString) => {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatWeight = (parcel) => {
  if (parcel.parcelType === "document") return "-";
  return parcel.parcelWeight ? `${parcel.parcelWeight} kg` : "-";
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="bg-white shadow-lg rounded-xl px-4 py-2 text-sm border border-gray-100">
      <p className="text-gray-400 text-xs">{point.day}</p>
      <p className="font-semibold text-secondary">
        $ {point.amount.toLocaleString()}
      </p>
    </div>
  );
};

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("latest");

  // parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["allParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    },
  });

  // users
  const { data: users = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // riders
  const { data: riders = [] } = useQuery({
    queryKey: ["allRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  // delivery status breakdown
  const { data: deliveryStatusStats = [] } = useQuery({
    queryKey: ["deliveryStatusStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const totalRevenue = useMemo(
    () => parcels.reduce((sum, p) => sum + Number(p.cost || 0), 0),
    [parcels],
  );

  const weeklyRevenue = useMemo(() => {
    const totals = Array(7).fill(0);
    parcels.forEach((p) => {
      const day = new Date(p.createdAt).getDay();
      totals[day] += Number(p.cost || 0);
    });
    const order = [1, 2, 3, 4, 5, 6, 0]; // Mon..Sun
    return order.map((dayIndex) => ({
      day: DAY_LABELS[dayIndex],
      amount: totals[dayIndex],
    }));
  }, [parcels]);

  // Normalize the aggregation result: null _id (no deliveryStatus set yet)
  // becomes the "pending" bucket, and everything's sorted by count desc.
  const deliveryBreakdown = useMemo(() => {
    return deliveryStatusStats
      .map((row) => ({
        status: row._id ?? "pending",
        count: row.count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [deliveryStatusStats]);

  const deliveryBreakdownTotal = useMemo(
    () => deliveryBreakdown.reduce((sum, row) => sum + row.count, 0),
    [deliveryBreakdown],
  );

  // 1. Sort the parcels based on your sortOrder state
  const sortedParcels = useMemo(() => {
    return [...parcels].sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      if (sortOrder === "latest") {
        return dateB - dateA; // Newest first
      } else {
        return dateA - dateB; // Oldest first
      }
    });
  }, [parcels, sortOrder]);

  // 2. Calculate pagination using `sortedParcels` instead of `parcels`
  const totalPages = Math.max(1, Math.ceil(sortedParcels.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pageRows = useMemo(() => {
    return sortedParcels.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    );
  }, [sortedParcels, currentPage]);

  const getPieChartData = (data, total) => {
    return data.map((item, index) => {
      const percent = total ? Math.round((item.count / total) * 100) : 0;
      const statusLabel = item.status
        ? formatStatusLabel(item.status)
        : "pending";
      return {
        name: statusLabel,
        value: item.count,
        percent: percent,
        color: COLORS[index % COLORS.length],
      };
    });
  };

  const pieChartData = useMemo(() => {
    return getPieChartData(deliveryStatusStats, deliveryBreakdownTotal);
  }, [deliveryStatusStats, deliveryBreakdownTotal]);

  if (isLoading) return <Loading />;

  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-secondary">Admin Overview</h2>
          <p className="text-gray-500">
            Platform-wide activity across all users and riders.
          </p>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-300" />

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl flex items-center gap-6">
          <div className="p-3 bg-gray-100 rounded-full">
            <RiShip2Line size={35} className="text-gray-500" />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-base text-gray-500 font-semibold">
              Total Parcels
            </h5>
            <h4 className="text-2xl font-bold">{parcels.length}</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl flex items-center gap-6">
          <div className="p-3 bg-gray-100 rounded-full">
            <RiUserLine size={35} className="text-gray-500" />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-base text-gray-500 font-semibold">
              Total Users
            </h5>
            <h4 className="text-2xl font-bold">{users.length}</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl flex items-center gap-6">
          <div className="p-3 bg-gray-100 rounded-full">
            <RiMotorbikeLine size={35} className="text-gray-500" />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-base text-gray-500 font-semibold">
              Total Riders
            </h5>
            <h4 className="text-2xl font-bold">{riders.length}</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl flex items-center gap-6">
          <div className="p-3 bg-gray-100 rounded-full">
            <RiMoneyDollarCircleLine size={35} className="text-gray-500" />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-base text-gray-500 font-semibold">
              Total Revenue
            </h5>
            <h4 className="text-2xl font-bold">$ {totalRevenue.toFixed(0)}</h4>
          </div>
        </div>
      </div>

      {/* Weekly revenue chart */}
      <div className="bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-secondary">
            Platform Revenue This Week
          </h3>
          <div className="flex items-center gap-3">
            <button className="btn btn-sm bg-white border border-gray-200 rounded-full gap-2 font-normal">
              <LuCalendar className="text-gray-400" /> This Week
              <LuChevronDown className="text-gray-400" />
            </button>
            <HiOutlineDotsVertical className="text-gray-400 cursor-pointer" />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={weeklyRevenue}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CAEB66" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#CAEB66" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8cc63f"
              strokeWidth={2.5}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Delivery status breakdown */}
      <div className="bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-secondary">
            Delivery Status Breakdown
          </h3>
          <span className="text-sm text-gray-400">
            {deliveryBreakdownTotal} parcels
          </span>
        </div>

        {deliveryBreakdown.length === 0 ? (
          <p className="text-gray-400 text-center py-6">No data yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliveryBreakdown.map(({ status, count }) => {
              const percent = deliveryBreakdownTotal
                ? Math.round((count / deliveryBreakdownTotal) * 100)
                : 0;
              return (
                <div
                  key={status}
                  className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`badge border-0 font-medium ${
                        deliveryStatusStyles[status] ??
                        "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {formatStatusLabel(status)}
                    </span>
                    <LuPackage className="text-gray-300" size={18} />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-secondary">
                      {count}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <PieChart
          style={{
            width: "100%",
            maxHeight: "40vh",
            aspectRatio: 1,
          }}
          responsive
        >
          <Pie
            data={pieChartData}
            labelLine={false}
            // Example custom label showing percentage:
            label={({ name, percent }) => `${name}: ${percent}%`}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={true}
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* All parcels table */}
      <div className="bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-secondary">All Parcels</h3>
          <div className="flex items-center gap-3">
            {/* Calendar Dropdown */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-sm bg-white border border-gray-200 rounded-full gap-2 font-normal cursor-pointer"
              >
                <LuCalendar className="text-gray-400" />
                {sortOrder === "latest" ? "Latest First" : "Oldest First"}
                <LuChevronDown className="text-gray-400" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-40 text-sm"
              >
                <li>
                  <button
                    className={sortOrder === "latest" ? "active" : ""}
                    onClick={() => setSortOrder("latest")}
                  >
                    Latest First
                  </button>
                </li>
                <li>
                  <button
                    className={sortOrder === "oldest" ? "active" : ""}
                    onClick={() => setSortOrder("oldest")}
                  >
                    Oldest First
                  </button>
                </li>
              </ul>
            </div>
            <LuFilter className="text-gray-400 cursor-pointer" />
            <HiOutlineDotsVertical className="text-gray-400 cursor-pointer" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-400 font-normal text-sm">
                <th className="font-medium">Tracking ID</th>
                <th className="font-medium">Parcel</th>
                <th className="font-medium">Sender</th>
                <th className="font-medium">Receiver</th>
                <th className="font-medium">Date</th>
                <th className="font-medium">Weight</th>
                <th className="font-medium">Type</th>
                <th className="font-medium">Price</th>
                <th className="font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center text-gray-400 py-8">
                    No parcels yet.
                  </td>
                </tr>
              ) : (
                pageRows.map((parcel) => (
                  <tr key={parcel._id} className="border-t border-gray-100">
                    <td className="text-gray-500">
                      {parcel.trackingId ||
                        `#${parcel._id?.slice(-6).toUpperCase()}`}
                    </td>
                    <td className="font-medium text-secondary">
                      {parcel.parcelName}
                    </td>
                    <td className="text-gray-500">{parcel.senderName}</td>
                    <td className="text-gray-500">{parcel.receiverName}</td>
                    <td className="text-gray-500">
                      {formatDate(parcel.createdAt)}
                    </td>
                    <td className="text-gray-500">{formatWeight(parcel)}</td>
                    <td>
                      <span
                        className={`badge border-0 font-medium ${
                          parcel.parcelType === "document"
                            ? "text-blue-600"
                            : " text-green-600"
                        }`}
                      >
                        {formatStatusLabel(parcel.parcelType)}
                      </span>
                    </td>
                    <td className="text-gray-500">
                      <div className="flex flex-col gap-1">
                        <span>${Number(parcel.cost ?? 0).toFixed(2)}</span>
                        <span
                          className={`badge badge-sm border-0 font-medium w-fit ${
                            paymentStatusStyles[parcel.paymentStatus] ??
                            "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {formatStatusLabel(parcel.paymentStatus || "unpaid")}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge border-0 font-medium ${
                          deliveryStatusStyles[parcel.deliveryStatus] ??
                          "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {formatStatusLabel(parcel.deliveryStatus || "pending")}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {parcels.length > PAGE_SIZE && (
          <div className="flex justify-between items-center mt-4">
            <button
              className="btn btn-sm bg-white border border-gray-200 rounded-full"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`size-7 rounded-full text-sm ${
                    currentPage === n
                      ? "bg-primary font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              className="btn btn-sm bg-white border border-gray-200 rounded-full"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
