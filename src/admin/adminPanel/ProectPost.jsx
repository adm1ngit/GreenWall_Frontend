import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const content = {
  ru: {
    title: "Загрузить медиа",
    videoLabel: "Загрузите видео:",
    imageLabel: "Загрузите изображение:",
    nameLabel: "Название :",
    descriptionLabel: "Описание :",
    submit: "Отправить",
    successMessage: "Медиа успешно загружено!",
    errorMessage: "Произошла ошибка при загрузке медиа.",
  },
  en: {
    title: "Upload Media",
    videoLabel: "Upload Video:",
    imageLabel: "Upload Image:",
    nameLabel: "Name :",
    descriptionLabel: "Description :",
    submit: "Submit",
    successMessage: "Media uploaded successfully!",
    errorMessage: "An error occurred while uploading media.",
  },
  uz: {
    title: "Media yuklash",
    videoLabel: "Video yuklash:",
    imageLabel: "Rasm yuklash:",
    nameLabel: "Nomi :",
    descriptionLabel: "Tavsif :",
    submit: "Yuborish",
    successMessage: "Media muvaffaqiyatli yuklandi!",
    errorMessage: "Media yuklashda xato yuz berdi.",
  },
};

const ProjectPost = ({ language }) => {
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState({ en: '', ru: '', uz: '' });
  const [titles, setTitles] = useState({ en: '', ru: '', uz: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file_url && file_url.type.startsWith('video/')) {
      setVideo(file_url);
      setErrorMessage(''); // Clear error message on valid input
    } else {
      setErrorMessage(content[language]?.errorMessage || content.en.errorMessage);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
    setImages(files);
  };

  const handleDescriptionChange = (lang, value) => {
    setDescriptions((prev) => ({ ...prev, [lang]: value }));
  };

  const handleTitleChange = (lang, value) => {
    setTitles((prev) => ({ ...prev, [lang]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title_en', titles.en);
    formData.append('title_ru', titles.ru);
    formData.append('title_uz', titles.uz);
    formData.append('description_en', descriptions.en);
    formData.append('description_ru', descriptions.ru);
    formData.append('description_uz', descriptions.uz);

    // Append media files
    images.forEach((image) => {
      formData.append('media', image); // Correctly append images
    });

    if (video) {
      formData.append('media', video); // Correctly append video
    }

    const token = localStorage.getItem('token');

    setLoading(true); // Set loading to true before starting the upload

    try {
      const response = await axios.post('https://greenwalluz-4a1f8b314ff2.herokuapp.com/api/projects/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Upload Response:', response.data); // Log the response from the API
      setSuccessMessage(content[language]?.successMessage || content.en.successMessage);
      resetForm();
      navigate('/home/adminAddProect');
    } catch (error) {
      console.error('Error uploading media:', error.response || error.message);
      setErrorMessage(error.response?.data?.message || content[language]?.errorMessage || content.en.errorMessage);
    } finally {
      setLoading(false); // Reset loading state after the upload completes
    }
  };

  const resetForm = () => {
    setVideo(null);
    setImages([]);
    setDescriptions({ en: '', ru: '', uz: '' });
    setTitles({ en: '', ru: '', uz: '' });
    setSuccessMessage('');
    setErrorMessage('');
  };

  const isFormValid = () => {
    return video && images.length > 0 && titles.en && titles.ru && titles.uz && descriptions.en && descriptions.ru && descriptions.uz;
  };

  return (
    <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center p-8">
      <Link to="/home/adminAddProect">
        <div className="absolute top-6 left-6 text-white cursor-pointer">
          <BiArrowBack className="text-3xl" />
        </div>
      </Link>
      <form onSubmit={handleSubmit} className="p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">{content[language]?.title || content.en.title}</h2>

        {/* Video Upload */}
        <div className="mb-4">
          <label className="block mb-2">{content[language]?.videoLabel || content.en.videoLabel}</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="border rounded-lg p-2 w-full bg-black text-white"
            required
          />
          {video && (
            <video className="mt-2" controls>
              <source src={URL.createObjectURL(video)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-2">{content[language]?.imageLabel || content.en.imageLabel}</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border rounded-lg p-2 w-full bg-black text-white"
            required
          />
          <div className="mt-2 grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <img key={index} src={`URL.createObjectURL(image)} alt={Uploaded ${index + 1}`} className="h-32 object-cover rounded-lg" />
            ))}
          </div>
        </div>

        {/* Titles and Descriptions */}
        {['en', 'ru', 'uz'].map((lang) => (
          <React.Fragment key={lang}>
            <div className="mb-4">
              <label className="block mb-2">
                {content[language]?.nameLabel || content.en.nameLabel} {lang === 'ru' ? '(Русский)' : lang === 'uz' ? '(O\'zbek)' : '(English)'}
              </label>
              <input
                type="text"
                value={titles[lang]}
                onChange={(e) => handleTitleChange(lang, e.target.value)}
                className="border rounded-lg p-2 w-full bg-black text-white"
                placeholder={content[language]?.nameLabel || content.en.nameLabel}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                {content[language]?.descriptionLabel || content.en.descriptionLabel} {lang === 'ru' ? '(Русский)' : lang === 'uz' ? '(O\'zbek)' : '(English)'}
              </label>
              <textarea
                value={descriptions[lang]}
                onChange={(e) => handleDescriptionChange(lang, e.target.value)}
                className="border rounded-lg p-2 w-full h-20 bg-black text-white"
                placeholder={content[language]?.descriptionLabel || content.en.descriptionLabel}
                required
              />
            </div>
          </React.Fragment>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-green-600 text-white py-2 px-4 rounded-lg w-full ${isFormValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!isFormValid() || loading} // Disable button while loading
        >
          {loading ? 'Uploading...' : (content[language]?.submit || content.en.submit)}
        </button>
      </form>
      {loading && <div className="mt-4 text-white">Loading...</div>} {/* Loading indicator */}
      {successMessage && (
        <div className="mt-4 text-green-600 text-lg font-semibold">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="mt-4 text-red-600 text-lg font-semibold">{errorMessage}</div>
      )}
    </div>
  );
};

export default ProjectPost;