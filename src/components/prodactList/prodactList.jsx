import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slideshow from './Slideshow';
import icon from '../../assets/Logo.png';
import translations from '../main/translations';

const LazyImage = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      });
    });
    ref.current && observer.observe(ref.current);

    return () => {
      ref.current && observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? (
        <img src={src} alt={alt} className="h-48 w-full object-cover mb-4 rounded" />
      ) : (
        <div className="h-48 w-full bg-gray-200 rounded" />
      )}
    </div>
  );
};

const ProductList = ({ language }) => {
  const [products, setProducts] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://greenwalluz-4a1f8b314ff2.herokuapp.com/api/products/');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  // Prefetch images
  const prefetchImages = useCallback((urls) => {
    urls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  useEffect(() => {
    const urls = products.flatMap(p => p.media.map(m => m.file_url));
    prefetchImages(urls);
  }, [products, prefetchImages]);

  // Get products for current page
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [products, currentPage]);

  const totalPages = useMemo(() => Math.ceil(products.length / itemsPerPage), [products]);

  // All media for slideshow
  const mediaItems = useMemo(() => (
    products.flatMap(p => p.media.map(m => ({ type: 'image', file: m.file_url })))
  ), [products]);

  // Toggle description
  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const truncateDescription = (desc, id) => {
    const isExpanded = expandedDescriptions[id];
    const limit = 100;
    return isExpanded ? desc : desc.slice(0, limit) + '...';
  };

  const getProductTranslation = (product) => ({
    name: product[`title_${language}`],
    description: product[`description_${language}`],
    price: product.price,
  });

  const handleProductSelect = (product) => {
    navigate(`/product/first`, {
      state: {
        productPrice: product.price,
        productId: product.id,
        productName: product[`title_${language}`],
        productDescription: product[`description_${language}`],
        productImage: product.media[0]?.file_url,
      },
    });
    setExpandedDescriptions({});
  };

  return (
    <section className="md:px-14 px-10 relative">
      <Link to="/">
        <img src={icon} alt="Logo" className="md:w-[150px] w-[100px] pt-3 mb-10" />
      </Link>

      <Slideshow mediaItems={mediaItems} />

      <h1 className="text-3xl font-bold text-[#50D900] mt-10">
        {translations[language].productListTitle}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {currentProducts.map(product => {
          const t = getProductTranslation(product);
          const imageSrc = product.media[0]?.file || product.media[0]?.file_url || '';

          return (
            <div
              key={product.id}
              className="border p-4 rounded shadow-lg cursor-pointer"
              onClick={() => handleProductSelect(product)}
            >
              <LazyImage src={imageSrc} alt={t.name} />
              <h2 className="text-xl font-semibold text-[#50D900]">{t.name}</h2>
              <div className="mt-5 md:text-lg">
                {truncateDescription(t.description, product.id)
                  .split(/\r?\n/)
                  .map((line, idx) => (
                    <React.Fragment key={idx}>
                      <p>{line}</p>
                      {line.includes("Advantages of decorative fences") && <br />}
                    </React.Fragment>
                  ))}
                {t.description.length > 100 && (
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
              <p className="text-green-600 font-bold">${t.price}</p>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          className="mx-1 px-4 py-2 rounded text-[#50D900] text-2xl"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-1 rounded ${currentPage === i + 1 ? 'bg-[#50D900] text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => {
              setCurrentPage(i + 1);
              setExpandedDescriptions({});
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="mx-1 px-4 py-2 text-[#50D900] text-2xl"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default ProductList;
