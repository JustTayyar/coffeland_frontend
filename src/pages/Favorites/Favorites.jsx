import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading/Loading';
import './Favorites.css';

export default function Favorites() {
  const { t, i18n } = useTranslation();
  const getLocalized = (item, field) => item[field + "_" + i18n.language] || item[field + "_az"] || item[field];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { favorites, toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (favorites.length === 0) {
      setLoading(false);
      return;
    }

    axios.get('http://127.0.0.1:8000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, [favorites]);

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  const formatPrice = (price) => {
    const p = parseFloat(price);
    return p.toFixed(2) + ' ₼';
  };

  if (loading) {
      return <Loading />;
  }

  return (
    <>
      <section className="favorites-hero">
          <div className="container">
              <div className="hero-content">
                  <span className="hero-badge">{t('nav.favorites')}</span>
                  <h1>{t('favorites.title')}</h1>
                  <p>{t('favorites.sub')}</p>
              </div>
          </div>
      </section>

      <section className="favorites-section section">
          <div className="container">
              {favoriteProducts.length === 0 ? (
                  <div className="favorites-empty">
                      <div className="empty-icon-wrapper">
                          <FaRegHeart />
                      </div>
                      <h3>{t('favorites.empty_title')}</h3>
                      <p>{t('favorites.empty_sub')}</p>
                      <Link to="/menu" className="btn btn-primary">{t('favorites.btn_menu')} <FaArrowRight /></Link>
                  </div>
              ) : (
                  <div className="fav-grid">
                      {favoriteProducts.map(product => {
                          const isFav = isFavorite(product.id);
                          return (
                            <div className="fav-card" key={product.id}>
                                <div className="fav-img-wrap">
                                    <img src={`/images/${product.image_url.split('/').pop().replace('.jpg', '.png')}`} alt={getLocalized(product, "name")} />
                                    <span className="fav-category">{getLocalized(product, "category")}</span>
                                    <button 
                                      className={`fav-heart-btn ${isFav ? 'active' : ''}`} 
                                      onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id, product); }}
                                    >
                                        {isFav ? <FaHeart /> : <FaRegHeart />}
                                    </button>
                                </div>
                                <div className="fav-info">
                                    <h3>{getLocalized(product, "name")}</h3>
                                    <p>{getLocalized(product, "description")}</p>
                                    <div className="fav-footer">
                                        <span className="fav-price">{formatPrice(product.price)}</span>
                                        <button 
                                          className="btn btn-primary fav-add-cart" 
                                          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
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
      </section>
    </>
  );
}
