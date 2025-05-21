import React from 'react';

const ProductModal = ({ product, onClose }) => {
  const handleSubmit = () => {
    alert('Request Submitted!');
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <p className="mb-4">{product.description}</p>
        <p className="mb-4 font-semibold">Price: ${product.price}</p>
        <p className="mb-4">Price per sqm: ${product.pricePerSqm}</p>

        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={handleSubmit}
        >
          Submit Request
        </button>
        <button
          className="ml-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
