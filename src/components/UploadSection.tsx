// src/components/UploadSection.tsx
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UploadCloud, FileText, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { parseResume } from '@/utils/resumeParser';
import { type ResumeData } from '@/utils/resumeParser';

type FileStatus = 'idle' | 'dragging' | 'uploading' | 'success' | 'error';

interface UploadSectionProps {
  onResumeProcessed: (resumeData: ResumeData) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onResumeProcessed }) => {
  const [fileStatus, setFileStatus] = useState<FileStatus>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragCounter, setDragCounter] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      // Parse the resume file
      const resumeData = await parseResume(file);
      
      // Pass the parsed data to the parent component
      onResumeProcessed(resumeData);
      
      setFileStatus('success');
      
      toast({
        title: "Resume Uploaded Successfully",
        description: "Your resume has been processed and key information extracted",
      });
      
    } catch (error) {
      console.error("Error processing file:", error);
      setFileStatus('error');
      toast({
        title: "Processing Failed",
        description: "There was an error processing your resume",
        variant: "destructive"
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Your existing file handling logic
    } catch (error) {
      console.error('Error handling file:', error);
    }
  };

  return (
    <div>
      <section id="upload" className="section-container">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="bg-lovable-soft-purple text-lovable-purple px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider mb-4 animate-fade-down">
            Transform Your Resume
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4 animate-fade-down animate-stagger-1">
            Turn Your Resume Into a <span className="text-gradient">Beautiful Website</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8 animate-fade-down animate-stagger-2">
            Upload your resume and let our AI transform it into a professional website in minutes. Customize your site and stand out from the crowd.
          </p>
        </div>

        <Card 
          className={cn(
            "max-w-xl mx-auto lovable-card transition-all duration-300 animate-fade-up animate-stagger-3",
            fileStatus === 'dragging' && "ring-2 ring-lovable-purple/50",
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
                  <div className="w-16 h-16 rounded-full bg-lovable-soft-purple flex items-center justify-center mb-6">
                    <UploadCloud className="h-8 w-8 text-lovable-purple" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Drag and drop your resume file, or click to browse. We support PDF, DOCX, and TXT formats.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleFileInput}
                  />
                  <label htmlFor="resume-upload">
                    <Button className="rounded-full px-6 bg-lovable-purple hover:bg-lovable-secondary-purple" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                </>
              ) : fileStatus === 'uploading' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-lovable-soft-purple flex items-center justify-center mb-6">
                    <div className="h-8 w-8 border-4 border-lovable-light-purple border-t-lovable-purple rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Processing Resume...</h3>
                  <p className="text-muted-foreground mb-2">{fileName}</p>
                  <div className="w-full max-w-md bg-lovable-soft-purple/30 rounded-full h-2 mb-6">
                    <div className="bg-lovable-purple h-2 rounded-full animate-pulse"></div>
                  </div>
                </>
              ) : fileStatus === 'success' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Resume Processed!</h3>
                  <p className="text-muted-foreground mb-6">{fileName}</p>
                  
                  <div className="flex space-x-4 mt-6">
                    <Button variant="outline" className="rounded-full" onClick={() => setFileStatus('idle')}>
                      Upload Another
                    </Button>
                    <Button className="rounded-full bg-lovable-tertiary-purple hover:bg-lovable-secondary-purple">
                      Continue to Customize
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
                  <Button variant="default" className="bg-lovable-purple hover:bg-lovable-secondary-purple rounded-full" onClick={() => setFileStatus('idle')}>
                    Try Again
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default UploadSection;