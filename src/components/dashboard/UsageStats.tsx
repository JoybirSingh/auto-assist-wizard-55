
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  TrendingUp, 
  MessageSquare, 
  BarChart2, 
  Zap,
  Crown,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMode } from '@/context/ModeContext';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const UsageStats = () => {
  const { mode } = useMode();
  const { toast } = useToast();
  
  const usageData = {
    comments: {
      used: 38,
      total: 40,
      percentUsed: 95
    },
    analysis: {
      used: 12,
      total: 15,
      percentUsed: 80
    },
    content: {
      used: 8,
      total: 10,
      percentUsed: 80
    }
  };
  
  const handleUpgrade = () => {
    toast({
      title: "Upgrade Options",
      description: "You can upgrade your plan in the subscription tab of settings.",
      duration: 3000,
    });
  };
  
  return (
    <motion.div
      className="glass-card rounded-xl p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-full",
            mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
          )}>
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-medium">Your Usage</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-1">Free Plan</span>
          <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleUpgrade}>
            <Crown className="w-3.5 h-3.5" />
            <span>Upgrade</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <h3 className="font-medium">Automated Comments</h3>
            </div>
            <span className="text-sm font-medium">
              {usageData.comments.used}/{usageData.comments.total}
            </span>
          </div>
          <Progress value={usageData.comments.percentUsed} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {40 - usageData.comments.used} comments remaining today
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-purple-500" />
              <h3 className="font-medium">Content Analysis</h3>
            </div>
            <span className="text-sm font-medium">
              {usageData.analysis.used}/{usageData.analysis.total}
            </span>
          </div>
          <Progress value={usageData.analysis.percentUsed} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {usageData.analysis.total - usageData.analysis.used} analyses remaining today
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="font-medium">AI Content Creation</h3>
            </div>
            <span className="text-sm font-medium">
              {usageData.content.used}/{usageData.content.total}
            </span>
          </div>
          <Progress value={usageData.content.percentUsed} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {usageData.content.total - usageData.content.used} creations remaining today
          </p>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium">Usage resets daily</h3>
              <p className="text-sm text-muted-foreground">
                Upgrade to a premium plan for increased limits and additional features
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Lock className="w-3 h-3" />
              <span>Premium features available</span>
            </div>
            <Button size="sm" onClick={handleUpgrade}>See Pricing</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UsageStats;
