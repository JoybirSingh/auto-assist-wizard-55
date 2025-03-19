
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';
import { MessageCircle, RefreshCw, Send, ThumbsUp, Clock } from 'lucide-react';

interface Comment {
  id: string;
  postId: string;
  text: string;
  tone: string;
  status: 'pending' | 'posted' | 'scheduled';
  timestamp: string;
}

const CommentSection = () => {
  const { mode } = useMode();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      postId: '1',
      text: "This is an excellent point about leadership in the digital age. I've seen firsthand how these principles can transform team dynamics and drive innovation.",
      tone: 'Professional',
      status: mode === 'assisted' ? 'pending' : 'posted',
      timestamp: 'Just now'
    },
    {
      id: '2',
      postId: '2',
      text: "Great insights on market trends! The data you've shared aligns perfectly with what we're seeing in our industry. Would love to discuss this further.",
      tone: 'Engaging',
      status: mode === 'assisted' ? 'pending' : 'posted',
      timestamp: '2 hours ago'
    },
    {
      id: '3',
      postId: '3',
      text: "Your perspective on sustainable business practices is spot-on. Companies that prioritize sustainability aren't just doing good—they're setting themselves up for long-term success.",
      tone: 'Supportive',
      status: mode === 'assisted' ? 'scheduled' : 'scheduled',
      timestamp: 'Tomorrow at 9:00 AM'
    },
  ]);

  const [selectedTone, setSelectedTone] = useState('Professional');
  const tones = ['Professional', 'Casual', 'Enthusiastic', 'Insightful', 'Supportive'];

  const regenerateComment = (id: string) => {
    // In a real app, this would call an API to regenerate the comment
    console.log(`Regenerating comment ${id}`);
    // Simulate API call with timeout
    setTimeout(() => {
      setComments(prev => 
        prev.map(comment => 
          comment.id === id 
            ? { 
                ...comment, 
                text: "I've been thinking about this exact topic recently! Your insights add a valuable perspective to the conversation. Looking forward to more content like this.",
                timestamp: 'Just now'
              } 
            : comment
        )
      );
    }, 1000);
  };

  const postComment = (id: string) => {
    // In a real app, this would call an API to post the comment
    console.log(`Posting comment ${id}`);
    setComments(prev => 
      prev.map(comment => 
        comment.id === id 
          ? { ...comment, status: 'posted' } 
          : comment
      )
    );
  };

  const scheduleComment = (id: string) => {
    // In a real app, this would call an API to schedule the comment
    console.log(`Scheduling comment ${id}`);
    setComments(prev => 
      prev.map(comment => 
        comment.id === id 
          ? { ...comment, status: 'scheduled', timestamp: 'Tomorrow at 9:00 AM' } 
          : comment
      )
    );
  };

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
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Comment Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone) => (
              <button
                key={tone}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-all duration-200",
                  selectedTone === tone 
                    ? mode === 'assisted' 
                      ? "bg-assisted-DEFAULT text-white"
                      : "bg-autonomous-DEFAULT text-white"
                    : "bg-secondary hover:bg-secondary/80"
                )}
                onClick={() => setSelectedTone(tone)}
              >
                {tone}
              </button>
            ))}
          </div>
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
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                    Posted
                  </span>
                )}
                
                {comment.status === 'scheduled' && (
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
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
