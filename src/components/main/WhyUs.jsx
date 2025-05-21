import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion'; // Import motion for animations
import translations from './translations'; // Adjust the path as necessary

const AnimatedCounter = ({ value, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return; // Only animate when visible

    const numericValue = parseInt(String(value || '').replace(/\D/g, '')) || 0;
    const duration = 7000; // Animation duration in ms
    const stepTime = Math.abs(Math.floor(duration / numericValue)) || 1; // Calculate step time

    let start = 0;

    const step = () => {
      start += 1;
      setCount(start);

      if (start < numericValue) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step); // Start the animation

    return () => {
      setCount(0); // Reset when leaving the viewport
    };
  }, [isVisible, value]);

  return <span>{count}{String(value || '').replace(/\d+/g, '')}</span>; 
};

const WhyUs = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState(null); // State to store API data
  const sectionRef = useRef(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://greenwall2024-832ac2e5bda7.herokuapp.com/api/stats/');
        const data = await response.json();

        // Check if data is an array and extract the first object
        if (Array.isArray(data) && data.length > 0) {
          setStats(data[0]); // Set the first object from the array
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current); // Stop observing once visible
        }
      },
      { threshold: 0.5 } // 50% of the section must be visible for the animation to start
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Ensure items are populated from API data and use translation descriptions
  const items = stats ? [
    { value: stats.years_in_market, description: translations[language].years_in_market },
    { value: stats.satisfied_clients, description: translations[language].satisfied_clients },
    { value: stats.installed_items_km, description: translations[language].installed_items_km },
    { value: stats.work_all_days, description: translations[language].work_all_days }
  ] : [];

 

  return (
    <section ref={sectionRef} className="bg-[#0C4840]">
      <div className="container mx-auto md:px-24 px-5 py-10">
        <h2 className="text-center text-[#27A800] font-bold md:text-2xl text-sm mb-8">
          {translations[language].wyUsTitle}
        </h2>
        <div className="flex flex-wrap justify-center gap-2 px-4">
          {items.length > 0 ? items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }} // Initial state
              animate={isVisible ? { opacity: 1, y: 0 } : {}} // Animate to visible state
              transition={{ duration: 2, delay: index * 0.5 }} // Delay for staggered effect
              className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col justify-center items-center min-w-[200px] min-h-[150px] md:min-w-[250px] md:min-h-[200px]"
            >
              <p className="text-[#27A800] font-bold md:text-4xl text-2xl">
                <AnimatedCounter value={item.value} isVisible={isVisible} /> {/* API value */}
              </p>
              <p className="md:text-xl text-sm font-semibold mt-2 text-[#0C4840]">
                {item.description} {/* Translation description */}
              </p>
            </motion.div>
          )) : (
            <p className="text-white text-center">Loading stats...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
