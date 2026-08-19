import Forbidden from "../componenets/Forbidden/Forbidden";
import Loading from "../componenets/Loading/Loading";
import UseAuth from "../hooks/useAuth";
import UseRole from "../hooks/useRole";

const RiderRoute = ({ children }) => {
  const { loading } = UseAuth();
  const { role, roleLoading } = UseRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (role !== "rider") {
    return <Forbidden />;
  }

  return children;
};

export default RiderRoute;
