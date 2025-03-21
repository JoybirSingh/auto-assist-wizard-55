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
  length?: 'short' | 'medium' | 'long';
  status: 'pending' | 'posted' | 'scheduled';
  timestamp: string;
}

export interface WritingSample {
  id: string;
  content: string;
  createdAt: string;
}

export interface PostPrediction {
  engagementScore: number;
  estimatedLikes: number;
  estimatedComments: number;
  estimatedViews: number;
  suggestions: string[];
}

export interface ScheduledPost {
  id: string;
  content: string;
  scheduledTime: string;
  status: 'scheduled' | 'posted' | 'failed';
  prediction?: PostPrediction;
}

export interface AISettings {
  enableLearning: boolean;
  preferredTone: string;
  preferredLength: 'short' | 'medium' | 'long';
}

// Mock data function - in a real app, this would connect to a backend
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class LinkedInService {
  private static instance: LinkedInService;
  private apiKey: string | null = null;
  private mockMode = true; // For demo purposes
  private writingSamples: WritingSample[] = [];
  private commentHistory: GeneratedComment[] = [];
  private aiSettings: AISettings = {
    enableLearning: false,
    preferredTone: 'Professional',
    preferredLength: 'medium'
  };
  private scheduledPosts: ScheduledPost[] = [];

  private constructor() {
    // Load writing samples from localStorage if they exist
    const savedSamples = localStorage.getItem('linkedin_writing_samples');
    if (savedSamples) {
      this.writingSamples = JSON.parse(savedSamples);
    }
    
    // Load AI settings from localStorage
    const savedSettings = localStorage.getItem('linkedin_ai_settings');
    if (savedSettings) {
      this.aiSettings = JSON.parse(savedSettings);
    }
    
    // Load comment history from localStorage
    const savedHistory = localStorage.getItem('linkedin_comment_history');
    if (savedHistory) {
      this.commentHistory = JSON.parse(savedHistory);
    }
    
    // Load scheduled posts from localStorage
    const savedPosts = localStorage.getItem('linkedin_scheduled_posts');
    if (savedPosts) {
      this.scheduledPosts = JSON.parse(savedPosts);
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

  // Save AI settings
  saveAISettings(settings: AISettings): void {
    this.aiSettings = settings;
    localStorage.setItem('linkedin_ai_settings', JSON.stringify(settings));
    console.log('AI settings saved:', settings);
  }
  
  // Get AI settings
  getAISettings(): AISettings {
    return this.aiSettings;
  }

  // Add comment to history for learning
  addCommentToHistory(comment: GeneratedComment): void {
    if (this.aiSettings.enableLearning) {
      this.commentHistory.push(comment);
      localStorage.setItem('linkedin_comment_history', JSON.stringify(this.commentHistory));
      console.log('Comment added to history for learning');
    }
  }
  
  // Get comment history
  getCommentHistory(): GeneratedComment[] {
    return [...this.commentHistory];
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
  async generateComment(postId: string, tone: string, length: 'short' | 'medium' | 'long' = 'medium'): Promise<GeneratedComment> {
    if (this.mockMode) {
      // Simulate API delay
      await delay(1500);
      
      // Get writing samples for style mimicry if available
      const hasSamples = this.writingSamples.length > 0;
      const hasHistory = this.aiSettings.enableLearning && this.commentHistory.length > 0;
      let commentText = '';
      
      // Generate different comment texts based on length
      const shortComment = `This is a brief ${tone} comment on your insightful post.`;
      const mediumComment = `This is a generated ${tone} comment for post ID ${postId}. I've found your insights quite valuable and would love to discuss this topic further.`;
      const longComment = `This is a comprehensive ${tone} comment that would provide in-depth analysis on the topic at hand. In a real implementation, this would be created by an AI model trained on professional content that understands the nuances of your post and provides thoughtful, relevant feedback that contributes meaningfully to the conversation while reflecting your personal writing style based on your past comments and samples.`;
      
      // Select text based on requested length
      switch(length) {
        case 'short':
          commentText = shortComment;
          break;
        case 'long':
          commentText = longComment;
          break;
        case 'medium':
        default:
          commentText = mediumComment;
      }
      
      // Add personalization based on learning and samples
      if (hasSamples && hasHistory) {
        commentText += ' (Personalized based on your writing samples AND comment history)';
      } else if (hasSamples) {
        commentText += ' (Personalized based on your writing samples)';
      } else if (hasHistory) {
        commentText += ' (Personalized based on your comment history)';
      }
      
      // Return a mock generated comment with properly typed status
      const comment: GeneratedComment = {
        id: `comment-${Date.now()}`,
        postId,
        text: commentText,
        tone,
        length,
        status: 'pending',
        timestamp: 'Just now'
      };
      
      // Add to history if learning is enabled
      if (this.aiSettings.enableLearning) {
        this.addCommentToHistory(comment);
      }
      
      return comment;
    } else {
      // Real implementation would go here
      if (!this.apiKey) {
        throw new Error('API key not set');
      }
      
      try {
        // Get writing samples for style mimicry
        const samples = this.getWritingSamples();
        const history = this.aiSettings.enableLearning ? this.getCommentHistory() : [];
        
        const response = await fetch('https://api.example.com/linkedin/generate-comment', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            postId, 
            tone,
            length,
            writingSamples: samples,
            commentHistory: history,
            useLearningMode: this.aiSettings.enableLearning
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to generate comment');
        }
        
        const generatedComment = await response.json();
        
        // Add to history if learning is enabled
        if (this.aiSettings.enableLearning) {
          this.addCommentToHistory(generatedComment);
        }
        
        return generatedComment;
      } catch (error) {
        console.error('Error generating comment:', error);
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

  // Create and schedule a new post
  async createPost(content: string, scheduledTime: string): Promise<ScheduledPost> {
    if (this.mockMode) {
      // Simulate API delay
      await delay(1500);
      
      // Generate a prediction for the post
      const prediction = await this.predictPostPerformance(content);
      
      // Create a new scheduled post
      const post: ScheduledPost = {
        id: `post-${Date.now()}`,
        content,
        scheduledTime,
        status: 'scheduled',
        prediction
      };
      
      // Add to scheduled posts
      this.scheduledPosts.push(post);
      localStorage.setItem('linkedin_scheduled_posts', JSON.stringify(this.scheduledPosts));
      
      return post;
    } else {
      // Real implementation would go here
      if (!this.apiKey) {
        throw new Error('API key not set');
      }
      
      try {
        // Get prediction for the post
        const prediction = await this.predictPostPerformance(content);
        
        const response = await fetch('https://api.example.com/linkedin/create-post', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            content, 
            scheduledTime,
            prediction
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to create post');
        }
        
        const createdPost = await response.json();
        
        // Add to scheduled posts
        this.scheduledPosts.push(createdPost);
        localStorage.setItem('linkedin_scheduled_posts', JSON.stringify(this.scheduledPosts));
        
        return createdPost;
      } catch (error) {
        console.error('Error creating post:', error);
        throw error;
      }
    }
  }
  
  // Get all scheduled posts
  getScheduledPosts(): ScheduledPost[] {
    return [...this.scheduledPosts];
  }
  
  // Predict post performance
  async predictPostPerformance(content: string): Promise<PostPrediction> {
    if (this.mockMode) {
      // Simulate API delay
      await delay(1500);
      
      // Generate random metrics for prediction
      const engagementScore = Math.floor(Math.random() * 5) + 5; // 5-10
      const estimatedLikes = Math.floor(Math.random() * 50) + 50; // 50-100
      const estimatedComments = Math.floor(Math.random() * 20) + 10; // 10-30
      const estimatedViews = Math.floor(Math.random() * 500) + 500; // 500-1000
      
      // Generate random suggestions
      const suggestions = [
        'Add a question at the end to encourage engagement',
        'Include relevant hashtags to reach a wider audience',
        'Mention specific people or companies to increase visibility',
        'Add data or statistics to support your points',
        'Include a call to action to prompt responses'
      ];
      
      // Select 2-3 random suggestions
      const randomSuggestions = [];
      const count = Math.floor(Math.random() * 2) + 2; // 2-3
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * suggestions.length);
        randomSuggestions.push(suggestions[randomIndex]);
        suggestions.splice(randomIndex, 1);
      }
      
      return {
        engagementScore,
        estimatedLikes,
        estimatedComments,
        estimatedViews,
        suggestions: randomSuggestions
      };
    } else {
      // Real implementation would go here
      if (!this.apiKey) {
        throw new Error('API key not set');
      }
      
      try {
        const response = await fetch('https://api.example.com/linkedin/predict-post', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content })
        });
        
        if (!response.ok) {
          throw new Error('Failed to predict post performance');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error predicting post performance:', error);
        throw error;
      }
    }
  }
}

export default LinkedInService.getInstance();
