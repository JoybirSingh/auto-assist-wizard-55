
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';
import { 
  Settings, Bell, Clock, MessageSquare, Sliders, Shield, 
  CheckCircle2, Users, Pencil, Crown, Zap, PanelLeft,
  Link as LinkIcon, ScrollText
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApiConfigForm from './ApiConfigForm';
import WritingSamples from './WritingSamples';
import AISettings from './AISettings';
import CommentLimitSettings from './CommentLimitSettings';
import TopicCommentSettings from './TopicCommentSettings';
import PremiumFeatures from './PremiumFeatures';
import UserSegmentSelector from './UserSegmentSelector';
import SubscriptionTiers from './SubscriptionTiers';
import AdvancedFeatures from './AdvancedFeatures';
import IntegrationOptions from './IntegrationOptions';
import linkedinService from '@/services/linkedinService';

type FrequencyOption = 'low' | 'medium' | 'high';
type TimeOption = 'morning' | 'afternoon' | 'evening' | 'spread';
type UserSegment = 'personal' | 'organization' | 'enterprise';

const SettingsPanel = () => {
  const { mode } = useMode();
  const [frequency, setFrequency] = useState<FrequencyOption>('medium');
  const [timing, setTiming] = useState<TimeOption>('spread');
  const [tone, setTone] = useState<string>('professional');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [safetyThreshold, setSafetyThreshold] = useState(80);
  const [userSegment, setUserSegment] = useState<UserSegment>('personal');

  useEffect(() => {
    const savedTone = localStorage.getItem('selectedTone');
    if (savedTone) {
      setTone(savedTone.toLowerCase());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedTone', tone);
  }, [tone]);

  const frequencyMapping = {
    low: '5-10 engagements per day',
    medium: '10-20 engagements per day',
    high: '20-30 engagements per day'
  };

  const timeMapping = {
    morning: '7:00 AM - 11:00 AM',
    afternoon: '12:00 PM - 4:00 PM',
    evening: '5:00 PM - 9:00 PM',
    spread: 'Spread throughout the day'
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className={cn(
          "p-2.5 rounded-full",
          mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
        )}>
          <Settings className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-semibold">Account Settings</h1>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="mb-8 grid grid-cols-1 md:grid-cols-5 w-full">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <Crown className="w-4 h-4" />
            <span>Subscription</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Features</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            <span>Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            <span>Advanced</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <UserSegmentSelector 
              selectedSegment={userSegment}
              onSegmentChange={setUserSegment} 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <ApiConfigForm />
          </motion.div>

          <motion.div 
            className="glass-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <Pencil className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-medium">AI Style Mimicry</h2>
            </div>

            <WritingSamples />
          </motion.div>

          <motion.div 
            className="glass-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-medium">Engagement Preferences</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Engagement Frequency</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(['low', 'medium', 'high'] as const).map((option) => (
                    <button
                      key={option}
                      className={cn(
                        "py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200",
                        frequency === option 
                          ? "border-transparent bg-primary text-white" 
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      )}
                      onClick={() => setFrequency(option)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="capitalize">{option}</span>
                        {frequency === option && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <p className="text-xs opacity-80">{frequencyMapping[option]}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Engagement Timing</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(['morning', 'afternoon', 'evening', 'spread'] as const).map((option) => (
                    <button
                      key={option}
                      className={cn(
                        "py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200",
                        timing === option 
                          ? "border-transparent bg-primary text-white" 
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      )}
                      onClick={() => setTiming(option)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="capitalize">{option}</span>
                        {timing === option && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <p className="text-xs opacity-80">{timeMapping[option]}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <Shield className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-medium">Safety & Notifications</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Engagement Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive alerts about your LinkedIn engagement</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationsEnabled} 
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)} 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {mode === 'autonomous' && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">
                      Safety Threshold: {safetyThreshold}%
                    </h3>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      safetyThreshold > 70 ? "bg-green-100 text-green-700" : 
                      safetyThreshold > 50 ? "bg-amber-100 text-amber-700" : 
                      "bg-red-100 text-red-700"
                    )}>
                      {safetyThreshold > 70 ? "Safe" : 
                      safetyThreshold > 50 ? "Moderate" : 
                      "Risky"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Controls how cautious the system is when posting automated comments
                  </p>
                  <input 
                    type="range" 
                    min="20" 
                    max="100" 
                    value={safetyThreshold} 
                    onChange={(e) => setSafetyThreshold(parseInt(e.target.value))} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Risky</span>
                    <span>Safe</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="subscription">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SubscriptionTiers />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="features">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AdvancedFeatures />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="integrations">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <IntegrationOptions />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AISettings />
          </motion.div>
          
          {mode === 'autonomous' && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <CommentLimitSettings />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <TopicCommentSettings />
              </motion.div>
            </>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-8 mb-10">
        <button 
          className={cn(
            "py-2.5 px-6 rounded-lg text-white font-medium transition-all duration-200 hover:bg-opacity-90",
            mode === 'assisted' ? "bg-assisted-DEFAULT" : "bg-autonomous-DEFAULT"
          )}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
