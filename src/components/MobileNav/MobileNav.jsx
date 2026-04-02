import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function MobileNav({ isOpen, closeNav, isActive }) {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  
  const currentLang = i18n.language?.split('-')[0] || 'az';

  const handleLogout = () => {
    logout();
    closeNav();
  };

  return (
    <nav className={`mobile-nav ${isOpen ? 'active' : ''}`}>
      <ul className="nav-list">
        <li><Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeNav}>{t('nav.home')}</Link></li>
        <li><Link to="/menu" className={`nav-link ${isActive('/menu')}`} onClick={closeNav}>{t('nav.menu')}</Link></li>
        {user && (<li><Link to="/favorites" className={`nav-link ${isActive('/favorites')}`} onClick={closeNav}>{t('nav.favorites')}</Link></li>)}
        {user && (<li><Link to="/orders" className={`nav-link ${isActive('/orders')}`} onClick={closeNav}>{t('nav.orders')}</Link></li>)}
        <li><Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={closeNav}>{t('nav.about')}</Link></li>
        <li><Link to="/blogs" className={`nav-link ${isActive('/blogs')}`} onClick={closeNav}>{t('nav.blogs')}</Link></li>
        <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={closeNav}>{t('nav.contact')}</Link></li>
      </ul>
      <div className="mobile-lang-selector" style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '15px' }}>
        <button onClick={() => { i18n.changeLanguage('az'); closeNav(); }} style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid var(--border-color)', background: currentLang === 'az' ? 'var(--primary)' : 'transparent', color: currentLang === 'az' ? '#fff' : 'var(--text-main)', fontWeight: 600 }}>AZ</button>
        <button onClick={() => { i18n.changeLanguage('en'); closeNav(); }} style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid var(--border-color)', background: currentLang === 'en' ? 'var(--primary)' : 'transparent', color: currentLang === 'en' ? '#fff' : 'var(--text-main)', fontWeight: 600 }}>EN</button>
        <button onClick={() => { i18n.changeLanguage('ru'); closeNav(); }} style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid var(--border-color)', background: currentLang === 'ru' ? 'var(--primary)' : 'transparent', color: currentLang === 'ru' ? '#fff' : 'var(--text-main)', fontWeight: 600 }}>RU</button>
      </div>
      {user ? (
        <button className="nav-login-btn nav-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> {t('nav.logout')}
        </button>
      ) : (
        <Link to="/login" className="nav-login-btn" onClick={closeNav}>{t('nav.login')}</Link>
      )}

      {/* Mobile Language Selector */}
    </nav>
  );
}
