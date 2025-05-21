// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null; // Agar modallik ochiq bo'lmasa, hech narsa ko'rsatmaydi

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "  onClick={onClose}>
      <div className="bg-[#0C4840] rounded-lg p-6 shadow-lg" >
        <h2 className="text-lg font-bold mb-4">{message}</h2>
        <div className="flex justify-end space-x-2">
          <button className="bg-green-600 text-white py-1 px-4 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-red-600 text-white py-1 px-4 rounded" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
