import React, { useState } from "react";
import { AddLaptopAdmin } from "../../util/ApiFunctions";
import { toast } from "react-toastify";
import BackButton from "../ui/BackButton";

const AddLaptop = () => {
  const [laptopDetails, setLaptopDetails] = useState({
    name: "",
    brand: "",
    basePrice: 0, // basePrice is a number
    description: "",
    imageUrl: "",
    availableColours: [],
    processor: "",
    graphicsCard: "",
    batteryLife: "", // new field for battery life
    os: "",
    displaySize: "",
    displayDetails: "",
    specs: [], // List of LaptopSpec objects
  });

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
      updatedSpecs[index] = { ...updatedSpecs[index], [field]: value };
      return { ...prev, specs: updatedSpecs };
    });
  };

  const handleAddSpec = () => {
    setLaptopDetails((prev) => ({
      ...prev,
      specs: [...prev.specs, { specType: "", specValue: "", priceAdjustment: "" }],
    }));
  };

  const handleRemoveSpec = (index) => {
    setLaptopDetails((prev) => {
      const updatedSpecs = prev.specs.filter((_, i) => i !== index);
      return { ...prev, specs: updatedSpecs };
    });
  };

  const handleColourChange = (index, value) => {
    setLaptopDetails((prev) => {
      const updatedColours = [...prev.availableColours];
      updatedColours[index] = value;
      return { ...prev, availableColours: updatedColours };
    });
  };

  const handleAddColour = () => {
    setLaptopDetails((prev) => ({
      ...prev,
      availableColours: [...prev.availableColours, ""],
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
      // Ensure basePrice is a number when submitting
      laptopDetails.basePrice = parseFloat(laptopDetails.basePrice);
      console.log(laptopDetails)
      await AddLaptopAdmin([laptopDetails]);
      toast.success("Laptop added successfully!");
      setLaptopDetails({
        name: "",
        brand: "",
        basePrice: 0,
        description: "",
        imageUrl: "",
        availableColours: [],
        processor: "",
        graphicsCard: "",
        batteryLife: "",
        os: "",
        displaySize: "",
        displayDetails: "",
        specs: [],
      });
    } catch (err) {
      toast.error("Failed to add laptop.");
    }
  };

  return (
    <div className="container mx-auto p-2 max-w-4xl">
      <BackButton />
      <h1 className="text-2xl font-bold text-center mb-6">Add Laptop</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-950 p-4 md:p-6 rounded-lg shadow-lg"
      >
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
         {/* Details */}
         <div>
          <label className="block mb-2 text-gray-300">Details</label>
          <input
            type="text"
            name="description"
            value={laptopDetails.description}
            onChange={handleChange}
            className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="Enter details"
          />
        </div>
        {/* Base Price */}
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

        {/* Processor */}
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

        {/* Graphics Card */}
        <div>
          <label className="block mb-2 text-gray-300">Graphics Card</label>
          <input
            type="text"
            name="graphicsCard"
            value={laptopDetails.graphicsCard}
            onChange={handleChange}
            className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="Enter graphics card details"
          />
        </div>

        {/* Battery Life */}
        <div>
          <label className="block mb-2 text-gray-300">Battery Life</label>
          <input
            type="text"
            name="batteryLife"
            value={laptopDetails.batteryLife}
            onChange={handleChange}
            className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="Enter battery life"
          />
        </div>

        {/* Operating System */}
        <div>
          <label className="block mb-2 text-gray-300">Operating System</label>
          <input
            type="text"
            name="os"
            value={laptopDetails.os}
            onChange={handleChange}
            className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="Enter operating system"
          />
        </div>

        {/* Display Size */}
        <div>
          <label className="block mb-2 text-gray-300">Display Size</label>
          <input
            type="text"
            name="displaySize"
            value={laptopDetails.displaySize}
            onChange={handleChange}
            className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="Enter display size"
          />
        </div>

        {/* Display Details */}
        <div>
          <label className="block mb-2 text-gray-300">Display Details</label>
          <input
            type="text"
            name="displayDetails"
            value={laptopDetails.displayDetails}
            onChange={handleChange}
            className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="Enter display details"
          />
        </div>

        {/* Dynamic Specs */}
        <div>
          <label className="block mb-2 text-gray-300">Dynamic Specs</label>
          {laptopDetails.specs.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Type (e.g., RAM)"
                value={spec.specType}
                onChange={(e) => handleSpecChange(index, "specType", e.target.value)}
                className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Value (e.g., 16GB)"
                value={spec.specValue}
                onChange={(e) => handleSpecChange(index, "specValue", e.target.value)}
                className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price Adjustment"
                value={spec.priceAdjustment}
                onChange={(e) => handleSpecChange(index, "priceAdjustment", e.target.value)}
                className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveSpec(index)}
                className="bg-red-600 text-white px-2 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSpec}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Add Spec
          </button>
        </div>

        {/* Colours Section */}
        <div>
          <label className="block mb-2 text-gray-300">Available Colours</label>
          {laptopDetails.availableColours.map((colour, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Enter Colour"
                value={colour}
                onChange={(e) => handleColourChange(index, e.target.value)}
                className="border border-transparent p-3 w-full bg-gray-800 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveColour(index)}
                className="bg-red-600 text-white px-2 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddColour}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
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
            Add Laptop
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLaptop;


