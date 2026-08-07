import axios from "axios";
import UseAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const UseAxiosSecure = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      // console.log(config.headers.Authorization);
      return config;
    });

    // Response Interceptor
    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(err);
      },
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return instance;
};

export default UseAxiosSecure;
