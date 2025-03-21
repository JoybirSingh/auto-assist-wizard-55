
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '@/context/ModeContext';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { MessageCircle, ThumbsUp, ArrowRight, Check, Award, Sparkles, Share2, Bookmark } from 'lucide-react';
import linkedinService from '@/services/linkedinService';
import { useToast } from "@/components/ui/use-toast";

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
  const { theme } = useTheme();
  const { toast } = useToast();
  const [isGeneratingComment, setIsGeneratingComment] = useState(false);
  const [commentGenerated, setCommentGenerated] = useState(false);
  const [hasMimicryEnabled, setHasMimicryEnabled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    // Check if there are any writing samples for style mimicry
    const samples = linkedinService.getWritingSamples();
    setHasMimicryEnabled(samples.length > 0);
  }, []);

  const handleGenerateComment = async () => {
    setIsGeneratingComment(true);
    
    try {
      const selectedTone = localStorage.getItem('selectedTone') || 'Professional';
      
      // Call API to generate comment
      await linkedinService.generateComment(post.id, selectedTone);
      
      setCommentGenerated(true);
      onGenerateComment(post.id);
      
      // If in autonomous mode, automatically post the comment
      if (mode === 'autonomous') {
        toast({
          title: "Comment posted",
          description: "Your AI comment has been automatically posted",
          duration: 3000,
        });
      } else {
        toast({
          title: "Comment generated",
          description: "Your AI comment has been created successfully",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error generating comment:', error);
      toast({
        title: "Error",
        description: "Failed to generate comment",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsGeneratingComment(false);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Post removed from bookmarks" : "Post bookmarked",
      description: isBookmarked ? "You can add it back anytime" : "You can find it in your saved items",
      duration: 2000,
    });
  };

  return (
    <motion.div 
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300",
        theme === 'dark' 
          ? "bg-gray-800/60 shadow-lg hover:shadow-indigo-500/10 border border-gray-700/50" 
          : "glass-card card-shine"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={() => setShowActions(true)}
      onHoverEnd={() => setShowActions(false)}
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <motion.img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className={cn(
              "w-12 h-12 rounded-full object-cover",
              theme === 'dark' ? "border-2 border-gray-700" : "border-2 border-white"
            )}
            whileHover={{ scale: 1.05 }}
          />
          <div>
            <h3 className="font-semibold">{post.author.name}</h3>
            <p className={cn(
              "text-sm",
              theme === 'dark' ? "text-gray-400" : "text-muted-foreground"
            )}>{post.author.title}</p>
          </div>
        </div>
        
        <p className="mb-6">{post.content}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex items-center gap-1 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThumbsUp className={cn(
                "w-4 h-4",
                theme === 'dark' ? "text-gray-400" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-sm",
                theme === 'dark' ? "text-gray-400" : "text-muted-foreground"
              )}>{post.likes}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className={cn(
                "w-4 h-4",
                theme === 'dark' ? "text-gray-400" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-sm",
                theme === 'dark' ? "text-gray-400" : "text-muted-foreground"
              )}>{post.comments}</span>
            </motion.div>
          </div>
          
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium">
              {post.engagementScore}/10 Score
            </span>
          </div>
        </div>

        <motion.div 
          className={cn(
            "mt-4 flex items-center justify-between opacity-0",
            showActions && "opacity-100"
          )}
          animate={{ opacity: showActions ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex gap-3">
            <motion.button
              className={cn(
                "p-1.5 rounded-full",
                theme === 'dark' ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              className={cn(
                "p-1.5 rounded-full",
                isBookmarked 
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" 
                  : theme === 'dark' ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleBookmark}
            >
              <Bookmark className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      <div className={cn(
        "border-t px-6 py-4",
        theme === 'dark' ? "border-gray-700 bg-gray-800/80" : "border-gray-100 bg-secondary/50"
      )}>
        {commentGenerated ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn(
                "p-1.5 rounded-full",
                theme === 'dark' ? "bg-green-900/40 text-green-400" : "bg-green-100 text-green-600"
              )}>
                <Check className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">
                {mode === 'assisted' ? 'Comment generated' : 'Comment posted automatically'}
              </span>
            </div>
            <motion.button 
              className={cn(
                "text-sm flex items-center gap-1 transition-colors",
                theme === 'dark' ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
              )}
              onClick={() => setCommentGenerated(false)}
              whileHover={{ x: 3 }}
            >
              {mode === 'assisted' ? 'View' : 'View details'}
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        ) : (
          <motion.button
            className={cn(
              "w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300",
              isGeneratingComment ? "opacity-80 cursor-not-allowed" : "hover:bg-opacity-90",
              theme === 'dark' 
                ? mode === 'assisted' 
                  ? "bg-assisted-DEFAULT/90 text-white hover:bg-assisted-DEFAULT" 
                  : "bg-autonomous-DEFAULT/90 text-white hover:bg-autonomous-DEFAULT" 
                : mode === 'assisted' 
                  ? "bg-assisted-DEFAULT text-white" 
                  : "bg-autonomous-DEFAULT text-white"
            )}
            onClick={handleGenerateComment}
            disabled={isGeneratingComment}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isGeneratingComment ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                <span>Generating...</span>
              </>
            ) : (
              <>
                {hasMimicryEnabled ? <Sparkles className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                <span>
                  {mode === 'assisted' 
                    ? `Generate ${hasMimicryEnabled ? 'Personalized' : ''} Comment` 
                    : `Auto-Generate & Post ${hasMimicryEnabled ? 'Personalized' : ''} Comment`}
                </span>
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default PostCard;
