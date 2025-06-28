import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";
import { useLocation } from "react-router-dom";
import { RemoveItemFromCart, createOrder } from "../../util/ApiFunctions";
import Payment from "../payment";

const Checkout = () => {
  const { userDetails, checkOutCartItemDetails, setCheckoutCartItemDetails } = useUserContext();
  const [checkoutDetails, setCheckoutDetails] = useState({
    fullName: userDetails.name,
    email: userDetails.email,
    phno: userDetails.phone,
    shippingAddress: userDetails.address,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const location = useLocation();
  const email = localStorage.getItem("email");

  useEffect(() => {
    const { cartItem } = location.state || {};
    if (cartItem) setCheckoutCartItemDetails([cartItem]);
  }, []);

  const handleInputChange = (e) => {
    setCheckoutDetails({ ...checkoutDetails, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowOrderSummary(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      const orderDetails = {
        userEmail: checkoutDetails.email,
        shippingAddress: checkoutDetails.shippingAddress,
        phno: checkoutDetails.phno,
        status: "Pending",
        orderItems: [
          {
            laptopId: checkOutCartItemDetails[0].laptop.id,
            selectedSpec: {
              ram: checkOutCartItemDetails[0].selectedSpec.ram,
              storage: checkOutCartItemDetails[0].selectedSpec.storage,
              color: checkOutCartItemDetails[0].selectedSpec.color,
              finalPrice: checkOutCartItemDetails[0].selectedSpec.finalPrice,
            },
            quantity: checkOutCartItemDetails[0].quantity,
            totalPrice: checkOutCartItemDetails[0].totalPrice,
          },
        ],
      };
      
      await createOrder(email, checkOutCartItemDetails[0].laptop.id, orderDetails);
      await RemoveItemFromCart(email, checkOutCartItemDetails[0].id);
      
    } catch (error) {
      toast.error("Failed to place order after payment", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex flex-col items-center px-3">
      {!showOrderSummary && !showPaymentModal && (
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg px-5 py-7 mt-12 border border-gray-600">
        {errorMessage && (
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">Checkout</h2>
        <form onSubmit={handleFormSubmit}>
          {["fullName", "email", "phno", "shippingAddress"].map((field, idx) => (
            <div className="mb-5" key={idx}>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {field === "phno" ? "Phone No" : field === "shippingAddress" ? "Shipping Address" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                name={field}
                type={field === "email" ? "email" : "text"}
                className="block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-100"
                value={checkoutDetails[field]}
                onChange={handleInputChange}
                required
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700"
          >
            Proceed
          </button>
        </form>
      </div>
      )}
      {/* Order Summary Modal */}
      {showOrderSummary && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-950 text-white w-full max-w-3xl rounded-lg p-6 shadow-lg relative mx-2 md:grid md:grid-cols-2 md:gap-6">
            <h2 className="text-2xl font-bold mb-6 md:col-span-2 text-center">Order Summary</h2>
            {checkOutCartItemDetails?.[0] && (
              <>
                <div className="flex justify-center">
                  <img
                    src={checkOutCartItemDetails[0].laptop.imageUrl}
                    alt="Laptop"
                    className="w-full max-w-sm h-44 md:h-72 object-contain rounded-lg mb-4"
                  />
                </div>

                <div className="md:pl-6">
                  <h3 className="text-xl font-semibold mb-4">{checkOutCartItemDetails[0].laptop.name}</h3>
                  <p><strong>Processor:</strong> {checkOutCartItemDetails[0].laptop.processor}</p>
                  <p><strong>Graphics:</strong> {checkOutCartItemDetails[0].laptop.graphicsCard}</p>
                  <p><strong>RAM:</strong> {checkOutCartItemDetails[0].selectedSpec.ram}</p>
                  <p><strong>Storage:</strong> {checkOutCartItemDetails[0].selectedSpec.storage}</p>
                  <p><strong>Color:</strong> {checkOutCartItemDetails[0].selectedSpec.color}</p>
                  <p><strong>Quantity:</strong> {checkOutCartItemDetails[0].quantity}</p>
                  <p className="mt-2"><strong>Shipping Address:</strong> {checkoutDetails.shippingAddress}</p>
                  <p><strong>Phone:</strong> {checkoutDetails.phno}</p>
                  <p className="text-green-400 mt-4 text-lg font-semibold">
                    Total: ₹{checkOutCartItemDetails[0].totalPrice.toLocaleString("en-IN")}
                  </p>
                </div>
              </>
            )}

            <div className="md:col-span-2 flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setShowOrderSummary(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-700 px-6 py-2 rounded hover:bg-green-600"
                onClick={() => {
                  setShowOrderSummary(false);
                  setShowPaymentModal(true);
                }}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg relative border border-gray-700 text-white m-3">
            <button
              className="absolute top-2 right-2 text-white text-xl"
              onClick={() => setShowPaymentModal(false)}
            >
              ❌
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Complete Your Payment</h2>

            <div className="mb-4 border border-gray-700 rounded-lg p-4 bg-gray-800">
              <h3 className="text-lg font-semibold mb-2">{checkOutCartItemDetails[0].laptop.name}</h3>
              <p>RAM: {checkOutCartItemDetails[0].selectedSpec.ram}</p>
              <p>Storage: {checkOutCartItemDetails[0].selectedSpec.storage}</p>
              <p>Color: {checkOutCartItemDetails[0].selectedSpec.color}</p>
              <p>Quantity: {checkOutCartItemDetails[0].quantity}</p>
              <p className="text-green-400 font-bold mt-2">
                Total: ₹{checkOutCartItemDetails[0].totalPrice.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="bg-[#1f2937] rounded p-3 border border-gray-700 mb-4">
              <Payment
                amount={checkOutCartItemDetails[0].totalPrice}
                currency="inr"
                onSuccess={handlePaymentSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
