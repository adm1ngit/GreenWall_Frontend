import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import decorativ from '../../assets/glavniy2.jpg';

const content = {
  ru: {
    title: "Почему выбирают нас?",
    eco: "Экологичность Используем только натуральные и безопасные материалы.",
    durability: "Долговечность Заборы Green Wall сохранят свою привлекательность...",
    variety: "Универсальность Подходят для различных видов  использования...",
  },
  en: {
    title: "Why choose us?",
    eco: "Eco-friendliness: We use only natural and safe materials.",
    durability: "Durability: Green Wall fences maintain their attractiveness...",
    variety: "Versatility: Suitable for various types of uses...",
  },
  uz: {
    title: "Nima uchun bizni tanlashadi?",
    eco: "Quyosh nuri, issiq, sovuq, shamol va namlikdan qo‘rqmaydi...",
    eco_2: "Asosini bo‘yash va tekislash shart emas...",
    eco_3: "Sun’iy maysani parvarishlash shart emas...",
    eco_4: "Shu rangda yamoq tikib qo‘yish mumkin...",
    durability: "Oson demontaj qilinadi...",
    durability_2: "Qoplamani olib, boshqa joyga o‘tkazish mumkin...",   
    durability_3: "Qishda ham jozibadorlikni saqlaydi...",
    durability_4: "Ikki tomonlama zamonaviy ko‘rinishga ega...",
    variety: "Oddiy ta’mirlash mumkin...",
    variety_2: "Shikastlanganda oson tuzatish mumkin...",
    variety_3: "Har qanday devor nuqsonlarini yashiradi...",
  },
};

function WhyChooseUs({ language }) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing after it comes into view
        }
      },
      { threshold: 0.1 } // Adjust the threshold as needed
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

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-white" ref={sectionRef}>
      <section className="relative container mx-auto md:px-24 px-10 py-10 text-[#0C4840]">
        {/* <div className="absolute md:left-[500px] left-[50px] top-1/4 transform -translate-y-1/2 w-[40px] h-[80px] bg-[#27A800] rounded-tl-full rounded-bl-full"></div>
        <div className="absolute md:-right-10 -right-24 top-1/2 transform -translate-x-44 w-[60px] h-[120px] rotate-360 bg-[#12A757] rounded-tr-full rounded-br-full"></div>
        <div className="absolute md:left-[250px] left-[50px] top-3/4 transform -translate-y-1/2 -rotate-[75deg] w-[40px] h-[80px] bg-[#12A757] rounded-tl-full rounded-bl-full"></div> */}

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 2 }}
          >
            <h2 className="md:text-4xl text-2xl font-extrabold md:mt-20">{content[language].title}</h2>
            <motion.ul
              className="mt-4 space-y-4 list-disc md:text-2xl text-lg font-bold md:m-6 md:pt-10"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={variants}
              transition={{ duration: 2, delay: 0.1 }} // Adding delay for a staggered effect
            >
              <motion.li
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 2, delay: 0.5 }}
              >
                {content[language].eco}
              </motion.li>
              <motion.li
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 2, delay: 0.6 }}
              >
                {content[language].durability}
              </motion.li>
              <motion.li
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 2, delay: 0.7 }}
              >
                {content[language].variety}
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Animate the Image */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 1.2, delay: 0.5 }} // Delay for the image animation
            className="flex items-center justify-center"
          >
            <img src={decorativ} alt="decorative plant" className="max-w-full h-auto w-9/12" />
          </motion.div>
        </div>
      </section>
    </section>
  );
}

export default WhyChooseUs;
