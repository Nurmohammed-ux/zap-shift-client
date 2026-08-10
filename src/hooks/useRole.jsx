import { useQuery } from "@tanstack/react-query";
import UseAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure"; // or your axios instance

const UseRole = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = "user", isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    // Only run the query if auth is done and user email exists
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role;
    },
  });

  return { role, roleLoading };
};

export default UseRole;
