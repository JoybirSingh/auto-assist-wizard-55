
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Lock, ChevronRight, TrendingUp, BrainCircuit, Network, Users, BadgeAlert, Lightbulb, LineChart, Target } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { useMode } from '@/context/ModeContext';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
  popular?: boolean;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  comingSoon = false, 
  popular = false,
  onClick 
}) => {
  const { mode } = useMode();
  
  return (
    <motion.div
      className={cn(
        "border rounded-xl p-5 relative cursor-pointer transition-all duration-200",
        comingSoon ? "bg-gray-50 dark:bg-gray-800/40" : "bg-white dark:bg-gray-800 hover:shadow-md",
        popular && !comingSoon && "ring-2 ring-offset-2 ring-purple-500 dark:ring-purple-400"
      )}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {popular && !comingSoon && (
        <Badge className="absolute -top-2 right-3 bg-purple-500 hover:bg-purple-600">Popular</Badge>
      )}
      {comingSoon && (
        <Badge className="absolute -top-2 right-3 bg-amber-500 hover:bg-amber-600">Coming Soon</Badge>
      )}
      
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-2.5 rounded-full",
          mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
        )}>
          {icon}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-lg mb-1 flex items-center gap-2">
            {title}
            {comingSoon && <Lock className="w-4 h-4 text-gray-400" />}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <ChevronRight className="w-5 h-5 text-gray-400 self-center" />
      </div>
    </motion.div>
  );
};

const PremiumFeatures = () => {
  const { toast } = useToast();
  const { mode } = useMode();
  const [showUnlockMessage, setShowUnlockMessage] = useState(false);
  
  const handleFeatureClick = (feature: string) => {
    setShowUnlockMessage(true);
    toast({
      title: "Premium Feature",
      description: `${feature} is available in the premium plan. Upgrade to access this feature.`,
      duration: 3000,
    });
  };
  
  const premiumFeatures = [
    {
      title: "AI Career Trajectory Forecasting",
      description: "Get AI-powered insights on your potential career path based on your engagement patterns",
      icon: <TrendingUp className="w-5 h-5" />,
      popular: true,
      comingSoon: false
    },
    {
      title: "Digital Twin Technology",
      description: "Train an advanced AI model that precisely mimics your professional voice and style",
      icon: <BrainCircuit className="w-5 h-5" />,
      popular: true,
      comingSoon: false
    },
    {
      title: "Relationship Intelligence System",
      description: "Map your professional network with relationship strength scoring and reconnection strategies",
      icon: <Network className="w-5 h-5" />,
      popular: false,
      comingSoon: false
    },
    {
      title: "Industry Mastermind Access",
      description: "Join AI-facilitated discussion groups with professionals in your field",
      icon: <Users className="w-5 h-5" />,
      popular: true,
      comingSoon: true
    },
    {
      title: "Credibility & Reputation Metrics",
      description: "Track your industry perception and thought leadership score compared to peers",
      icon: <BadgeAlert className="w-5 h-5" />,
      popular: false,
      comingSoon: false
    },
    {
      title: "Opportunity Cost Calculator",
      description: "See the financial impact of your LinkedIn engagement (or lack thereof)",
      icon: <LineChart className="w-5 h-5" />,
      popular: false,
      comingSoon: true
    },
    {
      title: "Network Opportunity Detection",
      description: "Identify hidden connection opportunities and potential clients before competitors",
      icon: <Target className="w-5 h-5" />,
      popular: false,
      comingSoon: true
    },
    {
      title: "Personalized LinkedIn Strategy",
      description: "Get custom strategic advice tailored to your specific career goals and industry",
      icon: <Lightbulb className="w-5 h-5" />,
      popular: false,
      comingSoon: false
    },
  ];

  return (
    <motion.div 
      className="glass-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <Crown className="w-5 h-5 text-amber-500" />
        <h2 className="text-xl font-medium">Premium Features</h2>
        <Badge className="ml-2 bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500/30">
          Upgrade
        </Badge>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          Unlock advanced features designed to maximize your LinkedIn engagement and career growth
        </p>
      </div>

      {showUnlockMessage && (
        <motion.div 
          className="mb-6 p-4 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 flex items-center gap-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <Star className="w-5 h-5 text-amber-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              Unlock all premium features and supercharge your LinkedIn presence
            </p>
          </div>
          <Button 
            size="sm" 
            className={cn(
              mode === 'assisted' ? "bg-assisted-DEFAULT hover:bg-assisted-DEFAULT/90" : "bg-autonomous-DEFAULT hover:bg-autonomous-DEFAULT/90"
            )}
          >
            Upgrade Now
          </Button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {premiumFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            comingSoon={feature.comingSoon}
            popular={feature.popular}
            onClick={() => handleFeatureClick(feature.title)}
          />
        ))}
      </div>
      
      <div className="mt-8 flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <Switch id="beta-access" />
          <div>
            <label htmlFor="beta-access" className="text-sm font-medium">Beta Access Program</label>
            <p className="text-xs text-muted-foreground">Get early access to upcoming premium features</p>
          </div>
        </div>
        <Badge variant="outline">Free</Badge>
      </div>
    </motion.div>
  );
};

export default PremiumFeatures;
