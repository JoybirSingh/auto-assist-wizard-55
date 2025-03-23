
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart2, 
  Users, 
  FileText, 
  Calendar,
  MessageCircle,
  Briefcase,
  BarChart,
  Lock,
  Globe,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMode } from '@/context/ModeContext';
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const AdvancedFeatures = () => {
  const { mode } = useMode();
  const { toast } = useToast();
  
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);
  
  const featureGroups = [
    {
      title: "Content & Analytics",
      features: [
        {
          id: "ai-content",
          name: "AI Content Creation",
          description: "Generate optimized content for your audience",
          icon: <FileText className="w-5 h-5" />,
          premium: true
        },
        {
          id: "advanced-analytics",
          name: "Advanced Analytics",
          description: "Detailed insights on content performance",
          icon: <BarChart2 className="w-5 h-5" />,
          premium: true
        },
        {
          id: "content-calendar",
          name: "Content Calendar",
          description: "Plan and schedule content in advance",
          icon: <Calendar className="w-5 h-5" />,
          premium: false
        }
      ]
    },
    {
      title: "Networking & Lead Generation",
      features: [
        {
          id: "lead-gen",
          name: "Lead Generation",
          description: "Identify and qualify potential leads",
          icon: <Users className="w-5 h-5" />,
          premium: true
        },
        {
          id: "auto-networking",
          name: "Automated Networking",
          description: "Smart connection requests based on your goals",
          icon: <TrendingUp className="w-5 h-5" />,
          premium: true
        },
        {
          id: "smart-comments",
          name: "Intelligent Comments",
          description: "AI-powered comment suggestions",
          icon: <MessageCircle className="w-5 h-5" />,
          premium: false
        }
      ]
    },
    {
      title: "Business & Team Features",
      features: [
        {
          id: "team-collab",
          name: "Team Collaboration",
          description: "Coordinate LinkedIn strategy across teams",
          icon: <Briefcase className="w-5 h-5" />,
          premium: true
        },
        {
          id: "competitor-analysis",
          name: "Competitor Analysis",
          description: "Compare performance against competitors",
          icon: <BarChart className="w-5 h-5" />,
          premium: true
        },
        {
          id: "compliance",
          name: "Compliance Controls",
          description: "Ensure content meets industry regulations",
          icon: <Lock className="w-5 h-5" />,
          premium: true
        },
        {
          id: "multi-language",
          name: "Multi-Language Support",
          description: "Connect with global audiences",
          icon: <Globe className="w-5 h-5" />,
          premium: true
        }
      ]
    }
  ];
  
  const toggleFeature = (featureId: string, isPremium: boolean) => {
    if (isPremium) {
      toast({
        title: "Premium Feature",
        description: "This feature requires a premium subscription. Please upgrade your plan to access it.",
        variant: "default",
        duration: 3000,
      });
      return;
    }
    
    setActiveFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
    
    toast({
      title: activeFeatures.includes(featureId) ? "Feature Disabled" : "Feature Enabled",
      description: `You have ${activeFeatures.includes(featureId) ? "disabled" : "enabled"} this feature.`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-8">
      {featureGroups.map((group) => (
        <motion.div
          key={group.title}
          className="glass-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-medium mb-5">{group.title}</h3>
          
          <div className="space-y-5">
            {group.features.map((feature) => (
              <div 
                key={feature.id} 
                className={cn(
                  "p-4 border rounded-lg transition-all duration-200",
                  activeFeatures.includes(feature.id)
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                    )}>
                      {feature.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{feature.name}</h4>
                        {feature.premium && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  
                  <Switch
                    checked={activeFeatures.includes(feature.id)}
                    onCheckedChange={() => toggleFeature(feature.id, feature.premium)}
                    disabled={feature.premium}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {group.features.some(f => f.premium) && (
            <div className="mt-4 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Premium features require subscription upgrade</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AdvancedFeatures;
