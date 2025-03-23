
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  CreditCard, 
  Building, 
  Globe,
  Sparkles,
  BadgeCheck,
  Shield 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMode } from '@/context/ModeContext';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const SubscriptionTiers = () => {
  const { mode } = useMode();
  const { toast } = useToast();
  const [isAnnual, setIsAnnual] = useState(false);
  
  const tiers = [
    {
      name: 'Free',
      description: 'Basic LinkedIn enhancement tools',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        'Basic analytics',
        'Limited content suggestions',
        '10 automated comments per day',
        'Personal use only'
      ],
      missingFeatures: [
        'AI content creation',
        'Lead generation',
        'Advanced analytics',
        'Team collaboration'
      ],
      icon: <CreditCard className="w-4 h-4" />,
      popular: false,
      buttonText: 'Current Plan',
      buttonVariant: 'outline' as const,
      disabled: true
    },
    {
      name: 'Pro',
      description: 'Enhanced tools for serious networkers',
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        'Advanced analytics',
        'AI content creation',
        'Unlimited automated comments',
        'Personal brand optimization',
        'Interview preparation',
        'Resume-LinkedIn sync'
      ],
      missingFeatures: [
        'Team collaboration',
        'Lead qualification',
        'Branded templates'
      ],
      icon: <BadgeCheck className="w-4 h-4" />,
      popular: true,
      buttonText: 'Upgrade',
      buttonVariant: 'default' as const,
      disabled: false
    },
    {
      name: 'Business',
      description: 'Collaborative tools for teams',
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Lead generation & qualification',
        'Content calendar integration',
        'Branded templates',
        'Departmental analytics'
      ],
      missingFeatures: [
        'Multi-account management',
        'White-label reporting',
        'Enterprise SSO'
      ],
      icon: <Building className="w-4 h-4" />,
      popular: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const,
      disabled: false
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      monthlyPrice: 149,
      yearlyPrice: 1490,
      features: [
        'Everything in Business',
        'Multi-account management',
        'Compliance controls',
        'White-label reporting',
        'Advanced API integration',
        'Enterprise SSO',
        'Dedicated support'
      ],
      missingFeatures: [],
      icon: <Globe className="w-4 h-4" />,
      popular: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const,
      disabled: false
    }
  ];

  const handleUpgrade = (tier: string) => {
    toast({
      title: "Subscription Change",
      description: `You selected the ${tier} plan. This feature would connect to payment processing in a production environment.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
        <h3 className="text-2xl font-semibold">Choose Your Plan</h3>
        <p className="text-muted-foreground max-w-md">
          Select the plan that best fits your needs and scale as your network grows
        </p>
        
        <div className="flex items-center space-x-2 mt-6">
          <span className={cn("text-sm", !isAnnual && "font-medium")}>Monthly</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={cn("text-sm", isAnnual && "font-medium")}>
            Annual
            <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Save 20%
            </Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            className={cn(
              "border rounded-xl overflow-hidden transition-all duration-300",
              tier.popular ? "border-primary" : "border-border",
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {tier.popular && (
              <div className="bg-primary text-primary-foreground py-1.5 text-center text-sm font-medium flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Most Popular
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">{tier.name}</h3>
                <div className={cn(
                  "p-2 rounded-full",
                  mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                )}>
                  {tier.icon}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                    ${isAnnual ? tier.yearlyPrice : tier.monthlyPrice}
                  </span>
                  {tier.monthlyPrice > 0 && (
                    <span className="text-muted-foreground ml-1 text-sm">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                {isAnnual && tier.monthlyPrice > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    ${tier.monthlyPrice * 0.8} per month, billed annually
                  </p>
                )}
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Includes:</h4>
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {tier.missingFeatures.length > 0 && (
                  <>
                    <h4 className="text-sm font-medium">Not included:</h4>
                    <ul className="space-y-2">
                      {tier.missingFeatures.map((feature) => (
                        <li key={feature} className="flex text-sm">
                          <X className="w-4 h-4 text-red-500 mr-2 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              <Button 
                variant={tier.buttonVariant}
                className="w-full mt-6"
                disabled={tier.disabled}
                onClick={() => handleUpgrade(tier.name)}
              >
                {tier.buttonText}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 p-4 border border-blue-100 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20 rounded-lg flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-blue-800 dark:text-blue-300">Enterprise Security & Compliance</h4>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
            Our enterprise plans include advanced security features, custom data retention policies, and compliance with industry regulations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTiers;
