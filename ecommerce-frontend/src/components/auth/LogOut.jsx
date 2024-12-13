import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/", { state: { message: "You have been logged out!" } });
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate(-1);
  };

  return (
    <>
      {/* Logout confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-70 mx-4">
          <div className="bg-gray-900 rounded-lg w-96 border border-gray-700 shadow-lg ">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h5 className="text-lg font-semibold text-gray-100">Confirm Logout</h5>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-300"
                onClick={handleCancel}
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-400">Are you sure you want to log out?</p>
            </div>
            <div className="flex justify-end p-4 space-x-4 border-t border-gray-700">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogOut;
