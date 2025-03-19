import { useToast } from "@/hooks/use-toast";

// Types for LinkedIn interactions
export interface LinkedInPost {
  id: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  content: string;
  likes: number;
  comments: number;
  engagementScore: number;
}

export interface GeneratedComment {
  id: string;
  postId: string;
  text: string;
  tone: string;
  status: 'pending' | 'posted' | 'scheduled';
  timestamp: string;
}

export interface WritingSample {
  id: string;
  content: string;
  createdAt: string;
}

// Mock data function - in a real app, this would connect to a backend
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class LinkedInService {
  private static instance: LinkedInService;
  private apiKey: string | null = null;
  private mockMode = true; // For demo purposes
  private writingSamples: WritingSample[] = [];

  private constructor() {
    // Load writing samples from localStorage if they exist
    const savedSamples = localStorage.getItem('linkedin_writing_samples');
    if (savedSamples) {
      this.writingSamples = JSON.parse(savedSamples);
    }
  }

  public static getInstance(): LinkedInService {
    if (!LinkedInService.instance) {
      LinkedInService.instance = new LinkedInService();
    }
    return LinkedInService.instance;
  }

  setApiKey(key: string): void {
    this.apiKey = key;
    localStorage.setItem('linkedin_api_key', key);
    console.log('LinkedIn API key set');
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('linkedin_api_key');
    }
    return this.apiKey;
  }

  // Add writing sample for style mimicry
  addWritingSample(content: string): WritingSample {
    const sample: WritingSample = {
      id: `sample-${Date.now()}`,
      content: content.trim(),
      createdAt: new Date().toISOString()
    };
    
    this.writingSamples.push(sample);
    this.saveWritingSamples();
    
    return sample;
  }
  
  // Get all writing samples
  getWritingSamples(): WritingSample[] {
    return [...this.writingSamples];
  }
  
  // Delete a writing sample
  deleteWritingSample(id: string): boolean {
    const initialLength = this.writingSamples.length;
    this.writingSamples = this.writingSamples.filter(sample => sample.id !== id);
    
    if (this.writingSamples.length !== initialLength) {
      this.saveWritingSamples();
      return true;
    }
    
    return false;
  }
  
  // Save writing samples to localStorage
  private saveWritingSamples(): void {
    localStorage.setItem('linkedin_writing_samples', JSON.stringify(this.writingSamples));
  }

  // Fetch recommended posts - in real app, would call LinkedIn API or scraper
  async fetchRecommendedPosts(): Promise<LinkedInPost[]> {
    if (this.mockMode) {
      // Simulate API delay
      await delay(1500);
      return [
        {
          id: '1',
          author: {
            name: 'Sarah Johnson',
            title: 'CEO at TechVision Innovations',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
          content: 'Leadership in the digital age requires a balance of technical knowledge and emotional intelligence. What leadership qualities do you think are most important in today\'s rapidly evolving business landscape?',
          likes: 127,
          comments: 43,
          engagementScore: 9.2,
        },
        {
          id: '2',
          author: {
            name: 'Mark Thompson',
            title: 'Product Manager at GrowthLabs',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          content: 'Just released our latest market research report on AI adoption in enterprise companies. The data shows a 47% increase in implementation over the last year. What are your experiences with AI in your organization?',
          likes: 85,
          comments: 27,
          engagementScore: 8.7,
        },
        {
          id: '3',
          author: {
            name: 'Elena Rivera',
            title: 'Director of Sustainability at EcoFuture',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          },
          content: 'Sustainability isn\'t just good for the planet—it\'s good for business. Our new case study reveals how companies with strong ESG initiatives outperformed their peers by 17% on average last quarter.',
          likes: 156,
          comments: 52,
          engagementScore: 9.5,
        },
      ];
    } else {
      // Real implementation would go here
      if (!this.apiKey) {
        throw new Error('API key not set');
      }
      
      try {
        const response = await fetch('https://api.example.com/linkedin/recommended-posts', {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Remove toast call from here - it should only be called from components
        return [];
      }
    }
  }

  // Generate comment for a post with style mimicry
  async generateComment(postId: string, tone: string): Promise<GeneratedComment> {
    if (this.mockMode) {
      // Simulate API delay
      await delay(1500);
      
      // Get writing samples for style mimicry if available
      const hasSamples = this.writingSamples.length > 0;
      let commentText = '';
      
      if (hasSamples) {
        // In a real implementation, this would use an AI model that considers the writing samples
        // For the mock implementation, we'll just create a comment that mentions style mimicry
        commentText = `This is a generated ${tone} comment for post ID ${postId} that mimics your personal writing style based on ${this.writingSamples.length} sample(s). In a real implementation, the AI would analyze your samples and generate text that sounds like you wrote it.`;
      } else {
        commentText = `This is a generated ${tone} comment for post ID ${postId}. In a real implementation, this would be created by an AI model trained on professional content.`;
      }
      
      // Return a mock generated comment
      return {
        id: `comment-${Date.now()}`,
        postId,
        text: commentText,
        tone,
        status: 'pending',
        timestamp: 'Just now'
      };
    } else {
      // Real implementation would go here
      if (!this.apiKey) {
        throw new Error('API key not set');
      }
      
      try {
        // Get writing samples for style mimicry
        const samples = this.getWritingSamples();
        
        const response = await fetch('https://api.example.com/linkedin/generate-comment', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            postId, 
            tone,
            writingSamples: samples // Send writing samples to the API
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to generate comment');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error generating comment:', error);
        // Remove toast call from here
        throw error;
      }
    }
  }

  // Post a comment to LinkedIn
  async postComment(commentId: string): Promise<boolean> {
    if (this.mockMode) {
      // Simulate API delay
      await delay(1500);
      return true;
    } else {
      // Real implementation would go here
      if (!this.apiKey) {
        throw new Error('API key not set');
      }
      
      try {
        const response = await fetch('https://api.example.com/linkedin/post-comment', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ commentId })
        });
        
        if (!response.ok) {
          throw new Error('Failed to post comment');
        }
        
        return true;
      } catch (error) {
        console.error('Error posting comment:', error);
        // Remove toast call from here
        return false;
      }
    }
  }

  // Schedule a comment for posting later
  async scheduleComment(commentId: string, scheduledTime: string): Promise<boolean> {
    if (this.mockMode) {
      // Simulate API delay
      await delay(1500);
      return true;
    } else {
      // Real implementation would go here
      if (!this.apiKey) {
        throw new Error('API key not set');
      }
      
      try {
        const response = await fetch('https://api.example.com/linkedin/schedule-comment', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ commentId, scheduledTime })
        });
        
        if (!response.ok) {
          throw new Error('Failed to schedule comment');
        }
        
        return true;
      } catch (error) {
        console.error('Error scheduling comment:', error);
        // Remove toast call from here
        return false;
      }
    }
  }
}

export default LinkedInService.getInstance();
