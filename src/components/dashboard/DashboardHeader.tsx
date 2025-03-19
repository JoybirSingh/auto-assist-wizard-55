
import React from 'react';
import { motion } from 'framer-motion';
import { useMode } from '@/context/ModeContext';
import ModeToggle from '@/components/ui/ModeToggle';
import { cn } from '@/lib/utils';
import { Activity, CheckCircle2, AlertTriangle } from 'lucide-react';

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
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
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

      <div className="flex flex-col items-center">
        <ModeToggle />
        
        {mode === 'autonomous' && (
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Automated interactions: 38/40 today</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
