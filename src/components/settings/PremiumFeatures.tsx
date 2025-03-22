import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, Star, Lock, ChevronRight, TrendingUp, BrainCircuit, Network, 
  Users, BadgeAlert, Lightbulb, LineChart, Target, CreditCard, Zap, 
  BarChart3, Briefcase, BookOpen, MessageSquareText, Award, AtSign,
  Globe, Layers, Shield, Building, Gem, Database
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { useMode } from '@/context/ModeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
  popular?: boolean;
  tier?: 'basic' | 'premium' | 'enterprise';
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  comingSoon = false, 
  popular = false,
  tier = 'premium',
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
      {tier === 'basic' && !comingSoon && (
        <Badge className="absolute -top-2 right-3 bg-blue-500 hover:bg-blue-600">Basic</Badge>
      )}
      {tier === 'premium' && !comingSoon && !popular && (
        <Badge className="absolute -top-2 right-3 bg-purple-500 hover:bg-purple-600">Premium</Badge>
      )}
      {tier === 'enterprise' && !comingSoon && (
        <Badge className="absolute -top-2 right-3 bg-emerald-500 hover:bg-emerald-600">Enterprise</Badge>
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

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  recommended = false,
  cta = "Upgrade",
  icon
}: { 
  title: string; 
  price: string; 
  description: string;
  features: string[];
  recommended?: boolean;
  cta?: string;
  icon: React.ReactNode; 
}) => {
  const { mode } = useMode();
  
  return (
    <div className={cn(
      "border rounded-xl p-6 flex flex-col h-full",
      recommended ? "ring-2 ring-purple-500 dark:ring-purple-400" : ""
    )}>
      {recommended && (
        <Badge className="self-start mb-2 bg-purple-500 hover:bg-purple-600">Recommended</Badge>
      )}
      
      <div className="flex items-center gap-2 mb-2">
        <div className={cn(
          "p-2 rounded-full",
          mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
        )}>
          {icon}
        </div>
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
      
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
      
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="space-y-2 mb-6 flex-1">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <div className="text-green-500 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button 
        className={cn(
          "w-full",
          recommended ? 
            (mode === 'assisted' ? "bg-assisted-DEFAULT hover:bg-assisted-DEFAULT/90" : "bg-autonomous-DEFAULT hover:bg-autonomous-DEFAULT/90") : 
            "bg-primary/80 hover:bg-primary"
        )}
      >
        {cta}
      </Button>
    </div>
  );
};

