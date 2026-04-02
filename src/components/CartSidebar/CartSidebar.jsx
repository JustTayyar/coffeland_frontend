import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import { OrderService } from '../../services/api';
import { FaTimes, FaTrashAlt, FaTrash, FaShoppingBag } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './CartSidebar.css';

export default function CartSidebar() {
  const { t, i18n } = useTranslation();
  const getLocalized = (item, field) => item[field + "_" + i18n.language] || item[field + "_az"] || item[field];
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useAuth();
  const { showModal } = useModal();
  const navigate = useNavigate();
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatPrice = (price) => {
      const p = parseFloat(price);
      return p.toFixed(2) + ' ₼';
  };

  const handleCheckout = async () => {
      if (cart.length === 0) return;

      if (!user) {
        setIsCartOpen(false);
        navigate('/login');
        return;
      }

      try {
          // Prepare the items to send to Laravel
          const itemsPayload = cart.map(item => ({
              product_id: item.id,
              quantity: item.quantity,
              price: item.price
          }));

          // API Servisindən istifadə edirik
          const response = await OrderService.createOrder({ items: itemsPayload, user_id: user.id });

          // LocalStorage-i tam silmirik hələlik yedək olsun deyə,
          // Ancaq əsas databaza Laravel-də saxlanılır artıq.
          const newOrder = {
              id: response.data?.order?.id || Date.now(),
              date: new Date().toISOString(),
              total: total,
              status: 'pending', 
              userEmail: user.email,
              items: cart.map(item => ({ ...item })) 
          };
          const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
          existingOrders.push(newOrder);
          localStorage.setItem('orders', JSON.stringify(existingOrders));

          showModal(t('cart.alert_success'), 'success');
          clearCart();
          setIsCartOpen(false);
          // Gently replace the page while preserving the modal popup overlay
          navigate('/orders');
      } catch (error) {
          console.error("Error creating order:", error);
          showModal(t('cart.alert_error'), 'error');
      }
  };

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'active' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
          <div className="cart-header">
              <div className="cart-header-title">
                  <FaShoppingBag className="header-icon" />
                  <h2>{t('cart.title')}</h2>
                  <span className="item-count-badge">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
              </div>
              <button id="close-cart" className="close-cart-btn" onClick={() => setIsCartOpen(false)} title={t('common.close')}>
                  <FaTimes />
              </button>
          </div>
          
          <div className="cart-items-container">
              {cart.length === 0 ? (
                  <div className="empty-cart-state">
                      <div className="empty-icon-wrap">
                          <FaShoppingBag />
                      </div>
                      <h3>{t('cart.empty_title') || t('cart.empty')}</h3>
                      <p>{t('cart.empty_sub') || ''}</p>
                  </div>
              ) : (
                  <div className="cart-items-list">
                      {cart.map(item => (
                          <div className="cart-item-card" key={item.id}>
                              <div className="cart-item-img-wrap">
                                  <img src={`/images/${item.image_url.split('/').pop().replace('.jpg', '.png')}`}    alt={getLocalized(item, "name")} />
                              </div>
                              <div className="cart-item-details">
                                  <div className="cart-item-header">
                                      <h4 className="cart-item-name">{getLocalized(item, "name")}</h4>
                                      <button className="remove-item-btn" onClick={() => removeFromCart(item.id)} title={t('cart.remove')}>
                                          <FaTrash />
                                      </button>
                                  </div>
                                  <span className="cart-item-unit-price">{formatPrice(item.price)}</span>
                                  <div className="cart-item-footer">
                                      <div className="qty-controls">
                                          <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease">-</button>
                                          <span className="qty-value">{item.quantity}</span>
                                          <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase">+</button>
                                      </div>
                                      <span className="cart-item-total-price">{formatPrice(item.price * item.quantity)}</span>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
          
          {cart.length > 0 && (
              <div className="cart-footer-area">
                  <div className="summary-row">
                      <span className="summary-label">{t('cart.total')}</span>
                      <span className="summary-value">{formatPrice(total)}</span>
                  </div>
                  <div className="cart-action-buttons">
                      <button className="primary-checkout-btn" onClick={handleCheckout}>
                          {t('cart.checkout')}
                      </button>
                      <button className="clear-all-btn" onClick={clearCart}>
                          <FaTrashAlt style={{ marginRight: '8px' }} />
                          {t('cart.clear')}
                      </button>
                  </div>
              </div>
          )}
      </div>
    </>
  );
}
