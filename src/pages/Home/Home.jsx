import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaSeedling, FaFire, FaMugHot, FaCheckCircle, FaQuoteLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../context/ModalContext';
import HomeCard from '../../components/HomeCard/HomeCard';
import './Home.css';

export default function Home() {
  const { t, i18n } = useTranslation();
  const { showModal } = useModal();
  const [currentSlide, setCurrentSlide] = useState(0);  const currentLang = i18n.language || 'az';

  const slides = [
    {
        bg: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        subtitle: t('home.hero.s1.sub'),
        title: t('home.hero.s1.title'),
        text: t('home.hero.s1.text'),
        btnLink: "/menu",
        btnText: t('home.hero.s1.btn')
    },
    {
        bg: "url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        subtitle: t('home.hero.s2.sub'),
        title: t('home.hero.s2.title'),
        text: t('home.hero.s2.text'),
        btnLink: "/menu",
        btnText: t('home.hero.s2.btn'),
        outline: true
    },
    {
        bg: "url('https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        subtitle: t('home.hero.s3.sub'),
        title: t('home.hero.s3.title'),
        text: t('home.hero.s3.text'),
        btnLink: "/about",
        btnText: t('home.hero.s3.btn')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      <section id="home" className="hero-carousel">
          <div className="carousel-container">
              {slides.map((slide, index) => (
                  <div key={index} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`} style={{ backgroundImage: slide.bg }}>
                      <div className="carousel-overlay"></div>
                      <div className="carousel-content">
                          <span className="subtitle" style={{ color: 'var(--accent)' }}>{slide.subtitle}</span>
                          <h1>{slide.title}</h1>
                          <p>{slide.text}</p>
                          <Link to={slide.btnLink} className={`btn ${slide.outline ? 'btn-outline' : ''}`} style={slide.outline ? { background: 'transparent', border: '2px solid #fff', color: '#fff' } : {}}>
                              {slide.btnText} {slide.outline ? '' : <FaArrowRight style={{ marginLeft: '10px' }} />}
                          </Link>
                      </div>
                  </div>
              ))}
          </div>
          
          <button className="carousel-control prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}><FaChevronLeft /></button>
          <button className="carousel-control next" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}><FaChevronRight /></button>
          
          <div className="carousel-indicators">
              {slides.map((_, i) => (
                  <span key={i} className={`indicator ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)}></span>
              ))}
          </div>
      </section>

      <section className="section modern-features-section">
          <div className="container">
              <div className="section-header">
                  <h2>{t('home.features.title')}</h2> <br />
                  <span className="subtitle">{t('home.features.sub')}</span>
              </div>
              
              <div className="features-grid">
                  <div className="feature-card">
                      <div className="feature-icon-wrapper">
                          <div className="feature-icon"><FaSeedling /></div>
                          <div className="icon-glow"></div>
                      </div>
                      <h3 className="feature-title">{t('home.features.f1.title')}</h3>
                      <p className="feature-desc">{t('home.features.f1.desc')}</p>
                      <div className="feature-hover-line"></div>
                  </div>
                  <div className="feature-card">
                      <div className="feature-icon-wrapper">
                          <div className="feature-icon"><FaFire /></div>
                          <div className="icon-glow"></div>
                      </div>
                      <h3 className="feature-title">{t('home.features.f2.title')}</h3>
                      <p className="feature-desc">{t('home.features.f2.desc')}</p>
                      <div className="feature-hover-line"></div>
                  </div>
                  <div className="feature-card">
                      <div className="feature-icon-wrapper">
                          <div className="feature-icon"><FaMugHot /></div>
                          <div className="icon-glow"></div>
                      </div>
                      <h3 className="feature-title">{t('home.features.f3.title')}</h3>
                      <p className="feature-desc">{t('home.features.f3.desc')}</p>
                      <div className="feature-hover-line"></div>
                  </div>
              </div>
          </div>
      </section>

      <section className="section modern-about-section" style={{ backgroundColor: 'var(--bg-section)', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative floating elements */}
          <div className="about-decor about-decor-1"></div>
          <div className="about-decor about-decor-2"></div>
          <div className="about-decor about-decor-3"></div>
          
          <div className="container relative">
              <div className="split-layout">
                  <div className="split-image-container">
                      <div className="image-gallery">
                          <div className="image-wrapper main-image-wrapper">
                              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Coffee Shop" className="main-img" />
                              <div className="image-shine"></div>
                          </div>
                          <div className="image-wrapper secondary-image-wrapper">
                              <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Coffee Beans" className="secondary-img" />
                              <div className="image-shine"></div>
                          </div>
                          <div className="experience-badge">
                              <div className="badge-glow"></div>
                              <span className="badge-number">{t('home.about.exp1')}</span>
                              <span className="badge-text" dangerouslySetInnerHTML={{__html: t('home.about.exp2')}}></span>
                          </div>
                      </div>
                      
                      {/* Stats strip */}
                      <div className="about-stats-strip">
                          <div className="about-stat">
                              <span className="stat-number">50+</span>
                              <span className="stat-label">{t('home.about.stat1') || 'Qəhvə Çeşidi'}</span>
                          </div>
                          <div className="stat-divider"></div>
                          <div className="about-stat">
                              <span className="stat-number">10K+</span>
                              <span className="stat-label">{t('home.about.stat2') || 'Müştəri'}</span>
                          </div>
                          <div className="stat-divider"></div>
                          <div className="about-stat">
                              <span className="stat-number">5</span>
                              <span className="stat-label">{t('home.about.stat3') || 'Filial'}</span>
                          </div>
                      </div>
                  </div>
                  
                  <div className="split-content">
                      <div className="about-accent-bar"></div>
                      <span className="subtitle">{t('home.about.subtitle')}</span>
                      <h2 className="split-title">{t('home.about.title')}</h2>
                      <p className="split-desc">{t('home.about.desc')}</p>
                      
                      <div className="about-features">
                          <div className="about-feature">
                              <div className="feature-check-icon"><FaCheckCircle /></div>
                              <span>{t('home.about.l1')}</span>
                          </div>
                          <div className="about-feature">
                              <div className="feature-check-icon"><FaCheckCircle /></div>
                              <span>{t('home.about.l2')}</span>
                          </div>
                          <div className="about-feature">
                              <div className="feature-check-icon"><FaCheckCircle /></div>
                              <span>{t('home.about.l3')}</span>
                          </div>
                      </div>
                      
                      <Link to="/about" className="btn btn-lg about-cta-btn" style={{ marginTop: '20px' }}>{t('home.about.btn')} <FaArrowRight style={{ marginLeft: '8px' }} /></Link>
                  </div>
              </div>
          </div>
      </section>

      <section className="section process-section">
          <div className="container">
              <div className="section-header">
                  <h2>{t('home.process.title')}</h2><br />
                  <span className="subtitle">{t('home.process.sub')}</span>
              </div>
              
              <div className="process-steps-container">
                  <div className="process-connector"></div>
                  <div className="process-steps">
                      <div className="step-card">
                          <div className="step-number-glass">
                              <span className="number-text">01</span>
                              <div className="step-glow"></div>
                          </div>
                          <div className="step-content">
                              <h3 className="step-title">{t('home.process.s1.title')}</h3>
                              <p className="step-desc">{t('home.process.s1.desc')}</p>
                          </div>
                      </div>
                      <div className="step-card">
                          <div className="step-number-glass">
                              <span className="number-text">02</span>
                              <div className="step-glow"></div>
                          </div>
                          <div className="step-content">
                              <h3 className="step-title">{t('home.process.s2.title')}</h3>
                              <p className="step-desc">{t('home.process.s2.desc')}</p>
                          </div>
                      </div>
                      <div className="step-card">
                          <div className="step-number-glass">
                              <span className="number-text">03</span>
                              <div className="step-glow"></div>
                          </div>
                          <div className="step-content">
                              <h3 className="step-title">{t('home.process.s3.title')}</h3>
                              <p className="step-desc">{t('home.process.s3.desc')}</p>
                          </div>
                      </div>
                      <div className="step-card">
                          <div className="step-number-glass">
                              <span className="number-text">04</span>
                              <div className="step-glow"></div>
                          </div>
                          <div className="step-content">
                              <h3 className="step-title">{t('home.process.s4.title')}</h3>
                              <p className="step-desc">{t('home.process.s4.desc')}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="quote-section" style={{ background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover fixed" }}>
          <div className="container">
              <div className="quote-content">
                  <FaQuoteLeft className="quote-icon" />
                  <blockquote>"{t('home.quote.text')}"</blockquote>
                  <div className="quote-author">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Chief Barista" />
                      <div className="author-info">
                          <h4>David Miller</h4>
                          <p>{t('home.quote.role')}</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="section news-section" style={{ backgroundColor: 'var(--bg-body)' }}>
          <div className="container">
              <div className="section-header">
                  <h2>{t('home.news.title')}</h2>
                  <span className="subtitle">{t('home.news.sub')}</span>
              </div>
              
              <div className="news-grid2">
                  <HomeCard 
                      image="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      day={t('home.news.b1.day')}
                      month={t('home.news.b1.month')}
                      category={t('home.news.b1.category')}
                      title={t('home.news.b1.title')}
                      desc={t('home.news.b1.desc')}
                      link="/blogs/1"
                      readMoreText={t('home.news.read')}
                  />
                  <HomeCard 
                      image="https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      day={t('home.news.b2.day')}
                      month={t('home.news.b2.month')}
                      category={t('home.news.b2.category')}
                      title={t('home.news.b2.title')}
                      desc={t('home.news.b2.desc')}
                      link="/blogs/2"
                      readMoreText={t('home.news.read')}
                  />
                  <HomeCard 
                      image="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      day={t('home.news.b3.day')}
                      month={t('home.news.b3.month')}
                      category={t('home.news.b3.category')}
                      title={t('home.news.b3.title')}
                      desc={t('home.news.b3.desc')}
                      link="/blogs/3"
                      readMoreText={t('home.news.read')}
                  />
              </div>
          </div>
      </section>

      <section className="newsletter-section">
          <div className="container">
              <div className="newsletter-glass-panel">
                  
                  {/* Decorative Elements */}
                  <div className="newsletter-decor-blob blob-1"></div>
                  <div className="newsletter-decor-blob blob-2"></div>
                  
                  <div className="newsletter-layout">
                      <div className="newsletter-content">
                          <div className="newsletter-badge">COFFEELAND CLUB</div>
                          <h2>{t('home.newsletter.title')}</h2>
                          <p>{t('home.newsletter.desc')}</p>
                      </div>
                      
                      <div className="newsletter-form-wrapper">
                        <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); showModal(t('home.newsletter.alert'), 'success'); }}>
                            <div className="input-wrapper-glass">
                                <i className="envelope-icon"><img src="/logo/circilelogo.png" alt="CoffeeLand Logo" style={{ width: '40px', height: '40px' }} /></i>
                                <input type="email" placeholder={t('home.newsletter.plc')} required />
                                <button type="submit" className="newsletter-submit-btn">
                                    <span>{t('home.newsletter.btn')}</span>
                                    <FaArrowRight className="submit-arrow" />
                                </button>
                            </div>
                        </form>
                      </div>
                  </div>

              </div>
          </div>
      </section>
    </>
  );
}

