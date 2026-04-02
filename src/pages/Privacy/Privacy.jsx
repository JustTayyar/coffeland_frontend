import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaShieldAlt, FaCalendarAlt, FaChevronLeft, FaListUl } from 'react-icons/fa';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../Terms/Terms.css'; // Use shared styles

const Privacy = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('s1');

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const handleScroll = () => {
            const sections = ['s1', 's2', 's3', 's4', 's5'];
            const scrollPos = window.scrollY + 150;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element && element.offsetTop <= scrollPos && (element.offsetTop + element.offsetHeight) > scrollPos) {
                    setActiveSection(sectionId);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="legal-document-page" style={{ paddingTop: location.state?.fromAuth ? '40px' : '120px' }}>
            <div className="container">
                {location.state?.fromAuth && (
                    <a 
                        href="/register" 
                        className="auth-fallback-back-btn"
                        style={{ position: 'relative', zIndex: 1000, display: 'inline-flex', background: 'none', border: 'none', color: 'var(--primary)', fontSize: '1.05rem', cursor: 'pointer', alignItems: 'center', gap: '8px', fontWeight: 'bold', marginBottom: '20px', padding: '0', textDecoration: 'none' }}
                    >
                        <FaChevronLeft /> Qeydiyyat Səhifəsinə Qayıt
                    </a>
                )}
                <div className="document-main-grid">
                    {/* Sidebar / TOC */}
                    <aside className="document-sidebar">
                        <h4 className="toc-title"><FaListUl style={{marginRight: '8px'}}/> {t('footer.quick_links')}</h4>
                        <nav className="toc-list">
                            <button onClick={() => scrollTo('s1')} className={`toc-item ${activeSection === 's1' ? 'active' : ''}`}>{t('privacy.s1_title')}</button>
                            <button onClick={() => scrollTo('s2')} className={`toc-item ${activeSection === 's2' ? 'active' : ''}`}>{t('privacy.s2_title')}</button>
                            <button onClick={() => scrollTo('s3')} className={`toc-item ${activeSection === 's3' ? 'active' : ''}`}>{t('privacy.s3_title')}</button>
                            <button onClick={() => scrollTo('s4')} className={`toc-item ${activeSection === 's4' ? 'active' : ''}`}>{t('privacy.s4_title')}</button>
                            <button onClick={() => scrollTo('s5')} className={`toc-item ${activeSection === 's5' ? 'active' : ''}`}>{t('privacy.s5_title')}</button>
                        </nav>
                    </aside>

                    {/* Main Content Card */}
                    <div className="document-card">
                        <header className="document-header">
                            <div className="badge-update">
                                <FaCalendarAlt /> <span>{t('privacy.last_updated')}</span>
                            </div>
                            <h1>{t('privacy.title')}</h1>
                        </header>

                        <div className="document-body">
                            <div className="intro-block">
                                <p>{t('privacy.intro')}</p>
                            </div>

                            <article className="document-content">
                                <section id="s1" className="document-section">
                                    <h3>{t('privacy.s1_title')}</h3>
                                    <p>{t('privacy.s1_text')}</p>
                                </section>

                                <section id="s2" className="document-section">
                                    <h3>{t('privacy.s2_title')}</h3>
                                    <p>{t('privacy.s2_text')}</p>
                                </section>

                                <section id="s3" className="document-section">
                                    <h3>{t('privacy.s3_title')}</h3>
                                    <p>{t('privacy.s3_text')}</p>
                                </section>

                                <section id="s4" className="document-section">
                                    <h3>{t('privacy.s4_title')}</h3>
                                    <p>{t('privacy.s4_text')}</p>
                                </section>

                                <section id="s5" className="document-section">
                                    <h3>{t('privacy.s5_title')}</h3>
                                    <p>{t('privacy.s5_text')}</p>
                                </section>
                            </article>
                        </div>

                        <footer className="document-footer">
                            <p>&copy; {new Date().getFullYear()} COFFEELAND. {t('footer.rights')}</p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
