import React, { useState, useEffect } from "react";
import { FaArrowRight } from 'react-icons/fa';
// import image1 from '../assets/kiyikimg.png';
// import image2 from '../assets/landshaftbuta.png';
// import image3 from '../assets/glavniy1.png';
import image4 from '../../assets/glavniy2.jpg';
import image5 from '../../assets/glavniy3.jpg';
import image6 from '../../assets/glavniy4.jpg';
import image7 from '../../assets/glavniy5.jpg';
import logo from '../../assets/Logo.png';
import Header from "../Header";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const content = {
  ru: {
    title: "Создайте зелёный оазис с декоративным забором от Green Wall",
    buttonText: "Подать Заявку",
  },
  en: {
    title: "Create a green oasis with Green Wall decorative fencing",
    buttonText: "Submit Request",
  },
  uz: {
    title: "Green Wall dekorativ panjaralari bilan yashil vohaga yarating",
    buttonText: "Ariza Yuboring",
  },
};

const images = [
  // { id: 1, src: image1, alt: "Image 1" },
  // { id: 2, src: image2, alt: "Image 2" },
  // { id: 3, src: image3, alt: "Image 3" },
  { id: 5, src: image4, alt: "Image 4" },
  { id: 6, src: image5, alt: "Image 4" },
  { id: 7, src: image6, alt: "Image 4" },
  { id: 8, src: image7, alt: "Image 4" },
];

function Hero({ language, setLanguage }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 seconds interval
    return () => clearInterval(interval);
  }, []);

  // Determine the current and next image for the gallery
  const currentImage = images[activeIndex];
  const nextImage = images[(activeIndex + 1) % images.length];

  return (
    <section className="container mx-auto md:px-24 px-5 py-10">
      <Header language={language} setLanguage={setLanguage} />
      <section className="relative text-center bg-[#0C4840] grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

        {/* Decorative Shapes */}
        {/* <div className="absolute md:left-[45%] left-[50px] top-1/3 transform -translate-y-1/2 w-[40px] h-[80px] bg-[#27A800] rounded-tl-full rounded-bl-full"></div>
        <div className="absolute md:right-[500px] right-20 top-3/4 transform -translate-x-44 w-[70px] h-[140px] rotate-90 bg-[#12A757] rounded-tr-full rounded-br-full"></div>
        <div className="absolute md:-right-40 -right-32 top-[80%] transform -translate-x-44 w-[90px] h-[180px] rotate-[45deg] bg-[#12A757] rounded-tr-full rounded-br-full"></div> */}

        {/* Logo and Text */}
        <div className="relative mb-8 flex flex-col items-center">
          <img src={logo} alt="LOGO" width={'300px'} height={'150px'} className="mb-4 md:w-[300px] md:h-[150px] w-[200px] h-[100px]" />
          <h1 className="text-3xl font-bold text-white my-4">{content[language].title}</h1>
          <Link to='/product/first'>
            <button className="mt-6 bg-[#50D900] hover:bg-[#6dc53b] text-2xl text-white py-3 px-8 rounded-full flex items-center">
              {content[language].buttonText}
              <FaArrowRight className="ml-2 text-xl" />
            </button>
          </Link>
        </div>

        {/* Image Gallery with Animation */}
        <div className="flex flex-col items-center relative">
          <div className="relative w-full overflow-hidden md:h-[600px] h-[450px] ">
            <AnimatePresence>
              <motion.div
                key={activeIndex}
                className="absolute top-0 left-0 w-full flex"
                initial={{ opacity: 0, scale: 0.8 }} // Start smaller and transparent
                animate={{ opacity: 1, scale: 1 }} // Scale up to full size and fade in
                exit={{ opacity: 0, scale: 0.8 }} // Scale down and fade out
                transition={{ duration: 1 }} // Smooth transition
              >
                {/* Current Image */}
                <motion.img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="md:w-[340px] w-[330x] md:h-[650px] h-[550px] object-cover rounded-t-full p-6" // Make current image larger
                />
                {/* Next Image */}
                <motion.img
                  src={nextImage.src}
                  alt={nextImage.alt}
                  className="md:w-[250px] md:h-[450px] object-cover rounded-t-full md:m-0 mr-4" // Make next image smaller
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots for manual control */}
          <div className="flex space-x-2 mt-4">
            {images.map((_, index) => (
              <span
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-4 h-4  rounded-full cursor-pointer ${activeIndex === index ? "bg-white" : "bg-gray-700"}`}
              ></span>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Hero;
