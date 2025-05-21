import React from "react";
import translations from './translations'; // Import the translations
import { Link } from "react-router-dom";

const Footer = ({ language }) => { // Accept language as a prop
  // Get the footer translation based on the selected language
  const { footer } = translations[language];

  return (
    <section className="bg-[#0C4840]">
      <div className="container mx-auto md:px-24 px-5 pb-3">
      <Link to="/login">
        <footer className="text-white md:text-sm text-xs">
          
          <p>{footer}</p>
        </footer>
        </Link>
        
      </div>
    </section>
  );
};

export default Footer;
