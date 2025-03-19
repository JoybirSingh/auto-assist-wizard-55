
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EngagementStats from '@/components/dashboard/EngagementStats';
import PostCard from '@/components/dashboard/PostCard';
import CommentSection from '@/components/dashboard/CommentSection';
import { useToast } from "@/components/ui/use-toast";
import linkedinService, { LinkedInPost } from '@/services/linkedinService';

const Index = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await linkedinService.fetchRecommendedPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error",
          description: "Failed to fetch recommended posts",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  const handleGenerateComment = (postId: string) => {
    toast({
      title: "Comment generated",
      description: "Your AI comment has been created successfully",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <EngagementStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div>
                <div className="flex flex-col space-y-2 mb-6">
                  <h2 className="text-2xl font-semibold">Recommended Posts</h2>
                  <p className="text-muted-foreground">
                    High-engagement potential posts for your network
                  </p>
                </div>
                
                {loading ? (
                  <div className="h-40 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {posts.map((post, index) => (
                      <PostCard 
                        key={post.id} 
                        post={post} 
                        index={index}
                        onGenerateComment={handleGenerateComment}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <CommentSection />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
