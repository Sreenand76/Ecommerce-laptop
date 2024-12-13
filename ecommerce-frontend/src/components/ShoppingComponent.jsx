import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { getAllBrands, getAllLaptops, laptop } from "../util/ApiFunctions";
import "../Loading.css";
import { useLaptopContext } from "./context/LaptopContext";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ConfirmationAddToCartModal from "./ui/ConfirmationAddToCartModal";
import { useUserContext } from "./context/UserContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ShoppingComponent = () => {
  const { setLaptops, laptops,brands, setBrands } = useLaptopContext();
  const { handleWishlistToggle, handleAddToCart, wishlist} = useUserContext();
  
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const ViewLaptop = (laptopId) => {
    navigate(`/laptop-details/${laptopId}`);
  };

  useEffect(() => {
    setErrorMessage("");
    fetchAllLaptops()
    fetchAllBrands()
  }, [])

  const fetchAllLaptops = async () => {
    try {
      const data = await getAllLaptops()
      setErrorMessage("");
      setLoading(false);
      setLaptops(data)
    } catch (error) {
      setLoading(false);
      setErrorMessage("Error fetching Laptops,please try again later")
      console.error(error)
    }
  }
  const fetchAllBrands = async () => {
    try {
      const brands = await getAllBrands();
      setBrands(brands);
    } catch (error) {
      console.error(error);
    }
  };
  // Calculate the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(laptops.length / itemsPerPage);

  //Filtering based on category
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProcessors, setSelectedProcessors] = useState([]);
  const [selectedGraphicsCards, setSelectedGraphicsCards] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleProcessorChange = (processor) => {
    setSelectedProcessors((prev) =>
      prev.includes(processor)
        ? prev.filter((p) => p !== processor)
        : [...prev, processor]
    );
  };

  const handleGraphicsCardChange = (type) => {
    setSelectedGraphicsCards((prev) =>
      prev.includes(type) ? prev.filter((g) => g !== type) : [...prev, type]
    );
  };


  const filteredLaptops = laptops.filter((laptop) => {
    const matchesBrand = selectedBrands.length
      ? selectedBrands.includes(laptop.brand)
      : true;

    const matchesProcessor = selectedProcessors.length
      ? selectedProcessors.some(brand => laptop.processor.includes(brand))
      : true;

    const matchesGraphicsCard = selectedGraphicsCards.length
      ? selectedGraphicsCards.includes("dedicated")
        ? /nvidia|radeon/i.test(laptop.graphicsCard)
        : !/nvidia|radeon/i.test(laptop.graphicsCard)
      : true;

    const matchesPrice =
      laptop.basePrice >= priceRange[0] && laptop.basePrice <= priceRange[1];

    return matchesBrand && matchesProcessor && matchesGraphicsCard && matchesPrice;
  });

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedProcessors([]);
    setSelectedGraphicsCards([]);
    setPriceRange([0, 200000]);
  };

  const currentLaptops = filteredLaptops.slice(indexOfFirstItem, indexOfLastItem);

  // To confirm adding base variant to cart
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLaptop, setSelectedLaptop] = useState([]);
  const handleAddToCartClick = (laptop) => {
    setIsModalOpen(true); // Open the modal
    setSelectedLaptop(laptop)
  };

  const handleConfirmAddToCart = () => {   
    handleAddToCart(selectedLaptop); // Add to cart with base variant
    setIsModalOpen(false); // Close the modal
  };
  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-[88vh] max-w-[100vw] flex flex-col bg-black md:flex-row container mx-auto py-1 pr-3">

      {/* Categories Section */}
      <div className={`${categoryOpen ? "block" : "hidden"} md:block  min-w-[200px] md:w-[17vw] bg-gray-950 text-gray-200 p-5 rounded-lg shadow-lg md:h-[calc(100vh-64px)] hide-scrollbar md:overflow-y-auto ml-2 md:ml-0`}>
        <h2 className="text-xl font-semibold mb-6">Filter by Categories</h2>
        <div className="space-y-6">
          {/* Brand (Dynamic API) */}
          <div className=" rounded-lg shadow-lg">
            <h3 className="font-bold text-base mb-4 text-blue-300">Brand</h3>
            {loading ? (
              <div className="text-gray-400 mt-4 mb-7">Loading Brands...</div>)
              : (
                <div className="grid grid-cols-2 gap-4">
                  {brands.map((brand) => (
                    <label
                      key={brand.id}
                      className="flex items-center gap-2 bg-gray-900 text-gray-300 px-2 py-2 text-xs lg:text-sm rounded-md cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-3 w-3 accent-blue-500"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              )}

          </div>

          {/* Processor */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-blue-300">Processor</h3>
            <label className="block mb-2 cursor-pointer hover:text-blue-400">
              <input type="checkbox" className="mr-2 accent-blue-500"
                checked={selectedProcessors.includes("Intel")}
                onChange={() => handleProcessorChange("Intel")} /> Intel
            </label>
            <label className="block mb-2 cursor-pointer hover:text-blue-400">
              <input type="checkbox" className="mr-2 accent-blue-500"
                checked={selectedProcessors.includes("AMD")}
                onChange={() => handleProcessorChange("AMD")} /> AMD
            </label>            
          </div>

          {/* Graphics Card */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-blue-300">Graphics Card</h3>
            <label className="block mb-2 cursor-pointer hover:text-blue-400">
              <input type="checkbox" className="mr-2 accent-blue-500"
                checked={selectedGraphicsCards.includes("dedicated")}
                onChange={() => handleGraphicsCardChange("dedicated")} />Dedicated
            </label>
            <label className="block mb-2 cursor-pointer hover:text-blue-400">
              <input type="checkbox" className="mr-2 accent-blue-500"
                checked={selectedGraphicsCards.includes("integrated")}
                onChange={() => handleGraphicsCardChange("integrated")}
              /> Integrated
            </label>
          </div>

          {/* Price Range */}
          <h3 className="font-bold text-base mb-4 text-blue-300">Price</h3>
          {/* Price Range Slider */}
          <div className="relative flex items-center gap-4">
            <Slider
              range
              min={0}
              max={300000}
              step={500}
              defaultValue={[0, 200000]}
              onChange={(value) => setPriceRange(value)}
            />
          </div>
          {/* Display Current Range */}
          <div className="mt-2 text-gray-300 text-sm flex justify-between ">
            <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
            <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
          </div>

        </div>
        <div className="w-full flex justify-center">
          <button className="bg-blue-800 mt-9  rounded-lg p-2" onClick={clearFilters}>Clear Filter</button>
        </div>
      </div>

      {/* Mobile Toggle for Categories */}
      <button
        className="md:hidden bg-gray-900 text-gray-300 min-w-[95vw] ml-2 px-24 py-2 rounded-lg mb-4 mt-2"
        onClick={() => setCategoryOpen(!categoryOpen)}
      >
        {categoryOpen ? "Hide Categories" : "Show Categories"}
      </button>

      {/* Laptops Section */}
      <div className="flex-1 flex flex-col ">
        {errorMessage && (
          <div className="flex justify-center mt-20">
            <p>{errorMessage}</p>
          </div>
        )}
        {loading ? (
          <div className="spinner-container  h-[70vh] lg:h-[90vh] lg:max-w-[80vw]">

            <div className="spinner"></div>
            <div className="ml-2 text-gray-400 text-center text-2xl fade-text">Loading Laptops...</div>
          </div>

        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-3 ml-4  hide-scrollbar md:overflow-y-auto">
            <TransitionGroup component={null}>
            {currentLaptops.map((laptop) => (
               <CSSTransition key={laptop.id} timeout={500} classNames="laptop-list">
              <div
                key={laptop.id}
                className="flex flex-col items-center text-gray-300 pb-4 border border-gray-700 shadow-lg"
              >
                <button onClick={() => ViewLaptop(laptop.id)} className="w-full flex justify-center">
                  <img
                    src={laptop.imageUrl}
                    alt={laptop.name}
                    className="w-full object-fill max-w-80 md:max-w-[270px] h-64 md:h-56 px-4 md:px-4 py-4"
                  />
                </button>
                <div className="flex items-center gap-5">
                  <h3 className="text-base font-semibold text-gray-200">{laptop.name}</h3>
                  <div
                    onClick={() => handleWishlistToggle(laptop.id)}
                    className={`cursor-pointer ${wishlist.includes(laptop.id) ? "text-red-500" : "text-gray-400"
                      }`}
                  >
                    {wishlist.includes(laptop.id) ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                  </div>
                </div>
                <p className="text-xs lg:text-sm mt-2 p-2 text-center">{laptop.processor}</p>
                <p className="text-blue-400 mt-2 font-bold">₹ {laptop.basePrice.toLocaleString("en-IN")}</p>
                <div className="w-full flex justify-evenly mt-4 gap-5">
                  <button
                    onClick={() => handleAddToCartClick(laptop)}
                    className={`relative inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs transition-all duration-300 focus:outline-none bg-blue-500 text-gray-200" // If added, change to disabled style
                       bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-800 shadow-lg transform hover:scale-105"
                      }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </div>
                  </button>

                  <button
                    onClick={() => ViewLaptop(laptop.id)}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white text-xs px-2 rounded-lg hover:bg-gray-600"
                  >
                    View Model
                  </button>
                </div>
              </div>
              </CSSTransition>
            ))}
             </TransitionGroup>
            {/* Confirmation AddToCart Modal */}
            <ConfirmationAddToCartModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onConfirm={()=>handleConfirmAddToCart()}
            />

          </div>
        )}

        {!loading && totalPages > 1 && (

          <div className="w-full mt-8 flex items-center justify-center space-x-2 ">
            <button
              className={`px-2 py-2 text-xs rounded-lg transition ${currentPage === 1
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <div className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 text-xs rounded-lg transition ${currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white"
                    }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              className={`px-4 py-2 text-xs rounded-lg transition ${currentPage === totalPages
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ShoppingComponent;

