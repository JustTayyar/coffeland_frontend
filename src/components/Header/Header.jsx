import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMugHot, FaSun, FaMoon, FaShoppingBag, FaUser, FaSignOutAlt, FaBox, FaHeart, FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import MobileNav from '../MobileNav/MobileNav';
import './Header.css';

export default function Header() {
  const { cart, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);
  
  const currentLang = i18n.language?.split('-')[0] || 'az';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isMenuPage = location.pathname === '/menu';

  // Auto-close mobile nav when screen becomes desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileNavOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const toggleMobileNav = () => setIsMobileNavOpen(prev => !prev);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <>
      <header className="header">
        <div className="container header-container">
          <Link to="/" className="logo">
            <img src="/logo/circilelogo.png" alt="COFFEELAND Logo" className="logo-img" />
          </Link>
          
          <nav className="nav desktop-nav">
            <ul className="nav-list" style={{ gap: '30px' }}>
              <li><Link to="/" className={`nav-link ${isActive('/')}`}>{t('nav.home')}</Link></li>
              <li><Link to="/menu" className={`nav-link ${isActive('/menu')}`}>{t('nav.menu')}</Link></li>
              {user && (<li><Link to="/favorites" className={`nav-link ${isActive('/favorites')}`}>{t('nav.favorites')}</Link></li>)}
              {user && (<li><Link to="/orders" className={`nav-link ${isActive('/orders')}`}>{t('nav.orders')}</Link></li>)}
              <li><Link to="/about" className={`nav-link ${isActive('/about')}`}>{t('nav.about')}</Link></li>
              <li><Link to="/blogs" className={`nav-link ${isActive('/blogs')}`}>{t('nav.blogs')}</Link></li>
              <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`}>{t('nav.contact')}</Link></li>
            </ul>
          </nav>
          
          <div className="header-actions">
            
            {/* Language Selector */}
            <div className="lang-wrapper" ref={langRef}>
              <button className={`icon-btn lang-btn ${isLangOpen ? 'active' : ''}`} onClick={() => setIsLangOpen(!isLangOpen)}>
                <span>{currentLang.toUpperCase()}</span>
                <FaChevronDown className="lang-chevron" />
              </button>
              
              {isLangOpen && (
                <div className="lang-dropdown">
                  <button className={`lang-item ${currentLang === 'az' ? 'active' : ''}`} onClick={() => changeLanguage('az')}>
                    Azərbaycanca
                  </button>
                  <button className={`lang-item ${currentLang === 'en' ? 'active' : ''}`} onClick={() => changeLanguage('en')}>
                    English
                  </button>
                  <button className={`lang-item ${currentLang === 'ru' ? 'active' : ''}`} onClick={() => changeLanguage('ru')}>
                    Русский
                  </button>
                </div>
              )}
            </div>

            <button className="icon-btn btnGroup" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button
              className={`icon-btn btnGroup ${isMenuPage ? ' menu-page-cart' : ''}`}
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <FaShoppingBag />
              <span className="badge">{cartCount}</span>
            </button>
            {user ? (
              <div className="profile-wrapper" ref={profileRef}>
                <button className="profile-btn" onClick={() => setIsProfileOpen(prev => !prev)}>
                  <span className="profile-avatar"><FaUser size={16} /></span>
                </button>
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-header">
                      <span className="profile-avatar-lg"><FaUser size={20} /></span>
                      <div>
                        <p className="profile-name">{user.name}</p>
                        <p className="profile-email">{user.email}</p>
                      </div>
                    </div>
                    <div className="profile-dropdown-divider" />
                    <Link to="/profile" className="profile-dropdown-item" onClick={() => setIsProfileOpen(false)}>
                      <FaUser /> Şəxsi Kabinet
                    </Link>
                    <div className="profile-dropdown-divider" />
                    <button className="profile-dropdown-item logout-item" onClick={handleLogout}>
                      <FaSignOutAlt /> {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn header-login-btn">Daxil Ol</Link>
            )}

            <div className={`hamburger ${isMobileNavOpen ? 'active' : ''}`} onClick={toggleMobileNav}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isMobileNavOpen} closeNav={() => setIsMobileNavOpen(false)} isActive={isActive} />
    </>
  );
}
