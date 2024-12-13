import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllOrders, updateOrder } from "../../util/ApiFunctions";


const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await getAllOrders();
        console.log(allOrders)
        setOrders(allOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to fetch orders. Please try again.", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateOrder = async (id, status) => {
    try {
      const updatedOrder = await updateOrder(id, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === id ? { ...order, status } : order))
      );
      toast.success(`Order status updated to ${status}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error("Failed to update order. Please try again.", {
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
    return (
      <div className="mt-[25vh] flex justify-center text-xl md:text-2xl">
        No Orders Found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-300 mb-6 text-center">All Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col md:flex-row items-center p-4 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gray-950"
          >
            <div className="ml-0 md:ml-7 flex-1 text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 md:col-span-2">
                <h3 className="text-lg font-medium text-blue-400">Order ID: {order.id}</h3>
                <p className="text-sm">Email: {order.userEmail}</p>
                <p className="text-sm">Phone no: {order.phno}</p>
                <p className="text-sm"> Order Date: {new Date(order.orderDate).toLocaleDateString("en-GB")}</p>
                <p className="text-sm">Address: {order.shippingAddress}</p>
                <p className="text-sm">Laptop Id: {order.laptopId}</p>
                <p className="text-sm">Quantity: {order.quantity}</p>
              </div>

              <div className="col-span-2 md:col-span-1 text-left md:mt-3 lg:mt-6">
                <p className="text-sm font-semibold text-green-400">
                  Total Price: ₹{order.totalPrice.toLocaleString("en-IN")}
                </p>
                <p className="text-sm text-green-400">Status: {order.status}</p>
              </div>

              <div className="col-span-2 md:col-span-1 flex md:flex-col space-x-4 sm:space-x-0 sm:space-y-2 justify-center mt-4 sm:mt-0 md:px-10 gap-1">
                <button
                  className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-xs"
                  onClick={() => handleUpdateOrder(order.id, "Processing")}
                >
                  Mark as Processing
                </button>
                <button
                  className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-xs"
                  onClick={() => handleUpdateOrder(order.id, "Shipped")}
                >
                  Mark as Shipped
                </button>
                <button
                  className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-xs"
                  onClick={() => handleUpdateOrder(order.id, "Cancelled")}
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;