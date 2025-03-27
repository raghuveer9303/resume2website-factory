
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { CheckCircle2, Circle, Paintbrush, Sliders, MessageSquare, Palette } from 'lucide-react';

const colorOptions = [
  { label: 'Slate', value: 'slate', class: 'bg-slate-500' },
  { label: 'Gray', value: 'gray', class: 'bg-gray-500' },
  { label: 'Zinc', value: 'zinc', class: 'bg-zinc-500' },
  { label: 'Neutral', value: 'neutral', class: 'bg-neutral-500' },
  { label: 'Stone', value: 'stone', class: 'bg-stone-500' },
  { label: 'Red', value: 'red', class: 'bg-red-500' },
  { label: 'Orange', value: 'orange', class: 'bg-orange-500' },
  { label: 'Amber', value: 'amber', class: 'bg-amber-500' },
  { label: 'Yellow', value: 'yellow', class: 'bg-yellow-500' },
  { label: 'Lime', value: 'lime', class: 'bg-lime-500' },
  { label: 'Green', value: 'green', class: 'bg-green-500' },
  { label: 'Emerald', value: 'emerald', class: 'bg-emerald-500' },
  { label: 'Teal', value: 'teal', class: 'bg-teal-500' },
  { label: 'Cyan', value: 'cyan', class: 'bg-cyan-500' },
  { label: 'Sky', value: 'sky', class: 'bg-sky-500' },
  { label: 'Blue', value: 'blue', class: 'bg-blue-500' },
  { label: 'Indigo', value: 'indigo', class: 'bg-indigo-500' },
  { label: 'Violet', value: 'violet', class: 'bg-violet-500' },
  { label: 'Purple', value: 'purple', class: 'bg-purple-500' },
  { label: 'Fuchsia', value: 'fuchsia', class: 'bg-fuchsia-500' },
  { label: 'Pink', value: 'pink', class: 'bg-pink-500' },
  { label: 'Rose', value: 'rose', class: 'bg-rose-500' },
];

const styleOptions = [
  { value: 'minimal', label: 'Minimal', description: 'Clean, simple design with focus on content' },
  { value: 'professional', label: 'Professional', description: 'Corporate aesthetic for business contexts' },
  { value: 'creative', label: 'Creative', description: 'Artistic design with unique visual elements' },
  { value: 'technical', label: 'Technical', description: 'Focused on showcasing technical skills and projects' },
];

