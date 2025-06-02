import React from "react";
import logo from '../../assets/Logo.png';
import rasm from '../../assets/glavniy5.jpg';
import { motion } from "framer-motion";

const content = {
  ru: {
    title: "О компании ",
    span: "Green Wall",
    description: "Green Wall — лидер в создании декоративных зеленых заборов, которые придают каждому участку уникальный и естественный вид. Мы предлагаем инновационные решения для озеленения и декорирования, сочетающие в себе эстетичность и функциональность. Наша миссия — помочь вам создать уют и комфорт в каждом уголке вашего дома или офиса.",
  },
  en: {
    title: "About ",
    span: "Green Wall",
    description: "Green Wall is a leader in creating decorative green fences that give every property a unique and natural look. We offer innovative solutions for landscaping and decoration that combine aesthetics and functionality. Our mission is to help you create coziness and comfort in every corner of your home or office.",
  },
  uz: {
    title: "Haqida",
    span: "Green Wall ",
    description: "Yashil devor har bir mulkka o'ziga xos va tabiiy ko'rinish beradigan dekorativ yashil to'siqlarni yaratishda yetakchi hisoblanadi. Biz estetika va funksionallikni birlashtirgan obodonlashtirish va bezash uchun innovatsion yechimlarni taklif qilamiz. Bizning vazifamiz sizga uyingiz yoki ofisingizning har bir burchagida qulaylik yaratishga yordam berishdir.",
  },
};

function About({ language }) {
  return (
    <section className="bg-white relative">
      <motion.section
        className="container mx-auto md:px-24 px-5 py-10 text-[#0C4840] relative"
        initial={{ opacity: 0, y: 50 }} // Start off-screen and transparent
        whileInView={{ opacity: 1, y: 0 }} // Fade in and move to position
        transition={{ duration: 0.8 }} // Duration of the animation
      >
        {/* <div className="absolute md:right-0 right-0 -top-7 transform -translate-x-44 md:w-[70px] w-[60px] h-[120px] md:h-[140px] -rotate-[75deg] bg-[#0D4840] rounded-tr-full rounded-br-full"></div>
        <div className="absolute md:left-20 left-[20px] -bottom-20 transform -translate-y-1/2 w-[60px] -rotate-[75deg] h-[120px] bg-[#27A800] rounded-tl-full rounded-bl-full"></div> */}

        <h2 className="text-center text-2xl md:text-4xl py-10 relative">
          {language === 'uz' ? (
            <div className="relative">
              <span className="font-bold relative ">{content[language].span}</span>
              {content[language].title}
            </div>
          ) : (
            <div className="relative">
              {content[language].title}
              <span className="font-bold ">{content[language].span}</span>
            </div>
          )}
        </h2>
        
        <div className="grid grid-cols-2 gap-2 relative">
          <div className="flex justify-center items-center">
            <motion.img
              src={rasm}
              alt="buta dekorativni"
              className="object-cover w-[300px] h-auto md:w-[500px]"
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <motion.img
              src={logo}
              alt="logo"
              width={"200px"}
              className="md:w-[200px] w-[80px] mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
            />
            <motion.p
              className="md:mt-4 text-[8px] md:text-2xl text-xs"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
            >
              {content[language].description}
            </motion.p>
          </div>
        </div>
      </motion.section>
    </section>
  );
}

export default About;
