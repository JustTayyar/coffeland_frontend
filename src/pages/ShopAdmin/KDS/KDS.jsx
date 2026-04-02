import { useState, useEffect } from 'react';
import './KDS.css';
import Loading from '../../../components/Loading/Loading';
import { FaCheck, FaFire, FaClock, FaTimes, FaCoffee, FaConciergeBell, FaHamburger, FaTrash } from 'react-icons/fa';
import { OrderService } from '../../../services/api';

export default function KDS() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // all, drinks, food

  const fetchOrders = async () => {
    try {
      const response = await OrderService.getAdminOrders(); 
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); 
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      await OrderService.updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
      fetchOrders(); 
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm(`DİQQƏT: #${orderId.toString().padStart(4, '0')} nömrəli sifarişi tamamilə silmək istədiyinizə əminsiniz? Bu əməliyyatı geri qaytarmaq olmaz.`)) return;

    try {
      // Optimistic delete
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      await OrderService.deleteOrder(orderId);
    } catch (error) {
      console.error('Error deleting order:', error);
      fetchOrders();
    }
  };

  if (loading && orders.length === 0) return <div className="admin-orders-board" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Loading /></div>;

  // Sifarişlərin içindəki məhsulları seçilmiş taba görə süzgəcdən keçiririk
  const filterOrderItems = (order) => {
    if (activeTab === 'all') return order;

    // Məhsulları kateqoriyaya görə süzürük
    const filteredItems = order.items?.filter(item => {
      const cat = item.product?.category || '';
      const catLower = cat.toLowerCase();
      if (activeTab === 'drinks') {
        return cat === 'İçkilər' || catLower.includes('içki') || catLower.includes('drink') || catLower.includes('coffee');
      } else if (activeTab === 'food') {
        return cat === 'Qidalar' || catLower.includes('qida') || catLower.includes('yemək') || catLower.includes('dessert') || catLower.includes('food');
      }
      return true;
    });

    // Əgər həmin sifarişdə bu tab-a aid məhsul yoxdursa null qaytarırıq (Ekranda görünməsin)
    if (!filteredItems || filteredItems.length === 0) return null;

    // Varsa, sifarişin kopyasını alıb ancaq süzülmüş məhsulları yazırıq
    return { ...order, items: filteredItems };
  };

  // Aktiv taba uyğun görünəcək sifarişlərin təmizlənmiş siyahısı
  const displayOrders = orders
    .map(filterOrderItems)
    .filter(order => order !== null);

  const pendingOrders = displayOrders.filter(o => o.status === 'pending');
  const preparingOrders = displayOrders.filter(o => o.status === 'preparing');
  const completedOrders = displayOrders.filter(o => o.status === 'ready' || o.status === 'completed');

  return (
    <div className="admin-orders-board">
      <header className="kds-header">
        <div className="kds-header-title">
          <h1>Sistema KDS (Kitchen & Bar)</h1>
          
          <div className="kds-tabs">
            <button 
              className={`kds-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <FaConciergeBell /> Bütün Sifarişlər
            </button>
            <button 
              className={`kds-tab kds-tab-drinks ${activeTab === 'drinks' ? 'active' : ''}`}
              onClick={() => setActiveTab('drinks')}
            >
              <FaCoffee /> Barista KDS
            </button>
            <button 
              className={`kds-tab kds-tab-food ${activeTab === 'food' ? 'active' : ''}`}
              onClick={() => setActiveTab('food')}
            >
              <FaHamburger /> Mətbəx KDS
            </button>
          </div>
        </div>

        <div className="kds-stats">
          <span className="stat-badge pending-badge">Gözləyir: {pendingOrders.length}</span>
          <span className="stat-badge preparing-badge">Hazırlanır: {preparingOrders.length}</span>
        </div>
      </header>

      <div className="kanban-container">
        <div className="kanban-column">
          <div className="column-header pending">
            <h2><FaClock /> Yeni Sifarişlər</h2>
          </div>
          <div className="column-body">
            {pendingOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onUpdate={updateOrderStatus}
                onDelete={deleteOrder} 
                nextStatus="preparing" 
                actionText="Hazırla"
                actionIcon={<FaFire />}
                categoryStyle={activeTab} // Karta da yüngül rəng fərqi veririk
              />
            ))}
            {pendingOrders.length === 0 && <div className="empty-kds">Yeni sifariş yoxdur</div>}
          </div>
        </div>

        <div className="kanban-column">
          <div className="column-header preparing">
            <h2><FaFire /> Hazırlanır</h2>
          </div>
          <div className="column-body">
            {preparingOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onUpdate={updateOrderStatus}
                onDelete={deleteOrder} 
                nextStatus="completed" 
                actionText="Tamamla"
                actionIcon={<FaCheck />}
                categoryStyle={activeTab}
              />
            ))}
            {preparingOrders.length === 0 && <div className="empty-kds">Hazırlanan sifariş yoxdur</div>}
          </div>
        </div>

        <div className="kanban-column">
          <div className="column-header completed">
            <h2><FaCheck /> Hazırdır</h2>
          </div>
          <div className="column-body">
            {completedOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onUpdate={updateOrderStatus}
                onDelete={deleteOrder} 
                nextStatus={null} 
                categoryStyle={activeTab}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order, onUpdate, onDelete, nextStatus, actionText, actionIcon, categoryStyle }) {
  const timeStr = new Date(order.created_at).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' });

  // Tab filterindən gələn məhsullar
  const displayItems = order.items || [];

  return (
    <div className={`kds-card status-${order.status} style-${categoryStyle}`}>
      <div className="card-top">
        <span className="order-number">#{order.id?.toString().padStart(4, '0')}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="order-time">{timeStr}</span>
          <button 
            className="btn-trash-icon" 
            onClick={() => onDelete(order.id)}
            title="Sifarişi tamamilə sil"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <ul className="kds-items">
        {displayItems.map((item, i) => (
          <li key={i}>
            <strong>{item.quantity}x</strong> {item.product?.name || 'Məhsul'}
          </li>
        ))}
      </ul>
      
      <div className="card-bottom">
        {/* Əgər All tabıdırsa məbləğ göstərək, mətbəxdə olanlara adətən məbləğ lazım olmur */}
        <div className="total-price">{categoryStyle === 'all' ? `${parseFloat(order.total_price).toFixed(2)} ₼` : ''}</div>
        
        <div className="card-actions">
          {nextStatus && (
            <>
              <button
                className={`btn-kds btn-${nextStatus}`}
                onClick={() => onUpdate(order.id, nextStatus)}
              >
                {actionIcon} {actionText}
              </button>
              {order.status === 'pending' && categoryStyle === 'all' && (
                <button
                  className="btn-kds btn-cancel"
                  onClick={() => onUpdate(order.id, 'cancelled')}
                  title="Ləğv Et"
                >
                  <FaTimes />
                </button>
              )}
            </>
          )}

          {/* Tamamlanmış sifarişi ekrandan silmək (gizlətmək) üçündür. Baza-da 'archived' statusuna keçəcək. */}
          {!nextStatus && categoryStyle === 'all' && order.status === 'pending_will_never_happen' && (
            <button
              className="btn-kds btn-cancel"
              onClick={() => onUpdate(order.id, 'archived')}
              title="Sifarişi Ekrandan Sil"
            >
              <FaTrash /> Sil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
