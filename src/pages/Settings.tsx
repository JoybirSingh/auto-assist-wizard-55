
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SettingsPanel from '@/components/settings/SettingsPanel';

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <SettingsPanel />
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
