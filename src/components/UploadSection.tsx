
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileUpload, FileText, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type FileStatus = 'idle' | 'dragging' | 'uploading' | 'success' | 'error';

const UploadSection = () => {
  const [fileStatus, setFileStatus] = useState<FileStatus>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragCounter, setDragCounter] = useState(0);

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

  const handleFiles = (files: FileList) => {
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
      return;
    }
    
    setFileName(file.name);
    setFileStatus('uploading');
    
    // Simulate upload process
    setTimeout(() => {
      setFileStatus('success');
    }, 1500);
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
                  <FileUpload className="h-8 w-8 text-primary" />
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
                  <Button variant="default" className="rounded-full px-6" component="span">
                    Browse Files
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
                <div className="flex space-x-4">
                  <Button variant="outline" className="rounded-full" onClick={() => setFileStatus('idle')}>
                    Upload Another
                  </Button>
                  <Button className="rounded-full">
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
    </section>
  );
};

export default UploadSection;
