
import React from 'react';
import { useMode } from '@/context/ModeContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Robot, UserCircle } from 'lucide-react';

const ModeToggle = () => {
  const { mode, setMode } = useMode();

  return (
    <div className="flex flex-col items-center">
      <div className="p-1 rounded-full bg-secondary flex items-center relative">
        <button
          className={cn(
            "relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-colors duration-300",
            mode === 'assisted' ? 'text-foreground' : 'text-muted-foreground'
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
            mode === 'autonomous' ? 'text-foreground' : 'text-muted-foreground'
          )}
          onClick={() => setMode('autonomous')}
          aria-label="Switch to autonomous mode"
        >
          <Robot className="w-4 h-4" />
          <span>Autonomous</span>
        </button>
        
        <motion.div
          className={cn(
            "absolute inset-y-1 rounded-full transition-colors duration-300",
            mode === 'assisted' ? 'bg-assisted-muted' : 'bg-autonomous-muted'
          )}
          initial={false}
          animate={{
            x: mode === 'assisted' ? 4 : '50%',
            width: 'calc(50% - 4px)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
      
      <p className="mt-3 text-xs text-muted-foreground max-w-xs text-center">
        {mode === 'assisted' 
          ? "Assisted mode sends you notifications with suggested comments for manual posting."
          : "Autonomous mode automatically comments on your behalf. Use with caution."}
      </p>
    </div>
  );
};

export default ModeToggle;
