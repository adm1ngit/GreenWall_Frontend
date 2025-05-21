import React, { useState, useEffect } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { motion } from "framer-motion";
import translations from './translations'; // Import translations

// Skeleton Loader for loading state
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
  const [showVideo, setShowVideo] = useState(true); // State to control video visibility

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, [language]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://greenwall2024-832ac2e5bda7.herokuapp.com/api/projects/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const transformedProjects = data.map((project) => ({
        video: project.media.find(media => media.file_url.endsWith('.mp4'))?.file_url || null,
        images: project.media
          .filter(media => media.file_url.endsWith('.jpg') || media.file_url.endsWith('.png'))
          .map(media => ({ src: media.file_url, title: project[`title_${language}`] })),
        title: project[`title_${language}`],
        description: project[`description_${language}`],
        rating: 4.5, // Example rating
      }));
      setProjects(transformedProjects);
    } catch (error) {
      console.log(error.message);
      
      setError('Error fetching projects: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
    resetMediaState();
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
    resetMediaState();
  };

  const resetMediaState = () => {
    setShowVideo(true); // Reset to show video when navigating to a new project
  };

  const handleImageError = () => {
    setShowVideo(true); // Show video if image fails to load
  };

  const handleVideoError = () => {
    setShowVideo(false); // Hide video if it fails to load
  };

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="container mx-auto md:px-24 px-5 py-10 bg-[#0C4840]">
      <h2 className="md:text-3xl text-xl font-bold text-center relative text-white">
        {translations[language].title}
        <div className="absolute w-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-12 border-b border-white" />
      </h2>

      <div className="mt-8 md:px-10 flex justify-center relative">
        {projects.length > 0 && (
          <motion.div
            key={activeIndex}
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            {showVideo && projects[activeIndex].video ? (
              <video
                src={projects[activeIndex].video}
                controls
                className="md:w-[30%] w-full mx-auto rounded-lg"
                preload="auto"
                poster={projects[activeIndex].images[0]?.src}
                loading="lazy"
                onError={handleVideoError} // Handle video load error
              />
            ) : (
              projects[activeIndex].images.length > 0 && (
                <img
                  src={projects[activeIndex].images[0].src}
                  alt={projects[activeIndex].images[0].title}
                  className="w-full max-w-2xl rounded-lg"
                  loading="lazy"
                  onError={handleImageError} // Handle image load error
                />
              )
            )}
          </motion.div>
        )}
        <button onClick={handlePrevClick} aria-label="Previous project" className="absolute md:left-0 -left-7 top-1/2 transform -translate-y-1/2">
          <GoChevronLeft className="text-white text-4xl" />
        </button>
        <button onClick={handleNextClick} aria-label="Next project" className="absolute md:right-0 -right-7 top-1/2 transform -translate-y-1/2">
          <GoChevronRight className="text-white text-4xl" />
        </button>
      </div>

      <div className="mt-6 flex justify-start">
        {projects.length > 0 && projects[activeIndex].images.map((image, index) => (
          <motion.img
            key={index}
            src={image.src}
            alt={image.title}
            className="md:w-48 md:h-48 w-24 h-20 mr-4 object-cover rounded-md cursor-pointer"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            loading="lazy"
            onError={handleImageError} // Handle image load error
          />
        ))}
      </div>

      <div className="mt-6 text-white relative">
        {projects.length > 0 && (
          <>
            <motion.h3
              className="text-xl font-semibold"
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ duration: 0.5 }}
            >
              {projects[activeIndex].title}
            </motion.h3>
            <motion.p
              className="text-gray-200"
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {projects[activeIndex].description}
            </motion.p>
            <div className="mx-auto mt-8 md:mr-20 border-b border-white"></div>
          </>
        )}
      </div>
    </section>
  );
}

export default Projects;
