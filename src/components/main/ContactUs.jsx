import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Import desired icons
import translations from './translations'; // Import the translations

const Contact = ({ language }) => { // Accept language as a prop
  // Get the translations based on the selected language
  const { contactitle, phone, email, address } = translations[language];

  return (
    <section className="bg-[#0C4840]">
      <div className="container mx-auto md:px-24 px-5 py-10">
        <h2 className="md:text-2xl text-xl font-bold text-center text-white relative">
          {contactitle}
          <div className="absolute w-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-12 border-b border-white" />
        </h2>
        <div className="mt-14 md:text-lg text-sm text-white">
          <div className="flex items-center justify-start m-2">
            <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
              <FaPhoneAlt className="text-[#0C4840] text-sm" />
            </div>
            <p className="ml-2">{phone}</p>
          </div>
          <div className="flex items-center justify-start m-2">
            <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
              <FaPhoneAlt className="text-[#0C4840] text-sm" />
            </div>
            <p className="ml-2">{email}</p>
          </div>
          <div className="flex items-center justify-start m-2">
            <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
              <FaMapMarkerAlt className="text-[#0C4840] text-ml" />
            </div>
            <p className="ml-2">{address}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
