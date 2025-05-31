import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import info from "../../assets/greenwall.jpg";
const data = {
  ru: {
    title1: 'ХАРАКТЕРИСТИКА СЕТКИ:',
    title2: 'ХАРАКТЕРИСТИКА ПОКРЫТИЯ:',
    specs1: [
      'Диаметр проволоки: 1,60 мм',
      'Вид плетения: двойной',
      'Плотность оцинковки: 50-60 гр/м²',
      'Размер ячейки: 50x50 мм',
      'Вес материала: 2,5 кг/м²',
      'Высота рулона: от 1 м до 2 м',
      'Длина рулона: 10 м',
      'Диаметр рулона: 43 см'
    ],
    specs2: [
      'Современный и эстетичный вид с двух сторон;',
      'Устойчивость к низким и высоким температурам;',
      'Не боится влаги, не выгорает на солнце;',
      'Не поддерживает горение;',
      'Обеспечивает защиту от ветра и пыли;',
      'Ограждение вентилируется;',
      'Устойчив к механическим воздействиям;',
      'Легко моется не теряя цвета и яркости.'
    ]
  },
  en: {
    title1: 'MESH SPECIFICATIONS:',
    title2: 'COATING SPECIFICATIONS:',
    specs1: [
      'Wire Diameter: 1.60 mm',
      'Weaving Type: Double',
      'Galvanizing Density: 50-60 g/m²',
      'Cell Size: 50x50 mm',
      'Material Weight: 2.5 kg/m²',
      'Roll Height: from 1 m to 2 m',
      'Roll Length: 10 m',
      'Roll Diameter: 43 cm'
    ],
    specs2: [
      'Modern and aesthetic appearance on both sides;',
      'Resistant to low and high temperatures;',
      'Not afraid of moisture, does not fade in the sun;',
      'Does not support combustion;',
      'Provides protection from wind and dust;',
      'The fence is ventilated;',
      'Resistant to mechanical stress;',
      'Easily washable without losing color and brightness.'
    ]
  },
  uz: {
    title1: 'TOR XUSUSIYATLARI:',
    title2: 'QOPLAMA XUSUSIYATLARI:',
    specs1: [
      'Sim diametri: 1,60 mm',
      'Toʻquv turi: Ikkita',
      'Galvanizatsiya zichligi: 50-60 g/m²',
      'Hujayra hajmi: 50x50 mm',
      'Material ogʻirligi: 2,5 kg/m²',
      'Rulonning balandligi: 1 m dan 2 m gacha',
      'Rulon uzunligi: 10 m',
      'Rulonning diametri: 43 sm'
    ],
    specs2: [
      'Ikkala tomondan zamonaviy va estetik koʻrinish;',
      'Past va yuqori haroratga chidamli;',
      'Namlikdan qoʻrqmaydi, quyoshda oʻchmaydi;',
      'Yonishni qoʻllab-quvvatlamaydi;',
      'Shamoldan va changdan himoya qiladi;',
      'Toʻsiq ventilyatsiyalanadi;',
      'Mexanik taʼsirlarga chidamli;',
      'Rang va yorqinligini yoʻqotmasdan osongina yuviladi.'
    ]
  }
};

const ProductSpecifications = ({ language = 'ru' }) => {
  const { title1, title2, specs1, specs2 } = data[language];

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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className='bg-white relative' ref={sectionRef}>
      <div className="container mx-auto md:px-24 px-5 py-10 text-[#0C4840] relative">
        <div className='relative'>
          <motion.h2
            className="text-[#0C4840] text-2xl md:text-2xl text-center font-bold mb-5"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 1.3 }}
          >
            {title1}
          </motion.h2>

          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#0C4840] list-none"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            {specs1.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start space-x-3"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <img
                  src={info}
                  alt="info"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xl font-medium">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div>
          <motion.h2
            className="text-[#0C4840] text-xl md:text-2xl text-center font-bold mt-10 mb-5 relative"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 1.5 }}
          >
            {title2}
          </motion.h2>

          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#0C4840] list-none relative"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            {specs2.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start space-x-3"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <img
                  src={info}
                  alt="info"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xl font-medium">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecifications;