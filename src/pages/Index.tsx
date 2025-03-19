
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EngagementStats from '@/components/dashboard/EngagementStats';
import PostCard from '@/components/dashboard/PostCard';
import CommentSection from '@/components/dashboard/CommentSection';
import { useToast } from "@/components/ui/use-toast";

// Sample data for post cards
const samplePosts = [
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

const Index = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState(samplePosts);

  const handleGenerateComment = (postId: string) => {
    // In a real app, this would call an API to generate a comment
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
