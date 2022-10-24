import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [person, setPerson] = useState({ login: "", password: "" });
  const [people, setPeople] = useState([]);
  const [error, setError] = useState([]);
  const [getToken, setGetToken] = useState("");
  const nav = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://learning.staging.aasatech.asia/api/v1/auth/session",
        {
          method: "Post",
          headers: {
            Accept: "application/json",
            "Content-Type": "Application/Json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            login: person.login,
            password: person.password,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        setError(responseData.message);
        return;
      }
      window.localStorage.setItem("token", [responseData.token]);
      setPeople({ ...people, responseData });
      if (!responseData) {
        nav("/login");
      }
      nav("/");
    } catch (error) {
      // console.log("something when wrong", error);
    }
  };
  // if (person.email && person.password) {
  //   const newPerson = { ...person, id: new Date().getTime().toString() };
  //   setPeople({ ...people, newPerson });
  //   setPerson({ email: "", password: "" });
  // }
  //   fetch("https://learning.staging.aasatech.asia/api/v1/auth/session", {
  //     method: "GET",
  //     body: JSON.Stringify({
  //       email: person.email,
  //       password: person.password,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .catch((error) => console.log(error));

  // console.log(people);
  // const validation = async () => {
  //   const response = await fetch(
  //     "https://learning.staging.aasatech.asia/api/v1/auth/validation",
  //     {
  //       method: "GET",
  //     }
  //   );
  //   const responData = response.json();
  //   console.log(responData.message);
  // };
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="bg-white w-96 p-6 rounded shadow-sm">
          <div className="flex items-center justify-center font-bold mb-4 text-xl">
            <h1>Sign In</h1>
          </div>
          <h3 className="mb-3 text-red-400">{error}</h3>
          <label>Email or Username</label>
          <input
            type="text"
            className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-4"
            name="login"
            value={person.login}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={person.password}
            onChange={handleChange}
            className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-4"
          />
          <div className="flex items-end justify-end">
            <button
              type="submit "
              className="w-1/3 bg-blue-500 hover:bg-blue-600 mb-4"
            >
              Login
            </button>
          </div>
          <h3 className="flex items-center justify-center">
            Don't have account ? <Link to="/register">Register</Link>
          </h3>
        </div>
      </form>
    </main>
  );
}
