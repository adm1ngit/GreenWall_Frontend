import React from 'react'
import Hero from "./HeroSection";
import About from "./AboutUs";
import Assortment from "./ProductCarousel";
import WhyChooseUs from "./WhyChooseUs";
import Projects from "./Projects";
import Testimonials from "./CallToAction";
import Contact from "./ContactUs";
import Footer from "./Footer";
import ProductSpecifications from "./ProductSpecifications";
import WhyUs from "./WhyUs";
import WorkSteps from "./WorkSteps";


const Main = ({ language, setLanguage }) => {
  return (
    <div>
        <>
              <Hero language={language} setLanguage={setLanguage} />
              <About language={language} />
              <Assortment language={language} />
              <WhyChooseUs language={language} />
              <Projects language={language} />
              <ProductSpecifications language={language} />
              <WhyUs language={language} />
              <WorkSteps language={language} />
              <Testimonials language={language} />
              <Contact language={language} />
              <Footer language={language} />
            </>
    </div>
  )
}

export default Main