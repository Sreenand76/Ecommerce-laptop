import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { RemoveItemFromWishList, addToUserCart, addToWishList, getUserWishList } from '../../util/ApiFunctions';
import { useAuth } from "../auth/AuthProvider";


const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [cart, setCart] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [checkOutCartItemDetails, setCheckoutCartItemDetails] = useState([]);
  const { state } = useAuth();
  const { user } = state;

  const toastOptionsSlow = {
    position: "top-right",
    autoClose: 2000,
    theme: "dark",
  };

  const toastOptionsFast = {
    position: "top-right",
    autoClose: 1000,
    theme: "dark",
  };

  useEffect(() => {
    if (!user || !user.email) {
      setWishlist([]);
      setCart([]);
      return
    };
    const fetchWishlist = async () => {
      try {
        const data = await getUserWishList(user.email);
        setWishlist(data.map((item) => item.laptopId)); // Map to laptop IDs
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };
    fetchWishlist();
  }, [user.email]);

  //To add or remove laptop from wishlist
  const handleWishlistToggle = async (laptopId) => {
    if (!user || !user.email) {
      toast.error("User not logged in", toastOptionsSlow);
      return;
    }
    if (isWishlistLoading) return; // Prevent concurrent actions
    setIsWishlistLoading(true);

    const isInWishlist = wishlist.includes(laptopId); // Check initial state

    // Show intermediate toast for feedback
    toast[isInWishlist ? "info" : "success"](
      isInWishlist ? "Removing from Wishlist..." : "Adding to Wishlist ❤️...", toastOptionsFast);

    try {
      // Optimistically update local state
      setWishlist((prevWishlist) =>
        isInWishlist
          ? prevWishlist.filter((id) => id !== laptopId) // Remove
          : [...prevWishlist, laptopId] // Add
      );

      // Make the backend API call
      if (isInWishlist) {
        await RemoveItemFromWishList(user.email, laptopId);
        toast.info("Laptop removed from wishlist", toastOptionsSlow);
      } else {
        await addToWishList(user.email, laptopId);
        toast.success("Laptop added to Wishlist ❤️", toastOptionsSlow);
      }
    } catch (error) {
      // Revert local state on error
      setWishlist((prevWishlist) =>
        isInWishlist
          ? [...prevWishlist, laptopId] // Re-add
          : prevWishlist.filter((id) => id !== laptopId) // Re-remove
      );
      toast.error("Failed to update wishlist. Please try again.", toastOptionsSlow);
      console.error("Error in wishlist toggle:", error);
    } finally {
      setIsWishlistLoading(false); // Unlock interaction
    }
  };

  const handleAddToCart = async (product, selectedColor, selectedRAM, selectedStorage, selectedQuantity, finalPrice) => {

    if (!user || !user.email) {
      toast.error("User not logged in", toastOptionsSlow);
      return;
    }

    if (!product || !product.id) {
      toast.error("Invalid product details", toastOptionsSlow);
      return;
    }

    toast.success("Adding Laptop to Cart...", toastOptionsFast);
    try {
      const cartItem = {
        color: selectedColor || product.availableColours?.[0] || "Default Color",
        ram:
          selectedRAM ||
          product.specs?.find((spec) => spec.specType === "RAM")?.specValue,
        storage:
          selectedStorage ||
          product.specs?.find((spec) => spec.specType === "ROM")?.specValue,
        quantity: selectedQuantity || 1,
        totalPrice: finalPrice || product.basePrice,
      };

      await addToUserCart(user.email, product.id, cartItem);

      setCart((prevCart) => [...prevCart, { ...product, cartItem }]);

      toast.success("Laptop added to cart", toastOptionsSlow);
    } catch (error) {
      console.error("Error adding laptop to cart:", error);
      toast.error("Failed to add laptop to cart. Please try again.", toastOptionsSlow);
    }
  };

  return (
    <UserContext.Provider
      value={{
        wishlist,
        handleWishlistToggle,
        cart,
        handleAddToCart,
        userDetails,
        setUserDetails,
        checkOutCartItemDetails,
        setCheckoutCartItemDetails
      }}
    >
      {children}
    </UserContext.Provider>
  );
}