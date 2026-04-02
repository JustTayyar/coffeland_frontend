import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaChartPie, FaBoxOpen, FaUsers, FaDesktop, FaSignOutAlt, FaNewspaper, FaUserTie, FaCog, FaSun, FaMoon } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import './ShopAdminLayout.css';

export default function ShopAdminLayout() {
  const { adminUser, adminLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('admin_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('admin_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    if (!adminUser) {
      navigate('/admin/auth/login');
      return;
    }
    if (adminUser.role === 'worker' && location.pathname !== '/kds') {
      navigate('/kds');
    }
  }, [adminUser, navigate, location]);

  const handleLogout = async () => {
    await adminLogout();
    navigate('/admin/auth/login');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  if (!adminUser) return null;
  const isWorker = adminUser.role === 'worker';

  return (
    <div className={`admin-layout ${!isDarkMode ? 'light-mode' : ''}`}>
      {!isWorker && (
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px',fontSize:'1rem' }}>
              <FaChartPie /> {t('admin.sidebar.panel')}
            </div>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{ background: 'transparent', border: 'none', color: isDarkMode ? '#e4e4e7' : '#1f2937', cursor: 'pointer', fontSize: '1.2rem', padding: '5px', display: 'flex', alignItems: 'center' }}
              title={isDarkMode ? t('admin.sidebar.light_mode') : t('admin.sidebar.dark_mode')}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
          <nav className="admin-nav">
            <div style={{ display: 'flex', gap: '20px', padding: '15px 20px', }}>
              {['az', 'en', 'ru'].map(lng => (
                  <button
                    className='admin-langs-btns'
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    style={{
                        padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', border: 'none',
                        background: i18n.language === lng ? '#FF9800' : '#4b5563',
                        color: i18n.language === lng ? '#fff' : '#d1d5db',
                        flex: 1, fontSize: '0.85rem'
                    }}
                  >
                    {lng.toUpperCase()}
                  </button>
              ))}
            </div>
            <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
              <FaChartPie /> {t('admin.sidebar.stats')}
            </NavLink>
            <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
              <FaBoxOpen /> {t('admin.sidebar.products')}
            </NavLink>
            <NavLink to="/admin/blogs" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
              <FaNewspaper /> {t('admin.sidebar.blogs')}
            </NavLink>
            <NavLink to="/admin/customers" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
              <FaUsers /> {t('admin.sidebar.customers')}
            </NavLink>
            <NavLink to="/admin/workers" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
              <FaUserTie /> {t('admin.sidebar.workers')}
            </NavLink>
            <NavLink to="/admin/inventory" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
               <FaBoxOpen /> {t('admin.sidebar.inventory')}
            </NavLink>
            <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
               <FaCog /> {t('admin.sidebar.settings')}
            </NavLink>
          </nav>
          
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> {t('admin.sidebar.logout')}
          </button>
        </aside>
      )}

      {/* Əsas Panel Hissəsi */}
      <main className="admin-content">

        <Outlet />
      </main>
    </div>
  );
}