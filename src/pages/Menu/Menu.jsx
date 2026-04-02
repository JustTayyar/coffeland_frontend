import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';
import { ProductService } from '../../services/api';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import CartSidebar from '../../components/CartSidebar/CartSidebar';
import Loading from '../../components/Loading/Loading';
import './Menu.css';

export default function Menu() {
  const { t, i18n } = useTranslation();
  const getLocalized = (item, field) => item[field + "_" + i18n.language] || item[field + "_az"] || item[field];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMainCategory, setActiveMainCategory] = useState("İçkilər");      
  const [activeSubCategory, setActiveSubCategory] = useState(null);    
  const { cart, addToCart, setIsCartOpen } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch products from Laravel API
    ProductService.getAllProducts()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  const mainCategories = [...new Set(products.map(p => p.category))];

  // Get subcategories only for the active main category
  const subCategories = ["ALL", ...new Set(products.filter(p => p.category === activeMainCategory).map(p => p.sub_category))];                          
  const filteredProducts = products.filter(p => {
    const matchesMain = p.category === activeMainCategory;
    const matchesSub = activeSubCategory === null || p.sub_category === activeSubCategory;
    return matchesMain && matchesSub;
  });

  const formatPrice = (price) => {
    const p = parseFloat(price);
    return p.toFixed(2) + ' ₼';
  };

  return (
    <>
      <section className="menu section">
          <div className="container">
              <div className="menu-layout">
                  <div className="menu-content">

                      <div className="filters">
                         {mainCategories.map((cat, i) => (
                           <button key={i} className={`filter-btn ${activeMainCategory === cat? 'active' : ''}`}
                                  onClick={() => {
                                  setActiveMainCategory(cat);
                                  setActiveSubCategory(null); // Reset sub on main change                                 
                                  window.scrollTo({ top: 0, behavior: 'smooth' });                                                                                                            }}
                                  style={{ fontSize: '1.2rem', padding: '12px 30px', margin: '0 5px 20px' }} >
                             {products.find(p => p.category === cat) ? getLocalized(products.find(p => p.category === cat), "category") : cat}
                           </button>
                        ))}
                      </div>

                      {/* Sub Category Filters */}
                      <div className="filters" style={{ marginTop: '20px', marginBottom: '20px', gap: '8px' }}> 
                      {subCategories.map((sub, i) => (
                           <button key={i}  className={`filter-btn ${(activeSubCategory === sub) || (activeSubCategory === null && sub === "ALL") ? 'active' : ''}`}   onClick={() => {setActiveSubCategory(sub === "ALL" ? null : sub); window.scrollTo({ top: 0, behavior: 'smooth' });}} style={{ fontSize: '0.9rem', padding: '6px 16px' }}>
                             {sub === "ALL" ? (activeMainCategory === "İçkilər" ? "Bütün içkilər" : activeMainCategory === "Qidalar" ? "Bütün qidalar" : t("menu.all")) : sub}
                           </button>
                        ))}
                      </div>

                      {loading ? (
                        <Loading />
                      ) : (
                        <div className="products-grid">
                            {filteredProducts.map(product => {
                                const isFav = isFavorite(product.id);
                                return (
                                  <div className="product-card" key={product.id}
>                                                                                                                     <div className="product-img">
                                          <img src={`/images/${product.image_url.split('/').pop().replace('.jpg', '.png')}`} alt={getLocalized(product, "name")} />                                                        
                                          <span className="product-category">{product.category}</span>                                                                                                    <button
                                            className={`favorite-btn ${isFav ? 'active' : ''}`} onClick={(e) => {
                                            e.stopPropagation();
                                              if (!user) {
                                                navigate('/login');
                                                return;
                                              }
                                              toggleFavorite(product.id, product);                                                                                                                          }}
                                          >
                                              {isFav ? <FaHeart /> : <FaRegHeart/>}                                                                                                                      </button>
                                      </div>
                                      <div className="product-info">
                                          <h3>{getLocalized(product, "name")}</h3>
                                          <p>{getLocalized(product, "description")}</p>
                                          <div className="product-footer">      
                                              <span className="price">{formatPrice(product.price)}</span>                                                                                                     <button
                                                className="btn btn-primary add-to-cart"                                                                                                                         onClick={(e) => {
                                                  e.stopPropagation();
                                                  if (!user) {
                                                    navigate('/login');
                                                    return;
                                                  }
                                                  addToCart(product);
                                                }}
                                              >
                                                {t('menu.add')}
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                                );
                            })}
                        </div>
                      )}

                  </div>
                  <CartSidebar />
              </div>
          </div>
      </section>
    </>
          );          
        };






