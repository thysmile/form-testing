import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  let isAuth = window.localStorage.getItem("token");
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
