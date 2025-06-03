import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import decorativ from '../../assets/glavniy2.jpg';

const content = {
  ru: {
    title: "Почему выбирают нас?",
    eco: "Не боится солнечного света, жары и холода, ветра и влаги...",
    eco_2: "Сохраняет привлекательность зимой...",
    eco_3: "Маскирует любые недостатки забора...",
    eco_4: "Основу можно не красить и не выравнивать...",
    durability: "За искусственной травой не нужно ухаживать...",
    durability_2: "Лёгкий демонтаж...",
    durability_3: "Покрытие можно снять и перенести в другое место...",
    durability_4: "Простой ремонт...",
    variety: "Двусторонний современный вид...",
    variety_2: "При повреждении несложно...",
    variety_3: "Вшить заплатку такого же цвета...",

  },
  en: {
    title: "Why choose us?",
    eco: "Not afraid of sunlight, heat, cold, wind, and moisture...",
    eco_2: "Maintains its attractiveness in winter...",
    eco_3: "Masks any fence imperfections...",
    eco_4: "The base does not need to be painted or leveled...",
    durability: "No maintenance required for artificial grass...",
    durability_2: "Easy to dismantle...",
    durability_3: "The covering can be removed and moved to another place...",
    durability_4: "Simple repair...",
    variety: "Easy to fix if damaged...",
    variety_2: "A patch of the same color can be sewn in...",
    variety_3: "Modern two-sided appearance...",
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
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
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

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  // 🔍 Titledan tashqari barcha itemlarni olish
  const filteredItems = Object.entries(content[language])
    .filter(([key]) => key !== "title")
    .map(([_, value]) => value);

  return (
    <section className="bg-white" ref={sectionRef}>
      <section className="relative container mx-auto md:px-24 px-10 py-10 text-[#0C4840]">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LEFT SIDE - TEXT */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 2 }}
          >
            <h2 className="md:text-4xl text-2xl font-extrabold md:mt-20">
              {content[language].title}
            </h2>

            <motion.ul
              className="list-none space-y-3 mt-4"
              variants={variants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ staggerChildren: 0.2}}

            >
              {filteredItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="text-lg flex items-start gap-2"
                >
                  <span className="text-green-600 text-xl">✅</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* RIGHT SIDE - IMAGE */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 1.2, delay: 0.5 }}
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
