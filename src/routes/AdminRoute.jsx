import Forbidden from "../componenets/Forbidden/Forbidden";
import UseAuth from "../hooks/useAuth";
import UseRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { loading } = UseAuth();
  const { role, roleLoading } = UseRole();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center py-36">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  if (role !== "admin") {
    return <Forbidden />
  }

  return children;
};

export default AdminRoute;
