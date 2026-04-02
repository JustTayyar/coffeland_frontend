import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaFacebookF, FaInstagram, FaCheckCircle } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset after some time
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <header className="contact-hero">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.sub')}</p>
        </header>

        <div className="contact-wrapper">
          {/* Contact Details */}
          <aside className="contact-info-panel">
            <div className="info-card-premium">
              <div className="info-icon-box"><FaMapMarkerAlt /></div>
              <div className="info-details">
                <h4>{t('contact.info_title')}</h4>
                <p>{t('contact.info_address')}</p>
              </div>
            </div>

            <div className="info-card-premium">
              <div className="info-icon-box"><FaPhone /></div>
              <div className="info-details">
                <h4>Phone</h4>
                <p>{t('contact.info_phone')}</p>
              </div>
            </div>

            <div className="info-card-premium">
              <div className="info-icon-box"><FaEnvelope /></div>
              <div className="info-details">
                <h4>Email</h4>
                <p>{t('contact.info_email')}</p>
              </div>
            </div>

            <div className="info-card-premium">
              <div className="info-icon-box"><FaClock /></div>
              <div className="info-details">
                <h4>Hours</h4>
                <p>{t('contact.info_hours')}</p>
              </div>
            </div>

            <div className="socials-premium">
              <a href="#" className="social-btn"><FaFacebookF /></a>
              <a href="#" className="social-btn"><FaInstagram /></a>
              <a href="#" className="social-btn"><FaXTwitter /></a>
            </div>
          </aside>

          {/* Contact Form Card */}
          <main className="contact-form-card">
            {isSubmitted ? (
               <div className="success-full">
                  <FaCheckCircle className="huge-icon" />
                  <h2>{t('contact.success_header')}</h2>
                  <p>{t('contact.success_msg')}</p>
                  <button className="btn" onClick={() => setIsSubmitted(false)}>Yenidən Göndər</button>
               </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="input-field-group">
                    <label>{t('contact.form_name')}</label>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Ad Soyad" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-field-group">
                    <label>{t('contact.form_email')}</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="nümunə@mail.com" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-field-group">
                  <label>{t('contact.form_subject')}</label>
                  <input 
                    type="text" 
                    name="subject" 
                    placeholder="Mövzu" 
                    required 
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-field-group">
                  <label>{t('contact.form_message')}</label>
                  <div className="textarea-wrapper">
                    <textarea 
                      name="message" 
                      rows="5" 
                      placeholder="Mesajınızı bura daxil edin" 
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="submit-btn-premium">
                  <span>{t('contact.form_btn')}</span>
                  <FaPaperPlane />
                </button>
              </form>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Contact;
