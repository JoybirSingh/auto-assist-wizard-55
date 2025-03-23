
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Loader2,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Link,
  FileJson,
  MessageSquare,
  Calendar,
  Layers,
  RefreshCw
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

type IntegrationStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: IntegrationStatus;
  premium: boolean;
}

const IntegrationOptions = () => {
  const { toast } = useToast();
  
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Sync leads and engagement data with Salesforce CRM',
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      status: 'disconnected',
      premium: true
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Connect your marketing campaigns with LinkedIn activities',
      icon: <Layers className="w-5 h-5 text-orange-600" />,
      status: 'disconnected',
      premium: true
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and collaborate with your team',
      icon: <MessageSquare className="w-5 h-5 text-purple-600" />,
      status: 'connected',
      premium: false
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Schedule posts and manage content calendar',
      icon: <Calendar className="w-5 h-5 text-green-600" />,
      status: 'connected',
      premium: false
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 3,000+ apps and automate workflows',
      icon: <RefreshCw className="w-5 h-5 text-red-600" />,
      status: 'disconnected',
      premium: false
    },
    {
      id: 'api',
      name: 'API Access',
      description: 'Connect your custom applications and data sources',
      icon: <FileJson className="w-5 h-5 text-gray-600" />,
      status: 'disconnected',
      premium: true
    }
  ]);
  
  const handleIntegrationAction = (id: string, premium: boolean) => {
    if (premium) {
      toast({
        title: "Premium Integration",
        description: "This integration requires a premium subscription. Please upgrade your plan to access it.",
        variant: "default",
        duration: 3000,
      });
      return;
    }
    
    const integration = integrations.find(i => i.id === id);
    if (!integration) return;
    
    // Toggle connection status for demo purposes
    let newStatus: IntegrationStatus;
    let toastMessage: string;
    
    if (integration.status === 'disconnected') {
      newStatus = 'connecting';
      toastMessage = `Connecting to ${integration.name}...`;
      
      // Simulate connection process
      setTimeout(() => {
        setIntegrations(prev => 
          prev.map(i => 
            i.id === id ? { ...i, status: 'connected' } : i
          )
        );
        
        toast({
          title: "Integration Successful",
          description: `Successfully connected to ${integration.name}`,
          duration: 3000,
        });
      }, 2000);
    } else if (integration.status === 'connected') {
      newStatus = 'disconnected';
      toastMessage = `Disconnected from ${integration.name}`;
    } else {
      return;
    }
    
    setIntegrations(prev => 
      prev.map(i => 
        i.id === id ? { ...i, status: newStatus } : i
      )
    );
    
    toast({
      title: "Integration Update",
      description: toastMessage,
      duration: 2000,
    });
  };
  
  const getStatusIcon = (status: IntegrationStatus) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'disconnected':
        return <Link className="w-4 h-4 text-muted-foreground" />;
      case 'connecting':
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };
  
  const getActionButton = (integration: Integration) => {
    switch (integration.status) {
      case 'connected':
        return (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleIntegrationAction(integration.id, integration.premium)}
            disabled={integration.premium}
          >
            Disconnect
          </Button>
        );
      case 'disconnected':
        return (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleIntegrationAction(integration.id, integration.premium)}
            disabled={integration.premium}
          >
            Connect
          </Button>
        );
      case 'connecting':
        return (
          <Button 
            variant="outline" 
            size="sm"
            disabled
          >
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Connecting
          </Button>
        );
      case 'error':
        return (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleIntegrationAction(integration.id, integration.premium)}
            disabled={integration.premium}
          >
            Retry
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="glass-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium">Integrations</h3>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ExternalLink className="w-4 h-4" />
          <span>API Docs</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        {integrations.map((integration) => (
          <div 
            key={integration.id}
            className={cn(
              "p-4 border rounded-lg transition-all duration-200",
              integration.status === 'connected' 
                ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/10" 
                : "border-gray-200 dark:border-gray-800"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm">
                  {integration.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{integration.name}</h4>
                    <div className="flex items-center gap-1 text-sm">
                      {getStatusIcon(integration.status)}
                      <span className={cn(
                        "text-xs",
                        integration.status === 'connected' ? "text-green-600 dark:text-green-400" :
                        integration.status === 'connecting' ? "text-blue-600 dark:text-blue-400" :
                        integration.status === 'error' ? "text-red-600 dark:text-red-400" :
                        "text-muted-foreground"
                      )}>
                        {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {integration.premium && (
                  <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
                    Premium
                  </span>
                )}
                {getActionButton(integration)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Need a custom integration? Contact our sales team for enterprise solutions.
        </p>
        <Button variant="outline" size="sm">
          Request Integration
        </Button>
      </div>
    </motion.div>
  );
};

export default IntegrationOptions;
