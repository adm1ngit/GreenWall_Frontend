import React, { useState } from "react";
import axios from "axios";
import translations from "./main/translate";

const RegisterModal = ({ isOpen, onClose, language = "uz" }) => {
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://greenwalluz-4a1f8b314ff2.herokuapp.com/register/",
        formData
      );

      if (response.status === 201) {
        const { pdf_url } = response.data;

        if (pdf_url) {
          const link = document.createElement("a");
          link.href = pdf_url;
          link.download = "warranty_card.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          setError(t.error_pdf);
        }

        alert(t.success);
        onClose();
      }
    } catch (error) {
      console.error("❌ Xatolik:", error);
      setError(t.error_generic);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#1a1a1a] p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold text-[#f1f1f1] text-center mb-4">
          {t.title}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder={t.name}
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-transparent text-[#f1f1f1] placeholder-gray-400"
            required
          />
          <input
            type="text"
            name="surname"
            placeholder={t.surname}
            value={formData.surname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-transparent text-[#f1f1f1] placeholder-gray-400"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder={t.phone}
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-transparent text-[#f1f1f1] placeholder-gray-400"
            required
          />
          <input
            type="text"
            name="address"
            placeholder={t.address}
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-transparent text-[#f1f1f1] placeholder-gray-400"
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? t.submitting : t.submit}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-3 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
