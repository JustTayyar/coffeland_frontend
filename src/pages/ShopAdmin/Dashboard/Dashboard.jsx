import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { AdminDashboardService } from '../../../services/api';
import { FaBoxes, FaChartLine, FaExclamationTriangle, FaClock, FaCheckCircle, FaRupeeSign, FaUsers } from 'react-icons/fa';
import './Dashboard.css';

import Loading from '../../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrdersToday: 0,
    activeProducts: 0, 
    totalCustomers: 0,
    revenueToday: 0,
    topSellingProduct: null,
    activeOrdersCount: 0,
    totalRevenueAllTime: 0,
    totalCompletedOrdersAllTime: 0,
    totalCancelledOrdersAllTime: 0,
    cancelledOrdersToday: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  const fetchDashboardStats = async () => {
    try {
      const res = await AdminDashboardService.getStats();
      if(res.data && res.data.stats) {
         setStats({
           totalOrdersToday: res.data.stats.totalOrdersToday,
           revenueToday: res.data.stats.revenueToday,
           activeProducts: res.data.stats.activeProducts,
           totalCustomers: res.data.stats.totalCustomers,
           topSellingProduct: res.data.stats.topSellingProduct,
           activeOrdersCount: res.data.stats.activeOrdersCount,
           totalRevenueAllTime: res.data.stats.totalRevenueAllTime,
           totalCompletedOrdersAllTime: res.data.stats.totalCompletedOrdersAllTime,
           totalCancelledOrdersAllTime: res.data.stats.totalCancelledOrdersAllTime,
           cancelledOrdersToday: res.data.stats.cancelledOrdersToday
         });
         setRecentOrders(res.data.recentOrders || []);
      }
    } catch (err) {
      console.error("Error fetching stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    // Real-time hissəsi üçün hər 10 saniyədən bir yenilə:
    const interval = setInterval(fetchDashboardStats, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Loading />
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1 className="dashboard-title">{t('admin.dashboard.welcome')}, {'Admin'}!</h1>
        <p className="dashboard-subtitle">{t('admin.dashboard.subtitle')}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>{t('admin.dashboard.active_products')}</h4>
          <h2>{stats.activeProducts || '--'}</h2>
        </div>
        <div className="stat-card">
          <h4>{t('admin.dashboard.customers')}</h4>
          <h2>{stats.totalCustomers || '--'}</h2>
        </div>
        <div className="stat-card">
          <h4>{t('admin.dashboard.orders_today')}</h4>
          <h2>{stats.totalOrdersToday}</h2>
        </div>
        <div className="stat-card">
          <h4 style={{color: '#3b82f6'}}>{t('admin.dashboard.orders_preparing')}</h4>
          <h2 style={{color: '#3b82f6'}}>{stats.activeOrdersCount}</h2>
        </div>
        <div className="stat-card">
          <h4 style={{color: '#34d399'}}>{t('admin.dashboard.orders_completed_all')}</h4>
          <h2 style={{color: '#34d399'}}>{stats.totalCompletedOrdersAllTime}</h2>
        </div>
        <div className="stat-card">
          <h4 style={{color: '#ef4444'}}>{t('admin.dashboard.orders_cancelled_today')}</h4>
          <h2 style={{color: '#ef4444'}}>{stats.cancelledOrdersToday}</h2>
        </div>
        <div className="stat-card">
          <h4 style={{color: '#fc8181'}}>{t('admin.dashboard.orders_cancelled_all')}</h4>
          <h2 style={{color: '#fc8181'}}>{stats.totalCancelledOrdersAllTime}</h2>
        </div>
        <div className="stat-card">
          <h4 style={{color: '#10b981'}}>{t('admin.dashboard.revenue_today')}</h4>
          <h2 style={{color: '#10b981'}}>{Number(stats.revenueToday).toFixed(2)} ₼</h2>
        </div>
        <div className="stat-card">
          <h4 style={{color: '#10b981'}}>{t('admin.dashboard.revenue_all')}</h4>
          <h2 style={{color: '#10b981'}}>{Number(stats.totalRevenueAllTime).toFixed(2)} ₼</h2>
        </div>
        <div className="stat-card">
          <h4 style={{color: '#fca311'}}>{t('admin.dashboard.top_selling')}</h4>
          <h2 style={{fontSize: '1.2rem', marginTop: '10px'}}>{stats.topSellingProduct ? stats.topSellingProduct.name : '--'}</h2>
          {stats.topSellingProduct && <p style={{fontSize: '0.8rem', color: '#a3a3a3', marginTop: '5px'}}>({stats.topSellingProduct.sold} {t('admin.dashboard.pieces')})</p>}
        </div>
      </div>

      <div className="recent-orders-section">
        <h3>{t('admin.dashboard.recent_orders')}</h3>
        {recentOrders.length === 0 ? (
          <p style={{color: '#6b7280', padding: '20px'}}>{t('admin.dashboard.no_recent_orders')}</p>
        ) : (
          <div className="premium-table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>{t('admin.dashboard.th_order')}</th>
                  <th>{t('admin.dashboard.th_customer')}</th>
                  <th>{t('admin.dashboard.th_datetime')}</th>
                  <th>{t('admin.dashboard.th_amount')}</th>
                  <th>{t('admin.dashboard.th_total_items')}</th>
                  <th>{t('admin.dashboard.th_status')}</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <span className="order-id">#{order.id.toString().padStart(4, '0')}</span>
                    </td>
                    <td>
                      <div className="customer-info">
                         <span className="customer-name">{order.user?.name || ''}</span>
                      </div>
                    </td>
                    <td>
                      <div className="date-info" style={{ color: '#e5e7eb' }}>
                        <span className="date-day" style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                          {new Date(order.created_at).toLocaleDateString('en-GB').replace(/\//g, '-')}
                        </span>
                        <span className="date-time" style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                          {new Date(order.created_at).toLocaleTimeString('az-AZ', {hour: '2-digit', minute: '2-digit'})}
                        </span>
                      </div>
                    </td>
                    <td><span className="price-tag">{Number(order.total_price).toFixed(2)} ₼</span></td>
                    <td><span className="items-count">{order.items?.length || 0} {t('admin.dashboard.pieces')}</span></td>
                    <td>
                       <span className={`status-badge ${order.status}`} style={
                         order.status === 'cancelled' ? { backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fc8181', padding: '6px 12px', borderRadius: '6px', border: '1px solid #fc8181', fontWeight: '600' } : 
                         order.status === 'completed' ? { backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '6px 12px', borderRadius: '6px', border: '1px solid #34d399', fontWeight: '600'} : 
                         { backgroundColor: 'rgba(252, 163, 17, 0.15)', color: '#fca311', padding: '6px 12px', borderRadius: '6px', border: '1px solid #fca311', fontWeight: '600' }
                       }>
                         {order.status === 'cancelled' ? t('admin.dashboard.status_cancelled') : order.status === 'completed' ? t('admin.dashboard.status_completed') : order.status}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
