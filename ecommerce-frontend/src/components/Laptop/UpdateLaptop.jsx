import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UpdateLaptopfetchedById, getLaptopById } from "../../util/ApiFunctions";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import BackButton from "../ui/BackButton";

const UpdateLaptop = () => {
  const { id } = useParams();
  const [laptopDetails, setLaptopDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaptopDetails = async () => {
      try {
        const data = await getLaptopById(id);
        console.log(data)
        setLaptopDetails(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch laptop details.");
        setLoading(false);
      }
    };
    fetchLaptopDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaptopDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecChange = (index, field, value) => {
    setLaptopDetails((prev) => {
      const updatedSpecs = [...prev.specs];
      updatedSpecs[index][field] = value;
      return { ...prev, specs: updatedSpecs };
    });
  };

  const handleColourChange = (index, value) => {
    setLaptopDetails((prev) => {
      const updatedColours = [...prev.availableColours];
      updatedColours[index] = { color: value };
      return { ...prev, availableColours: updatedColours };
    });
  };

  const handleAddColour = () => {
    setLaptopDetails((prev) => ({
      ...prev,
      availableColours: [...prev.availableColours, { color: "" }],
    }));
  };

  const handleRemoveColour = (index) => {
    setLaptopDetails((prev) => {
      const updatedColours = prev.availableColours.filter((_, i) => i !== index);
      return { ...prev, availableColours: updatedColours };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...laptopDetails,
        basePrice: parseFloat(laptopDetails.basePrice),
        specs: laptopDetails.specs.map((spec) => ({
          ...spec,
          priceAdjustment: parseFloat(spec.priceAdjustment || 0),
        })),
      };

      await UpdateLaptopfetchedById(id, updatedData);
      toast.success("Laptop updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update laptop.");
    }
  };

  if (loading) {
    return <div className="spinner-container mt-32">
      <div className="spinner"></div>
      <div className="ml-2 text-gray-400 text-center text-2xl fade-text">Loading Laptop...</div>
    </div>
  }
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!laptopDetails) return <div className="text-center mt-10">No laptop details available.</div>;

  return (
    <div className="container mx-auto p-2 max-w-4xl">
      <BackButton />
      <h1 className="text-2xl font-bold text-center mb-6">Update Laptop</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-950 p-4 md:p-6 rounded-lg shadow-lg"
      >
        {/* Image Preview */}
        <div className="flex justify-center mb-4">
          <img
            src={laptopDetails.imageUrl}
            alt="Laptop Preview"
            className="w-60 max-h-60 lg:max-h-96 lg:w-96 object-contain rounded-lg"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-2 text-gray-300">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={laptopDetails.imageUrl}
            onChange={handleChange}
            className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="Enter image URL"
          />
        </div>

        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={laptopDetails.name}
              onChange={handleChange}
              className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300">Brand</label>
            <input
              type="text"
              name="brand"
              value={laptopDetails.brand}
              onChange={handleChange}
              className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-gray-300">Base Price</label>
            <input
              type="number"
              name="basePrice"
              value={laptopDetails.basePrice}
              onChange={handleChange}
              className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter base price"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300">Processor</label>
            <input
              type="text"
              name="processor"
              value={laptopDetails.processor}
              onChange={handleChange}
              className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter processor details"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300">Graphics Card</label>
            <input
              type="text"
              name="graphicsCard"
              value={laptopDetails.graphicsCard}
              onChange={handleChange}
              className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter processor details"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-gray-300">Description</label>
          <textarea
            name="description"
            value={laptopDetails.description}
            onChange={handleChange}
            className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="Enter description"
          />
        </div>

        {/* Dynamic Specs */}
        <div>
          <label className="block mb-2 text-gray-300">Dynamic Specs (RAM/ROM)</label>
          {laptopDetails.specs.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 border border-gray-500 p-2 rounded-lg">
              {/* Spec Type (e.g., RAM, Storage) */}
              <input
                type="text"
                placeholder="Type (e.g., RAM, Storage)"
                value={spec.specType}
                onChange={(e) => handleSpecChange(index, "specType", e.target.value)}
                className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              />

              {/* Spec Value (e.g., 16GB, 1TB) */}
              <input
                type="text"
                placeholder="Value (e.g., 16GB, 1TB)"
                value={spec.specValue}
                onChange={(e) => handleSpecChange(index, "specValue", e.target.value)}
                className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              />

              {/* Price Adjustment */}
              <input
                type="number"
                placeholder="Price Adjustment"
                value={spec.priceAdjustment}
                onChange={(e) => handleSpecChange(index, "priceAdjustment", e.target.value)}
                className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}
        </div>


        {/* Dynamic Colours */}
        <div>
          <label className="block mb-2 text-gray-300">Available Colours</label>
          {laptopDetails.availableColours.map((colour, index) => (
            <div key={index} className="flex max-w-sm gap-4 mb-2">
              <input
                type="text"
                placeholder="Colour"
                value={colour.color}
                onChange={(e) => handleColourChange(index, e.target.value)}
                className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveColour(index)}
                className="bg-red-800 text-white px-3 py-2 rounded-md mt-2"
              >
                <FaTrash className="text-white" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddColour}
            className="bg-green-800 text-white px-4 py-2 rounded-md"
          >
            Add Colour
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md w-full md:w-auto"
          >
            Update Laptop
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLaptop;
