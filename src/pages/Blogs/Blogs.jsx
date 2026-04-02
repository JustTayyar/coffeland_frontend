import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BlogService } from '../../services/api';
import Loading from '../../components/Loading/Loading';
import './Blogs.css';

const Blogs = () => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await BlogService.getAllBlogs();
        setAllBlogs(response.data || response || []);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const featuredBlogs = allBlogs.slice(0, 5);
  const [currentFeatured, setCurrentFeatured] = useState(0);

  useEffect(() => {
    if (featuredBlogs.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentFeatured(prev => (prev + 1) % featuredBlogs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredBlogs.length]);

  const totalPages = Math.ceil(allBlogs.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allBlogs.slice(indexOfFirstItem, indexOfLastItem);

  const getLocalizedField = (blog, field) => {
    return blog[`${field}_${i18n.language}`] || blog[`${field}_az`] || '';
  };

  if (loading) {
    return <Loading fullScreen={true} />;
  }

  return (
    <div className="blogs-page">
      <section className="blogs-hero">
        <div className="container">
          <div className="blogs-hero-layout">
            <div className="blogs-hero-text">
              <span className="hero-subtitle">{t('blogs.title')}</span>
              <h1 className="hero-title">{t('blogs.title')}</h1>
              <p className="hero-description">{t('blogs.sub')}</p>
            </div>
            
            <div className="blogs-carousel-container">
              {featuredBlogs.map((blog, idx) => (
                <div 
                  key={blog.id} 
                  className={`featured-blog-card carousel-slide ${idx === currentFeatured ? 'active' : ''}`}
                >
                  <Link to={`/blogs/${blog.id}`} className="featured-card-inner">
                    <div className="featured-badge">{t('blogs.featured') || 'Featured'}</div>
                    <div className="featured-img-wrap">
                      <img src={`/images/${blog.image_name}`} alt={getLocalizedField(blog, 'title')} />
                    </div>
                    <div className="featured-info">
                      <span className="featured-cat">{getLocalizedField(blog, 'category')}</span>
                      <h3>{getLocalizedField(blog, 'title')}</h3>
                      <p>{String(getLocalizedField(blog, 'content')).substring(0, 100)}...</p>
                      <div className="featured-meta">
                        <span><FaCalendarAlt /> {blog.date}</span>
                        <span className="read-more">{t('blogs.read_more')} <FaArrowRight /></span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              
              <div className="carousel-indicators">
                {featuredBlogs.map((_, i) => (
                  <button 
                    key={i} 
                    className={`dot ${i === currentFeatured ? 'active' : ''}`}
                    onClick={() => setCurrentFeatured(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-decorations">
          <div className="floating-bean bean-1"></div>
          <div className="floating-bean bean-2"></div>
          <div className="floating-bean bean-3"></div>
          <div className="floating-bean bean-4"></div>
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
          <div className="bg-pattern"></div>
        </div>
        
        <div className="hero-wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86C282.8,70.39,232.84,87.19,172.43,101,115.11,114.14,57.23,105.74,0,95.8V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      <div className="container">
        <div className="desktop-layout blogs-grid-modern">
          {currentItems.map((blog) => (
            <article key={blog.id} className="blog-item-staggered">
              <Link to={`/blogs/${blog.id}`} className="blog-card-link">
                <div className="blog-img-wrapper">
                  <img src={`/images/${blog.image_name}`} alt={getLocalizedField(blog, 'title')} />
                  <div className="blog-overlay">
                    <div className="blog-overlay-info">
                      <span className="blog-tag">{getLocalizedField(blog, 'category')}</span>
                      <h3>{getLocalizedField(blog, 'title')}</h3>
                      <p>{String(getLocalizedField(blog, 'content')).substring(0, 100)}...</p>
                      <div className="blog-meta-footer">
                        <span><FaCalendarAlt /> {blog.date}</span>
                        <span><FaUser /> {t('blogs.admin')}</span>
                      </div>
                    </div>
                  </div>
                  <span className="blog-category-tag-mobile">{getLocalizedField(blog, 'category')}</span>
                </div>
                <div className="blog-info-mobile">
                  <div className="meta-mobile">
                    <span>{blog.date}</span>
                  </div>
                  <h3>{getLocalizedField(blog, 'title')}</h3>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mobile-layout">
          <div className="news-grid">
            {currentItems.map((blog) => {
            const dateObj = new Date(blog.date);
            const day = dateObj.getDate() || '01';
            let monthStr = '';
            let yearStr = '';
            try {
              monthStr = dateObj.toLocaleString(i18n.language, { month: 'short' });
              yearStr = dateObj.getFullYear();
            } catch(e) {
              monthStr = 'Jan';
              yearStr = '2024';
            }
            return (
              <article key={blog.id} className="news-card">
                  <div className="news-img-wrapper">
                      <img src={`/images/${blog.image_name}`} alt={getLocalizedField(blog, 'title')} className="news-main-img" />
                      <div className="news-img-overlay"></div>
                      <div className="news-date-glass">
                            <span className="news-day">{day}</span>
                            <span className="news-month">{monthStr} {yearStr}</span>
                      </div>
                  </div>
                  <div className="news-content">
                      <span className="news-category">{getLocalizedField(blog, 'category')}</span>
                      <h3 className="news-title">{getLocalizedField(blog, 'title')}</h3>
                      <p className="news-desc">{String(getLocalizedField(blog, 'content')).substring(0, 100)}...</p>
                      <Link to={`/blogs/${blog.id}`} className="news-read-more">
                          <span className="read-more-text">{t('blogs.read_more')}</span>
                          <div className="read-more-icon"><FaArrowRight /></div>
                      </Link>
                  </div>
              </article>
            );
          })}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <button 
              className="pagination-btn" 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft /> {t('blogs.pagination_prev')}
            </button>
            
            <div className="pagination-numbers">
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i + 1} 
                  className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              className="pagination-btn" 
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {t('blogs.pagination_next')} <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
