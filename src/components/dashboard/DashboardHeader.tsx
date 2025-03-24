
import React from 'react';
import { motion } from 'framer-motion';
import { useMode } from '@/context/ModeContext';
import ModeToggle from '@/components/ui/ModeToggle';
import { cn } from '@/lib/utils';
import { Activity, CheckCircle2, AlertTriangle, Crown, Target, Users, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import UsageStats from './UsageStats';

const DashboardHeader = () => {
  const { mode } = useMode();

  // Animated statistics for demo purposes
  const stats = [
    { 
      icon: <Activity className="w-5 h-5" />,
      label: 'Engagement Rate', 
      value: '+47%',
      change: '+12%',
      changeType: 'positive'
    },
    { 
      icon: <CheckCircle2 className="w-5 h-5" />,
      label: 'Comments Posted', 
      value: mode === 'assisted' ? '23/40' : '38/40',
      change: mode === 'assisted' ? '-5%' : '+15%',
      changeType: mode === 'assisted' ? 'negative' : 'positive'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <motion.h1 
            className="text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            LinkedIn Growth Dashboard
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Monitor and optimize your LinkedIn engagement with smart AI-powered tools.
          </motion.p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <ModeToggle />
          
          <Link to="/settings?onboarding=true">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5" />
              <span>Setup Wizard</span>
            </Button>
          </Link>
          
          {mode === 'autonomous' && (
            <div className="flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full dark:bg-amber-900/20 dark:text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Automated interactions: 38/40 today</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UsageStats />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/personal-growth">
            <motion.div 
              className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border border-purple-100 dark:from-purple-900/20 dark:to-indigo-900/20 dark:border-purple-800/40 dark:hover:from-purple-900/30 dark:hover:to-indigo-900/30 transition-all"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-semibold">Personal Growth</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Access career path mapping, interview prep, and competitor analysis tools.
              </p>
              <Button size="sm" variant="ghost" className="gap-1">
                <span>Explore Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </motion.div>
          </Link>
          
          <Link to="/organizational-tools">
            <motion.div 
              className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-100 dark:from-blue-900/20 dark:to-cyan-900/20 dark:border-blue-800/40 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 transition-all"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-semibold">Organizational</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Coordinate with your team using collaboration tools and content calendars.
              </p>
              <Button size="sm" variant="ghost" className="gap-1">
                <span>View Features</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
