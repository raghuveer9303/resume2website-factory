// src/components/ResumePreview.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderKanban, 
  Award, 
  Languages, 
  BookOpen, 
  Trophy, 
  Heart,
  ExternalLink,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github
} from 'lucide-react';
import { type ResumeData } from '@/utils/resumeParser';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const renderExperience = () => {
    return (
      <div className="space-y-6">
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{exp.title}</h3>
                <div className="text-muted-foreground">
                  {exp.company}
                  {exp.location && <span> • <MapPin className="inline h-3 w-3" /> {exp.location}</span>}
                </div>
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </div>
            </div>
            
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
            
            {exp.achievements && exp.achievements.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-medium">Key Achievements</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {exp.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderEducation = () => {
    return (
      <div className="space-y-6">
        {resumeData.education.map((edu, index) => (
          <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                <div className="text-muted-foreground">
                  {edu.institution}
                  {edu.location && <span> • <MapPin className="inline h-3 w-3" /> {edu.location}</span>}
                </div>
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> {edu.startDate} - {edu.endDate}
              </div>
            </div>
            
            {edu.gpa && (
              <div className="text-sm mt-1">
                <span className="font-medium">GPA:</span> {edu.gpa}
              </div>
            )}
            
            {edu.honors && edu.honors.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-medium">Honors & Awards</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {edu.honors.map((honor, i) => (
                    <li key={i}>{honor}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {edu.courses && edu.courses.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-medium">Relevant Courses</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {edu.courses.map((course, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{course}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = () => {
    return (
      <div className="space-y-6">
        {resumeData.skills.map((skillCategory, index) => (
          <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-md mb-2">{skillCategory.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skillCategory.items.map((skill, i) => (
                <Badge key={i} className="py-1 px-3">{skill}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderProjects = () => {
    return (
      <div className="space-y-6">
        {resumeData.projects.map((project, index) => (
          <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{project.name}</h3>
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center text-sm"
                >
                  <ExternalLink className="h-3 w-3 mr-1" /> View Project
                </a>
              )}
            </div>
            
            <p className="text-sm mb-3">{project.description}</p>
            
            {project.achievements && project.achievements.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-medium">Key Achievements</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {project.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {project.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCertifications = () => {
    return (
      <div className="space-y-6">
        {resumeData.certifications.map((cert, index) => (
          <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg">{cert.name}</h3>
            <div className="text-muted-foreground mb-2">{cert.issuer}</div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-2">
              {cert.date && (
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" /> Issued: {cert.date}
                </div>
              )}
              
              {cert.expiration && (
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" /> Expires: {cert.expiration}
                </div>
              )}
              
              {cert.id && (
                <div>
                  <span className="font-medium">Credential ID:</span> {cert.id}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderLanguages = () => {
    return (
      <div className="space-y-6">
        {resumeData.languages && resumeData.languages.length > 0 && (
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-3">Languages</h3>
            <div className="space-y-2">
              {resumeData.languages.map((lang, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="font-medium">{lang.language}</div>
                  <Badge variant="outline">{lang.proficiency}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPublications = () => {
    return (
      <div className="space-y-6">
        {resumeData.publications && resumeData.publications.length > 0 && (
          <div className="space-y-6">
            {resumeData.publications.map((pub, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg">{pub.title}</h3>
                <div className="text-muted-foreground">{pub.publisher}</div>
                
                {pub.date && (
                  <div className="text-sm flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1" /> {pub.date}
                  </div>
                )}
                
                {pub.authors && pub.authors.length > 0 && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Authors:</span> {pub.authors.join(", ")}
                  </div>
                )}
                
                {pub.description && (
                  <p className="text-sm mt-2">{pub.description}</p>
                )}
                
                {pub.url && (
                  <a 
                    href={pub.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center text-sm mt-2"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" /> View Publication
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAwards = () => {
    return (
      <div className="space-y-6">
        {resumeData.awards && resumeData.awards.length > 0 && (
          <div className="space-y-6">
            {resumeData.awards.map((award, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg">{award.title}</h3>
                <div className="text-muted-foreground">{award.issuer}</div>
                
                {award.date && (
                  <div className="text-sm flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1" /> {award.date}
                  </div>
                )}
                
                {award.description && (
                  <p className="text-sm mt-2">{award.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderVolunteer = () => {
    return (
      <div className="space-y-6">
        {resumeData.volunteer && resumeData.volunteer.length > 0 && (
          <div className="space-y-6">
            {resumeData.volunteer.map((vol, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{vol.role}</h3>
                    <div className="text-muted-foreground">{vol.organization}</div>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-3 w-3 mr-1" /> {vol.startDate} - {vol.current ? 'Present' : vol.endDate}
                  </div>
                </div>
                
                {vol.description && vol.description.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                    {vol.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-background p-6 rounded-xl border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{resumeData.personal.name}</h2>
        <div className="text-muted-foreground">{resumeData.personal.summary}</div>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-4">
          {resumeData.personal.email && (
            <a href={`mailto:${resumeData.personal.email}`} className="flex items-center text-primary hover:underline">
              <Mail className="h-4 w-4 mr-1" /> {resumeData.personal.email}
            </a>
          )}
          
          {resumeData.personal.phone && (
            <a href={`tel:${resumeData.personal.phone}`} className="flex items-center text-primary hover:underline">
              <Phone className="h-4 w-4 mr-1" /> {resumeData.personal.phone}
            </a>
          )}
          
          {resumeData.personal.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" /> {resumeData.personal.location}
            </div>
          )}
          
          {resumeData.personal.website && (
            <a href={resumeData.personal.website.startsWith('http') ? resumeData.personal.website : `https://${resumeData.personal.website}`} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center text-primary hover:underline">
              <Globe className="h-4 w-4 mr-1" /> {resumeData.personal.website}
            </a>
          )}
          
          {resumeData.personal.linkedin && (
            <a href={resumeData.personal.linkedin.startsWith('http') ? resumeData.personal.linkedin : `https://${resumeData.personal.linkedin}`} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center text-primary hover:underline">
              <Linkedin className="h-4 w-4 mr-1" /> LinkedIn
            </a>
          )}
          
          {resumeData.personal.github && (
            <a href={resumeData.personal.github.startsWith('http') ? resumeData.personal.github : `https://${resumeData.personal.github}`} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center text-primary hover:underline">
              <Github className="h-4 w-4 mr-1" /> GitHub
            </a>
          )}
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="experience" className="w-full">
        <TabsList className="mb-4 w-full md:w-auto flex flex-wrap">
          <TabsTrigger value="experience" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> Experience
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" /> Education
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Code className="h-4 w-4" /> Skills
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <FolderKanban className="h-4 w-4" /> Projects
          </TabsTrigger>
          <TabsTrigger value="certifications" className="flex items-center gap-2">
            <Award className="h-4 w-4" /> Certifications
          </TabsTrigger>
          <TabsTrigger value="more" className="flex items-center gap-2">
            <div className="i-material-symbols-more-horiz w-4 h-4" /> More
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="experience" className="pt-2">
          {renderExperience()}
        </TabsContent>
        
        <TabsContent value="education" className="pt-2">
          {renderEducation()}
        </TabsContent>
        
        <TabsContent value="skills" className="pt-2">
          {renderSkills()}
        </TabsContent>
        
        <TabsContent value="projects" className="pt-2">
          {renderProjects()}
        </TabsContent>
        
        <TabsContent value="certifications" className="pt-2">
          {renderCertifications()}
        </TabsContent>
        
        <TabsContent value="more" className="pt-2">
          <Tabs defaultValue="languages">
            <TabsList className="mb-4">
              <TabsTrigger value="languages" className="flex items-center gap-2">
                <Languages className="h-4 w-4" /> Languages
              </TabsTrigger>
              <TabsTrigger value="publications" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Publications
              </TabsTrigger>
              <TabsTrigger value="awards" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" /> Awards
              </TabsTrigger>
              <TabsTrigger value="volunteer" className="flex items-center gap-2">
                <Heart className="h-4 w-4" /> Volunteer
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="languages">
              {renderLanguages()}
            </TabsContent>
            
            <TabsContent value="publications">
              {renderPublications()}
            </TabsContent>
            
            <TabsContent value="awards">
              {renderAwards()}
            </TabsContent>
            
            <TabsContent value="volunteer">
              {renderVolunteer()}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumePreview;