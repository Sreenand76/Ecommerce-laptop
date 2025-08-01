import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthProvider";
import "../../Loading.css";
import { CancelOrder, getLaptopById, getUserOrders } from "../../util/ApiFunctions";
import BackButton from "../ui/BackButton";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { state } = useAuth();
  const { user } = state;
 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if(user.email){
        const OrderDetail = await getUserOrders(user.email);
        console.log(OrderDetail);
        setOrders(OrderDetail);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.email]);

  const handleCancelOrder = async (orderId) => {
    try {
      await CancelOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== orderId)
      );
      toast.success("Order cancelled successfully", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to cancel order. Please try again.", {
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
          Loading Orders...
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    console.log(orders)
    return (
      <>
        <div className="pt-3 pl-3">
          <BackButton />
        </div>
        <div className="mt-[25vh] flex justify-center text-xl md:text-2xl">
          No Orders Found.
        </div>
      </>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="md:hidden"><BackButton /></div>
      <h2 className="text-2xl font-bold text-gray-300 mb-6 text-center">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => {
          const item = order.orderItems?.[0]; 
          if (!item) return null;

          return (
            <div
              key={order.orderId}
              className="flex flex-col md:flex-row items-center justify-center p-4 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gray-950"
            >
              <img
                src={item.laptop?.imageUrl}
                alt={`${item.laptop?.name || `Laptop ${item.laptop?.id}`}`}
                className="w-full md:w-36 h-36 object-contain mb-4 sm:mb-0"
              />

              <div className="ml-0 md:ml-7 flex-1 text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Order Details */}
                <div className="col-span-2 md:col-span-2 flex flex-col justify-center items-center">
                  <h3 className="text-lg font-medium text-blue-400">
                    {item.laptop?.name}
                  </h3>
                  <p className="text-sm">Processor: {item.laptop?.processor}</p>
                  <p className="text-sm">RAM: {item.selectedSpec?.ram}</p>
                  <p className="text-sm">Storage: {item.selectedSpec?.storage}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>

                {/* Total Price and Status */}
                <div className="col-span-2 md:col-span-1 text-left md:mt-3 lg:mt-6">
                  <p className="text-sm font-semibold text-green-400">
                    Shipping Address: {order.shippingAddress}
                  </p>
                  <p className="text-sm font-semibold text-green-400">
                    Total Price: ₹{item.totalPrice?.toLocaleString("en-IN")}
                  </p>
                  <p className="text-sm text-green-400">Status: {order.status}</p>
                </div>

                {/* Actions */}
                <div className="col-span-2 md:col-span-1 flex md:flex-col space-x-4 sm:space-x-0 sm:space-y-2 justify-center mt-4 sm:mt-0 md:px-10 gap-1">
                  <button
                    className="bg-red-800 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-xs"
                    onClick={() => handleCancelOrder(order.orderId)}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
