import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CartSidebar from '../components/CartSidebar/CartSidebar';

export default function BlogLayout() {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const path = location.pathname;
    let pageTitle = `${t('nav.blogs')} | COFFEELAND`;

    if (path.match(/^\/blogs\/\d+/)) {
      pageTitle = `${t('nav.blog_detail') || 'Blog'} | COFFEELAND`;
    }

    document.title = pageTitle;
  }, [location.pathname, t]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}
