
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';
import { MessageCircle, RefreshCw, Send, ThumbsUp, Clock, Sparkles, Lightbulb, Brain } from 'lucide-react';
import linkedinService, { GeneratedComment, AISettings } from '@/services/linkedinService';
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CommentSection = () => {
  const { mode } = useMode();
  const { toast } = useToast();
  const [comments, setComments] = useState<GeneratedComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiSettings, setAiSettings] = useState<AISettings>({
    enableLearning: false,
    preferredTone: 'Professional',
    preferredLength: 'medium'
  });
  
  const tones = ['Professional', 'Casual', 'Enthusiastic', 'Insightful', 'Supportive'];
  const commentLengths = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' }
  ];

  useEffect(() => {
    // In a real app, we would fetch comments from the API
    setLoading(true);
    
    // Load AI settings
    const settings = linkedinService.getAISettings();
    setAiSettings(settings);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      setComments([
        {
          id: '1',
          postId: '1',
          text: "This is an excellent point about leadership in the digital age. I've seen firsthand how these principles can transform team dynamics and drive innovation.",
          tone: 'Professional',
          length: 'medium',
          status: mode === 'assisted' ? 'pending' : 'posted',
          timestamp: 'Just now'
        },
        {
          id: '2',
          postId: '2',
          text: "Great insights on market trends! The data you've shared aligns perfectly with what we're seeing in our industry. Would love to discuss this further.",
          tone: 'Engaging',
          length: 'medium',
          status: mode === 'assisted' ? 'pending' : 'posted',
          timestamp: '2 hours ago'
        },
        {
          id: '3',
          postId: '3',
          text: "Your perspective on sustainable business practices is spot-on. Companies that prioritize sustainability aren't just doing good—they're setting themselves up for long-term success.",
          tone: 'Supportive',
          length: 'medium',
          status: mode === 'assisted' ? 'scheduled' : 'scheduled',
          timestamp: 'Tomorrow at 9:00 AM'
        },
      ]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [mode]);

  const handleToneChange = (tone: string) => {
    const updatedSettings = { ...aiSettings, preferredTone: tone };
    setAiSettings(updatedSettings);
    linkedinService.saveAISettings(updatedSettings);
    
    toast({
      title: "Tone updated",
      description: `Your comment tone has been set to ${tone}`,
      duration: 2000,
    });
  };
  
  const handleLengthChange = (length: 'short' | 'medium' | 'long') => {
    const updatedSettings = { ...aiSettings, preferredLength: length };
    setAiSettings(updatedSettings);
    linkedinService.saveAISettings(updatedSettings);
    
    toast({
      title: "Comment length updated",
      description: `Your comment length has been set to ${length}`,
      duration: 2000,
    });
  };
  
  const toggleLearningMode = () => {
    const updatedSettings = { ...aiSettings, enableLearning: !aiSettings.enableLearning };
    setAiSettings(updatedSettings);
    linkedinService.saveAISettings(updatedSettings);
    
    toast({
      title: updatedSettings.enableLearning ? "Learning mode enabled" : "Learning mode disabled",
      description: updatedSettings.enableLearning 
        ? "AI will now learn from your comments to better match your style" 
        : "AI will no longer learn from your comments",
      duration: 2000,
    });
  };

  const regenerateComment = async (id: string) => {
    try {
      // Find the comment to regenerate
      const comment = comments.find(c => c.id === id);
      if (!comment) return;
      
      // In a real app, we would call the API to regenerate the comment
      const newCommentText = "I've been thinking about this exact topic recently! Your insights add a valuable perspective to the conversation. Looking forward to more content like this.";
      
      setComments(prev => 
        prev.map(comment => 
          comment.id === id 
            ? { 
                ...comment, 
                text: newCommentText,
                timestamp: 'Just now'
              } 
            : comment
        )
      );
      
      toast({
        title: "Comment regenerated",
        description: "Your AI comment has been updated",
        duration: 2000,
      });
    } catch (error) {
      console.error('Error regenerating comment:', error);
      toast({
        title: "Error",
        description: "Failed to regenerate comment",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const postComment = async (id: string) => {
    try {
      // In a real app, we would call the API to post the comment
      await linkedinService.postComment(id);
      
      setComments(prev => 
        prev.map(comment => 
          comment.id === id 
            ? { ...comment, status: 'posted' } 
            : comment
        )
      );
      
      toast({
        title: "Comment posted",
        description: "Your comment has been posted to LinkedIn",
        duration: 2000,
      });
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const scheduleComment = async (id: string) => {
    try {
      // In a real app, we would call the API to schedule the comment
      await linkedinService.scheduleComment(id, 'tomorrow-9am');
      
      setComments(prev => 
        prev.map(comment => 
          comment.id === id 
            ? { ...comment, status: 'scheduled', timestamp: 'Tomorrow at 9:00 AM' } 
            : comment
        )
      );
      
      toast({
        title: "Comment scheduled",
        description: "Your comment will be posted tomorrow at 9:00 AM",
        duration: 2000,
      });
    } catch (error) {
      console.error('Error scheduling comment:', error);
      toast({
        title: "Error",
        description: "Failed to schedule comment",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <div className="mb-12">
        <div className="flex flex-col space-y-2 mb-6">
          <h2 className="text-2xl font-semibold">AI-Powered Comments</h2>
          <p className="text-muted-foreground">Loading comments...</p>
        </div>
        <div className="h-40 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const hasSamples = linkedinService.getWritingSamples().length > 0;
  const hasHistory = linkedinService.getCommentHistory().length > 0;
  const hasPersonalization = (hasSamples || (hasHistory && aiSettings.enableLearning));

  return (
    <div className="mb-12">
      <div className="flex flex-col space-y-2 mb-6">
        <h2 className="text-2xl font-semibold">AI-Powered Comments</h2>
        <p className="text-muted-foreground">
          {mode === 'assisted' 
            ? 'Review and post AI-generated comments manually' 
            : 'Comments are automatically generated and posted for you'}
        </p>
      </div>

      <div className="glass-card rounded-xl overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              AI Comment Preferences
            </h3>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Learning mode:</span>
              <button
                onClick={toggleLearningMode}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  aiSettings.enableLearning 
                    ? "bg-purple-600" 
                    : "bg-slate-200 dark:bg-slate-700"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    aiSettings.enableLearning ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Comment Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-all duration-200",
                      aiSettings.preferredTone === tone 
                        ? mode === 'assisted' 
                          ? "bg-assisted-DEFAULT text-white"
                          : "bg-autonomous-DEFAULT text-white"
                        : "bg-secondary hover:bg-secondary/80"
                    )}
                    onClick={() => handleToneChange(tone)}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Comment Length</label>
              <Select 
                value={aiSettings.preferredLength} 
                onValueChange={(value: 'short' | 'medium' | 'long') => handleLengthChange(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select comment length" />
                </SelectTrigger>
                <SelectContent>
                  {commentLengths.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {hasPersonalization && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800 text-sm">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <p>
                AI comments using personalization from: 
                {hasSamples && <span className="font-medium"> Writing samples</span>}
                {hasSamples && hasHistory && aiSettings.enableLearning && <span> and</span>}
                {hasHistory && aiSettings.enableLearning && <span className="font-medium"> Comment history</span>}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            className="glass-card rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className={cn(
                    "w-5 h-5",
                    mode === 'assisted' ? "text-assisted-DEFAULT" : "text-autonomous-DEFAULT"
                  )} />
                  <h3 className="font-semibold">AI-Generated Comment</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary">
                    {comment.tone}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary">
                    {comment.length || 'Medium'}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {comment.timestamp}
                  </span>
                </div>
              </div>
              
              <div className="bg-secondary/40 rounded-lg p-4 mb-4">
                <p className="text-sm">{comment.text}</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 hover:bg-secondary transition-all duration-200 text-sm"
                  onClick={() => regenerateComment(comment.id)}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate
                </button>
                
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 hover:bg-secondary transition-all duration-200 text-sm"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Improve
                </button>
                
                {mode === 'assisted' && comment.status === 'pending' && (
                  <>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-assisted-DEFAULT text-white hover:bg-opacity-90 transition-all duration-200 text-sm ml-auto"
                      onClick={() => postComment(comment.id)}
                    >
                      <Send className="w-3.5 h-3.5" />
                      Post Now
                    </button>
                    
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-secondary transition-all duration-200 text-sm"
                      onClick={() => scheduleComment(comment.id)}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Schedule
                    </button>
                  </>
                )}
                
                {comment.status === 'posted' && (
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Posted
                  </span>
                )}
                
                {comment.status === 'scheduled' && (
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    Scheduled
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
