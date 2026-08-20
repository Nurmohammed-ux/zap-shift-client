import { Link } from "react-router";
import { LuInfo, LuCheck, LuTriangleAlert } from "react-icons/lu";
import { RiExternalLinkLine } from "react-icons/ri";

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

const formatStatusLabel = (status = "") =>
  status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const IN_TRANSIT_STATUSES = [
  "driver-assigned",
  "rider-arriving",
  "parcel-picked-up",
];

const ALERT_WORTHY_STATUSES = [
  "driver-rejected",
  "parcel-delivered",
  "rider-arriving",
];

const toneStyles = {
  info: "bg-blue-100 text-blue-500",
  danger: "bg-red-100 text-red-500",
  success: "bg-green-100 text-green-600",
};

const toneForStatus = (status) => {
  if (status === "driver-rejected") return "danger";
  if (status === "parcel-delivered") return "success";
  return "info";
};

const iconForTone = {
  info: LuInfo,
  danger: LuTriangleAlert,
  success: LuCheck,
};

const ShipmentAlerts = ({ parcels = [] }) => {

  const inTransitCount = parcels.filter((p) =>
    IN_TRANSIT_STATUSES.includes(p.deliveryStatus),
  ).length;
  const rejectedCount = parcels.filter(
    (p) => p.deliveryStatus === "driver-rejected",
  ).length;

  const alerts = [...parcels]
    .filter((p) => ALERT_WORTHY_STATUSES.includes(p.deliveryStatus))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-secondary">Shipment Alerts</h3>
        <Link
          to="/dashboard"
          className="btn btn-sm bg-primary rounded-full font-semibold"
        >
          View Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-xl text-center py-4">
          <p className="text-2xl font-bold text-secondary">{inTransitCount}</p>
          <p className="text-gray-400 text-sm">In Transit</p>
        </div>
        <div className="bg-gray-50 rounded-xl text-center py-4">
          <p className="text-2xl font-bold text-secondary">{rejectedCount}</p>
          <p className="text-gray-400 text-sm">Rejected</p>
        </div>
      </div>

      {alerts.length === 0 ? (
        <p className="text-gray-400 text-center py-6">No recent activity.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {alerts.map((parcel) => {
            const tone = toneForStatus(parcel.deliveryStatus);
            const Icon = iconForTone[tone];
            return (
              <li
                key={parcel._id}
                className="flex items-center justify-between px-2 py-2 rounded-xl hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`size-7 rounded-full flex items-center justify-center ${toneStyles[tone]}`}
                  >
                    <Icon size={14} />
                  </span>
                  <div>
                    <p className="font-semibold text-secondary text-sm">
                      {formatStatusLabel(parcel.deliveryStatus)}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Shipment {parcel.trackingId} &bull;{" "}
                      {formatTimeAgo(parcel.createdAt)}
                    </p>
                  </div>
                </div>
                <RiExternalLinkLine className="text-gray-300" />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ShipmentAlerts;
