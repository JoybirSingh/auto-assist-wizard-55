
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';
import { MessageSquare, Lock, Lightbulb, RefreshCw, Award, Shield } from 'lucide-react';

const About = () => {
  const { mode } = useMode();

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Smart Comment Generation',
      description: 'Advanced AI generates personalized, thoughtful comments that match your professional voice and tone.'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Dual-Mode System',
      description: 'Switch seamlessly between Autonomous and Assisted modes based on your preference and comfort level.'
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Engagement Analytics',
      description: 'Comprehensive insights into your LinkedIn engagement patterns, helping you optimize your approach.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Safety First',
      description: 'Built-in safety measures ensure your professional reputation remains protected at all times.'
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: 'Learning Algorithm',
      description: 'Our system learns from your preferences and past interactions to continuously improve over time.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Engagement Scoring',
      description: 'Prioritize high-value interactions with our intelligent post scoring algorithm.'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-block">
              <div className={cn(
                "p-4 rounded-full mx-auto",
                mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
              )}>
                <MessageSquare className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Intelligent LinkedIn Growth
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              LinkedBoost helps professionals grow their presence and influence with smart, personalized engagement powered by artificial intelligence.
            </p>
          </motion.div>

          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="glass-card rounded-xl p-6 text-center card-shine"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <div className={cn(
                    "p-3 rounded-full inline-flex mb-4",
                    mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                  )}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="glass-card rounded-xl p-8 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Ready to boost your LinkedIn presence?</h2>
            <p className="text-muted-foreground mb-6">
              Start growing your professional network with intelligent, authentic engagement.
            </p>
            <button 
              className={cn(
                "py-3 px-8 rounded-full text-white font-medium transition-all duration-200 hover:bg-opacity-90",
                mode === 'assisted' ? "bg-assisted-DEFAULT" : "bg-autonomous-DEFAULT"
              )}
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
