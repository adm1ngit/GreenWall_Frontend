import React, { useEffect, useState } from 'react';
import { FaPlusCircle, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './modal';

const AddProductCard = ({ language }) => {
  const translations = {
    uz: {
      addProduct: "Maxsulot qo'shish",
      loading: "Mahsulotlar yuklanmoqda...",
      error: (message) => `Xato: ${message}`,
      noProducts: "Hech qanday mahsulot topilmadi.",
      deleteConfirm: "Siz ushbu mahsulotni o'chirishga ishonchingiz komilmi?",
      price: "Narxi: ${price}",
      title: "Mahsulot qo'shish",
    },
    en: {
      addProduct: "Add Product",
      loading: "Loading products...",
      error: (message) => `Error: ${message}`,
      noProducts: "No products found.",
      deleteConfirm: "Are you sure you want to delete this product?",
      price: "Price: ${price}",
      title: "Add Product",
    },
    ru: {
      addProduct: "Добавить товар",
      loading: "Загрузка продуктов...",
      error: (message) => `Ошибка: ${message}`,
      noProducts: "Продукты не найдены.",
      deleteConfirm: "Вы уверены, что хотите удалить этот продукт?",
      price: "Цена: ${price}",
      title: "Добавить товар",
    },
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://greenwalluz-4a1f8b314ff2.herokuapp.com/api/products/');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        const translatedProducts = data.map((product) => ({
          ...product,
          title: product[`title_${language}`] || 'No title',
          description: product[`description_${language}`] || 'No description',
          price: product.price || 'No price',
          media: product.media || [],
        }));
        setProducts(translatedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [language]);

  const handleDelete = async (id) => {
    if (deleting) return;
    setDeleting(true);
    try {
      const response = await fetch(`https://greenwalluz-4a1f8b314ff2.herokuapp.com/api/products/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete the product.');
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      closeModal();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete the product.');
    } finally {
      setDeleting(false);
    }
  };

  const openModal = (id) => {
    setSelectedProductId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProductId(null);
  };

  const handleEdit = (id) => {
    navigate(`/home/adminAddProduct/productAdd/${id}`);
  };

  const handlePrevImage = (index) => {
    setCurrentImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [index]: (prevIndexes[index] || 0) === 0 ? products[index].media.length - 1 : (prevIndexes[index] || 0) - 1,
    }));
  };

  const handleNextImage = (index) => {
    setCurrentImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [index]: (prevIndexes[index] || 0) === products[index].media.length - 1 ? 0 : (prevIndexes[index] || 0) + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0C4840] flex flex-col items-center justify-center p-8">
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={() => {
          handleDelete(selectedProductId);
        }}
        message={translations[language].deleteConfirm}
      />

      <header className="flex justify-between items-center mb-8 w-full">
        <Link to="/home">
          <div className="absolute top-6 left-6 text-white cursor-pointer">
            <BiArrowBack className="text-3xl" />
          </div>
        </Link>
      </header>
      <h2 className="text-center text-2xl md:text-4xl py-10 text-white">
        {translations[language]?.title || translations.en.title}
      </h2>

      <Link to="/home/adminAddProduct/productAdd">
        <div className="flex justify-center mb-8">
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center">
            <FaPlusCircle className="w-5 h-5 m-2" />
            <span>{translations[language].addProduct}</span>
          </button>
        </div>
      </Link>

      {loading ? (
        <div className="text-center text-white">{translations[language].loading}</div>
      ) : error ? (
        <div className="text-red-500">{translations[language].error(error)}</div>
      ) : products.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {products.map((product, index) => (
            <div key={product.id} className="bg-green-800 rounded-lg p-4 text-white relative">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => handlePrevImage(index)} className="text-white text-xl mx-2 absolute left-2">
                  <FaArrowLeft />
                </button>

                <div className="flex justify-center flex-grow overflow-hidden">
                  {product.media.length > 0 && (
                    <img
                      src={product.media[currentImageIndexes[index] || 0]?.file_url}
                      alt="Product"
                      className="h-64 w-64 object-cover rounded-md"
                    />
                  )}
                </div>

                <button onClick={() => handleNextImage(index)} className="text-white text-xl mx-2 absolute right-4">
                  <FaArrowRight />
                </button>
              </div>

              <div className="mt-3 text-center">
                <h3 className="text-xl font-semibold truncate">{product.title}</h3>
                <p className="text-sm truncate">{product.description}</p>
                <p className="text-sm font-bold">{translations[language].price.replace("${price}", product.price)}</p>
              </div>
              <div className="absolute bottom-2 right-4 flex space-x-2">
                <button
                  className="p-2 rounded-full hover:bg-red-700"
                  onClick={() => openModal(product.id)}
                  aria-label={`Delete ${product.title}`}
                >
                  <FaTrash className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white text-center">{translations[language].noProducts}</div>
      )}
    </div>
  );
};

export default AddProductCard;
