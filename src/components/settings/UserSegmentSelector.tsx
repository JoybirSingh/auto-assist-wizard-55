
import React from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Globe, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMode } from '@/context/ModeContext';
import { useToast } from "@/hooks/use-toast";

type UserSegment = 'personal' | 'organization' | 'enterprise';

interface UserSegmentSelectorProps {
  selectedSegment: UserSegment;
  onSegmentChange: (segment: UserSegment) => void;
}

const UserSegmentSelector = ({ selectedSegment, onSegmentChange }: UserSegmentSelectorProps) => {
  const { mode } = useMode();
  const { toast } = useToast();

  const segments = [
    {
      id: 'personal',
      title: 'Personal',
      description: 'Optimize your personal brand and career growth',
      icon: <User className="w-5 h-5" />,
      features: ['Personal brand analytics', 'Career path mapping', 'Content optimization']
    },
    {
      id: 'organization',
      title: 'Organization',
      description: 'Coordinate team efforts and generate leads',
      icon: <Building2 className="w-5 h-5" />,
      features: ['Team collaboration', 'Content templates', 'Lead qualification']
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      description: 'Advanced solutions for large organizations',
      icon: <Globe className="w-5 h-5" />,
      features: ['Multi-account management', 'Compliance controls', 'White-label reporting']
    }
  ];

  const handleSegmentSelect = (segment: UserSegment) => {
    if (segment !== 'personal') {
      toast({
        title: "Premium Feature",
        description: `${segment === 'organization' ? 'Organization' : 'Enterprise'} features require a premium subscription.`,
        variant: "default",
        duration: 3000,
      });
    }
    
    onSegmentChange(segment);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Your Use Case</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {segments.map((segment) => {
          const isSelected = selectedSegment === segment.id;
          const isPremium = segment.id !== 'personal';
          
          return (
            <motion.div
              key={segment.id}
              className={cn(
                "relative rounded-xl p-5 cursor-pointer transition-all duration-200 border",
                isSelected 
                  ? "border-primary bg-primary/5" 
                  : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700",
                isPremium && !isSelected && "opacity-80"
              )}
              whileHover={{ y: -4 }}
              onClick={() => handleSegmentSelect(segment.id as UserSegment)}
            >
              {isPremium && (
                <span className="absolute top-2 right-2 text-xs px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
                  Premium
                </span>
              )}
              
              <div className="flex items-center gap-3 mb-3">
                <div className={cn(
                  "p-2 rounded-full",
                  mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                )}>
                  {segment.icon}
                </div>
                <h4 className="font-medium">{segment.title}</h4>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{segment.description}</p>
              
              <ul className="space-y-2">
                {segment.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {isSelected && (
                <div className="absolute top-0 right-0 bottom-0 left-0 border-2 border-primary rounded-xl pointer-events-none" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSegmentSelector;
