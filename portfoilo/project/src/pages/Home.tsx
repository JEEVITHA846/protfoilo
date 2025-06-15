import React from 'react';
import PageTransition from '../components/shared/PageTransition';
import HeroSection from '../components/home/HeroSection';

const Home: React.FC = () => {
  return (
    <PageTransition variant="fade">
      <HeroSection />
    </PageTransition>
  );
};

export default Home;