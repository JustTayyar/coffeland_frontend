import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCoffee, FaHome, FaArrowLeft } from 'react-icons/fa';
import './Error.css';

const Error = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-glass">
        <div className="error-icon-wrapper">
          <FaCoffee className="coffee-icon" />
          <div className="spilled-coffee"></div>
        </div>
        
        <h1 className="error-code">404</h1>
        <h2 className="error-title">{t('error.title')}</h2>
        <p className="error-text">
          {t('error.sub')}
        </p>
        
        <div className="error-actions">
          <Link to="/" className="error-btn primary">
            <FaHome />
            {t('error.btn')}
          </Link>
          <button onClick={() => navigate(-1)} className="error-btn secondary">
            <FaArrowLeft />
            {t('error.back')}
          </button>
        </div>
      </div>
      
      {/* Dynamic Background Elements */}
      <div className="coffee-beans-bg">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`bean bean-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Error;
