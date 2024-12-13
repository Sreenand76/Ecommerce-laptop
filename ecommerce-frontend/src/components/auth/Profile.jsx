import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDetails, updateUserDetails } from "../../util/ApiFunctions";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";
import BackButton from "../ui/BackButton";


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userDetails, setUserDetails } = useUserContext();
  const [loading, setIsLoading] = useState(true);

  const { state } = useAuth();
  const { user } = state;

  useEffect(() => {
    fetchUserDetails();
  }, [])

  const fetchUserDetails = async () => {
    try {
      const data = await getUserDetails(user.email);
      setUserDetails(data)
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
    finally {
      setIsLoading(false)
    }
  };
  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      toast.success("Updating details...",
        {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
      await updateUserDetails(user.email, userDetails);
      toast.success("Profile updated successfully!",
        {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
    } catch (error) {
      console.error(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center mb-10 mt-20">
        <div className="relative mb-6">
          <div className="w-40 h-40 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
        <div>Loading User Details...</div>
        <div className="text-center">
          <div className="w-32 h-6 bg-gray-700 mb-2 animate-pulse"></div>
          <div className="w-48 h-5 bg-gray-700 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-4xl bg-gray-950 border border-gray-800 rounded-lg shadow-lg overflow-hidden mt-5 mx-2">
        <div className="p-2">
        <BackButton/>
        </div>
        {/* Header Section */}
        <div className="p-6 flex items-center justify-center flex-col border-b border-gray-700">
          <img
            src="https://i.pinimg.com/474x/81/8a/1b/818a1b89a57c2ee0fb7619b95e11aebd.jpg"
            alt="Profile"
            className="w-40 h-40 rounded-full shadow-lg border-4 border-gray-700"
          />
          <h1 className="text-xl font-semibold text-white">{userDetails.name}</h1>
          <p className="text-gray-400">{userDetails.email}</p>
        </div>

        {/* Content Section */}
        <div className="p-6 grid grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-400">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-white break-words">{userDetails.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 ">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-white break-words w-full">{userDetails.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-400">Phone</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-white">{userDetails.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-gray-400">Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg text-white break-words">{userDetails.address}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 grid grid-cols-2 gap-4">
          <Link to="/orders" className="w-full">
            <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-md text-sm font-medium">
             My Orders
            </button>
          </Link>
          <Link to="/cart" className="w-full">
            <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-md text-sm font-medium">
             My Cart Items
            </button>
          </Link>
          <Link to="/wishlist" className="w-full">
            <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-md text-sm font-medium">
             My Wishlist
            </button>
          </Link>
         
        </div>

        {/* Save/Cancel Section */}
        {isEditing && (
          <div className="p-6 flex justify-end space-x-4 border-t border-gray-700">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-md text-sm font-medium"
            >
              Save Changes
            </button>
          </div>
        )}
        {!isEditing && (
          <div className="p-6 flex justify-end">
            <button
              onClick={handleEditToggle}
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-md text-sm font-medium"
            >
              Edit Profile
            </button>
          </div>
        )}
        {/* Delete Account Section */}
        <div className="p-6 flex justify-center">
          <button
            className="bg-red-700 hover:bg-red-600 text-white py-3 px-6 rounded-md text-sm font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

