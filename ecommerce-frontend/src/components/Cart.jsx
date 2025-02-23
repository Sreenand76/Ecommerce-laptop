import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getLaptopById, getUserCartItems } from "../util/ApiFunctions";
import { RemoveItemFromCart } from "../util/ApiFunctions";
import { useAuth } from "./auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import BackButton from "./ui/BackButton";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { state } = useAuth();
  const { user } = state;
  const userId = user.email;
  const navigate = useNavigate();

  useEffect(() => {

    const fetchCartItemsWithDetails = async () => {
      try {
        const cart = await getUserCartItems(userId);
        const cartWithDetails = await Promise.all(
          cart.map(async (item) => {
            const laptopDetails  = await getLaptopById(item.laptopId);
            return { ...item, ...laptopDetails }; // Merge cart item and laptop details
          })
        );
        setCartItems(cartWithDetails);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      } finally {
        setLoading(false);
        console.log("Finished fetching cart items.");
      }
    };

    fetchCartItemsWithDetails()
  }, [userId]);

  const handleRemoveItem = async (item) => {
    console.log(item)
    try {
      await RemoveItemFromCart(userId, item.id, item);
      setCartItems((prevItems) =>
        prevItems.filter(
          (cartItem) =>
            !(
              cartItem.laptopId === item.laptopId &&
              cartItem.color === item.color &&
              cartItem.ram === item.ram &&
              cartItem.storage === item.storage &&
              cartItem.quantity === item.quantity
            )
        )
      );
      toast.success("Item removed from cart",
        {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
    } catch (error) {
      toast.error("Failed to remove item. Please try again.",
        {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
    }
  };
  const proceedToCheckOut = (cartItem) => {
    navigate("/checkout", { state: { cartItem } });
  };
  if (loading) {
    return <div className="spinner-container mt-[30vh]">
      <div className="spinner"></div>
      <div className="ml-2 text-gray-400 text-center text-2xl fade-text">
        Loading Cart Items...
      </div>
    </div>
  }
  if (cartItems.length === 0) {
    return <>
      <div className="pt-3 pl-3">
        <BackButton />
      </div>
      <div className="mt-[25vh] flex justify-center text-xl md:text-2xl">
        No Items in Cart.
      </div>
    </>
  }
  // Calculate the total price for the cart
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="md:hidden"><BackButton /></div>
      <h2 className="text-2xl font-bold text-gray-300 mb-6 text-center">
        My Cart Items
      </h2>
      {loading ? (
        <div className="spinner-container mt-[30vh]">
          <div className="spinner"></div>
          <div className="ml-2 text-gray-400 text-center text-2xl fade-text">
            Loading Cart...
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center p-4 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gray-950"
              >
                <img
                  src={item.imageUrl}
                  alt={`${item.name || `Laptop ${item.laptopId}`}`}
                  className="w-full md:w-36 h-36 object-contain mb-4 sm:mb-0"
                />

                <div className="ml-0 md:ml-7 flex-1 text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Product Details */}
                  <div className="col-span-2 md:col-span-2 ">
                    <h3 className="text-lg font-medium text-blue-400">
                      {item.name || `Laptop ${item.laptopId}`}
                    </h3>
                    <p className="text-sm">Processor: {item.processor || "Unknown Processor"}</p>
                    <p className="text-sm">Color: {item.color}</p>
                    <p className="text-sm">RAM: {item.ram}</p>
                    <p className="text-sm">Storage: {item.storage}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>

                  {/* Total Price */}
                  <div className="col-span-2 md:col-span-1 text-left md:mt-14">
                    <p className="text-sm font-semibold text-green-400">
                      Total Price: ₹{item.totalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2  md:col-span-1 flex md:flex-col space-x-4 sm:space-x-0 sm:space-y-2 justify-center mt-4 sm:mt-0 md:px-10 gap-1">
                    <button
                      className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                      onClick={() => handleRemoveItem(item)}
                    >
                      Remove
                    </button>
                    <button
                      className="bg-blue-700 text-white px-3 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm"
                      onClick={() => proceedToCheckOut(item)}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cartTotal > 0 &&
            <div className="mt-6 p-4 bg-gray-800 text-gray-200 rounded-lg text-center">
              <h3 className="text-lg font-bold">Cart Total: ₹{cartTotal.toLocaleString("en-IN")}</h3>
            </div>
          }

        </>
      )}
    </div>
  );
};

export default Cart;

