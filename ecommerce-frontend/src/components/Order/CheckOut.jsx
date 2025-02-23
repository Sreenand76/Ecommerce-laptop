import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { RemoveItemFromCart, createOrder } from "../../util/ApiFunctions";

const Checkout = () => {
  const { userDetails, checkOutCartItemDetails, setCheckoutCartItemDetails } = useUserContext();
  const [checkoutDetails, setCheckoutDetails] = useState({
    fullName: userDetails.name,
    email: userDetails.email,
    phno: userDetails.phone,
    shippingAddress: userDetails.address,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  useEffect(() => {
    const { cartItem } = location.state || {};
    setCheckoutCartItemDetails([cartItem]);
  }, []);

  const handleInputChange = (e) => {
    setCheckoutDetails({ ...checkoutDetails, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Prepare the order details from checkout details
      const orderDetails = {
        userEmail: checkoutDetails.email,
        laptopId: checkOutCartItemDetails[0].laptopId,
        color: checkOutCartItemDetails[0].color,
        ram: checkOutCartItemDetails[0].ram,
        storage: checkOutCartItemDetails[0].storage,
        quantity: checkOutCartItemDetails[0].quantity,
        totalPrice: checkOutCartItemDetails[0].totalPrice,
        status: "Pending",
        shippingAddress: checkoutDetails.shippingAddress,
        phno: checkoutDetails.phno,
      };
      // Call createOrder API function to save the order in the backend
      await createOrder(email, orderDetails); // Assuming userId is available from context or props
      await RemoveItemFromCart(email, checkOutCartItemDetails[0].laptopId, checkOutCartItemDetails[0])
      setErrorMessage("");
      setCheckoutDetails({
        fullName: "",
        email: "",
        shippingAddress: "",
        paymentMethod: "",
      });
      setShowModal(false);

      toast.success("Order successfully placed", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });

      navigate("/");

    } catch (error) {

      setErrorMessage(`Checkout error: ${error.message || "An error occurred"}`);
    } finally {
      setIsProcessing(false)
    }
    setTimeout(() => {
      setErrorMessage("");

    }, 5000);
  };

  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-col items-center px-3">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg px-5 md:px-8 py-7 mx-4 mt-12 border border-gray-600 ">
        {errorMessage && (
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-4 text-sm">
            {errorMessage}
          </div>
        )}
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">Checkout</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={checkoutDetails.fullName}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
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
              value={checkoutDetails.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="phno"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Phone No
            </label>
            <input
              id="phno"
              name="phno"
              type="text"
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={checkoutDetails.phno}
              onChange={handleInputChange}
              required
              placeholder="Enter your Phone no"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="shippingAddress"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Shipping Address
            </label>
            <input
              id="shippingAddress"
              name="shippingAddress"
              type="text"
              className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={checkoutDetails.shippingAddress}
              onChange={handleInputChange}
              required
              placeholder="Enter your shipping address"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Proceed
          </button>
        </form>
      </div>

      {/* Order Summary Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-950 text-white w-full max-w-4xl rounded-lg p-6 shadow-lg relative mx-2 md:grid md:grid-cols-2 md:gap-6">
            {/* Modal Header */}
            <h2 className="text-2xl font-bold mb-6 md:col-span-2 text-center">Order Summary</h2>

            {checkOutCartItemDetails ? (
              <>
                {/* Image Section */}
                <div className="flex justify-center items-start">
                  <img
                    src={checkOutCartItemDetails[0]?.imageUrl}
                    alt={checkOutCartItemDetails[0]?.name}
                    className="w-full h-44 md:h-72 xl:h-72 object-contain md:object-contain rounded-lg mb-4 max-w-sm"
                  />
                </div>

                {/* Details Section */}
                <div className="md:pl-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">{checkOutCartItemDetails[0]?.name}</h3>
                    <p className="text-gray-400 mb-2">
                      <strong>Processor:</strong> {checkOutCartItemDetails[0].processor}
                    </p>
                    <p className="text-gray-400 mb-2">
                      <strong>Graphics Card:</strong> {checkOutCartItemDetails[0].graphicsCard}
                    </p>
                    <p className="text-gray-400 mb-2">
                      <strong>RAM:</strong> {checkOutCartItemDetails[0].ram}
                    </p>
                    <p className="text-gray-400 mb-2">
                      <strong>Storage:</strong> {checkOutCartItemDetails[0].storage}
                    </p>
                    <p className="text-gray-400 mb-2">
                      <strong>Color:</strong> {checkOutCartItemDetails[0].color}
                    </p>
                    <p className="text-gray-400 mb-2">
                      <strong>Quantity:</strong> {checkOutCartItemDetails[0].quantity}
                    </p>
                    <p className="text-gray-400 mt-4">
                      <strong>Shipping Address:</strong> {checkoutDetails.shippingAddress}
                    </p>
                    <p className="text-gray-400">
                      <strong>Phone No:</strong> {checkoutDetails.phno}
                    </p>
                    <p className="text-gray-400 mt-4 text-lg">
                      <strong>Total Price:</strong> ₹{checkOutCartItemDetails[0].totalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-400 md:col-span-2">No items in the cart.</p>
            )}

            {/* Buttons Section */}
            <div className="md:col-span-2 flex flex-col md:flex-row justify-evenly items-center mt-6 md:mt-8">
              <button
                className="w-full md:w-1/4 bg-red-800 text-white py-2.5 rounded-lg shadow-md hover:bg-red-600 transition duration-200 mb-3 md:mb-0"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="w-full md:w-1/3 bg-green-700 text-white py-2.5 mb-3 md:mb-0 md:mr-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200 flex justify-center items-center gap-2"
                onClick={handleCheckout}
                disabled={isProcessing} // Disable while processing
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-3">
                     <div className="w-5 h-5 border-4 border-transparent border-tgreen-400 border-b-green-700 rounded-full animate-spin bg-gradient-to-r from-green-300 via-green-500 to-green-700"></div>
  {/* Text */}
  <span className="ml-2 text-light-green-700 font-semibold">Processing Order...</span>
</div>
                ) : (
                  "Confirm Order"
                )}
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Checkout;


