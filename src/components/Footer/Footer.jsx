import { Link } from 'react-router-dom';
import { FaMugHot, FaInstagram, FaFacebookF, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer modern-footer">
      <div className="container">
          <div className="footer-grid">
              
              {/* Column 1: Brand & Social */}
              <div className="footer-col footer-brand-col">
                  <Link to="/" className="footer-logo">
                      <img src="/logo/circilelogo.png" alt="COFFEELAND Logo" className="footer-logo-img" />
                  </Link>
                  <p className="footer-desc">{t('footer.desc')}</p>
                  <div className="social-links">
                      <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
                      <a href="#" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
                      <a href="#" className="social-icon" aria-label="X (Twitter)"><FaXTwitter /></a>
                  </div>
              </div>

              {/* Column 2: Quick Links */}
              <div className="footer-col footer-links-col">
                  <h4 className="footer-title">{t('footer.links_title')}</h4>
                  <ul className="footer-links">
                      <li><Link to="/">{t('nav.home')}</Link></li>
                      <li><Link to="/menu">{t('nav.menu')}</Link></li>
                      <li><Link to="/about">{t('nav.about')}</Link></li>
                      <li><Link to="/orders">{t('nav.orders')}</Link></li>
                      <li><Link to="/favorites">{t('nav.favorites')}</Link></li>
                  </ul>
              </div>

              {/* Column 3: Contact Info */}
              <div className="footer-col footer-contact-col">
                  <h4 className="footer-title">{t('footer.contact_title')}</h4>
                  <ul className="contact-info">
                      <li>
                          <FaMapMarkerAlt className="contact-icon" />
                          <span dangerouslySetInnerHTML={{__html: t('footer.address')}}></span>
                      </li>
                      <li>
                          <FaPhoneAlt className="contact-icon" />
                          <span>+994 12 345 67 89</span>
                      </li>
                      <li>
                          <FaEnvelope className="contact-icon" />
                          <span>hello@coffeeland.az</span>
                      </li>
                  </ul>
              </div>

              {/* Column 4: Opening Hours */}
              <div className="footer-col footer-hours-col">
                  <h4 className="footer-title">{t('footer.hours_title')}</h4>
                  <div className="opening-hours">
                      <ul className="hours-list">
                          <li><span>{t('footer.mon_fri')}:</span> <span>{t('footer.mon_fri_hours')}</span></li>
                          <li><span>{t('footer.sat')}:</span> <span>{t('footer.sat_hours')}</span></li>
                          <li><span>{t('footer.sun')}:</span> <span>{t('footer.sun_hours')}</span></li>
                      </ul>
                  </div>
              </div>

          </div>

          <div className="footer-bottom">
              <p className="copyright">&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
              <div className="footer-bottom-links">
                  <Link to="/privacy">{t('footer.privacy')}</Link>
                  <Link to="/terms">{t('footer.terms')}</Link>
              </div>
          </div>
      </div>
    </footer>
  );
}
