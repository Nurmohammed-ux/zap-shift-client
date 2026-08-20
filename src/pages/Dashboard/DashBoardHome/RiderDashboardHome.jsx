import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  RiTruckLine,
  RiCheckboxCircleLine,
  RiCalendarCheckLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import { Link } from "react-router";
import UseAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../componenets/Loading/Loading";

const IN_PROGRESS_STATUSES = [
  "driver-assigned",
  "rider-arriving",
  "parcel-picked-up",
];

const deliveryStatusStyles = {
  "ready-for-pickup": "bg-yellow-100 text-yellow-600",
  "driver-assigned": "bg-purple-100 text-purple-600",
  "rider-arriving": "bg-indigo-100 text-indigo-600",
  "parcel-picked-up": "bg-blue-100 text-blue-600",
  "parcel-delivered": "bg-green-100 text-green-600",
  "driver-rejected": "bg-red-100 text-red-500",
};

const formatStatusLabel = (status = "") =>
  status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const formatDayLabel = (isoDate) =>
  new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const formatTimeAgo = (isoString) => {
  if (!isoString) return "-";
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

const toIsoDate = (date) => date.toISOString().slice(0, 10);

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="bg-white shadow-lg rounded-xl px-4 py-2 text-sm border border-gray-100">
      <p className="text-gray-400 text-xs">{point.date}</p>
      <p className="font-semibold text-secondary">{point.count} delivered</p>
    </div>
  );
};

const RiderDashboardHome = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: parcels = [], isLoading: parcelsLoading } = useQuery({
    queryKey: ["riderParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: deliveryPerDay = [], isLoading: chartLoading } = useQuery({
    queryKey: ["riderDeliveryPerDay", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/delivery-per-day?email=${user.email}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const stats = useMemo(() => {
    const active = parcels.filter((p) =>
      IN_PROGRESS_STATUSES.includes(p.deliveryStatus),
    ).length;
    const rejected = parcels.filter(
      (p) => p.deliveryStatus === "driver-rejected",
    ).length;
    const totalDelivered = deliveryPerDay.reduce(
      (sum, row) => sum + row.count,
      0,
    );
    const todayKey = toIsoDate(new Date());
    const deliveredToday =
      deliveryPerDay.find((row) => row._id === todayKey)?.count ?? 0;

    return { active, rejected, totalDelivered, deliveredToday };
  }, [parcels, deliveryPerDay]);

  const chartData = useMemo(() => {
    const countByDate = Object.fromEntries(
      deliveryPerDay.map((row) => [row._id, row.count]),
    );
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = toIsoDate(d);
      days.push({ date: formatDayLabel(key), count: countByDate[key] ?? 0 });
    }
    return days;
  }, [deliveryPerDay]);

  const recentParcels = useMemo(
    () =>
      [...parcels]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6),
    [parcels],
  );

  if (parcelsLoading || chartLoading) return <Loading />;

  return (
    <div className="p-2 md:p-8 flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-secondary">
          Welcome back Rider {user?.displayName ? `: ${user.displayName}` : ""}
        </h2>
        <p className="text-gray-500 mt-2">Here's a quick look at your deliveries.</p>
      </div>

      <div className="border-t border-dashed border-gray-300" />

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <RiTruckLine size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">
              Active Deliveries
            </h5>
            <h4 className="text-3xl text-secondary font-extrabold">
              {stats.active}
            </h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <RiCalendarCheckLine size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">
              Delivered Today
            </h5>
            <h4 className="text-3xl text-secondary font-extrabold">
              {stats.deliveredToday}
            </h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <RiCheckboxCircleLine size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">
              Total Delivered
            </h5>
            <h4 className="text-3xl text-secondary font-extrabold">
              {stats.totalDelivered}
            </h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100">
          <div className="p-4 bg-gray-100 text-gray-500 rounded-full">
            <RiCloseCircleLine size={28} />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm text-gray-500 font-medium">Rejected</h5>
            <h4 className="text-3xl text-secondary font-extrabold">
              {stats.rejected}
            </h4>
          </div>
        </div>
      </div>

      {/* Deliveries per day chart */}
      <div className="bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-secondary">
            Deliveries — Last 14 Days
          </h3>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              interval={1}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
            <Bar dataKey="count" fill="#8cc63f" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-secondary">Recent Deliveries</h3>
          {/* ASSUMPTION: adjust these paths to your actual routes for the
              pages you've already built. */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/assigned-deliveries"
              className="btn btn-sm bg-white border border-gray-200 rounded-full font-normal"
            >
              Assigned
            </Link>
            <Link
              to="/dashboard/completed-deliveries"
              className="btn btn-sm bg-white border border-gray-200 rounded-full font-normal"
            >
              Completed
            </Link>
          </div>
        </div>

        {recentParcels.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No deliveries assigned yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-gray-400 font-normal text-sm">
                  <th className="font-medium">Tracking ID</th>
                  <th className="font-medium">Parcel</th>
                  <th className="font-medium">Receiver</th>
                  <th className="font-medium">Address</th>
                  <th className="font-medium">Date</th>
                  <th className="font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentParcels.map((parcel) => (
                  <tr key={parcel._id} className="border-t border-gray-100">
                    <td className="text-gray-500">{parcel.trackingId}</td>
                    <td className="font-medium text-secondary">
                      {parcel.parcelName}
                    </td>
                    <td className="text-gray-500">{parcel.receiverName}</td>
                    <td className="text-gray-500">{parcel.receiverAddress}</td>
                    <td className="text-gray-500">
                      {formatTimeAgo(parcel.createdAt)}
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderDashboardHome;
