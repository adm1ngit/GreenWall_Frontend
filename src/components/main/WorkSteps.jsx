import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'; // Importing icons from react-icons
import translations from './translations'; // Adjust the path as necessary

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      {/* Header */}
      <button
        onClick={toggleAccordion}
        className="flex justify-start items-center w-full py-3 text-left text-[#0C4840] font-semibold text-2xl focus:outline-none"
      >
        <span className='px-2'>{isOpen ? <FaChevronUp /> : <FaChevronDown />} </span> {title}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="md:p-2 md:px-10 text-[#27A800] text-2xl">
          <h1>{content}</h1>
        </div>
      )}
    </div>
  );
};

const WorkSteps = ({ language = 'ru' }) => {
  const items = translations[language].workStepsitems ||[];

  return (
    <section className='bg-white'>
      <section className="container mx-auto md:px-24 px-5 py-10 relative">
        <div className="mx-auto px-4">
          {/* <div className="absolute md:left-[600px] left-[50px] top-2/3 transform -translate-y-1/2 w-[40px] h-[80px] bg-[#27A800] rounded-tl-full rounded-bl-full"></div>
          <div className="absolute md:right-0 -right-36 top-1/2 transform -translate-x-44 w-[60px] h-[120px] rotate-360 bg-[#12A757] rounded-tr-full rounded-br-full"></div>
          <div className="absolute md:left-[250px] left-[50px] top-11 transform -translate-y-1/2 -rotate-[55deg] w-[40px] h-[80px] bg-[#12A757] rounded-tl-full rounded-bl-full"></div> */}

          <h2 className="text-center text-[#0C4840] font-bold text-3xl mb-6 relative">
            {translations[language].workStepstitle}
          </h2>
          <div className="relative">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default WorkSteps;
