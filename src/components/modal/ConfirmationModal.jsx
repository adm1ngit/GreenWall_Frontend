// ConfirmationModal.js
import React from "react";

const ConfirmationModal = ({ onConfirm, onCancel, language, translations }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0C4840] bg-opacity-100">
      <div className="p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">{translations[language].confirmationTitle}</h2>
        <p>{translations[language].confirmationMessage}</p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            {translations[language].yes}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            {translations[language].no}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
