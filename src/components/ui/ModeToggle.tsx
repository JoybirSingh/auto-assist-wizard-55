
import React from 'react';
import { useMode } from '@/context/ModeContext';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bot, UserCircle } from 'lucide-react';

const ModeToggle = () => {
  const { mode, setMode } = useMode();
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center">
      <div className={cn(
        "p-1 rounded-full flex items-center relative",
        theme === 'dark' ? "bg-gray-800" : "bg-secondary"
      )}>
        <button
          className={cn(
            "relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-colors duration-300",
            mode === 'assisted' 
              ? theme === 'dark' ? "text-white" : "text-foreground" 
              : theme === 'dark' ? "text-gray-400" : "text-muted-foreground"
          )}
          onClick={() => setMode('assisted')}
          aria-label="Switch to assisted mode"
        >
          <UserCircle className="w-4 h-4" />
          <span>Assisted</span>
        </button>
        
        <button
          className={cn(
            "relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-colors duration-300",
            mode === 'autonomous' 
              ? theme === 'dark' ? "text-white" : "text-foreground" 
              : theme === 'dark' ? "text-gray-400" : "text-muted-foreground"
          )}
          onClick={() => setMode('autonomous')}
          aria-label="Switch to autonomous mode"
        >
          <Bot className="w-4 h-4" />
          <span>Autonomous</span>
        </button>
        
        <motion.div
          className={cn(
            "absolute inset-y-1 rounded-full",
            mode === 'assisted' 
              ? theme === 'dark' ? "bg-assisted-DEFAULT/30" : "bg-assisted-muted" 
              : theme === 'dark' ? "bg-autonomous-DEFAULT/30" : "bg-autonomous-muted"
          )}
          initial={false}
          animate={{
            x: mode === 'assisted' ? 4 : '50%',
            width: 'calc(50% - 4px)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
      
      <p className={cn(
        "mt-3 text-xs max-w-xs text-center",
        theme === 'dark' ? "text-gray-400" : "text-muted-foreground"
      )}>
        {mode === 'assisted' 
          ? "Assisted mode sends you notifications with suggested comments for manual posting."
          : "Autonomous mode automatically comments on your behalf. Use with caution."}
      </p>
    </div>
  );
};

export default ModeToggle;
