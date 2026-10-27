import React from 'react';
import { Star, User } from 'lucide-react';

export default function Card({ item, authorLabel }) {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src={item.image} alt={item.title} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.description}</p>
        <div className="card-divider"></div>
        <div className="card-footer">
          <div className="rating">
            <Star className="star-icon" size={16} fill="#f59e0b" color="#f59e0b" />
            <span>{item.rating}</span>
          </div>
          <div className="author-info">
            <User size={15} className="user-icon" />
            <span>{authorLabel ? `${authorLabel}: ` : ''}{item.author}</span>
          </div>
        </div>
      </div>
    </div>
  );
}