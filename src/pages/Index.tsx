// src/pages/Index.tsx
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import UploadSection from '@/components/UploadSection';
import PreferencesForm from '@/components/PreferencesForm';
import PreviewSection from '@/components/PreviewSection';
import MarketplaceSection from '@/components/MarketplaceSection';
import Footer from '@/components/Footer';
import ResumePreview from '@/components/ResumePreview';
import { type ResumeData } from '@/utils/resumeParser';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [currentStep, setCurrentStep] = useState<'upload' | 'preview' | 'customize' | 'marketplace'>('upload');
  
  // Handle when the resume is successfully processed
  const handleResumeProcessed = (parsedData: ResumeData) => {
    setResumeData(parsedData);
    setCurrentStep('preview');
    
    // Scroll to preview section
    setTimeout(() => {
      document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };
  
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
        <UploadSection onResumeProcessed={handleResumeProcessed} />
        
        {resumeData && (
          <section id="preview" className="section-container">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider mb-4 animate-fade-down">
                Resume Summary
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4 animate-fade-down animate-stagger-1">
                We've Analyzed Your Resume
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mb-8 animate-fade-down animate-stagger-2">
                Here's what we've extracted from your resume. Review the information and make any necessary adjustments before creating your website.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mb-12 animate-fade-up">
              <ResumePreview resumeData={resumeData} />
            </div>
            
            <div className="flex justify-center gap-4 animate-fade-up animate-stagger-3">
              <Button 
                variant="outline" 
                className="rounded-full px-6"
                onClick={() => {
                  setCurrentStep('upload');
                  document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Upload Different Resume
              </Button>
              <Button 
                className="rounded-full px-6 bg-lovable-purple hover:bg-lovable-secondary-purple"
                onClick={() => {
                  setCurrentStep('customize');
                  document.getElementById('customize')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Continue to Customize
              </Button>
            </div>
          </section>
        )}
        
        <PreferencesForm />
        <PreviewSection />
        <MarketplaceSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;