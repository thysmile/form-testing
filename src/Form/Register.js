import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [newPerson, setNewPerson] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
    phone: "",
  });
  const [newPeople, setNewPeople] = useState([]);
  const [newError, setNewError] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewPerson({ ...newPerson, [name]: value });
  };
  // const token = sessionStorage.setItem("token");
  //this fetch api with async
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://learning.staging.aasatech.asia/api/v1/auth",
        {
          method: "Post",
          headers: {
            "Content-Type": "Application/Json",
          },
          body: JSON.stringify({
            email: newPerson.email,
            username: newPerson.username,
            name: newPerson.name,
            password: newPerson.password,
            phone: newPerson.phone,
          }),
        }
      );
      const responseData = await response.json();
      setNewError(validate(newPerson));
      if (!response.ok) {
        return;
      }
      setNewPeople({ ...newPeople, responseData });
      setNewPerson({
        email: "",
        username: "",
        name: "",
        password: "",
        phone: "",
      });
      // setNewError(responseData.errors);
      // console.log(responseData.errors);
      // setNewError(responseData.errors);
    } catch (error) {
      // setNewError(error.responseData.message);
    }
    // console.log(newError);
    //this simple fetch api
    // if (!responseData) {
    //   console.log("got an error");
    // }
    // fetch("https://learning.staging.aasatech.asia/api/v1/auth", {
    //   method: "Post",
    //   body: JSON.Stringify({
    //     Name: newPerson.Name,
    //     userName: newPerson.userName,
    //     Phone: newPerson.Phone,
    //     email: newPerson.email,
    //     Password: newPerson.Password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .catch((error) => console.log(error));
    // if (
    //   newPerson.Name &&
    //   newPerson.userName &&
    //   newPerson.Phone &&
    //   newPerson.email &&
    //   newPerson.Password
    // ) {
    // const entered = { ...newPerson, id: new Date().getTime().toString() };
    // setNewPeople({ ...newPeople, entered });
    // setNewPerson({
    //   Name: "",
    //   userName: "",
    //   Phone: "",
    //   email: "",
    //   Password: "",
    // });
    //}
  };
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const expr = /^[a-zA-Z0-9._]*$/;
    const re = /^[0-9\b]+$/;
    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.username) {
      errors.username = "Cannot be blank";
    } else if (!expr.test(values.username)) {
      errors.username =
        "username only alphanumeric characters and (_), (.) can be used";
    }
    if (!values.name) {
      errors.name = "Cannot be blank";
    }
    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    }
    if (!values.phone) {
      errors.phone = "Cannot be blank";
    } else if (!re.test(values.phone)) {
      errors.phone = "Your Phone most be a number";
    }
    return errors;
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const handleValidation = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://learning.staging.aasatech.asia/api/v1/auth/validation",
  //         {
  //           Authorization: `Bearer ${token}`,
  //         }
  //       );
  //       const responseData = response.json();
  //       if (!response.ok) {
  //         throw new Error({ message: "something when wrong " });
  //       }
  //     } catch (error) {}
  //   };
  // });
  // console.log(newPeople.responseData.errors);
  // const getErrorValidate = newPeople.responseData.errors;
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="w-96 bg-white shadow-sm rounded p-6">
          <div className="flex items-center justify-center">
            <h1 className="font-bold">REGISTER</h1>
          </div>
          <label>Email</label>
          <input
            type="email"
            className="w-full py-2 bg-gray-50 text-gray-500 outline-none"
            name="email"
            value={newPerson.email}
            onChange={handleChange}
          />
          {/* <h3 className="mb-4 text-red-400">{newError.email}</h3> */}
          {newError.email && (
            <h3 className="mb-4 text-red-500">{newError.email}</h3>
          )}
          <label>UserName</label>
          <input
            name="username"
            value={newPerson.username}
            type="text"
            className="w-full py-2 bg-gray-50 text-gray-500 outline-none mb-4"
            onChange={handleChange}
          />
          {newError.username && (
            <h3 className="mb-4 text-red-500">{newError.username}</h3>
          )}
          {/* <h3 className="mb-4 text-red-400">{newError.username}</h3> */}
          <label>Name</label>
          <input
            onChange={handleChange}
            name="name"
            value={newPerson.name}
            type="phone"
            className="w-full py-2 bg-gray-50 text-gray-500 outline-none mb-4"
          />
          {newError.name && (
            <h3 className="mb-4 text-red-500">{newError.name}</h3>
          )}
          {/* <h3 className="mb-4 text-red-400">{newError.name}</h3> */}
          <label>Password</label>
          <input
            onChange={handleChange}
            name="password"
            value={newPerson.password}
            type="password"
            className="w-full py-2 bg-gray-50 text-gray-500 outline-none mb-4"
          />
          {newError.password && (
            <h3 className="mb-4 text-red-500">{newError.password}</h3>
          )}
          {/* <h3 className="mb-4 text-red-400">{newError.password}</h3> */}
          <label>Phone</label>
          <input
            onChange={handleChange}
            name="phone"
            value={newPerson.phone}
            type="text"
            className="w-full py-2 bg-gray-50 text-gray-500 outline-none mb-4"
          />
          {newError.phone && (
            <h3 className="mb-4 text-red-500">{newError.phone}</h3>
          )}
          {/* <h3 className="mb-4 text-red-400">{newError.phone}</h3> */}
          <div className="flex items-end justify-end">
            <button
              type="submit "
              className="bg-blue-500 hover:bg-blue-600 w-1/3 rounded"
            >
              Register
            </button>
          </div>
          <div className="flex items-end justify-end">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </main>
  );
}
