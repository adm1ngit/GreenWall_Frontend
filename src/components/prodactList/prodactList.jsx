import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slideshow from './Slideshow'; 
import icon from '../../assets/Logo.png';
import translations from '../main/translations';

const LazyImage = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? <img src={src} alt={alt} className="h-48 w-full object-cover mb-4 rounded" /> : <div className="h-48 w-full bg-gray-200" />}
    </div>
  );
};

const ProductList = ({ language }) => {
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]); 
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://greenwall2024-832ac2e5bda7.herokuapp.com/api/products/');
        const data = await response.json();
  
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const imageUrls = products.flatMap(product => 
      product.media.map(media => media.file_url)
    );
    prefetchImages(imageUrls);
  }, [products]);

  const prefetchImages = (imageUrls) => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  const toggleDescription = (productId) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const truncateDescription = (description, productId) => {
    const isExpanded = expandedDescriptions[productId];
    const limit = 100;
    return isExpanded ? description : description.substring(0, limit) + '...';
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleProductSelect = (product) => {
    navigate(`/product/first`, {
      state: { 
        productPrice: product.price, 
        productId: product.id,
        productName: product[`title_${language}`],
        productDescription: product[`description_${language}`],
        productImage: product.media[0]?.file_url
      },
    });
    setExpandedDescriptions({});
  };
console.log(products);

  const mediaItems = products.flatMap(product => 
    product.media.map(media => ({ type: 'image', file: media.file_url }))
  );

  return (
    <section className="md:px-14 px-10 relative ">
      <Link to={'/'}>
        <img src={icon} alt="Logo" width={'150px'} className="md:w-[150px] w-[100px] pt-3 mb-10" />
      </Link>
      
      <Slideshow mediaItems={mediaItems} />
      <h1 className="text-3xl font-bold text-[#50D900] mt-10">{translations[language].productListTitle}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {currentProducts.map((product) => {
          const productTranslation = {
            name: product[`title_${language}`],
            description: product[`description_${language}`],
            price: product.price,
          };

          return (
            <div
              key={product.id}
              className="border p-4 rounded shadow-lg cursor-pointer"
              onClick={() => handleProductSelect(product)}
            >
              <LazyImage
                src={product.media[0]?.file}
                alt={productTranslation.name}
              />
              <h2 className="text-xl font-semibold text-[#50D900]">{productTranslation.name}</h2>
              <div className="mt-5 md:text-lg">
                {truncateDescription(productTranslation.description, product.id)
                  .split(/\r?\n/) // Split on newline characters
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      <p>{line}</p>
                      {/* Add a blank line for spacing only if it’s the line before the advantages section */}
                      {line.includes("Advantages of decorative fences") && <br />}
                    </React.Fragment>
                  ))}
                {productTranslation.description.length > 100 && (
                  <button
                    className="text-blue-500 underline mt-2"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      toggleDescription(product.id);
                    }}
                  >
                    {expandedDescriptions[product.id] ? '<..' : '..>'}
                  </button>
                )}
              </div>
              <p className="text-green-600 font-bold">${productTranslation.price}</p>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          className="mx-1 px-4 py-2 rounded text-[#50D900] text-2xl"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <span>&lt; </span>
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-1 rounded ${currentPage === index + 1 ? 'bg-[#50D900] text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => {
              setCurrentPage(index + 1);
              setExpandedDescriptions({}); // Reset expanded descriptions when changing page
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="mx-1 px-4 py-2 text-[#50D900] text-2xl"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <span>&gt;</span>
        </button>
      </div>
    </section>
  );
};

export default ProductList;
