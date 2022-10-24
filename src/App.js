import React from "react";
import Login from "./Form/Login";
import Register from "./Form/Register";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PrivateRoutes from "./Util/PrivateRoutes";

export default function App() {
  // const nav = useNavigate();
  // const isAuth = JSON.parse(localStorage.getItem("token"));
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<HomePage />} exact />
      </Route>
      <Route path="/login" element={<Login />} exact />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
