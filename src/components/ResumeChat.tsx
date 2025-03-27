
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft, Bot, User, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

type ResumeChatProps = {
  resumeData: ParsedResume;
  onClose: () => void;
};

const ResumeChat: React.FC<ResumeChatProps> = ({ resumeData, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi there! I've analyzed your resume and I'm ready to help customize your website. You can ask me to emphasize certain skills, modify your summary, or suggest a specific style for your site. What would you like to customize?`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response (in a real app, this would call an AI service)
    setTimeout(() => {
      const aiResponses = [
        `I can definitely help with that! Based on your resume, I recommend emphasizing your ${resumeData.skills?.[0]} and ${resumeData.skills?.[1]} skills, as they're particularly relevant in today's job market.`,
        `Great idea! I've updated your website to highlight your experience at ${resumeData.experience?.[0]?.company}. The leadership skills you demonstrated there will really stand out to potential employers.`,
        `I've applied a modern, minimalist design that works well for your ${resumeData.experience?.[0]?.title} background. Would you like to see a preview?`,
        `Based on your experience in ${resumeData.experience?.[0]?.description?.[0]}, I've added a special projects section to showcase your achievements in this area.`,
        `I've emphasized your ${resumeData.education?.[0]?.degree} from ${resumeData.education?.[0]?.institution} as it's particularly relevant to your career path.`
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      toast({
        title: "AI Update",
        description: "Your website has been customized based on your request",
      });
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSuggestions = () => {
    return [
      `Make my website more creative and artistic`,
      `Emphasize my ${resumeData.skills?.[0]} skills`,
      `Use a professional, corporate style`,
      `Highlight my experience at ${resumeData.experience?.[0]?.company}`,
      `Create a minimalist design`,
    ];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <Card className="max-w-3xl mx-auto lovable-card animate-fade-up">
      <div className="p-4 border-b border-lovable-soft-purple/50 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-lovable-purple hover:text-lovable-secondary-purple">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-lovable-purple" />
          AI Resume Customization
        </h3>
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>
      
      <div className="h-[500px] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[80%] p-3 rounded-lg 
                ${message.sender === 'user' 
                  ? 'bg-lovable-purple text-white rounded-br-none' 
                  : 'bg-lovable-soft-purple text-foreground rounded-bl-none'}
              `}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === 'ai' ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="text-xs opacity-70">
                  {message.sender === 'ai' ? 'AI Assistant' : 'You'}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-lovable-soft-purple p-3 rounded-lg rounded-bl-none max-w-[80%]">
              <div className="flex items-center gap-2 mb-1">
                <Bot className="h-4 w-4" />
                <span className="text-xs opacity-70">AI Assistant</span>
              </div>
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-lovable-purple rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-lovable-purple rounded-full animate-bounce animation-delay-200"></div>
                <div className="h-2 w-2 bg-lovable-purple rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          {getSuggestions().map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs px-3 py-1 bg-lovable-soft-purple text-lovable-purple rounded-full hover:bg-lovable-soft-purple/70 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your customization request..."
            className="flex-1 lovable-input"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage} 
            disabled={!input.trim()} 
            className="bg-lovable-purple hover:bg-lovable-secondary-purple"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ResumeChat;
