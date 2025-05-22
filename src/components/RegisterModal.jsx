import React, { useState } from "react";
import axios from "axios";

const RegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 📌 Inputlarni o‘zgartirish funksiyasi
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📤 Backendga so‘rov yuborish va PDF yuklash
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://greenwalluz-4a1f8b314ff2.herokuapp.com/register/",
        formData
      );

      console.log("✅ Backend javobi:", response.data); // 📌 PDF URL tekshirish

      if (response.status === 201) {
        const { pdf_url } = response.data;

        if (pdf_url) {
          console.log("📥 PDF yuklanmoqda:", pdf_url); // 📌 Konsolda tekshirish

          // 📥 PDF avtomatik yuklab olinadi
          const link = document.createElement("a");
          link.href = pdf_url;
          link.download = "warranty_card.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error("❌ PDF URL mavjud emas!");
          setError("PDF yuklab olishda xatolik yuz berdi.");
        }

        alert("Ro‘yxatdan o‘tish muvaffaqiyatli!");
        onClose(); // ✅ Modalni yopish
      }
    } catch (error) {
      console.error("❌ Xatolik:", error);
      setError("Xatolik yuz berdi, ma’lumotlarni tekshirib qaytadan urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold text-[#0C4840] text-center mb-4">
          Ro‘yxatdan o‘tish
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Ism"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="surname"
            placeholder="Familiya"
            value={formData.surname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefon"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Manzil"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          <button
            type="submit"
            className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Yuborilmoqda..." : "So'rov Yuborish"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-3 w-full bg-gray-300 p-2 rounded hover:bg-gray-400 transition"
        >
          Yopish
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
