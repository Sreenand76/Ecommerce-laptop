import React from "react";

const ConfirmationAddToCartModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-90 backdrop-blur-sm p-3">
      <div className="bg-gray-950 p-6 rounded-lg shadow-lg max-w-sm w-full border border-gray-700">
        <h2 className="text-lg text-blue-300 font-semibold text-center mb-4">Add Base Variant to Cart?</h2>
        <p className="text-sm text-center mb-6">
          The base variant will be added to your cart. If you'd like to configure the specifications, click "View Model" to choose the exact variant.
        </p>
        <div className="flex justify-around">       
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationAddToCartModal;
