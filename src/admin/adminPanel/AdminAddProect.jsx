import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Modal from './modal'; // Modal komponentini import qilish

const content = {
  ru: {
    title: "Добавить проект",
    uploadButton: "Загрузить выполненную работу",
    noProjects: "Нет доступных проектов",
    deleteMediaConfirm: "Вы уверены, что хотите удалить этот элемент?",
  },
  en: {
    title: "Add Project",
    uploadButton: "Upload Completed Work",
    noProjects: "No available projects",
    deleteMediaConfirm: "Are you sure you want to delete this media item?",
  },
  uz: {
    title: "Loyihani qo'shish",
    uploadButton: "Bajarilgan ishni yuklash",
    noProjects: "Mavjud loyihalar yo'q",
    deleteMediaConfirm: "Ushbu media elementini o'chirishni xohlaysizmi?",
  },
};

function AdminAddProject({ language }) {
  const [projects, setProjects] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [error, setError] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false); // Modallik holatini boshqarish
  const [selectedProjectId, setSelectedProjectId] = useState(null); // Tanlangan loyiha ID'si
  const navigate = useNavigate();

  const handleGallerySelect = (galleryId) => {
    setSelectedGallery(galleryId === selectedGallery ? null : galleryId);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`https://greenwalluz-4a1f8b314ff2.herokuapp.com/api/projects/?lang=${language}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, [language]);

  const handleEdit = (projectId) => {
    navigate(`/home/adminEditProject/${projectId}`);
  };

  const handleDelete = async (projectId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`https://greenwalluz-4a1f8b314ff2.herokuapp.com/api/projects/${projectId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete project: ${response.statusText}`);
      }

      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
      setModalOpen(false); // O'chirgandan so'ng modallikni yopamiz
      // console.log('Project deleted successfully');
    } catch (error) {
      setError(`Error during delete operation: ${error.message}`);
      // console.error('Error during delete operation:', error);
    }
  };

  const openModal = (projectId) => {
    setSelectedProjectId(projectId); // Tanlangan loyiha ID'sini saqlash
    setModalOpen(true); // Modallikni ochish
  };

  const closeModal = () => {
    setModalOpen(false); // Modallikni yopish
    setSelectedProjectId(null); // Tanlangan loyiha ID'sini tozalash
  };

  return (
    <div className="bg-[#0C4840] min-h-screen flex items-center w-full justify-center">
      <div className="p-8 w-full">
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          onConfirm={() => handleDelete(selectedProjectId)} // O'chirishni tasdiqlash
          message={content[language]?.deleteMediaConfirm || content.en.deleteMediaConfirm}
        />

        {/* Back Button */}
        <Link to="/home">
          <div className="absolute top-6 left-6 text-white cursor-pointer">
            <BiArrowBack className="text-3xl" />
          </div>
        </Link>

        {/* Header */}
        <h2 className="text-center text-2xl md:text-4xl py-10 text-white">
          {content[language]?.title || content.en.title}
        </h2>

        {/* Upload Button */}
        <Link to="/home/adminAddProect/proectExample">
          <div className="mb-8 flex justify-center">
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center">
            <FaPlusCircle className="w-5 h-5 m-2" />
            <span>{content[language]?.uploadButton || content.en.uploadButton}</span>
              
            </button>
          </div>
        </Link>

        {/* Error Message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Projects */}
        {projects.length === 0 ? (
          <div className="text-center text-white">{content[language]?.noProjects || content.en.noProjects}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-green-800 p-4 rounded-lg text-white relative">
                
                <div onClick={() => handleGallerySelect(project.id)} className="cursor-pointer">
                  <h2 className="text-lg font-medium mb-2">{project[`title_${language}`] || 'Untitled Project'}</h2>
                  <p className="text-sm mb-2">{project[`description_${language}`] || 'No description available.'}</p>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {project.media.map((mediaItem) => (
                      <div key={mediaItem.id} className="relative">
                        {mediaItem.file_url.endsWith('.mp4') ? (
                          <video
                            src={mediaItem.file_url}
                            className="rounded-lg  object-cover"
                            controls
                          />
                        ) : (
                          <img
                            src={mediaItem.file_url}
                            alt={`Gallery Image ${mediaItem.id}`}
                            className="rounded-lg  object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="p-2 rounded-full hover:bg-red-700"
                      onClick={() => openModal(project.id)} // Modallikni ochish
                    >
                      <FaTrash className="w-5 h-5 text-white" />
                    </button>
                    {/* <button
                      className="p-2 rounded-full hover:bg-blue-700"
                      onClick={() => handleEdit(project.id)}
                    >
                      <FaEdit className="w-5 h-5 text-white" />
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAddProject;
