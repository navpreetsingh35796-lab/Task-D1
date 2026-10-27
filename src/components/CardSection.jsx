import React from 'react';
import Card from './Card';

export default function CardSection({ title, items, buttonText, isTutorial }) {
  return (
    <section className="section-container">
      <h2 className="section-heading">{title}</h2>
      <div className="cards-grid">
        {items.map((item) => (
          <Card 
            key={item.id} 
            item={item} 
            authorLabel={isTutorial ? '' : "Author"} 
          />
        ))}
      </div>
      <div className="section-btn-wrapper">
        <button className="see-all-btn">{buttonText}</button>
      </div>
    </section>
  );
}