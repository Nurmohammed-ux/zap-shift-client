import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import Error from "../pages/Error/Error";
import AboutUs from "../pages/AboutUs/AboutUs";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "../routes/PrivateRoute";
import Rider from "../pages/Rider/Rider";
import Pricing from "../pages/Pricing/Pricing";
import SendParcel from "../pages/SendParcel/SendParcel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: (
      <div className="flex justify-center py-36">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/coverage",
        element: <Coverage />,
        loader: () => fetch("/service-centers.json"),
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/beARider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
export default router;
