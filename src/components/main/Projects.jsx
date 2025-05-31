import React, { useState, useEffect } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { motion } from "framer-motion";
import translations from "./translations";

const SkeletonLoader = () => (
  <div className="animate-pulse flex flex-col items-center">
    <div className="w-full md:w-1/2 h-64 bg-gray-300 rounded-lg mb-4"></div>
    <div className="h-6 bg-gray-300 w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-300 w-1/3"></div>
  </div>
);

function Projects({ language }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [language]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://greenwalluz-4a1f8b314ff2.herokuapp.com/api/projects/");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      const transformed = data.map((project) => ({
        video: project.media.find((m) => m.file_url.endsWith(".mp4"))?.file_url || null,
        images: project.media
          .filter((m) => /\.(png|jpg|jpeg)$/i.test(m.file_url))
          .map((m) => ({ src: m.file_url, title: project[`title_${language}`] })),
        title: project[`title_${language}`],
        description: project[`description_${language}`],
      }));

      setProjects(transformed);
      setError(null);
    } catch (err) {
      setError("Error fetching projects: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const goPrev = () => {
    setActiveIndex((i) => (i === 0 ? projects.length - 1 : i - 1));
    setShowVideo(true);
  };

  const goNext = () => {
    setActiveIndex((i) => (i === projects.length - 1 ? 0 : i + 1));
    setShowVideo(true);
  };

  const handleVideoError = () => {
    setShowVideo(false);
  };

  const handleImageError = (e) => {
    console.error("Image failed to load:", e.target.src);
  };

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const current = projects[activeIndex];
  const fallbackImage = current.images[0]?.src || "";

  return (
    <section className="container mx-auto px-5 md:px-24 py-10 bg-[#0C4840]">
      <h2 className="md:text-3xl text-xl font-bold text-center text-white relative">
        {translations[language].title}
        <div className="absolute w-[50%] left-1/2 transform -translate-x-1/2 top-12 border-b border-white" />
      </h2>

      <div className="mt-8 md:px-10 flex justify-center relative">
        <motion.div
          key={activeIndex}
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          {showVideo && current.video ? (
            <video
              src={current.video}
              controls
              className="md:w-[30%] w-full mx-auto rounded-lg"
              poster={fallbackImage}
              preload="auto"
              onError={handleVideoError}
            />
          ) : fallbackImage ? (
            <img
              src={fallbackImage}
              alt={current.title}
              className="w-full max-w-2xl mx-auto rounded-lg"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <p className="text-white text-center">No media available</p>
          )}
        </motion.div>

        <button onClick={goPrev} className="absolute md:left-0 -left-7 top-1/2 -translate-y-1/2">
          <GoChevronLeft className="text-white text-4xl" />
        </button>
        <button onClick={goNext} className="absolute md:right-0 -right-7 top-1/2 -translate-y-1/2">
          <GoChevronRight className="text-white text-4xl" />
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {current.images.map((img, idx) => (
          <motion.img
            key={idx}
            src={img.src}
            alt={img.title}
            className="md:w-32 md:h-32 w-20 h-20 object-cover rounded-md cursor-pointer"
            onError={handleImageError}
            loading="lazy"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            onClick={() => setShowVideo(false)}
          />
        ))}
      </div>

      {/* Text */}
      <div className="mt-6 text-white text-center">
        <motion.h3 className="text-xl font-semibold" variants={variants} initial="hidden" animate="visible">
          {current.title}
        </motion.h3>
        <motion.p className="text-gray-200 mt-2" variants={variants} initial="hidden" animate="visible">
          {current.description}
        </motion.p>
      </div>
    </section>
  );
}

export default Projects;
