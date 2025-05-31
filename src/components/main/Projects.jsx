import React, { useState, useEffect, useCallback } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { motion } from "framer-motion";
import translations from './translations';

const SkeletonLoader = () => (
  <div className="animate-pulse flex flex-col items-center">
    <div className="w-full md:w-1/2 h-64 bg-gray-300 rounded-lg mb-4" />
    <div className="h-6 bg-gray-300 w-1/2 mb-2" />
    <div className="h-4 bg-gray-300 w-1/3" />
  </div>
);

const Projects = ({ language }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://greenwalluz-4a1f8b314ff2.herokuapp.com/api/projects/');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();

      const transformed = data.map((project) => {
        const video = project.media.find(m => m.file_url.endsWith('.mp4'))?.file_url || null;
        const images = project.media.filter(m =>
          m.file_url.match(/\.(jpg|png)$/)
        ).map(media => ({
          src: media.file_url,
          title: project[`title_${language}`]
        }));

        return {
          video,
          images,
          title: project[`title_${language}`],
          description: project[`description_${language}`]
        };
      });

      setProjects(transformed);
      setActiveIndex(0);
    } catch (err) {
      setError(`Error fetching projects: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const prevProject = () => {
    setActiveIndex(prev => (prev === 0 ? projects.length - 1 : prev - 1));
    setShowVideo(true);
  };

  const nextProject = () => {
    setActiveIndex(prev => (prev === projects.length - 1 ? 0 : prev + 1));
    setShowVideo(true);
  };

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!projects.length) return <p>No projects found.</p>;

  const current = projects[activeIndex];

  return (
    <section className="container mx-auto md:px-24 px-5 py-10 bg-[#0C4840]">
      <h2 className="md:text-3xl text-xl font-bold text-center text-white relative">
        {translations[language].title}
        <div className="absolute w-1/2 left-1/2 transform -translate-x-1/2 top-12 border-b border-white" />
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
              preload="auto"
              poster={current.images[0]?.src}
              loading="lazy"
              onError={() => setShowVideo(false)}
            />
          ) : (
            current.images[0] && (
              <img
                src={current.images[0].src}
                alt={current.images[0].title}
                className="w-full max-w-2xl rounded-lg"
                loading="lazy"
                onError={() => setShowVideo(true)}
              />
            )
          )}
        </motion.div>

        <button onClick={prevProject} className="absolute md:left-0 -left-7 top-1/2 -translate-y-1/2">
          <GoChevronLeft className="text-white text-4xl" />
        </button>
        <button onClick={nextProject} className="absolute md:right-0 -right-7 top-1/2 -translate-y-1/2">
          <GoChevronRight className="text-white text-4xl" />
        </button>
      </div>

      <div className="mt-6 flex justify-start overflow-x-auto">
        {current.images.map((img, i) => (
          <motion.img
            key={i}
            src={img.src}
            alt={img.title}
            className="md:w-48 md:h-48 w-24 h-20 mr-4 object-cover rounded-md cursor-pointer"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            loading="lazy"
            onError={() => setShowVideo(true)}
          />
        ))}
      </div>

      <div className="mt-6 text-white">
        <motion.h3
          className="text-xl font-semibold"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          {current.title}
        </motion.h3>
        <motion.p
          className="text-gray-200"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {current.description}
        </motion.p>
        <div className="mx-auto mt-8 md:mr-20 border-b border-white" />
      </div>
    </section>
  );
};

export default Projects;
