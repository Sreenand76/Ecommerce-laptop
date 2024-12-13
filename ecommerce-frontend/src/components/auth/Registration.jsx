import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../util/ApiFunctions";

const Registration = () => {
  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(registration);
      setSuccessMessage(result.message); // assuming result has a message
      setErrorMessage("");
      setRegistration({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
      });
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(
        `Registration error: ${error.message || "An error occurred"}`
      );
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg px-5 md:px-8 py-7 mx-4 mt-5 border border-gray-600"

      >
        {errorMessage && (
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-4 text-sm">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-600 text-white px-4 py-3 rounded-lg mb-4 text-sm">
            {successMessage}
          </div>
        )}
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleRegistration}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={registration.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={registration.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={registration.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={registration.address}
              onChange={handleInputChange}
              required
              placeholder="Enter your address"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={registration.phone}
              onChange={handleInputChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-sm text-gray-400">Already have an account? </span>
          <Link
            to="/login"
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
