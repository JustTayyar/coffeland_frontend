import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes, FaQuestionCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Modal.css';

export default function Modal({ isOpen, title, message, type, onClose, onConfirm }) {
  const { t } = useTranslation();
  // We use intermediate rendering state to handle closing animations gracefully
  const [shouldRender, setRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  // If modal is unmounted entirely, render nothing
  if (!shouldRender) return null;

  const icons = {
    success: <FaCheckCircle className="modal-icon success" />,
    error: <FaExclamationCircle className="modal-icon error" />,
    info: <FaInfoCircle className="modal-icon info" />,
    confirm: <FaQuestionCircle className="modal-icon warning" />
  };

  const defaultTitles = {
    success: t('modal.success') || 'Uğurlu',
    error: t('modal.error') || 'Xəta',
    info: t('modal.info') || 'Məlumat',
    confirm: t('modal.confirm') || 'Təsdiq'
  };

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'open' : 'closing'}`} 
      onAnimationEnd={handleAnimationEnd}
      onClick={onClose}
    >
      <div 
        className={`modal-content ${type}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} title={t('common.close')}><FaTimes /></button>
        <div className="modal-header">
          {icons[type]}
          {title !== ' ' && <h3>{title || defaultTitles[type]}</h3>}
        </div>
        {message && (
          <div className="modal-body">
            <p>{message}</p>
          </div>
        )}
        <div className="modal-footer">
          {type === 'confirm' ? (
            <div style={{ display: 'flex', gap: '15px', width: '100%' }}>
              <button className="btn modal-ok-btn cancel" onClick={onClose} style={{ flex: 1, background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border-color)', boxShadow: 'none' }}>
                {t('common.no') || 'Xeyr'}
              </button>
              <button className="btn modal-ok-btn error" onClick={() => { if(onConfirm) onConfirm(); onClose(); }} style={{ flex: 1 }}>
                {t('common.yes') || 'Bəli'}
              </button>
            </div>
          ) : (
            <button className={`btn modal-ok-btn ${type}`} onClick={onClose}>
              {t('common.ok') || 'OK'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
