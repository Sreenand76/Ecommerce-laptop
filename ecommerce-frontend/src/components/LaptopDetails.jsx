import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLaptopById } from "../util/ApiFunctions";
import BackButton from "./ui/BackButton";
import { useUserContext } from "./context/UserContext";

const LaptopDetails = () => {
  const { id } = useParams();
  const { handleAddToCart } = useUserContext();
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [finalPrice, setFinalPrice] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [selectedRAM, setSelectedRAM] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
 
  useEffect(() => {
    if (id) {
      fetchLaptopById();
    }
  }, [id]);

  const fetchLaptopById = async () => {
    try {
      const data = await getLaptopById(id);
      setSelectedLaptop(data);
      setFinalPrice(data.basePrice); // Set the initial price
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedLaptop) {
      // Finding first RAM and ROM dynamically by their `specType`
      const defaultRAM = selectedLaptop.specs.find((spec) => spec.specType === "RAM");
      const defaultROM = selectedLaptop.specs.find((spec) => spec.specType === "ROM");
      // Set default values for RAM, ROM, and Color
      setSelectedRAM(defaultRAM ? defaultRAM.specValue : null);
      setSelectedStorage(defaultROM ? defaultROM.specValue : null);
      setSelectedColor(selectedLaptop.availableColours[0] || null);
    }
  }, [selectedLaptop]);
  

  const updatePrice = () => {
    if (!selectedLaptop) return;

    let newPrice = selectedLaptop.basePrice;

    // Add price adjustment for selected RAM
    const selectedRAMSpec = selectedLaptop.specs.find(
      (spec) => spec.specType === "RAM" && spec.specValue === selectedRAM
    );
    if (selectedRAMSpec) {
      newPrice += selectedRAMSpec.priceAdjustment;
    }

    // Add price adjustment for selected Storage
    const selectedStorageSpec = selectedLaptop.specs.find(
      (spec) => spec.specType === "ROM" && spec.specValue === selectedStorage
    );
    if (selectedStorageSpec) {
      newPrice += selectedStorageSpec.priceAdjustment;
    }

    // Multiply by quantity
    newPrice *= quantity;

    // Trigger price change animation
    setIsChanging(true);
    setFinalPrice(newPrice);
    setTimeout(() => setIsChanging(false), 300); // Match transition duration
  };

  // Trigger price update whenever selected options or quantity changes
  useEffect(() => {
    updatePrice();
  }, [selectedRAM, selectedStorage, quantity]);

  if (!selectedLaptop) {
    return (
      <div className="spinner-container mt-[30vh]">
        <div className="spinner"></div>
        <div className="ml-2 text-gray-400 text-center text-2xl fade-text">
          Loading Laptop...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-950 shadow-lg rounded-lg text-gray-200">
     <div className="md:hidden"> <BackButton /></div>
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="w-full md:w-1/2 flex flex-col">
          <img
            src={selectedLaptop.imageUrl}
            alt={selectedLaptop.name}
            className="w-auto object-contain shadow-md my-4"
          />
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-100 border-b-2 border-gray-700 pb-2">
              Specifications
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
            <li
                className="flex items-start p-3 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div>
                  <p className="text-base font-medium text-gray-200">Processor</p>
                  <p className="text-sm text-gray-400">{selectedLaptop.processor}</p>
                </div>
              </li>
              <li
                className="flex items-start p-3 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div>
                  <p className="text-base font-medium text-gray-200">Graphics Card</p>
                  <p className="text-sm text-gray-400">{selectedLaptop.graphicsCard}</p>
                </div>
              </li>
              <li
                className="flex items-start p-3 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div>
                  <p className="text-base font-medium text-gray-200">Operating System</p>
                  <p className="text-sm text-gray-400">{selectedLaptop.os}</p>
                </div>
              </li>
              <li
                className="flex items-start p-3 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div>
                  <p className="text-base font-medium text-gray-200">Battery Life</p>
                  <p className="text-sm text-gray-400">{selectedLaptop.batteryLife}</p>
                </div>
              </li>
              <li
                className="flex items-start p-3 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div>
                  <p className="text-base font-medium text-gray-200">Display Size</p>
                  <p className="text-sm text-gray-400">{selectedLaptop.displaySize}</p>
                </div>
              </li>
              <li
                className="flex items-start p-3 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div>
                  <p className="text-base font-medium text-gray-200">Display Details</p>
                  <p className="text-sm text-gray-400">{selectedLaptop.displayDetails}</p>
                </div>
              </li>
              
            </ul>
          </div>
        </div>

        <div className="md:w-1/2 space-y-6 md:mt-5">
          <h2 className="text-4xl font-bold text-white">{selectedLaptop.name}</h2>
          <p className="text-lg text-gray-400">{selectedLaptop.description}</p>
          <p
            className={`text-2xl font-bold price ${
              isChanging ? "price-changing" : "text-blue-400"
            }`}
          >
            ₹{finalPrice.toLocaleString("en-IN")}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium mb-2">Select RAM</label>
              <div className="flex flex-wrap gap-3">
                {selectedLaptop.specs
                  .filter((spec) => spec.specType === "RAM")
                  .map((ram) => (
                    <button
                      key={ram.specValue}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium ${
                        selectedRAM === ram.specValue
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-700 text-gray-300 border-gray-600"
                      } hover:bg-blue-600 hover:text-white transition`}
                      onClick={() => setSelectedRAM(ram.specValue)}
                    >
                      {ram.specValue}
                    </button>
                  ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Select Storage</label>
              <div className="flex flex-wrap gap-3">
                {selectedLaptop.specs
                  .filter((spec) => spec.specType === "ROM")
                  .map((storage) => (
                    <button
                      key={storage.specValue}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium ${
                        selectedStorage === storage.specValue
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-700 text-gray-300 border-gray-600"
                      } hover:bg-blue-600 hover:text-white transition`}
                      onClick={() => setSelectedStorage(storage.specValue)}
                    >
                      {storage.specValue}
                    </button>
                  ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Select Color</label>
              <div className="flex space-x-3">
                {selectedLaptop.availableColours.map((color) => (
                
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === color
                      ? "border-blue-500"
                      : "border-gray-600"
                      }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                className="w-24 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={()=>handleAddToCart(selectedLaptop,selectedColor,selectedRAM,selectedStorage,quantity,finalPrice)}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaptopDetails;

