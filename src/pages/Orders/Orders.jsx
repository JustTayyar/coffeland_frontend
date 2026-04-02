import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaRegCalendarAlt, FaReceipt, FaCheckCircle, FaClock, FaShoppingBag, FaFireAlt, FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading/Loading';
import { OrderService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import './Orders.css';

export default function Orders() {
  const { t, i18n } = useTranslation();
  const getLocalized = (item, field) => {
    if (!item) return '';
    return item[field + "_" + i18n.language] || item[field + "_az"] || item[field];
  };
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showModal } = useModal();
  
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  const fetchOrders = async () => {
    if (user?.id) {
      try {
        const response = await OrderService.getUserOrders(user.id);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); 
    return () => clearInterval(interval);
  }, [user]);

  const formatPrice = (price) => {
    const p = parseFloat(price);
    return p.toFixed(2) + ' ₼';
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('az-AZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(',', ''); // Some browsers add a comma between date and time
  };

  const handleDeleteOrder = (orderId) => {
    showModal(t('orders.confirm_delete_msg') || 'Bu sifarişi silmək istəyirsiniz?', 'confirm', ' ', async () => {
      try {
        await OrderService.deleteOrder(orderId);
        fetchOrders();
        
        setTimeout(() => {
          showModal(t('orders.deleted_success') || 'Sifariş uğurla silindi!', 'success');
        }, 350); 
      } catch (error) {
        console.error("Error calling delete API", error);
      }
    });
  };

  // Pagination logic
  const sortedOrders = [...orders].sort((a, b) => b.id - a.id);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <>
      <section className="orders-page-hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">{t('nav.orders')}</span>
            <h1>{t('orders.title')}</h1>
            <p>{t('orders.sub')}</p>
          </div>
        </div>
      </section>

      <section className="orders-section section">
        <div className="container">
          {loading ? (
            <Loading />
          ) : orders.length === 0 ? (
            <div className="orders-empty">
              <div className="orders-empty-icon">
                <FaBoxOpen />
              </div>
              <h2>{t('orders.empty_title')}</h2>
              <p>{t('orders.empty_sub')}</p>
              <Link to="/menu" className="btn btn-primary">
                <FaShoppingBag style={{ marginRight: '8px' }} />
                {t('orders.btn_menu')}
              </Link>
            </div>
          ) : (
            <div className="orders-list">
              <div className="orders-header-row">
                <h2>{t('orders.history')}</h2>
                <span className="orders-count">{orders.length} {t('orders.order_count')}</span>
              </div>

              {currentOrders.map((order) => {
                const total = order.total_price || order.total || 0;

                return (
                  <div className="order-card" key={order.id}>
                    {/* Card Header */}
                    <div className="order-card-header">
                      <div className="order-id-block">
                        <span className="order-label">{t('orders.order_lbl')}</span>
                        <span className="order-id">#{order.id?.toString().padStart(4, '0') || '------'}</span>
                      </div>
                      <div className="order-meta">
                        <span className="order-date">
                          <FaRegCalendarAlt />
                          {order.created_at || order.date ? formatDate(order.created_at || order.date) : t('orders.no_date')}
                        </span>

                        {order.status === 'pending' && (
                          <span className="order-status-badge status-pending">
                            <FaClock /> Gözləyir
                          </span>
                        )}
                        {order.status === 'preparing' && (
                          <span className="order-status-badge status-preparing" style={{color: '#d97706', background: 'rgba(217, 119, 6, 0.1)'}}>
                            <FaFireAlt /> Hazırlanır
                          </span>
                        )}
                        {(order.status === 'ready' || order.status === 'completed') && (
                          <span className="order-status-badge status-completed" style={{color: '#10b981', background: 'rgba(16, 185, 129, 0.1)'}}>
                            <FaCheckCircle /> Tamamlandı
                          </span>
                        )}

                        {order.status === 'pending' && (
                          <button 
                            className="order-delete-btn" 
                            onClick={(e) => { e.stopPropagation(); handleDeleteOrder(order.id); }}
                            title={t('orders.btn_delete') || 'Sil'}
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Card Body - Items */}
                    {order.items && order.items.length > 0 && (
                      <div className="order-card-body">
                        <p className="order-items-label">{t('orders.products')}</p>
                        <div className="order-items-list">
                          {order.items.map((item, idx) => (
                            <div className="order-item-row" key={idx}>
                              <span className="order-item-name">
                                {getLocalized(item.product, "name") || item.name || `${t('orders.product_lbl')}${item.product_id || item.id}`}
                              </span>
                              <div className="order-item-right">
                                <span className="order-item-qty">x{item.quantity}</span>
                                {(item.price_at_time || item.price) && (
                                  <span className="order-item-price">{formatPrice((item.price_at_time || item.price) * item.quantity)}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Card Footer */}
                    <div className="order-card-footer">
                      <div className="order-total-block">
                        <span className="order-total-label">{t('orders.total')}</span>
                        <span className="order-total-amount">{formatPrice(total)}</span>
                      </div>
                      
                      {(order.status === 'completed' || order.status === 'ready') && (
                        <span className="order-completed-badge">
                          <FaCheckCircle /> Sifarişiniz tamamlandı
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
            
            </div>
          )}
        </div>
      </section>
    </>
  );
}
