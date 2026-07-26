import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center py-36">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={location?.pathname} />;
};

export default PrivateRoute;
