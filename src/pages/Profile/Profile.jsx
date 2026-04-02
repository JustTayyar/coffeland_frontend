import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaChevronRight, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import './Profile.css';

export default function Profile() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { showModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const fallbackUser = user || {
    name: t('profile.guest'),
    email: 'qonaq@COFFEELAND.az',
    phone: '',
    address: '',
    memberSince: '2024'
  };

  return (
    <>
      <section className="profile-header">
        <div className="container">
          <div className="profile-overview">
            <div className="profile-avatar">
              <FaUserCircle />
            </div>
            <div className="profile-info-top">
              <h1>{fallbackUser.firstname ? `${fallbackUser.firstname} ${fallbackUser.lastname}`.trim() : fallbackUser.name}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="profile-content section">
        <div className="container">
          <div className="profile-grid">
            
            {/* Sol Tərəf - Menyular */}
            <div className="profile-sidebar">
              <div className="profile-menu">
                <button 
                  className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FaUserCircle /> {t('profile.tab_info')} <FaChevronRight className="chevron" />
                </button>

                <button 
                  className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <FaCog /> {t('profile.tab_settings')} <FaChevronRight className="chevron" />
                </button>
                <button className="menu-item logout-btn" onClick={() => { logout(); navigate('/login'); }}>
                  <FaSignOutAlt /> {t('profile.logout')}
                </button>
              </div>
            </div>

            {/* Sağ Tərəf - İçərik */}
            <div className="profile-main">
              {activeTab === 'profile' && (
                <div className="profile-card">
                  <div className="card-header">
                    <h3>{t('profile.tab_info')}</h3>
                  </div>
                  
                  <div className="profile-info-grid">
                    <div className="info-box">
                      <span className="info-label">{t('profile.fname')}</span>
                      <span className="info-value">{fallbackUser.firstname || fallbackUser.name || '-'}</span>
                    </div>
                    <div className="info-box">
                      <span className="info-label">{t('profile.lname')}</span>
                      <span className="info-value">{fallbackUser.lastname || '-'}</span>
                    </div>
                    <div className="info-box">
                      <span className="info-label">{t('profile.email')}</span>
                      <span className="info-value">{fallbackUser.email}</span>
                    </div>
                    <div className="info-box">
                      <span className="info-label">{t('profile.address')}</span>
                      <span className="info-value">{fallbackUser.address || t('profile.not_provided')}</span>
                    </div>
                  </div>
                  <button className="btn-edit-profile" onClick={() => setActiveTab('settings')}>
                    {t('profile.btn_edit')}
                  </button>
                </div>
              )}

              

              {activeTab === 'settings' && (
                <div className="profile-card">
                  <div className="card-header">
                    <h3>{t('profile.tab_settings')}</h3>
                  </div>
                  <div className="settings-form-wrapper">
                    <form className="settings-form" onSubmit={(e) => { e.preventDefault(); showModal(t('profile.alert_success'), 'success'); }}>
                      
                      <div className="settings-group">
                        <label>{t('profile.new_email')}</label>
                        <input 
                          type="email" 
                          defaultValue={fallbackUser.email} 
                        />
                      </div>

                      <div className="settings-group">
                        <label>{t('profile.del_address')}</label>
                        <input 
                          type="text" 
                          defaultValue={fallbackUser.address || ''} 
                          placeholder={t('profile.address_placeholder')}
                        />
                      </div>
                      
                      <div className="settings-group">
                        <label>{t('profile.new_pass')}</label>
                        <input 
                          type="password" 
                          placeholder={t('profile.new_pass_placeholder')} 
                        />
                      </div>
                      
                      <div className="settings-group">
                        <label>{t('profile.pass_conf')}</label>
                        <input 
                          type="password" 
                          placeholder={t('profile.pass_conf_placeholder')} 
                        />
                      </div>
                      
                      <button type="submit" className="btn-save-settings">
                        {t('profile.btn_save')}
                      </button>

                    </form>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );}

