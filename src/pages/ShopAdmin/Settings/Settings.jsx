import React, { useState, useEffect } from 'react';
import { AdminProfileService } from '../../../services/api';
import './Settings.css';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await AdminProfileService.getProfile();
      setFormData(prev => ({
        ...prev,
        email: data.email || ''
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const { data } = await AdminProfileService.updateProfile(formData);
      setMessage(data.message);
      setFormData(prev => ({...prev, current_password: '', new_password: '', new_password_confirmation: ''}));
    } catch (err) {
      setError(err.response?.data?.message || t('admin.settings.err_general'));
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-page-header" style={{display: 'flex', justifyContent: 'center'}}>
        <h2 >{t('admin.settings.title')}</h2>
      </div>

      <div className="settings-form-container">
        {message && <div style={{background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>{message}</div>}
        {error && <div style={{background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>{error}</div>}
        
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="settings-form-group">
            <label>{t('admin.settings.lbl_email')}</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>
          
          <div style={{marginTop: '30px', marginBottom: '15px', paddingTop: '20px', borderTop: '1px solid #2f2f2f'}}>
            <h3 style={{fontSize:'1.1rem', color:'#fff', marginBottom:'15px'}}>{t('admin.settings.sub_title_pass')}</h3>
          </div>

          <div className="settings-form-group">
            <label>{t('admin.settings.lbl_current_pass')}</label>
            <input type="password" name="current_password" value={formData.current_password} onChange={handleChange} placeholder={t('admin.settings.plc_current_pass')} />
          </div>
          
          <div className="settings-form-group">
            <label>{t('admin.settings.lbl_new_pass')}</label>
            <input type="password" name="new_password" value={formData.new_password} onChange={handleChange} minLength={6} placeholder={t('admin.settings.plc_new_pass')} />
          </div>
          
          <div className="settings-form-group">
            <label>{t('admin.settings.lbl_new_pass_conf')}</label>
            <input type="password" name="new_password_confirmation" value={formData.new_password_confirmation} onChange={handleChange} minLength={6} placeholder={t('admin.settings.plc_new_pass_conf')} />
          </div>

          <button type="submit" className="settings-btn-primary">
            {t('admin.settings.btn_update')}
          </button>
        </form>
      </div>
    </div>
  );
}

