import * as pdfjs from 'pdfjs-dist';

// Import the worker directly
import 'pdfjs-dist/build/pdf.worker.mjs';

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import mammoth from 'mammoth';
import { fileTypeFromBuffer } from 'file-type';

// src/utils/resumeParser.ts

export type ResumeData = {
  personal: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    summary?: string;
  };
  experience: {
    title: string;
    company: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    description: string[];
    achievements?: string[];
    technologies?: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
    honors?: string[];
    courses?: string[];
    description?: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  projects: {
    name: string;
    description: string;
    technologies?: string[];
    link?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    achievements?: string[];
  }[];
  certifications: {
    name: string;
    issuer: string;
    date?: string;
    expiration?: string;
    id?: string;
    url?: string;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
  publications: {
    title: string;
    publisher: string;
    date?: string;
    authors?: string[];
    url?: string;
    description?: string;
  }[];
  awards: {
    title: string;
    issuer: string;
    date?: string;
    description?: string;
  }[];
  volunteer: {
    organization: string;
    role: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    description?: string[];
  }[];
};

// Remove fileToBuffer function and replace with arrayBuffer function
const getArrayBuffer = async (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Extract text from PDF file using pdf.js
 */
const extractPdfText = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  const uint8Array = new Uint8Array(arrayBuffer);
  const loadingTask = pdfjs.getDocument(uint8Array);
  const pdf = await loadingTask.promise;
  
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => item.str);
    fullText += strings.join(' ') + '\n';
  }
  
  return fullText;
};

/**
 * Extract text from DOCX file
 */
const extractDocxText = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

/**
 * Parse text content into structured data
 */
const parseTextContent = (text: string): ResumeData => {
  // Split text into sections
  const sections = text.split(/\n{2,}/);
  
  const resumeData: ResumeData = {
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    publications: [],
    awards: [],
    volunteer: [],
  };

  // Extract email using regex
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    resumeData.personal.email = emailMatch[0];
  }

  // Extract phone using regex
  const phoneRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) {
    resumeData.personal.phone = phoneMatch[0];
  }

  // Find name (usually at the top)
  const possibleName = sections[0].split('\n')[0].trim();
  if (possibleName && !possibleName.includes('@') && !phoneRegex.test(possibleName)) {
    resumeData.personal.name = possibleName;
  }

  // Extract experience section
  const experienceSection = sections.find(section => 
    /experience|work history/i.test(section.split('\n')[0])
  );
  if (experienceSection) {
    const experiences = experienceSection.split(/\n{2,}/);
    experiences.shift(); // Remove section header
    
    resumeData.experience = experiences.map(exp => {
      const lines = exp.split('\n');
      return {
        title: lines[0] || '',
        company: lines[1] || '',
        startDate: '',
        endDate: '',
        description: lines.slice(2).filter(Boolean),
      };
    });
  }

  // Extract skills section
  const skillsSection = sections.find(section => 
    /skills|technologies/i.test(section.split('\n')[0])
  );
  if (skillsSection) {
    const skills = skillsSection
      .split('\n')
      .slice(1) // Remove section header
      .filter(Boolean)
      .map(skill => skill.trim());

    resumeData.skills = [{
      category: 'Technical Skills',
      items: skills
    }];
  }

  return resumeData;
};

/**
 * Main parse function
 */
export const parseResume = async (file: File): Promise<ResumeData> => {
  try {
    const arrayBuffer = await getArrayBuffer(file);
    const fileName = file.name.toLowerCase();
    const isPdf = fileName.endsWith('.pdf');
    const isDocx = fileName.endsWith('.docx');

    if (!isPdf && !isDocx) {
      throw new Error('Invalid file type. Please upload a PDF or DOCX file.');
    }

    let text = '';
    if (isPdf) {
      text = await extractPdfText(arrayBuffer);
    } else {
      text = await extractDocxText(arrayBuffer);
    }
    
    const resumeData = parseTextContent(text);
    console.log("Parsed Resume Data:", resumeData);  // Debug log
    return resumeData;

  } catch (error) {
    console.error('Error parsing resume:', error);
    return {
      personal: {
        name: 'Error parsing resume',
        summary: 'There was an error processing your resume. Please ensure you uploaded a valid PDF or DOCX file.'
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      publications: [],
      awards: [],
      volunteer: []
    };
  }
};