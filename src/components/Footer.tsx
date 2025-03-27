
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Linkedin, Instagram, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 mt-16">
      <div className="section-container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Resume2Website</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Transform your resume into a beautiful, professional website in minutes with AI-powered customization.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Templates</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Marketplace</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Examples</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Status</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Resume2Website. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> by Lovable
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
