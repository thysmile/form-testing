import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  //   const [isLogin, setIsLogin] = useState(false);
  const nav = useNavigate();
  const handleLogout = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const url = "https://learning.staging.aasatech.asia/api/v1/auth/logout";
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/Json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        // throw Error(responseData.message);
      }
      window.localStorage.removeItem("token", [responseData.token]);
      nav("/login");
    } catch (error) {
      console.log("something when wrong ", error);
    }
  };

  return (
    <nav className="h-37 bg-gray-200 shadow-sm p-6">
      <ul className="flex justify-between">
        <li>Welcome</li>
        <div className="flex justify-around w-1/3">
          <li>Home</li>
          <li>About</li>
          <li>Contact US</li>
        </div>
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 rounded w-1/6"
        >
          Logout
        </button>
      </ul>
    </nav>
  );
}
