
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Lock, Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

type CustomizationItem = {
  title: string;
  description: string;
  price: string;
  category: string;
  badgeText?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
};

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    description: 'Essential features to get started',
    features: [
      'Basic website template',
      'Contact form',
      'Mobile responsive',
      'Standard SEO optimization'
    ],
    cta: 'Get Started'
  },
  {
    name: 'Premium',
    price: '$9.99',
    description: 'Everything in Free, plus:',
    features: [
      'Multiple premium templates',
      'Custom domain',
      'Analytics dashboard',
      'Advanced SEO tools',
      'Priority support'
    ],
    cta: 'Upgrade Now',
    popular: true
  },
  {
    name: 'Professional',
    price: '$24.99',
    description: 'Everything in Premium, plus:',
    features: [
      'Custom design options',
      'Advanced portfolio features',
      'Content creation assistance',
      'Personal branding tools',
      'Email notifications',
      'API access'
    ],
    cta: 'Go Pro'
  }
];

const customizationItems: CustomizationItem[] = [
  {
    title: 'Interactive Portfolio',
    description: 'Showcase your work with interactive galleries and filterable projects.',
    price: '$4.99',
    category: 'Design',
    badgeText: 'Popular',
    badgeVariant: 'default'
  },
  {
    title: 'Content Enhancement',
    description: 'AI-powered content improvements and professional copywriting.',
    price: '$6.99',
    category: 'Content'
  },
  {
    title: 'Testimonials Section',
    description: 'Add a dedicated section to display client and colleague testimonials.',
    price: '$2.99',
    category: 'Design'
  },
  {
    title: 'Advanced Analytics',
    description: 'Get detailed insights about your website visitors and their behavior.',
    price: '$5.99',
    category: 'Analytics',
    badgeText: 'New',
    badgeVariant: 'secondary'
  },
  {
    title: 'Technical Skills Visualizer',
    description: 'Interactive charts and graphs to highlight your technical proficiencies.',
    price: '$3.99',
    category: 'Design'
  },
  {
    title: 'Video Header',
    description: 'Add a professional video introduction to your website header.',
    price: '$7.99',
    category: 'Media',
    badgeText: 'Premium',
    badgeVariant: 'outline'
  }
];

const MarketplaceSection = () => {
  return (
    <section id="marketplace" className="section-container">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider mb-4 animate-fade-down">
          Enhance Your Site
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4 animate-fade-down animate-stagger-1">
          Choose Your Perfect Plan
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mb-8 animate-fade-down animate-stagger-2">
          Select a plan that suits your needs or enhance your site with premium add-ons from our marketplace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24 animate-fade-up">
        {pricingTiers.map((tier, index) => (
          <Card 
            key={tier.name} 
            className={cn(
              "relative glass-card transition-all hover:translate-y-[-4px] hover:shadow-md",
              tier.popular && "ring-2 ring-primary/20 shadow-md"
            )}
          >
            {tier.popular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <Badge variant="default" className="rounded-full px-3 py-1 bg-primary">
                  Most Popular
                </Badge>
              </div>
            )}
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <div className="flex items-end mb-4">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.name !== 'Free' && (
                  <span className="text-muted-foreground text-sm ml-1 mb-1">/month</span>
                )}
              </div>
              <p className="text-muted-foreground mb-6">{tier.description}</p>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="shrink-0 mr-2 mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={cn(
                  "w-full rounded-full", 
                  tier.popular ? "" : "variant-outline"
                )} 
                variant={tier.popular ? "default" : "outline"}
              >
                {tier.cta}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto animate-fade-up animate-stagger-3">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-2">Premium Add-ons</h3>
            <p className="text-muted-foreground">Enhance your website with these specialized features</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 rounded-full">
            Browse All Add-ons
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customizationItems.map((item, index) => (
            <Card 
              key={index} 
              className="glass-card hover:shadow-md transition-all overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  {item.badgeText && (
                    <Badge variant={item.badgeVariant}>{item.badgeText}</Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-6">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.price}</span>
                  <Button size="sm" variant="outline" className="rounded-full px-4">
                    Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
