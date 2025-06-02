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
    <div className="bg-[#0C4840] text-white">
      <Header language={language} setLanguage={setLanguage} />
      <SocialMediaIcons />

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