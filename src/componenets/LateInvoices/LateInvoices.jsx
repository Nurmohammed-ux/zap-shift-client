import { Link } from "react-router";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuFilter } from "react-icons/lu";

// Placeholder rows — swap for the real overdue-invoices query.
const invoices = [
  { no: "#PTD145142547", price: 4500, ago: "10 day ago" },
  { no: "#PTD145142547", price: 9800, ago: "1 day ago" },
  { no: "#PTD145142547", price: 2000, ago: "1h ago" },
  { no: "#PTD145142547", price: 2700, ago: "2h ago" },
  { no: "#PTD145142547", price: 1500, ago: "3h ago" },
  { no: "#PTD145142547", price: 8500, ago: "4h ago" },
];

const LateInvoices = () => (
  <div className="bg-white rounded-2xl p-6 h-full">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-secondary">Late Invoices</h3>
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard/invoices"
          className="btn btn-sm bg-primary rounded-full font-semibold"
        >
          View All Invoices
        </Link>
        <LuFilter className="text-gray-400 cursor-pointer" />
        <HiOutlineDotsVertical className="text-gray-400 cursor-pointer" />
      </div>
    </div>

    <table className="table w-full">
      <thead>
        <tr className="text-gray-800 font-normal text-sm">
          <th className="font-medium">No</th>
          <th className="font-medium">Price</th>
          <th className="font-medium">Date</th>
          <th className="font-medium">Action</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((row, i) => (
          <tr key={`${row.no}-${i}`} className="border-t border-gray-100">
            <td className="text-gray-600">{row.no}</td>
            <td className="text-gray-600">{row.price.toFixed(2)}</td>
            <td className="text-gray-500">{row.ago}</td>
            <td>
              <HiOutlineDotsVertical className="text-gray-400 cursor-pointer" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LateInvoices;
