
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EngagementStats from '@/components/dashboard/EngagementStats';
import PostCard from '@/components/dashboard/PostCard';
import CommentSection from '@/components/dashboard/CommentSection';
import { useToast } from "@/components/ui/use-toast";
import linkedinService, { LinkedInPost } from '@/services/linkedinService';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, Award, Lock, ArrowRight, TrendingUp, Gift, Crown } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { cn } from "@/lib/utils";

const Index = () => {
  const { toast } = useToast();
  const { mode } = useMode();
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [streakDays, setStreakDays] = useState(4);
  const [showStreak, setShowStreak] = useState(false);
  const [freeCommentsRemaining, setFreeCommentsRemaining] = useState(3);
  const [nextMilestone, setNextMilestone] = useState(10);

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
    
    // Show upgrade prompt after user has been on the page for 45 seconds
    const timer = setTimeout(() => {
      if (hasInteracted) {
        setShowUpgradePrompt(true);
      }
    }, 45000);
    
    return () => clearTimeout(timer);
  }, [toast, hasInteracted]);

  const handleGenerateComment = (postId: string) => {
    setHasInteracted(true);
    setFreeCommentsRemaining(prev => Math.max(0, prev - 1));
    
    toast({
      title: "Comment generated",
      description: "Your AI comment has been created successfully",
      duration: 3000,
    });
    
    // Show streak notification after first interaction
    if (!showStreak) {
      setTimeout(() => {
        setShowStreak(true);
      }, 2000);
    }
    
    // Show upgrade prompt if user is running out of free comments
    if (freeCommentsRemaining <= 1) {
      setTimeout(() => {
        setShowUpgradePrompt(true);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader />
          
          {/* Activity Streak */}
          <AnimatePresence>
            {showStreak && (
              <motion.div 
                className="mb-8 p-4 border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-700/30 dark:text-amber-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Activity Streak: {streakDays} days!</h3>
                      <p className="text-sm text-muted-foreground">Keep engaging daily to unlock rewards</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{streakDays}/7 days</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full" 
                        style={{ width: `${(streakDays/7)*100}%` }}
                      ></div>
                    </div>
                    <div className="p-1.5 rounded-full bg-amber-100 text-amber-600">
                      <Gift className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <EngagementStats />
            
            {/* Free Usage Meter */}
            <div className="mb-8 p-5 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-lg">Your Free Usage</h3>
                <div 
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    freeCommentsRemaining > 1 
                      ? "bg-green-100 text-green-800" 
                      : "bg-amber-100 text-amber-800"
                  )}
                >
                  {freeCommentsRemaining} comments remaining today
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Daily Free Comments Used</span>
                  <span className="font-medium">{3-freeCommentsRemaining}/3</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      freeCommentsRemaining > 1 
                        ? "bg-green-500" 
                        : "bg-amber-500"
                    )}
                    style={{ width: `${((3-freeCommentsRemaining)/3)*100}%` }}
                  ></div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="upgrade"
                    size="sm"
                    className="gap-1.5"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Upgrade for unlimited</span>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Engagement Milestone */}
            <div className="mb-8 p-5 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">Next Milestone: {nextMilestone} Engagements</h3>
                  <p className="text-sm text-muted-foreground">You're making great progress!</p>
                </div>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full mb-2 dark:bg-gray-700">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: '70%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>7 engagements</span>
                <span>{nextMilestone} engagements</span>
              </div>
              <div className="mt-3 flex justify-center">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                  Unlock profile boost at {nextMilestone} engagements
                </Badge>
              </div>
            </div>
            
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
      
      {/* Upgrade Prompt */}
      <AnimatePresence>
        {showUpgradePrompt && (
          <motion.div 
            className="fixed bottom-5 right-5 max-w-md w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-purple-200 dark:border-purple-800 z-50"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <button 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowUpgradePrompt(false)}
            >
              ×
            </button>
            <div className="flex items-start gap-3">
              <div className={cn(
                "p-3 rounded-full mt-1",
                mode === 'assisted' 
                  ? "bg-assisted-muted text-assisted-DEFAULT" 
                  : "bg-autonomous-muted text-autonomous-DEFAULT"
              )}>
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Unlock Premium Features
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Upgrade now to generate unlimited AI comments and access exclusive features 
                  that can boost your LinkedIn engagement by up to 4x.
                </p>
                <div className="flex flex-col xs:flex-row gap-2">
                  <Button variant="cta" size="lg" className="flex-1 gap-1.5" pulse={true}>
                    <span>Try Premium Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1" onClick={() => setShowUpgradePrompt(false)}>
                    Maybe Later
                  </Button>
                </div>
                <div className="mt-3 text-xs text-center text-muted-foreground">
                  Over 10,000 professionals have upgraded this month
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Limited-Time Offer for New Users */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div 
            className="fixed bottom-5 left-5 p-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/40 dark:to-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg shadow-md max-w-xs"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, delay: 5 }}
          >
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-400 p-2 rounded-full">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Limited-Time Offer</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-2">
                  50% off Premium for your first 3 months. Offer expires in 23 hours.
                </p>
                <Button variant="success" size="sm" className="w-full">
                  Claim Discount
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default Index;
