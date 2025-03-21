
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SettingsPanel from '@/components/settings/SettingsPanel';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';

const Settings = () => {
  const { mode } = useMode();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className={cn(
        "flex-1 pt-28 pb-20 px-6 md:px-8",
        mode === 'autonomous' ? "bg-autonomous-muted/5" : "bg-assisted-muted/5"
      )}>
        <SettingsPanel />
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
