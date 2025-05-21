import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Make sure you have this installed
import translations from './translations'; // Import the translations

const CallToAction = ({ language }) => { // Accept language as a prop
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false); // Optional: Reset visibility when out of view
      }
    }, {
      threshold: 0.1 // Adjust the threshold as needed
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Get the translations based on the selected language
  const { colltitle, button } = translations[language];

  return (
    <section className='bg-white pb-10 '>
      <section 
        ref={sectionRef}
        className="relative bg-[#50D900E5] text-white py-16 md:py-28 flex items-center justify-center overflow-hidden"
      >
        {/* Left Decorative Shape */}
        {/* <div className="absolute md:left-[400px] left-[50px] top-1/3 transform -translate-y-1/2 w-[40px] h-[80px] bg-[#27A800] rounded-tl-full rounded-bl-full"></div>
        <div className="absolute md:right-0 -right-20 top-1/2 transform -translate-x-44 w-[60px] h-[120px] rotate-360 bg-[#12A757] rounded-tr-full rounded-br-full"></div>
        <div className="absolute md:left-[250px] left-[50px] top-3/4 transform -translate-y-1/2 -rotate-90 w-[40px] h-[80px] bg-[#12A757] rounded-tl-full rounded-bl-full"></div> */}

        {/* Content */}
        <div className="relative text-center">
          <motion.h2
            className="text-2xl md:text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }} // Start hidden
            animate={isVisible ? { opacity: 1, y: 0 } : {}} // Animate when visible
            transition={{ duration: 1.5 }} // Animation duration
          >
            {colltitle}
          </motion.h2>
          <Link to='/product'>
            <motion.button
              className="m-10 bg-white md:w-[800px] md:h-[100px] text-[#27A800] font-semibold text-lg md:text-2xl px-20 py-4 md:px-20 md:py-8 rounded-3xl shadow-lg transition-transform transform hover:scale-105 hover:bg-[#27A800] hover:text-white"
              initial={{ opacity: 0, scale: 0.3 }} // Start hidden
              animate={isVisible ? { opacity: 1, scale: 1 } : {}} // Animate when visible
              transition={{ duration: 1.5 }} // Animation duration
            >
              {button}
            </motion.button>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default CallToAction;
