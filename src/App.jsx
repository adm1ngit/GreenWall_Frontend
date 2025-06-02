import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/main/Main";
import SocialMediaIcons from "./components/SocialMedia";
import ProductList from "./components/prodactList/prodactList";
import FirstModal from "./components/modal/firstModal";
import Login from "./admin/login/login.jsx";
import AdminHome from "./admin/adminPanel/adminHome.jsx";
import AdminAddProect from "./admin/adminPanel/AdminAddProect.jsx";
import AdminAddProduct from "./admin/adminPanel/AdminAddProduct.jsx";
import AdminAplicatipon from "./admin/adminPanel/AdminAplicatipon.jsx";
import ProectPost from "./admin/adminPanel/ProectPost.jsx";
import ProductAdd from "./admin/adminPanel/ProductAdd.jsx";
import PrivateRoute from "./admin/login/PrivateRoute.jsx";
import RegisterModal from "./components/RegisterModal.jsx";

const translations = {
  uz: {
    title: "Ro'yxatdan o'tish",
    name: "Ism",
    surname: "Familiya",
    phone: "Telefon raqam",
    address: "Manzil",
    submit: "Yuborish",
    submitting: "Yuborilmoqda...",
    close: "Yopish",
    success: "Muvaffaqiyatli yuborildi!",
    error_pdf: "PDF topilmadi.",
    error_generic: "Xatolik yuz berdi. Iltimos qayta urinib ko‘ring.",
  },
  ru: {
    title: "Регистрация",
    name: "Имя",
    surname: "Фамилия",
    phone: "Телефон",
    address: "Адрес",
    submit: "Отправить",
    submitting: "Отправка...",
    close: "Закрыть",
    success: "Успешно отправлено!",
    error_pdf: "PDF не найден.",
    error_generic: "Произошла ошибка. Пожалуйста, попробуйте снова.",
  },
  en: {
    title: "Register",
    name: "Name",
    surname: "Surname",
    phone: "Phone",
    address: "Address",
    submit: "Submit",
    submitting: "Submitting...",
    close: "Close",
    success: "Successfully submitted!",
    error_pdf: "PDF not found.",
    error_generic: "An error occurred. Please try again.",
  },
};

function App() {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "ru");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const onSubmit = (userData) => {
    localStorage.setItem("token", userData.token || "user-token");
    setIsAuthenticated(true);
  };

  return (
    <div className="bg-[#0C4840] text-white min-h-screen relative">
      <Header language={language} setLanguage={setLanguage} />
      <SocialMediaIcons />

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-5 right-5 bg-green-600 hover:bg-green-700 px-4 py-2 rounded shadow-lg z-50"
      >
        {translations[language].title}
      </button>

      {/* RegisterModal ni chaqirish */}
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        language={language}
        translations={translations[language]} // Tarjimani uzatish
      />

      <Routes>
        <Route path="/" element={<Main language={language} setLanguage={setLanguage} />} />
        <Route path="/product" element={<ProductList language={language} />} />
        <Route path="/product/first" element={<FirstModal language={language} onSubmit={onSubmit} />} />
        <Route path="/login" element={<Login onSubmit={onSubmit} setIsAuthenticated={setIsAuthenticated} />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AdminHome language={language} />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/adminAddProduct"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AdminAddProduct language={language} />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/adminAddProect"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AdminAddProect language={language} />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/adminAplicatipon"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AdminAplicatipon language={language} />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/adminAddProect/proectExample"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ProectPost language={language} />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/adminAddProduct/productAdd"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ProductAdd language={language} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
