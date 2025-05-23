import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import translations from '../main/translations';

const FirstModal = ({ language, onSubmit }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  useEffect(() => {
    const phoneRegex = /^\+998\d{9}$/;
    setIsPhoneValid(phoneRegex.test(phone.trim()));
  }, [phone]);

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const formattedInput = input.replace(/[^+\d]/g, "");
    if (formattedInput.length <= 13) {
      setPhone(formattedInput);
    }
  };

  const handleSubmit = () => {
    if (name && isPhoneValid) {
      const userData = { name, phone };
      onSubmit(userData);
      navigate("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed flex items-center justify-center inset-0 bg-[#0C4840] bg-opacity-100">
      <div className="p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">{translations[language].modalTitle}</h2>
        <div className="mb-4">
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
            onChange={handlePhoneChange}
            placeholder="+998901234567"
            className="w-full p-2 border rounded bg-black text-white"
            onFocus={() => setPhone("+998 ")}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          className={`bg-green-500 text-white px-4 py-2 rounded w-full ${!(name && isPhoneValid) ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSubmit}
          disabled={!(name && isPhoneValid)}
        >
          {translations[language].submitButton}
        </button>
      </div>
    </div>
  );
};

export default FirstModal;
