import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import translations from '../main/translations';

const FirstModal = ({ language, onSubmit }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("+998 "); // Start with +998
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // Validate phone number format
  useEffect(() => {
    const phoneRegex = /^\+998\d{9}$/; // Validates the format: +998 followed by 9 digits
    setIsPhoneValid(phoneRegex.test(phone.trim())); // Check if the trimmed phone number is valid
  }, [phone]);

  const handlePhoneChange = (e) => {
    let input = e.target.value;

    // Format the phone number to remove invalid characters
    // Allow only digits and ensure it starts with +998
    const formattedInput = input.replace(/[^+\d]/g, "");

    // Check if the formatted input meets the length requirement
    if (formattedInput.length <= 13) {
      setPhone(formattedInput);
    }
  };

  const handleSubmit = () => {
    if (name && surname && isPhoneValid) {
      const userData = { name, surname, phone };

      // Pass userData to the parent component
      onSubmit(userData);

      // Navigate to the next modal with the product data
      navigate(`/product/second`, {
        state: {
          // productPrice: state.productPrice,
          // productId: state.productId,
          // productName: state.productName,
          // productDescription: state.productDescription,
          // productImage: state.productImage,
          userData // Pass user data to the second modal
        },
      });
    }
  };

  // Handle Enter key for submission
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed flex items-center justify-center inset-0 bg-[#0C4840] bg-opacity-100">
      <div className="p-6 rounded-lg w-96">
        {/* <div className="mb-4">
          <h3 className="font-semibold">{translations[language].productDetailsTitle}</h3>
          <img src={state.productImage} alt={state.productName} className="h-48 w-full object-cover mb-4 rounded" />
          <p>{translations[language].productName}: {state.productName}</p>
          <p>{translations[language].productPrice}: {state.productPrice} {translations[language].currency}</p>
          <p>{translations[language].productDescription}: {state.productDescription}</p>
        </div> */}
        <h2 className="text-lg font-bold mb-4">{translations[language].modalTitle}</h2>
        <div className="mb-4 ">
          <label>{translations[language].nameLabel}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={translations[language].namePlaceholder}
            className="w-full p-2 border rounded bg-black text-white"
          />
        </div>
        <div className="mb-4">
          <label>{translations[language].phoneLabel}</label>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange} // Use the new phone change handler
            placeholder="+998901234567" // Example placeholder
            className="w-full p-2 border rounded bg-black text-white"
            onFocus={() => setPhone("+998 ")} // Focus event to reset phone
            onKeyDown={handleKeyDown} // Handle Enter key
          />
        </div>
        <button
          className={`bg-green-500 text-white px-4 py-2 rounded w-full ${!(name && surname && isPhoneValid) ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSubmit}
          disabled={!(name && surname && isPhoneValid)} // Disable button if any field is invalid
        >
          {translations[language].submitButton}
        </button>
      </div>
    </div>
  );
};

export default FirstModal;
