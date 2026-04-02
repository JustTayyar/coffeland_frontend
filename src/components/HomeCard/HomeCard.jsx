import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './HomeCard.css'; // Mərkəzləşdirilmiş CSS-i bura əlavə edirik

const HomeCard = ({ image, day, month, category, title, desc, link, readMoreText }) => {
  return (
    <Link to={link || "#"} className="news-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div className="news-img-wrapper">
        <img src={image} alt={title} className="news-main-img" />
        <div className="news-img-overlay"></div>
        <div className="news-date-glass">
            <span className="news-day">{day}</span>
            <span className="news-month">{month}</span>
        </div>
      </div>
      <div className="news-content">
        <span className="news-category">{category}</span>
        <h3 className="news-title">{title}</h3>
        <p className="news-desc">{desc}</p>
        <div className="news-read-more">
            <span className="read-more-text">{readMoreText || "Ətraflı"}</span>
            <div className="read-more-icon"><FaArrowRight /></div>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
