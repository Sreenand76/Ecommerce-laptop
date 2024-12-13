import React, { useState, useEffect } from "react";
import { getAllLaptops, deleteLaptopById } from "../../util/ApiFunctions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const LaptopList = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const data = await getAllLaptops();
        setLaptops(data);
      } catch (err) {
        setError("Failed to fetch laptops.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaptops();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this laptop?")) {
      try {
        await deleteLaptopById(id); // API function to delete a laptop
        setLaptops((prevLaptops) => prevLaptops.filter((laptop) => laptop.id !== id));
        toast.success("Laptop deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete laptop.");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-laptop/${id}`); // Navigate to update page with laptop ID
  };

  if (loading) {
    return <div className="spinner-container mt-32">
      <div className="spinner"></div>
      <div className="ml-2 text-gray-400 text-center text-2xl fade-text">Loading Laptops...</div>
    </div>
  }

  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!laptops.length) return <div className="text-center mt-10">No laptops available.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-300">Laptop List</h1>
      <div className="flex justify-end mr-1 md:mr-3 mb-4">
        <Link to={"/add-laptop"}>
          <button className="bg-indigo-900 px-5 py-2 rounded-lg">Add Laptop</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {laptops.map((laptop) => (
          <div
            key={laptop.id}
            className="bg-gray-950 p-6 rounded-lg shadow-lg text-white flex flex-col items-center"
          >
            {/* Laptop Image */}
            <div className="flex justify-center mb-4">
              <img
                src={laptop.imageUrl}
                alt={laptop.name}
                className="h-36 object-contain "
              />
            </div>

            {/* Laptop Details */}
            <div className="text-center">
              <h2 className="text-lg font-semibold">{laptop.name}</h2>
              <p className="text-sm text-blue-400">{laptop.processor}</p>
              <p className="text-xl font-bold mt-2">₹{laptop.basePrice.toLocaleString("en-IN")}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around mt-4 w-full">
              <button
                onClick={() => handleUpdate(laptop.id)}
                className="bg-blue-800 hover:bg-blue-700 text-white text-xs py-2 px-4 rounded-md"
              >
                Update/View
              </button>
              <button
                onClick={() => handleDelete(laptop.id)}
                className="bg-red-800 hover:bg-red-700 text-white text-xs py-2 px-4 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaptopList;
