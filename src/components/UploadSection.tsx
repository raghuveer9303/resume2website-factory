
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UploadCloud, FileText, Check, AlertCircle, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import ResumeChat from './ResumeChat';

type FileStatus = 'idle' | 'dragging' | 'uploading' | 'success' | 'error';
type ParsedResume = {
  contact: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
  };
  summary?: string;
  experience?: Array<{
    title?: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string[];
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    location?: string;
    graduationDate?: string;
    description?: string;
  }>;
  skills?: string[];
};

const UploadSection = () => {
  const [fileStatus, setFileStatus] = useState<FileStatus>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragCounter, setDragCounter] = useState(0);
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setFileStatus('dragging');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter - 1);
    if (dragCounter <= 1) {
      setFileStatus('idle');
      setDragCounter(0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFileStatus('idle');
    setDragCounter(0);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    const file = files[0];
    const fileType = file.type;
    
    // Validate file type
    const validTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (!validTypes.includes(fileType)) {
      setFileStatus('error');
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF, DOCX, or TXT file",
        variant: "destructive"
      });
      return;
    }
    
    setFileName(file.name);
    setFileStatus('uploading');
    
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      // Since we're just demonstrating and not actually processing files yet,
      // simulate the parsing with a mock response
      
      // Simulate file processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock resume parsing result - in a real app, this would come from AI processing
      const mockParsedResume: ParsedResume = {
        contact: {
          name: "John Smith",
          email: "john.smith@example.com",
          phone: "(555) 123-4567",
          location: "New York, NY",
          website: "johnsmith.com"
        },
        summary: "Experienced software engineer with 5+ years developing web applications",
        experience: [
          {
            title: "Senior Developer",
            company: "Tech Company",
            location: "New York, NY",
            startDate: "Jan 2020",
            endDate: "Present",
            description: [
              "Led team of 5 developers",
              "Implemented new features increasing user engagement by 25%",
              "Reduced load times by 40% through performance optimization"
            ]
          },
          {
            title: "Web Developer",
            company: "Startup Inc",
            location: "Boston, MA",
            startDate: "Jun 2018",
            endDate: "Dec 2019",
            description: [
              "Developed responsive web applications",
              "Collaborated with design team on UI/UX improvements"
            ]
          }
        ],
        education: [
          {
            degree: "B.S. Computer Science",
            institution: "University of Technology",
            location: "Boston, MA",
            graduationDate: "May 2018",
            description: "Graduated with honors"
          }
        ],
        skills: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS", "Git", "AWS"]
      };
      
      setParsedResume(mockParsedResume);
      setFileStatus('success');
      
      toast({
        title: "Resume Uploaded Successfully",
        description: "Your resume has been processed and key information extracted",
      });
      
    } catch (error) {
      console.error("Error uploading file:", error);
      setFileStatus('error');
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your resume",
        variant: "destructive"
      });
    }
  };

  const handleShowChat = () => {
    setShowChat(true);
  };

  const handleContinue = () => {
    // In a real app, we would save the parsed resume data to the database
    // and navigate to the next step (preferences form)
    toast({
      title: "Great!",
      description: "Moving to the customization step",
    });
  };

  const renderResumePreview = () => {
    if (!parsedResume) return null;
    
    return (
      <div className="mt-8 bg-background/50 rounded-lg p-6 border border-border/50 text-left">
        <h4 className="font-semibold text-lg mb-4">Resume Preview</h4>
        
        <div className="space-y-4">
          <div>
            <h5 className="font-medium text-primary">Contact Information</h5>
            <p className="text-sm">{parsedResume.contact.name}</p>
            <p className="text-sm">{parsedResume.contact.email} | {parsedResume.contact.phone}</p>
            <p className="text-sm">{parsedResume.contact.location}</p>
          </div>
          
          {parsedResume.summary && (
            <div>
              <h5 className="font-medium text-primary">Summary</h5>
              <p className="text-sm">{parsedResume.summary}</p>
            </div>
          )}
          
          {parsedResume.experience && parsedResume.experience.length > 0 && (
            <div>
              <h5 className="font-medium text-primary">Experience</h5>
              {parsedResume.experience.map((exp, index) => (
                <div key={index} className="mb-2">
                  <p className="text-sm font-medium">{exp.title} at {exp.company}</p>
                  <p className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                </div>
              ))}
            </div>
          )}
          
          {parsedResume.skills && (
            <div>
              <h5 className="font-medium text-primary">Skills</h5>
              <div className="flex flex-wrap gap-1">
                {parsedResume.skills.map((skill, index) => (
                  <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="upload" className="section-container">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider mb-4 animate-fade-down">
          Transform Your Resume
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4 animate-fade-down animate-stagger-1">
          Turn Your Resume Into a <span className="text-gradient">Beautiful Website</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8 animate-fade-down animate-stagger-2">
          Upload your resume and let our AI transform it into a professional website in minutes. Customize your site and stand out from the crowd.
        </p>
      </div>

      {showChat && parsedResume ? (
        <ResumeChat resumeData={parsedResume} onClose={() => setShowChat(false)} />
      ) : (
        <Card 
          className={cn(
            "max-w-xl mx-auto glass-card transition-all duration-300 animate-fade-up animate-stagger-3",
            fileStatus === 'dragging' && "ring-2 ring-primary/50",
            fileStatus === 'success' && "ring-2 ring-green-500/50",
            fileStatus === 'error' && "ring-2 ring-red-500/50"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center justify-center text-center">
              {fileStatus === 'idle' || fileStatus === 'dragging' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <UploadCloud className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Drag and drop your resume file, or click to browse. We support PDF, DOCX, and TXT formats.
                  </p>
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileInput}
                  />
                  <label htmlFor="resume-upload">
                    <Button variant="default" className="rounded-full px-6" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                </>
              ) : fileStatus === 'uploading' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Uploading...</h3>
                  <p className="text-muted-foreground mb-2">{fileName}</p>
                  <div className="w-full max-w-md bg-primary/10 rounded-full h-2 mb-6">
                    <div className="bg-primary h-2 rounded-full animate-pulse"></div>
                  </div>
                </>
              ) : fileStatus === 'success' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Complete!</h3>
                  <p className="text-muted-foreground mb-6">{fileName}</p>
                  
                  {renderResumePreview()}
                  
                  <div className="flex space-x-4 mt-6">
                    <Button variant="outline" className="rounded-full" onClick={() => setFileStatus('idle')}>
                      Upload Another
                    </Button>
                    <Button className="rounded-full flex items-center gap-2" onClick={handleShowChat}>
                      <MessageSquare className="h-4 w-4" />
                      Customize with AI
                    </Button>
                    <Button className="rounded-full" onClick={handleContinue}>
                      Continue
                    </Button>
                  </div>
                </>
              ) : fileStatus === 'error' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Failed</h3>
                  <p className="text-muted-foreground mb-6">
                    Please upload a PDF, DOCX, or TXT file format.
                  </p>
                  <Button variant="default" onClick={() => setFileStatus('idle')}>
                    Try Again
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </Card>
      )}
    </section>
  );
};

export default UploadSection;
