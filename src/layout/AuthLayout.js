/** @format */

import { Navigate, Outlet } from "react-router-dom";
import { useIsLoggedIn } from "../config/hooks";

const AuthLayout = () => {
  const isLoggedIn = useIsLoggedIn();
  if (isLoggedIn == null) return <h1>Loading...</h1>;
  else if (isLoggedIn === true) return <Navigate replace to={"/"} />;

  return <Outlet />;
};

export default AuthLayout;
