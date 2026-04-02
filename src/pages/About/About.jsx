import { FaLeaf, FaGem, FaUsers, FaInstagram, FaLinkedinIn, FaFireAlt, FaMugHot, FaHeart } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import './About.css';

export default function About() {
  const { t, i18n } = useTranslation();  const currentLang = i18n.language || 'az';

  return (
    <>
      <section className="about-page-hero">
          <div className="container">
              <div className="hero-content">
                  <span className="hero-badge">{t('nav.about')}</span>
                  <h1>{t('about.hero.title')}</h1>
                  <p>{t('about.hero.sub')}</p>
              </div>
          </div>
      </section>

      <section className="section ultra-story-section">
          <div className="container">
              <div className="ultra-story-layout">
                  <div className="ultra-story-image-side">
                      <div className="image-primary-wrap">
                          <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Barista" className="ultra-primary-img" />
                          <div className="ultra-experience-badge">
                              <div className="badge-ring">
                                  <svg viewBox="0 0 100 100" className="badge-text-svg">
                                      <path id="curve" fill="transparent" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                                      <text><textPath href="#curve" startOffset="0%">★ {t('about.story.badge2')} ★ {t('about.story.badge2')}</textPath></text>
                                  </svg>
                                  <div className="badge-center-text">
                                      <span>{t('about.story.badge1')}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="ultra-story-decoration-box"></div>
                  </div>

                  <div className="ultra-story-text-side">
                      <div className="ultra-section-header">
                          <span className="ultra-subtitle">{t('about.story.sub')}</span>
                          <h2 className="ultra-title">{t('about.story.title')}</h2>
                      </div>
                      <div className="ultra-story-paragraphs">
                          <p className="lead-paragraph">{t('about.story.p1')}</p>
                          <p className="secondary-paragraph">{t('about.story.p2')}</p>
                      </div>
                      
                      <div className="ultra-stats-container">
                          <div className="ultra-stat-item">
                              <span className="stat-number">5k<span className="stat-plus">+</span></span>
                              <span className="stat-label">{t('about.story.stat1')}</span>
                          </div>
                          <div className="ultra-stat-divider"></div>
                          <div className="ultra-stat-item">
                              <span className="stat-number">50<span className="stat-plus">+</span></span>
                              <span className="stat-label">{t('about.story.stat2')}</span>
                          </div>
                          <div className="ultra-stat-divider"></div>
                          <div className="ultra-stat-item">
                              <span className="stat-number">100<span className="stat-plus">%</span></span>
                              <span className="stat-label">{t('about.story.stat3')}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="section modern-journey-section">
          <div className="container">
              <div className="section-header">
                  <h2>{t('about.journey.title')}</h2><br />
                  <span className="subtitle">{t('about.journey.sub')}</span>
              </div>
              <div className="journey-steps-grid">
                  <div className="journey-step-card">
                      <div className="step-number">01</div>
                      <div className="step-icon-box"><FaLeaf /></div>
                      <h3>{t('about.journey.s1.title')}</h3>
                      <p>{t('about.journey.s1.desc')}</p>
                  </div>
                  <div className="journey-step-card">
                      <div className="step-number">02</div>
                      <div className="step-icon-box"><FaFireAlt /></div>
                      <h3>{t('about.journey.s2.title')}</h3>
                      <p>{t('about.journey.s2.desc')}</p>
                  </div>
                  <div className="journey-step-card">
                      <div className="step-number">03</div>
                      <div className="step-icon-box"><FaMugHot /></div>
                      <h3>{t('about.journey.s3.title')}</h3>
                      <p>{t('about.journey.s3.desc')}</p>
                  </div>
                  <div className="journey-step-card">
                      <div className="step-number">04</div>
                      <div className="step-icon-box"><FaHeart /></div>
                      <h3>{t('about.journey.s4.title')}</h3>
                      <p>{t('about.journey.s4.desc')}</p>
                  </div>
              </div>
          </div>
      </section>

      <section className="section premium-values-section">
          <div className="container">
              <div className="section-header">
                  <h2>{t('about.values.title')}</h2>
                  <p>{t('about.values.sub')}</p>
              </div>
              <div className="premium-values-grid">
                  <div className="premium-value-card">
                      <div className="premium-icon-wrap">
                          <FaLeaf />
                      </div>
                      <h3>{t('about.values.v1.title')}</h3>
                      <p>{t('about.values.v1.desc')}</p>
                  </div>
                  <div className="premium-value-card">
                      <div className="premium-icon-wrap">
                          <FaGem />
                      </div>
                      <h3>{t('about.values.v2.title')}</h3>
                      <p>{t('about.values.v2.desc')}</p>
                  </div>
                  <div className="premium-value-card">
                      <div className="premium-icon-wrap">
                          <FaUsers />
                      </div>
                      <h3>{t('about.values.v3.title')}</h3>
                      <p>{t('about.values.v3.desc')}</p>
                  </div>
              </div>
          </div>
      </section>
      
      <section className="section modern-team-section">
          <div className="container">
              <div className="section-header">
                  <h2>{t('about.team.title')}</h2>
                  <p>{t('about.team.sub')}</p>
              </div>
              <div className="team-modern-grid">
                  <div className="team-modern-card">
                      <div className="team-img-wrapper">
                          <img src="https://images.unsplash.com/photo-1583335821967-5c58043734e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Elçin Əliyev" />
                          <div className="team-socials">
                              <a href="#"><FaInstagram /></a>
                              <a href="#"><FaXTwitter /></a>
                          </div>
                      </div>
                      <div className="team-info">
                          <h3>Elçin Əliyev</h3>
                          <p className="team-role">{t('about.team.role1')}</p>
                          <p className="team-desc">{t('about.team.desc1')}</p>
                      </div>
                  </div>

                  <div className="team-modern-card">
                      <div className="team-img-wrapper">
                          <img src="https://images.unsplash.com/photo-1581579911298-f682894b9015?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Aysel Məmmədova" />
                          <div className="team-socials">
                              <a href="#"><FaLinkedinIn /></a>
                              <a href="#"><FaInstagram /></a>
                          </div>
                      </div>
                      <div className="team-info">
                          <h3>Aysel Məmmədova</h3>
                          <p className="team-role">{t('about.team.role2')}</p>
                          <p className="team-desc">{t('about.team.desc2')}</p>
                      </div>
                  </div>

                  <div className="team-modern-card">
                      <div className="team-img-wrapper">
                          <img src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Rəşad Həsənov" />
                          <div className="team-socials">
                              <a href="#"><FaXTwitter /></a>
                              <a href="#"><FaInstagram /></a>
                          </div>
                      </div>
                      <div className="team-info">
                          <h3>Rəşad Həsənov</h3>
                          <p className="team-role">{t('about.team.role3')}</p>
                          <p className="team-desc">{t('about.team.desc3')}</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </>
  );}