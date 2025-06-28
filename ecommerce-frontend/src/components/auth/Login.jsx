import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../util/ApiFunctions";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await loginUser(login);
      if (success) {
        handleLogin(success.token);
        navigate("/");
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
    }

    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    setIsGuestLoading(true);
    setErrorMessage("");
    
    try {
      const success = await loginUser({
        email: "guest123@gmail.com",
        password: "test_9037"
      });

      if (success) {
        handleLogin(success.token);
        navigate("/");
        toast.success("Guest login successful", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
      } else {
        setErrorMessage("Guest login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to login as guest. Please try again.");
    } finally {
      setIsGuestLoading(false);
    }

    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-2xl p-8 mx-4 mt-24">
        {errorMessage && (
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-4 text-sm">
            {errorMessage}
          </div>
        )}
        <h2 className="text-3xl font-semibold text-center text-gray-100 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
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
              value={login.email}
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
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-800"
              value={login.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 mb-3"
          >
            Login
          </button>
          
          <button
            onClick={handleGuestLogin}
            disabled={isGuestLoading}
            className={`w-full ${isGuestLoading ? 'bg-gray-700' : 'bg-gray-600'} text-white py-2.5 rounded-lg shadow-md hover:bg-gray-700 transition duration-200 flex items-center justify-center`}
          >
            {isGuestLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : "Fast Guest Login"}
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-sm text-gray-400">
            Don't have an account?{" "}
          </span>
          <Link
            to="/register"
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;