import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import FirstModal from './firstModal';
import SecondModal from './secondModal';

const ParentComponent = () => {
  const { productId } = useParams(); // Get productId from route
  const [showFirstModal, setShowFirstModal] = useState(true);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [productPrice, setProductPrice] = useState(null);
  const [language, setLanguage] = useState("en"); // Set your default language here

  // Fetch product data including price
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`); // Replace with your API endpoint
        const data = await response.json();
        setProductPrice(data.price); // Assuming your API returns { price: 14 }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleFirstModalConfirm = () => {
    setShowFirstModal(false);
    setShowSecondModal(true);
  };

  const handleSecondModalConfirm = () => {
    // Handle submission logic here
    console.log("Confirmed");
  };

  return (
    <div>
      {showFirstModal && (
        <FirstModal 
          onClose={() => setShowFirstModal(false)} 
          onNext={handleFirstModalConfirm} 
          language={language} 
          productId={productId} 
        />
      )}
      {showSecondModal && productPrice !== null && (
        <SecondModal 
          onClose={() => setShowSecondModal(false)} 
          onConfirm={handleSecondModalConfirm} 
          productPrice={productPrice} 
          language={language} 
        />
      )}
    </div>
  );
};

export default ParentComponent;
