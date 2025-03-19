
import React, { useState, useEffect } from 'react';
import { Globe, Shield, Lock, Key } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMode } from '@/context/ModeContext';
import { useToast } from "@/components/ui/use-toast";
import linkedinService from '@/services/linkedinService';

const ApiConfigForm = () => {
  const { mode } = useMode();
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [apiConfigured, setApiConfigured] = useState(false);

  useEffect(() => {
    // Check if API key is already set
    const savedApiKey = linkedinService.getApiKey();
    if (savedApiKey) {
      setApiConfigured(true);
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSaveApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfiguring(true);
    
    try {
      // In a real app, we would validate the API key first
      linkedinService.setApiKey(apiKey);
      
      setApiConfigured(true);
      toast({
        title: "API configured",
        description: "Your LinkedIn API is now connected",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error configuring API:', error);
      toast({
        title: "Error",
        description: "Failed to configure API",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsConfiguring(false);
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-5">
        <div className={cn(
          "p-2 rounded-full",
          mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
        )}>
          <Key className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-medium">API Configuration</h2>
      </div>

      {apiConfigured ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-700">API Connected</h3>
              <p className="text-sm text-green-600 mt-1">
                Your LinkedIn API is configured and working properly.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSaveApiKey} className="space-y-6">
        <div>
          <label htmlFor="api-key" className="text-sm font-medium mb-2 block">
            LinkedIn API Key {apiConfigured && '(Updated)'}
          </label>
          <div className="relative">
            <input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full py-2.5 px-4 pl-10 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
              placeholder={apiConfigured ? "••••••••••••••••" : "Enter your LinkedIn API key"}
              required={!apiConfigured}
            />
            <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Shield className="w-3 h-3" /> 
            Your API key is stored locally and never shared
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">API Endpoint</label>
          <div className="relative">
            <input
              type="text"
              value="https://api.linkedin.com/v2"
              disabled
              className="w-full py-2.5 px-4 pl-10 rounded-lg border border-gray-200 bg-gray-50 cursor-not-allowed"
            />
            <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={cn(
              "py-2.5 px-6 rounded-lg text-white font-medium transition-all duration-200 hover:bg-opacity-90",
              isConfiguring ? "opacity-70 cursor-wait" : "",
              mode === 'assisted' ? "bg-assisted-DEFAULT" : "bg-autonomous-DEFAULT"
            )}
            disabled={isConfiguring}
          >
            {isConfiguring ? "Configuring..." : apiConfigured ? "Update API Key" : "Save API Key"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApiConfigForm;
