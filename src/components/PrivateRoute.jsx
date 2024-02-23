import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
// import Spinner from "./Spinner";
export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  //checking
  if (checkingStatus) {
    return <h3>loading..</h3> ;
    // <Spinner />
  }
  return loggedIn ? <Outlet /> : <Navigate to="/SignIn" />;
}
