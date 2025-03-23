
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FollowUpAutomation from '@/components/engagement/FollowUpAutomation';

const FollowUpCenter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <FollowUpAutomation />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FollowUpCenter;
