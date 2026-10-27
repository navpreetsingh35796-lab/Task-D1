import React from 'react';
import HeroBanner from '../components/HeroBanner';
import CardSection from '../components/CardSection';
import Newsletter from '../components/Newsletter';
import { articles, tutorials } from '../data/contentData';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <div className="main-content">
        <CardSection
          title="Featured Articles"
          items={articles}
          buttonText="See all articles"
          isTutorial={false}
        />
        <CardSection
          title="Featured Tutorials"
          items={tutorials}
          buttonText="See all tutorials"
          isTutorial={true}
        />
        <Newsletter />
      </div>
    </>
  );
}