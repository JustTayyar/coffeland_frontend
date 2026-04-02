import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CartSidebar from '../components/CartSidebar/CartSidebar';

export default function Layout() {
  const location = useLocation();
  const { t } = useTranslation();
  
  const isMenuPage = location.pathname === '/menu';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password';
  const hideLayoutFragments = isAuthPage || location.state?.fromAuth;

  useEffect(() => {
    const path = location.pathname;
    let pageTitle = 'COFFEELAND';

    if (path.startsWith('/menu')) pageTitle = `${t('nav.menu')} | COFFEELAND`;
    else if (path.startsWith('/favorites')) pageTitle = `${t('nav.favorites')} | COFFEELAND`;
    else if (path.startsWith('/orders')) pageTitle = `${t('nav.orders')} | COFFEELAND`;
    else if (path.startsWith('/about')) pageTitle = `${t('nav.about')} | COFFEELAND`;
    else if (path.startsWith('/contact')) pageTitle = `${t('nav.contact')} | COFFEELAND`;
    else if (path.startsWith('/login')) pageTitle = `${t('nav.login')} | COFFEELAND`;
    else if (path.startsWith('/register')) pageTitle = `${t('auth.register_title') || 'Qeydiyyat'} | COFFEELAND`;
    else if (path.startsWith('/profile')) pageTitle = `${t('profile.tab_info') || 'Profil'} | COFFEELAND`;

    document.title = pageTitle;
  }, [location.pathname, t]);

  return (
    <>
      {!hideLayoutFragments && <Header />}
      <main>
        <Outlet />
      </main>
      {!hideLayoutFragments && <Footer />}
      {!isMenuPage && !hideLayoutFragments && <CartSidebar />}
    </>
  );
}
