import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import '../Auth/AuthPage.css'; // Keep this for auth-wrapper and auth-form base styles
import './ForgotPassword.css';
import { useModal } from '../../context/ModalContext';

export default function ForgotPassword() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { showModal } = useModal();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            showModal(t('auth.login_empty_err'), 'error');
            return;
        }
        showModal(t('auth.btn_reset') + " ✓", 'success');
        navigate('/login');
    };

    return (
        <main className="auth-wrapper">
             <div className="auth-container forgot-password-container">
                 <form className="auth-form forgot-password-form" onSubmit={handleSubmit}>
                     <h1 className="forgot-password-title">{t('auth.reset_pass_title')}</h1>
                     <p className="forgot-password-desc">{t('auth.reset_pass_desc')}</p>
                     
                     <div className="input-group forgot-password-input-group">
                         <input 
                             type="email" 
                             placeholder={t('auth.email_label')} 
                             value={email} 
                             onChange={(e) => setEmail(e.target.value)} 
                         />
                     </div>
                     
                     <button className="auth-submit-btn forgot-password-submit-btn" type="submit">{t('auth.btn_reset')}</button>
                     
                     <div className="forgot-password-back-wrapper">
                         <Link to="/login" className="forgot-password-back-link">
                             <FaChevronLeft /> {t('auth.login_title')}
                         </Link>
                     </div>
                 </form>
             </div>
        </main>
    );
}
