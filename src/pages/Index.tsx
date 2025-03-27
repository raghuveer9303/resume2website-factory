
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import UploadSection from '@/components/UploadSection';
import PreferencesForm from '@/components/PreferencesForm';
import PreviewSection from '@/components/PreviewSection';
import MarketplaceSection from '@/components/MarketplaceSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Simulating page load animation
  useEffect(() => {
    document.body.classList.add('animate-fade-in');
    
    return () => {
      document.body.classList.remove('animate-fade-in');
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16">
        <UploadSection />
        <PreferencesForm />
        <PreviewSection />
        <MarketplaceSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
