import React from 'react';
import { FaInstagram, FaWhatsapp, FaTelegram } from 'react-icons/fa';

function SocialMediaIcons() {
  return (
    <div className="fixed bottom-5 right-4 flex flex-col space-y-3 z-10">
      <a href="https://www.instagram.com/greenwall_uz" target="_blank" rel="noopener noreferrer" className="text-red-700 text-2xl hover:text-yellow-400">
        <FaInstagram />
      </a>
      <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="text-green-600 text-2xl hover:text-yellow-400">
        <FaWhatsapp />
      </a>
      <a href="https://t.me/greenwall_GazonZabor" target="_blank" rel="noopener noreferrer" className="text-blue-700 text-2xl hover:text-yellow-400">
        <FaTelegram />
      </a>
    </div>
  );
}

export default SocialMediaIcons;
