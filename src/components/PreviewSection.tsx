
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone, Tablet, Download, Link2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

const PreviewSection = () => {
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <section id="preview" className="section-container">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider mb-4 animate-fade-down">
          See Your Website
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4 animate-fade-down animate-stagger-1">
          Preview Your Professional Site
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mb-8 animate-fade-down animate-stagger-2">
          This is how your website will look across different devices. Make any adjustments before finalizing.
        </p>
      </div>

      <div className="flex flex-col max-w-5xl mx-auto animate-fade-up">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center rounded-full p-1 bg-secondary">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full flex items-center gap-2 px-4",
                previewDevice === 'desktop' && "bg-white shadow-sm"
              )}
              onClick={() => setPreviewDevice('desktop')}
            >
              <Monitor className="h-4 w-4" />
              <span className="hidden md:inline">Desktop</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full flex items-center gap-2 px-4",
                previewDevice === 'tablet' && "bg-white shadow-sm"
              )}
              onClick={() => setPreviewDevice('tablet')}
            >
              <Tablet className="h-4 w-4" />
              <span className="hidden md:inline">Tablet</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full flex items-center gap-2 px-4",
                previewDevice === 'mobile' && "bg-white shadow-sm"
              )}
              onClick={() => setPreviewDevice('mobile')}
            >
              <Smartphone className="h-4 w-4" />
              <span className="hidden md:inline">Mobile</span>
            </Button>
          </div>
        </div>

        <div className="relative perspective">
          <div 
            className={cn(
              "transform-3d transition-all duration-500 mx-auto bg-white rounded-lg shadow-xl mb-8 overflow-hidden",
              previewDevice === 'desktop' && "w-full",
              previewDevice === 'tablet' && "w-full max-w-[768px]",
              previewDevice === 'mobile' && "w-full max-w-[375px]"
            )}
            style={{
              transformOrigin: 'center top',
              transform: `rotateX(5deg) translateZ(0)`
            }}
          >
            <div className="bg-[#f2f2f7] h-8 w-full flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>

            <div 
              className={cn(
                "w-full overflow-y-auto",
                previewDevice === 'desktop' && "h-[60vh]",
                previewDevice === 'tablet' && "h-[60vh]",
                previewDevice === 'mobile' && "h-[70vh]"
              )}
            >
              <Tabs defaultValue="template1" className="w-full h-full">
                <TabsList className="grid w-full grid-cols-3 bg-secondary">
                  <TabsTrigger value="template1">Minimal</TabsTrigger>
                  <TabsTrigger value="template2">Professional</TabsTrigger>
                  <TabsTrigger value="template3">Creative</TabsTrigger>
                </TabsList>
                <TabsContent value="template1" className="w-full h-full">
                  <div className="h-full w-full bg-white">
                    <nav className="bg-white border-b border-gray-100 py-6 px-8 flex justify-between items-center">
                      <span className="text-xl font-bold">John Doe</span>
                      <div className="flex space-x-8">
                        <span className="text-gray-600">About</span>
                        <span className="text-gray-600">Experience</span>
                        <span className="text-gray-600">Skills</span>
                        <span className="text-gray-600">Contact</span>
                      </div>
                    </nav>

                    <section className="py-24 px-8">
                      <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                          Product Designer & Frontend Developer
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                          I design and build digital products that help businesses grow and make people's lives easier.
                        </p>
                        <div className="flex space-x-4">
                          <button className="bg-black text-white px-6 py-3 rounded-lg">View Portfolio</button>
                          <button className="border border-gray-300 px-6 py-3 rounded-lg">Contact Me</button>
                        </div>
                      </div>
                    </section>

                    <section className="py-16 px-8 bg-gray-50">
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-12">Experience</h2>
                        
                        <div className="mb-12">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-semibold">Senior Product Designer</h3>
                              <p className="text-gray-600">Company Name</p>
                            </div>
                            <span className="text-gray-500">2020 - Present</span>
                          </div>
                          <p className="text-gray-600">
                            Led the design of multiple products, improving user engagement by 35%.
                            Collaborated with cross-functional teams to deliver cohesive user experiences.
                          </p>
                        </div>
                        
                        <div className="mb-12">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-semibold">UI/UX Designer</h3>
                              <p className="text-gray-600">Previous Company</p>
                            </div>
                            <span className="text-gray-500">2017 - 2020</span>
                          </div>
                          <p className="text-gray-600">
                            Designed user interfaces for mobile and web applications.
                            Conducted user research and usability testing to inform design decisions.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="template2" className="w-full h-full">
                  <div className="h-full w-full bg-white">
                    <header className="bg-blue-700 text-white py-20 px-8">
                      <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">John Doe</h1>
                        <p className="text-xl mb-6">Product Designer & Frontend Developer</p>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center"><Eye className="h-4 w-4 mr-2" /> Available for new opportunities</span>
                          <span>|</span>
                          <span>San Francisco, CA</span>
                        </div>
                      </div>
                    </header>
                    
                    <nav className="bg-white border-b border-gray-200 py-4 px-8 sticky top-0 shadow-sm z-10">
                      <div className="max-w-4xl mx-auto flex justify-between">
                        <div className="flex space-x-8">
                          <span className="font-medium">About</span>
                          <span className="font-medium">Experience</span>
                          <span className="font-medium">Skills</span>
                          <span className="font-medium">Education</span>
                        </div>
                        <button className="bg-blue-700 text-white px-4 py-1 rounded">Contact</button>
                      </div>
                    </nav>
                    
                    <section className="py-16 px-8">
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-blue-700">About Me</h2>
                        <p className="text-gray-700 mb-6">
                          Experienced product designer with over 5 years of creating user-centered digital experiences.
                          Specialized in combining aesthetic design with functional user interfaces that drive business results.
                        </p>
                        <p className="text-gray-700">
                          Passionate about solving complex problems through design thinking and user research.
                          Strong collaborative skills with cross-functional teams including developers, marketers, and stakeholders.
                        </p>
                      </div>
                    </section>
                    
                    <section className="py-16 px-8 bg-gray-50">
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-12 text-blue-700">Experience</h2>
                        
                        <div className="flex mb-12">
                          <div className="w-1/4">
                            <span className="text-gray-500">2020 - Present</span>
                          </div>
                          <div className="w-3/4">
                            <h3 className="text-xl font-semibold">Senior Product Designer</h3>
                            <p className="text-gray-600 mb-4">Company Name</p>
                            <p className="text-gray-700">
                              Led the redesign of the company's flagship product, resulting in a 35% increase in user engagement.
                              Managed a team of 3 designers and collaborated closely with engineering and product management.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="w-1/4">
                            <span className="text-gray-500">2017 - 2020</span>
                          </div>
                          <div className="w-3/4">
                            <h3 className="text-xl font-semibold">UI/UX Designer</h3>
                            <p className="text-gray-600 mb-4">Previous Company</p>
                            <p className="text-gray-700">
                              Designed user interfaces for mobile and web applications across various industries.
                              Conducted user research and usability testing to inform design decisions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="template3" className="w-full h-full">
                  <div className="h-full w-full bg-black text-white">
                    <nav className="py-6 px-8 flex justify-between items-center border-b border-gray-800">
                      <span className="text-xl font-bold">JD</span>
                      <div className="flex space-x-8 text-sm">
                        <span>WORK</span>
                        <span>ABOUT</span>
                        <span>PROCESS</span>
                        <span>CONTACT</span>
                      </div>
                    </nav>

                    <section className="py-32 px-8">
                      <div className="max-w-4xl mx-auto">
                        <span className="text-pink-500 uppercase tracking-widest text-sm mb-4 block">Product Designer</span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                          Crafting digital<br />experiences that<br />matter
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
                          <button className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors">
                            Explore Work
                          </button>
                          <span className="text-gray-400">Based in San Francisco, CA</span>
                        </div>
                      </div>
                    </section>

                    <section className="py-24 px-8 bg-gray-900">
                      <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                          <div>
                            <span className="text-pink-500 uppercase tracking-widest text-sm mb-8 block">Selected Work</span>
                            <div className="h-80 bg-gray-800 mb-4 rounded-lg"></div>
                            <h3 className="text-xl font-bold mb-2">E-commerce Redesign</h3>
                            <p className="text-gray-400">UX/UI Design, Research</p>
                          </div>
                          <div>
                            <div className="h-80 bg-gray-800 mb-4 mt-12 rounded-lg"></div>
                            <h3 className="text-xl font-bold mb-2">Finance Dashboard</h3>
                            <p className="text-gray-400">UI Design, Data Visualization</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button variant="outline" className="rounded-full px-6">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button className="rounded-full px-6">
            <Link2 className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;
