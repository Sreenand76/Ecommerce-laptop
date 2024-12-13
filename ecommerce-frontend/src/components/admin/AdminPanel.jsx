import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {


  return (
    <div className="text-white flex justify-center mt-32 p-3">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>
        <div className="space-y-4">

          <Link to={"/laptop-list"}>
            <button className="w-full bg-green-800 hover:bg-green-700 text-white py-3 px-4 rounded-md text-lg font-semibold mb-3">
              Manage Laptops
            </button>
          </Link>

          <Link to={"/manage-users"}>
            <button className="w-full bg-blue-800 hover:bg-blue-700 text-white py-3 px-4 rounded-md text-lg font-semibold">
              Manage Users
            </button>
          </Link>

          <Link to={"/all-orders"}>
            <button className="w-full bg-orange-800 hover:bg-orange-700 text-white py-3 px-4 rounded-md text-lg font-semibold mt-3">
              Manage orders
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
