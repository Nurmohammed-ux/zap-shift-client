import { Link } from "react-router";
import { LuInfo } from "react-icons/lu";
import { RiExternalLinkLine } from "react-icons/ri";

// Placeholder alerts — swap for the real alerts query.
const alerts = [
  {
    id: 1,
    title: "In Transit",
    shipmentId: "#SP11251C",
    time: "2 Hours ago",
    tone: "info",
  },
  {
    id: 2,
    title: "Damaged",
    shipmentId: "#SP11251C",
    time: "2 Hours ago",
    tone: "danger",
  },
  {
    id: 3,
    title: "In Transit",
    shipmentId: "#SP11251C",
    time: "2 Hours ago",
    tone: "info",
  },
  {
    id: 4,
    title: "Delivered",
    shipmentId: "#SP11251C",
    time: "2 Hours ago",
    tone: "info",
  },
];

const toneStyles = {
  info: "bg-blue-100 text-blue-500",
  danger: "bg-red-100 text-red-500",
};

const ShipmentAlerts = () => (
  <div className="bg-white rounded-2xl p-6 h-full">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-secondary">Shipment Alerts</h3>
      <Link
        to="/dashboard/invoices"
        className="btn btn-sm bg-primary rounded-full font-semibold"
      >
        View All Invoices
      </Link>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="bg-gray-50 rounded-xl text-center py-4">
        <p className="text-2xl font-bold text-secondary">2</p>
        <p className="text-gray-400 text-sm">Damaged</p>
      </div>
      <div className="bg-gray-50 rounded-xl text-center py-4">
        <p className="text-2xl font-bold text-secondary">10</p>
        <p className="text-gray-400 text-sm">Weather Delays</p>
      </div>
    </div>

    <ul className="flex flex-col gap-2">
      {alerts.map((alert) => (
        <li
          key={alert.id}
          className="flex items-center justify-between px-2 py-2 rounded-xl hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <span
              className={`size-7 rounded-full flex items-center justify-center ${toneStyles[alert.tone]}`}
            >
              <LuInfo size={14} />
            </span>
            <div>
              <p className="font-semibold text-secondary text-sm">
                {alert.title}
              </p>
              <p className="text-gray-400 text-xs">
                Shipment {alert.shipmentId} &bull; {alert.time}
              </p>
            </div>
          </div>
          <RiExternalLinkLine className="text-gray-300" />
        </li>
      ))}
    </ul>
  </div>
);

export default ShipmentAlerts;
