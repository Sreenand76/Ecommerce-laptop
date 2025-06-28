import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RemoveItemFromWishList, getLaptopById, getUserWishList } from "../../util/ApiFunctions";
import { useAuth } from "../auth/AuthProvider";
import "../../Loading.css";
import BackButton from "../ui/BackButton";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { state } = useAuth();
  const { user } = state;
  const userId = user.email;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistItemsWithDetails = async () => {
      try {
        const wishlistItems = await getUserWishList(userId);
        setWishlistItems(wishlistItems);
      } catch (error) {
        console.error("Failed to fetch wishlist items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItemsWithDetails();
  }, [userId]);

  const handleRemoveItem = async (item) => {
    try {
      await RemoveItemFromWishList(userId, item.laptop.id);
      setWishlistItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
      toast.success("Item removed from wishlist", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to remove item. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };
  if (loading) {
    return (
      <div className="spinner-container mt-[30vh]">
        <div className="spinner"></div>
        <div className="ml-2 text-gray-400 text-center text-2xl fade-text">
          Loading Wishlist Items...
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <>
        <div className="pt-3 pl-3">
          <BackButton />
        </div>

        <div className="mt-[25vh] flex justify-center text-xl md:text-2xl">
          No Items in Wishlist.
        </div>
      </>

    );
  }

  const ViewLaptop = (laptopId) => {
    navigate(`/laptop-details/${laptopId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="md:hidden"><BackButton /></div>
      <h2 className="text-2xl font-bold text-gray-300 mb-6 text-center">
        My Wishlist Items
      </h2>
      {loading ? (
        <div className="spinner-container mt-[30vh]">
          <div className="spinner"></div>
          <div className="ml-2 text-gray-400 text-center text-2xl fade-text">
            Loading Wishlist...
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center p-4 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gray-950"
              >
                <img
                  src={item.laptop.imageUrl}
                  alt={item.laptop.name}
                  className="w-full md:w-36 h-36 object-contain mb-4 sm:mb-0"
                />

                <div className="ml-0 md:ml-7 flex-1 text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Product Details */}
                  <div className="col-span-2 md:col-span-2 ">
                    <h3 className="text-lg font-medium text-blue-400">
                      {item.laptop.name}
                    </h3>
                    <p className="text-sm mt-1">Processor: {item.laptop.processor}</p>
                    <p className="text-sm mt-1">Graphics Card: {item.laptop.graphicsCard}</p>
                    <p className="text-sm mt-1">Display: {item.laptop.displayDetails}</p>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 md:col-span-1 text-left md:mt-14">
                    <p className="text-sm font-semibold text-green-400">
                      Base Price: ₹{item.laptop.basePrice.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 md:col-span-1 flex md:flex-col space-x-4 sm:space-x-0 sm:space-y-2 justify-center mt-4 sm:mt-0 md:px-10 gap-1">
                    <button
                      className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                      onClick={() => handleRemoveItem(item)}
                    >
                      Remove
                    </button>
                    <button
                      className="bg-blue-700 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                      onClick={() => ViewLaptop(item.laptop.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
