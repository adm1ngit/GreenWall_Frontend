import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from "react-router-dom";

const content = {
  ru: { title: "Ассортимент ", span: "Green Wall", buttonText: "Подать Заявку" },
  en: { title: "Assortment ", span: "Green Wall", buttonText: "Submit Request" },
  uz: { title: "Assortiment ", span: "Green Wall", buttonText: "Ariza Yuboring" },
};

function Assortment({ language = "ru" }) {
  const [assortments, setAssortments] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://greenwalluz-4a1f8b314ff2.herokuapp.com/api/products/");
        const data = await response.json();
        setAssortments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % assortments.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + assortments.length) % assortments.length);
  };

  if (assortments.length === 0) {
    return <div className="text-white text-center">Loading...</div>;
  }

  const currentAssortment = assortments[activeIndex];

  return (
    <section className="bg-[#004D40]">
      <section className="container mx-auto md:px-24 px-8 py-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Information Section */}
          <div className="md:p-4 flex flex-col justify-center">
            <h2 className="md:text-4xl text-2xl">
              {content[language].title}
              <span className="font-bold"> {content[language].span}</span>
            </h2>
            <div className="mt-5 md:text-lg w-full overflow-hidden">
              {currentAssortment[`description_${language}`]
                .split(/\r?\n/) 
                .map((line, index) => (
                  <React.Fragment key={index}>
                    <p className="mb-1">{line}</p>
                    {line.includes("Advantages of decorative fences") && <br />}
                  </React.Fragment>
                ))}
            </div>
            
            <Link to="/product">
              <button className="md:mt-5 mt-4 bg-[#50D900] hover:bg-[#6dc53b] text-white py-2 px-8 rounded-full flex items-center">
                {content[language].buttonText}
                <FaArrowRight className="ml-2 text-xl" />
              </button>
            </Link>
          </div>

          {/* Image Section */}
          <div className="flex flex-col items-center">
            <img
              src={currentAssortment.media?.[0]?.file_url} 
              alt={`Assortment ${activeIndex + 1}`}
              className="w-full h-auto object-cover md:w-2/5 mt-10"
            />
            <h4 className="mt-4 text-xl font-semibold text-center">{currentAssortment[`title_${language}`]}</h4>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center w-full mt-10 space-x-4">
              <button onClick={handlePrev} className="m-2">
                <FaArrowLeft className="text-2xl text-white" />
              </button>
              <button onClick={handleNext} className="m-2">
                <FaArrowRight className="text-2xl text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Assortment;
