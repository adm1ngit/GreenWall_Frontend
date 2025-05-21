import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import translations from '../main/translations';
import ConfirmationModal from './ConfirmationModal';

const SecondModal = ({ language }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [comment, setComment] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = (width && height) ? 10.5 * (Number(width) * Number(height)) : 0;
  const kvMetr = (width && height) ? Number(width) * Number(height) : 0;

  const handleSubmit = async () => {
    if (!width || !height) {
      setError("Width and height are required.");
      return;
    }
  
    const userData = {
      first_name: state.userData.name,
      last_name: state.userData.surname,
      phone_number: state.userData.phone,
      product_length: height,
      product_width: width,
      product_area: totalPrice,
      description: comment,
      is_verified: false, // Always set this to false
    };
  
    console.log("Sending data:", JSON.stringify(userData));
  
    setLoading(true);
    try {
      const response = await fetch("https://greenwall2024-832ac2e5bda7.herokuapp.com/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      setLoading(false);
      if (response.ok) {
        alert(`Jo'natildi`);
        navigate('/'); // Navigate to success page
      } else {
        const errorResponse = await response.json();
        console.error("Submission failed:", errorResponse);
        setError("Submission failed: " + (errorResponse.message || "Please try again."));
      }
    } catch (error) {
      setLoading(false);
      setError("Error: " + error.message); // Set error message
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0C4840] bg-opacity-100">
      <div className="p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">{translations[language].modalTitle}</h2>
        <div className="mb-4">
          <label>{translations[language].widthLabel}</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder={translations[language].widthPlaceholder}
            className="w-full p-2 border rounded bg-black text-white"
          />
        </div>
        <div className="mb-4">
          <label>{translations[language].heightLabel}</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={translations[language].heightPlaceholder}
            className="w-full p-2 border rounded bg-black text-white"
          />
        </div>
        <div className="mb-4">
          <h2>10.5$</h2>
          <h3 className="text-lg font-bold">
            {translations[language].totalPriceLabel}: {totalPrice}$ 
          </h3>
          <h1>{kvMetr} m<sup>2</sup></h1>
        </div>
        <div className="mb-4">
          <label>{translations[language].commentLabel}</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={translations[language].commentPlaceholder}
            className="w-full p-2 border rounded bg-black text-white"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
          onClick={() => setShowConfirmation(true)} // Show confirmation modal
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Submitting...' : translations[language].submitButton}
        </button>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <ConfirmationModal
            onConfirm={() => {
              handleSubmit(); // Submit data on confirmation
              setShowConfirmation(false); // Hide confirmation modal
            }}
            onCancel={() => setShowConfirmation(false)} // Hide confirmation modal on cancel
            language={language}
            translations={translations}
          />
        )}
      </div>
    </div>
  );
};

export default SecondModal;