const PremiumFeatures = () => {
  const { toast } = useToast();
  const { mode } = useMode();
  const [showUnlockMessage, setShowUnlockMessage] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<string>("monthly");
  const [showPricingDialog, setShowPricingDialog] = useState(false);
  
  const handleFeatureClick = (feature: string) => {
    setShowUnlockMessage(true);
    toast({
      title: "Premium Feature",
      description: `${feature} is available in the premium plan. Upgrade to access this feature.`,
      duration: 3000,
    });
  };
  
  const basicFeatures = [
    {
      title: "Personalized LinkedIn Strategy",
      description: "Get custom strategic advice tailored to your specific career goals and industry",
      icon: <Lightbulb className="w-5 h-5" />,
      tier: 'basic' as const,
      popular: false,
      comingSoon: false
    },
    {
      title: "Profile Optimization Assistant",
      description: "AI-powered recommendations to enhance your LinkedIn profile visibility and impact",
      icon: <BarChart3 className="w-5 h-5" />,
      tier: 'basic' as const,
      popular: true,
      comingSoon: false
    },
    {
      title: "Engagement Performance Metrics",
      description: "Track the effectiveness of your LinkedIn activities with basic analytics",
      icon: <LineChart className="w-5 h-5" />,
      tier: 'basic' as const,
      popular: false,
      comingSoon: false
    },
    {
      title: "Content Idea Generation",
      description: "Get AI-assisted inspiration for your LinkedIn posts and articles",
      icon: <Lightbulb className="w-5 h-5" />,
      tier: 'basic' as const,
      popular: false,
      comingSoon: false
    },
  ];
  
  const premiumFeatures = [
    {
      title: "AI Career Trajectory Forecasting",
      description: "Get AI-powered insights on your potential career path based on your engagement patterns",
      icon: <TrendingUp className="w-5 h-5" />,
      tier: 'premium' as const,
      popular: true,
      comingSoon: false
    },
    {
      title: "Digital Twin Technology",
      description: "Train an advanced AI model that precisely mimics your professional voice and style",
      icon: <BrainCircuit className="w-5 h-5" />,
      tier: 'premium' as const,
      popular: true,
      comingSoon: false
    },
    {
      title: "Relationship Intelligence System",
      description: "Map your professional network with relationship strength scoring and reconnection strategies",
      icon: <Network className="w-5 h-5" />,
      tier: 'premium' as const,
      popular: false,
      comingSoon: false
    },
    {
      title: "Credibility & Reputation Metrics",
      description: "Track your industry perception and thought leadership score compared to peers",
      icon: <BadgeAlert className="w-5 h-5" />,
      tier: 'premium' as const,
      popular: false,
      comingSoon: false
    },
  ];
  
  const enterpriseFeatures = [
    {
      title: "Industry Mastermind Access",
      description: "Join AI-facilitated discussion groups with professionals in your field",
      icon: <Users className="w-5 h-5" />,
      tier: 'enterprise' as const,
      popular: true,
      comingSoon: true
    },
    {
      title: "Opportunity Cost Calculator",
      description: "See the financial impact of your LinkedIn engagement (or lack thereof)",
      icon: <LineChart className="w-5 h-5" />,
      tier: 'enterprise' as const,
      popular: false,
      comingSoon: true
    },
    {
      title: "Network Opportunity Detection",
      description: "Identify hidden connection opportunities and potential clients before competitors",
      icon: <Target className="w-5 h-5" />,
      tier: 'enterprise' as const,
      popular: false,
      comingSoon: true
    },
    {
      title: "Multi-User Team Collaboration",
      description: "Enable your entire team to collaborate on LinkedIn strategy with role-based access",
      icon: <Users className="w-5 h-5" />,
      tier: 'enterprise' as const,
      popular: true,
      comingSoon: false
    },
  ];
  
  const allFeatures = [...basicFeatures, ...premiumFeatures, ...enterpriseFeatures];

  const comparePlanFeatures = [
    { feature: "AI Comment Generation", basic: true, premium: true, enterprise: true },
    { feature: "Personalized LinkedIn Strategy", basic: true, premium: true, enterprise: true },
    { feature: "Profile Optimization", basic: true, premium: true, enterprise: true },
    { feature: "Basic Analytics", basic: true, premium: true, enterprise: true },
    { feature: "Content Idea Generation", basic: true, premium: true, enterprise: true },
    { feature: "AI Career Forecasting", basic: false, premium: true, enterprise: true },
    { feature: "Digital Twin Technology", basic: false, premium: true, enterprise: true },
    { feature: "Relationship Intelligence", basic: false, premium: true, enterprise: true },
    { feature: "Reputation Metrics", basic: false, premium: true, enterprise: true },
    { feature: "Industry Mastermind Access", basic: false, premium: false, enterprise: true },
    { feature: "Opportunity Cost Calculator", basic: false, premium: false, enterprise: true },
    { feature: "Network Opportunity Detection", basic: false, premium: false, enterprise: true },
    { feature: "Team Collaboration", basic: false, premium: false, enterprise: true },
    { feature: "White Label Reporting", basic: false, premium: false, enterprise: true },
    { feature: "API Access", basic: false, premium: false, enterprise: true },
    { feature: "Dedicated Support", basic: false, premium: true, enterprise: true },
  ];
  
  return (
    <motion.div 
      className="glass-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <Crown className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-medium">Premium Features</h2>
          <Badge className="ml-2 bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500/30">
            Upgrade
          </Badge>
        </div>
        
        <Dialog open={showPricingDialog} onOpenChange={setShowPricingDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">View Pricing</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>Choose Your Plan</DialogTitle>
              <DialogDescription>
                Select the plan that best fits your LinkedIn engagement goals.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex justify-center mb-6 mt-4">
              <ToggleGroup type="single" value={billingPeriod} onValueChange={(value) => value && setBillingPeriod(value)}>
                <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
                <ToggleGroupItem value="annual">Annual (Save 20%)</ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PricingTier 
                title="Basic" 
                price={billingPeriod === "monthly" ? "$19" : "$15"}
                description="Essential tools for LinkedIn engagement"
                icon={<Badge className="w-5 h-5" />}
                features={[
                  "AI comment generation",
                  "Personalized strategy",
                  "Profile optimization",
                  "Basic analytics dashboard",
                  "Content idea generation",
                  "Email support"
                ]}
                cta="Get Started"
              />
              
              <PricingTier 
                title="Premium" 
                price={billingPeriod === "monthly" ? "$49" : "$39"}
                description="Advanced tools for power networkers"
                icon={<Gem className="w-5 h-5" />}
                recommended={true}
                features={[
                  "Everything in Basic, plus:",
                  "AI career trajectory forecasting",
                  "Digital twin technology",
                  "Relationship intelligence system",
                  "Reputation & credibility metrics",
                  "Priority email support"
                ]}
                cta="Upgrade to Premium"
              />
              
              <PricingTier 
                title="Enterprise" 
                price={billingPeriod === "monthly" ? "$149" : "$119"}
                description="Complete solution for teams & businesses"
                icon={<Building className="w-5 h-5" />}
                features={[
                  "Everything in Premium, plus:",
                  "Multi-user team access",
                  "Industry mastermind groups",
                  "Network opportunity detection",
                  "White label reporting",
                  "API access for custom integration",
                  "Dedicated account manager"
                ]}
                cta="Contact Sales"
              />
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">Compare All Features</h4>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Feature</TableHead>
                      <TableHead className="text-center">Basic</TableHead>
                      <TableHead className="text-center">Premium</TableHead>
                      <TableHead className="text-center">Enterprise</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparePlanFeatures.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{row.feature}</TableCell>
                        <TableCell className="text-center">
                          {row.basic ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-300"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          }
                        </TableCell>
                        <TableCell className="text-center">
                          {row.premium ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-300"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          }
                        </TableCell>
                        <TableCell className="text-center">
                          {row.enterprise ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg> : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-300"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setShowPricingDialog(false)}>Cancel</Button>
              <Button 
                className={cn(
                  mode === 'assisted' ? "bg-assisted-DEFAULT hover:bg-assisted-DEFAULT/90" : "bg-autonomous-DEFAULT hover:bg-autonomous-DEFAULT/90"
                )}
              >
                Start Free Trial
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            onClick={() => setShowPricingDialog(true)}
          >
            Upgrade Now
          </Button>
        </motion.div>
      )}

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Features</TabsTrigger>
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {allFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                comingSoon={feature.comingSoon}
                popular={feature.popular}
                tier={feature.tier}
                onClick={() => handleFeatureClick(feature.title)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="basic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {basicFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                comingSoon={feature.comingSoon}
                popular={feature.popular}
                tier={feature.tier}
                onClick={() => handleFeatureClick(feature.title)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {premiumFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                comingSoon={feature.comingSoon}
                popular={feature.popular}
                tier={feature.tier}
                onClick={() => handleFeatureClick(feature.title)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="enterprise">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {enterpriseFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                comingSoon={feature.comingSoon}
                popular={feature.popular}
                tier={feature.tier}
                onClick={() => handleFeatureClick(feature.title)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
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
      
      <div className="mt-6">
        <Button 
          className="w-full"
          variant="outline"
          onClick={() => setShowPricingDialog(true)}
        >
          Compare All Plans
        </Button>
      </div>
    </motion.div>
  );
};

export default PremiumFeatures;