const PreferencesForm = () => {
  const [selectedStyle, setSelectedStyle] = useState('minimal');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [minimalismLevel, setMinimalismLevel] = useState([70]);
  const [includePortfolio, setIncludePortfolio] = useState(true);
  const [includeTestimonials, setIncludeTestimonials] = useState(false);
  const [includeContact, setIncludeContact] = useState(true);

  return (
    <section id="customize" className="section-container">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider mb-4 animate-fade-down">
          Make It Yours
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4 animate-fade-down animate-stagger-1">
          Customize Your Website
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mb-8 animate-fade-down animate-stagger-2">
          Tailor your website to match your personal brand and career goals. Choose a style that represents you best.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto glass-card overflow-hidden animate-fade-up">
        <Tabs defaultValue="style" className="w-full">
          <div className="border-b">
            <TabsList className="w-full rounded-none justify-start p-0 h-auto bg-transparent border-b">
              <TabsTrigger 
                value="style" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none rounded-none py-4 px-6"
              >
                <Paintbrush className="h-4 w-4 mr-2" />
                Style
              </TabsTrigger>
              <TabsTrigger 
                value="colors" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none rounded-none py-4 px-6"
              >
                <Palette className="h-4 w-4 mr-2" />
                Colors
              </TabsTrigger>
              <TabsTrigger 
                value="sections" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none rounded-none py-4 px-6"
              >
                <Sliders className="h-4 w-4 mr-2" />
                Sections
              </TabsTrigger>
              <TabsTrigger 
                value="content" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none rounded-none py-4 px-6"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Content
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="style" className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Choose a Style</h3>
              <RadioGroup 
                value={selectedStyle} 
                onValueChange={setSelectedStyle}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {styleOptions.map((style) => (
                  <div key={style.value} className="relative">
                    <RadioGroupItem 
                      value={style.value} 
                      id={style.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={style.value}
                      className="flex flex-col h-full p-4 border rounded-lg cursor-pointer transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{style.label}</span>
                        <div className="text-primary opacity-0 peer-checked:opacity-100">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{style.description}</p>
                    </Label>
                    <div className="absolute right-3 top-3 text-primary opacity-0 peer-checked:opacity-100">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Minimalism Level</h3>
              <p className="text-sm text-muted-foreground mb-4">Adjust how minimal your design should be</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Detailed</span>
                <Slider 
                  value={minimalismLevel} 
                  onValueChange={setMinimalismLevel}
                  max={100} 
                  step={1} 
                  className="flex-1 mx-4"
                />
                <span className="text-sm">Minimal</span>
              </div>
            </div>
            
            <div className="text-right mt-8">
              <Button className="rounded-full px-6">
                Apply Style
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="colors" className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Primary Color</h3>
              <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
                {colorOptions.map((color) => (
                  <div 
                    key={color.value} 
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-full aspect-square rounded-full ${color.class} cursor-pointer transition-all hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-primary/50`}
                      aria-label={`Select ${color.label} color`}
                    >
                      {selectedColor === color.value && (
                        <CheckCircle2 className="h-5 w-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Custom Colors</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Define specific colors for your site elements
              </p>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <Input id="accentColor" type="color" defaultValue="#3B82F6" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="textColor">Text Color</Label>
                    <Input id="textColor" type="color" defaultValue="#111827" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <Input id="backgroundColor" type="color" defaultValue="#F8FAFC" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right mt-8">
              <Button className="rounded-full px-6">
                Apply Colors
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sections" className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-4">Customize Sections</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Select which sections to include in your website
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="includeExperience" className="font-medium">Experience</Label>
                    <p className="text-sm text-muted-foreground">Work history and positions</p>
                  </div>
                  <Switch id="includeExperience" defaultChecked disabled />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="includeEducation" className="font-medium">Education</Label>
                    <p className="text-sm text-muted-foreground">Academic background</p>
                  </div>
                  <Switch id="includeEducation" defaultChecked disabled />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="includeSkills" className="font-medium">Skills</Label>
                    <p className="text-sm text-muted-foreground">Technical and soft skills</p>
                  </div>
                  <Switch id="includeSkills" defaultChecked disabled />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="includePortfolio" className="font-medium">Portfolio</Label>
                    <p className="text-sm text-muted-foreground">Projects and work samples</p>
                  </div>
                  <Switch 
                    id="includePortfolio" 
                    checked={includePortfolio}
                    onCheckedChange={setIncludePortfolio}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="includeTestimonials" className="font-medium">Testimonials</Label>
                    <p className="text-sm text-muted-foreground">References and recommendations</p>
                  </div>
                  <Switch 
                    id="includeTestimonials" 
                    checked={includeTestimonials}
                    onCheckedChange={setIncludeTestimonials}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="includeContact" className="font-medium">Contact Form</Label>
                    <p className="text-sm text-muted-foreground">Allow visitors to contact you</p>
                  </div>
                  <Switch 
                    id="includeContact" 
                    checked={includeContact}
                    onCheckedChange={setIncludeContact}
                  />
                </div>
              </div>
            </div>
            
            <div className="text-right mt-8">
              <Button className="rounded-full px-6">
                Save Layout
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-4">Personalization</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Add custom content to enhance your website
              </p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="professionalSummary">Professional Summary</Label>
                  <Textarea 
                    id="professionalSummary" 
                    placeholder="Write a brief summary about yourself and your professional goals..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="highlightedSkills">Highlighted Skills (comma-separated)</Label>
                  <Input 
                    id="highlightedSkills" 
                    placeholder="e.g. Project Management, Leadership, Data Analysis"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customPrompt">Custom AI Prompt</Label>
                  <Textarea 
                    id="customPrompt" 
                    placeholder="Give specific instructions to our AI about how you want your content to sound..."
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Our AI will use this prompt to enhance and style your content
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-right mt-8">
              <Button className="rounded-full px-6">
                Apply Changes
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </section>
  );
};

export default PreferencesForm;
