import UseRole from "../../../hooks/useRole";
import Loading from "../../../componenets/Loading/Loading";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import MyParcels from "../MyParcels/MyParcels"; // adjust path to wherever MyParcels.jsx actually lives

const DashboardHome = () => {
  const { role, roleLoading } = UseRole();
  if (roleLoading) {
    return <Loading />;
  }

  if (role === "admin") {
    return <AdminDashboardHome />;
  } else if (role === "rider") {
    return <RiderDashboardHome />;
  } else {
    return <MyParcels />;
  }
};

export default DashboardHome;