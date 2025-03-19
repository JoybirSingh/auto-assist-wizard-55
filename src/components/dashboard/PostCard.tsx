
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';
import { MessageCircle, ThumbsUp, ArrowRight, Check, Award } from 'lucide-react';

interface Post {
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

interface PostCardProps {
  post: Post;
  index: number;
  onGenerateComment: (postId: string) => void;
}

const PostCard = ({ post, index, onGenerateComment }: PostCardProps) => {
  const { mode } = useMode();
  const [isGeneratingComment, setIsGeneratingComment] = useState(false);
  const [commentGenerated, setCommentGenerated] = useState(false);

  const handleGenerateComment = () => {
    setIsGeneratingComment(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGeneratingComment(false);
      setCommentGenerated(true);
      onGenerateComment(post.id);
    }, 1500);
  };

  return (
    <motion.div 
      className="glass-card rounded-xl overflow-hidden card-shine"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
          <div>
            <h3 className="font-semibold">{post.author.name}</h3>
            <p className="text-sm text-muted-foreground">{post.author.title}</p>
          </div>
        </div>
        
        <p className="mb-6">{post.content}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{post.comments}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium">
              {post.engagementScore}/10 Score
            </span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 px-6 py-4 bg-secondary/50">
        {commentGenerated ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-green-100">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-medium">
                {mode === 'assisted' ? 'Comment generated' : 'Comment posted automatically'}
              </span>
            </div>
            <button 
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
              onClick={() => setCommentGenerated(false)}
            >
              {mode === 'assisted' ? 'View' : 'View details'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            className={cn(
              "w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300",
              isGeneratingComment ? "opacity-80 cursor-not-allowed" : "hover:bg-opacity-90",
              mode === 'assisted' 
                ? "bg-assisted-DEFAULT text-white" 
                : "bg-autonomous-DEFAULT text-white"
            )}
            onClick={handleGenerateComment}
            disabled={isGeneratingComment}
          >
            {isGeneratingComment ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4" />
                <span>
                  {mode === 'assisted' 
                    ? 'Generate Comment Suggestion' 
                    : 'Auto-Generate & Post Comment'}
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default PostCard;
