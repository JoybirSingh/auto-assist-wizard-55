
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PostsPanel from '@/components/posts/PostsPanel';

const Posts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <PostsPanel />
      </main>
      
      <Footer />
    </div>
  );
};

export default Posts;
