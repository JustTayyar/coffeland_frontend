import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaUser, FaChevronLeft, FaFacebookF, FaInstagram, FaQuoteRight } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { BlogService } from '../../services/api';
import Loading from '../../components/Loading/Loading';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogData, allData] = await Promise.all([
          BlogService.getBlogById(id),
          BlogService.getAllBlogs()
        ]);
        setBlog(blogData.data || blogData);
        setAllBlogs(allData.data || allData || []);
      } catch (error) {
        console.error("Failed to fetch blog detail", error);
        navigate('/blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const getLocalizedField = (item, field) => {
    if (!item) return '';
    
    // Əgər API-dən gələn datada xüsusi field varsa (məs. title_en)
    if (item[`${field}_${i18n.language}`]) {
        return item[`${field}_${i18n.language}`];
    }
    
    // Əks halda tərcümə fayllarından (JSON) statik oxumağa cəhd et, əgər ID-si 1, 2, və ya 3-dürsə
    if (item.id === 1 || item.id === '1') {
      const trans = t(`blogs.b1.${field === 'category' ? 'cat' : field}`);
      if (trans && !trans.includes('blogs.b1')) return trans;
    }
    if (item.id === 2 || item.id === '2') {
      const trans = t(`blogs.b2.${field === 'category' ? 'cat' : field}`);
      if (trans && !trans.includes('blogs.b2')) return trans;
    }
    if (item.id === 3 || item.id === '3') {
      const trans = t(`blogs.b3.${field === 'category' ? 'cat' : field}`);
      if (trans && !trans.includes('blogs.b3')) return trans;
    }
    
    // Geri dönüş (Fallback)
    return item[`${field}_az`] || item[field] || '';
  };

  if (loading) return <Loading fullScreen={true} />;
  if (!blog) return null;

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/images/${blog.image_name})` }}>
        <div className="container">
          <Link to="/blogs" className="back-link">
            <FaChevronLeft /> {t('blogs.pagination_prev')}
          </Link>
          <div className="hero-content">
            <span className="blog-category">{getLocalizedField(blog, 'category')}</span>
            <h1>{getLocalizedField(blog, 'title')}</h1>
            <div className="detail-meta">
              <span><FaCalendarAlt /> {blog.date}</span>
              <span><FaUser /> {t('blogs.admin') || 'Admin'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="blog-content-layout">
          {/* Main Content */}
          <article className="main-blog-content">
            <p className="lead-text">{getLocalizedField(blog, 'content').substring(0, 150)}</p>
            <div className="content-body">
              {getLocalizedField(blog, 'content')}
              <div className="quote-block">
                <FaQuoteRight className="quote-mark" />
                <p>{t('blogs.quote') || 'Qəhvə bir ləzzətdir, COFFEELAND isə bu ləzzətin ən doğru ünvanıdır.'}</p>
              </div>
              <p>{t('blogs.extra_text') || 'Əlavə olaraq qeyd edək ki, qəhvənin dadı həm də sizin onu hansı mühitdə və kiminlə içməyinizdən asılıdır. Biz hər zaman sizin üçün ən xoş atmosferi yaratmağa çalışırıq.'}</p>
            </div>

            <div className="blog-share-tools">
              <span>{t('blogs.share') || 'Paylaş'}:</span>
              <div className="share-links">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaXTwitter /></a>
                <a href="#"><FaInstagram /></a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            <div className="sidebar-widget">
              <h4>{t('blogs.recent_posts')}</h4>
              <div className="recent-posts">
                {allBlogs.filter(item => item.id.toString() !== id).slice(0, 4).map(item => (
                  <Link key={item.id} to={`/blogs/${item.id}`} className="recent-post-item">
                    <img src={`/images/${item.image_name}`} alt={getLocalizedField(item, 'title')} />
                    <div className="item-info">
                      <h6>{getLocalizedField(item, 'title')}</h6>
                      <span>{item.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-widget promo-widget">
              <div className="promo-card">
                <h3>{t('blogs.promo_title') || 'Yeni Menyunu Kəşf Edin!'}</h3>
                <p>{t('blogs.promo_desc') || 'Ən təzə qəhvə dənələri və ləzzətli desertlər sizi gözləyir.'}</p>
                <Link to="/menu" className="btn btn-sm">{t('blogs.promo_btn') || 'Menyuya Bax'}</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
