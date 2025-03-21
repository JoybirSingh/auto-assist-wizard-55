
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import linkedinService, { ScheduledPost } from '@/services/linkedinService';

const ScheduledPosts = () => {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const scheduledPosts = linkedinService.getScheduledPosts();
        setPosts(scheduledPosts);
      } catch (error) {
        console.error('Error fetching scheduled posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </Badge>
        );
      case 'posted':
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Posted
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };
  
  if (isLoading) {
    return (
      <motion.div 
        className="glass-card rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <Calendar className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-medium">Scheduled Posts</h2>
        </div>
        
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </motion.div>
    );
  }
  
  if (posts.length === 0) {
    return (
      <motion.div 
        className="glass-card rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <Calendar className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-medium">Scheduled Posts</h2>
        </div>
        
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Calendar className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Scheduled Posts</h3>
          <p className="text-muted-foreground">
            You don't have any posts scheduled for publication yet.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="glass-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <Calendar className="w-5 h-5 text-orange-500" />
        <h2 className="text-xl font-medium">Scheduled Posts</h2>
      </div>
      
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div 
            key={post.id}
            className="border rounded-lg overflow-hidden dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="bg-secondary/40 dark:bg-gray-800/50 p-3 border-b dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusBadge(post.status)}
                <span className="text-sm font-medium flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
                  {format(parseISO(post.scheduledTime), 'PP p')}
                </span>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 dark:text-red-400">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="p-4">
              <p className="text-sm mb-3">{post.content}</p>
              
              {post.prediction && (
                <div className="flex flex-wrap gap-2 items-center mt-2">
                  <div className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full flex items-center",
                    post.prediction.engagementScore >= 8 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                      : post.prediction.engagementScore >= 6 
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" 
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  )}>
                    Score: {post.prediction.engagementScore}/10
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Est. Likes: {post.prediction.estimatedLikes}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Est. Comments: {post.prediction.estimatedComments}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ScheduledPosts;
