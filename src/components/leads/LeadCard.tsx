
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  Users, 
  ArrowUpRight, 
  Clock, 
  MessageSquare,
  ChevronDown,
  Twitter,
  Linkedin,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  leadScore: number;
  lastActive: string;
  connectStatus: 'not_connected' | 'pending' | 'connected';
  connections: number;
  engagementRate: string;
  tags: string[];
  platform: 'linkedin' | 'twitter';
  mutualConnections: number;
  recentActivity: string;
}

interface LeadCardProps {
  lead: Lead;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

const LeadCard = ({ lead, isSelected, onToggleSelect }: LeadCardProps) => {
  const connectVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };

  return (
    <Card className={cn(
      "group transition-all duration-300 hover:shadow-md relative overflow-hidden",
      isSelected && "ring-2 ring-primary ring-offset-2"
    )}>
      <div 
        className="absolute top-3 right-3 z-10"
        onClick={(e) => {
          e.stopPropagation();
          onToggleSelect(lead.id);
        }}
      >
        {isSelected ? (
          <CheckCircle2 className="h-5 w-5 text-primary" />
        ) : (
          <div className="h-5 w-5 rounded-full border border-gray-300 bg-white dark:bg-gray-800"></div>
        )}
      </div>
      
      {/* Platform badge */}
      <div className="absolute top-3 left-3">
        {lead.platform === 'linkedin' ? (
          <Badge variant="outline" className="bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/20">
            <Linkedin size={12} className="mr-1" /> LinkedIn
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/20">
            <Twitter size={12} className="mr-1" /> Twitter
          </Badge>
        )}
      </div>
      
      <CardHeader className="pt-12">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img 
              src={lead.avatar} 
              alt={lead.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-background"
            />
            <div className={cn(
              "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2 border-background",
              lead.leadScore >= 90 ? "bg-green-500 text-white" : 
              lead.leadScore >= 80 ? "bg-amber-500 text-white" : 
              "bg-blue-500 text-white"
            )}>
              {Math.floor(lead.leadScore / 10)}
            </div>
          </div>
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {lead.name}
              <ArrowUpRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardTitle>
            <CardDescription className="line-clamp-1">{lead.title} at {lead.company}</CardDescription>
            <div className="flex items-center mt-1 gap-2">
              <Badge variant="outline" className="text-xs">
                <Users size={10} className="mr-1" />
                {lead.connections} connections
              </Badge>
              {lead.mutualConnections > 0 && (
                <Badge variant="outline" className="text-xs">
                  {lead.mutualConnections} mutual
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
          <Clock size={14} />
          <span>Active {lead.lastActive}</span>
        </div>
        
        <div className="text-sm mb-4">
          <span className="font-medium">Recent activity: </span>
          {lead.recentActivity}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {lead.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <motion.div 
          variants={connectVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="flex-1"
        >
          {lead.connectStatus === 'not_connected' && (
            <Button className="w-full" variant={lead.platform === 'linkedin' ? 'linkedin' : 'twitter'}>
              <UserPlus size={16} />
              <span>Connect</span>
            </Button>
          )}
          {lead.connectStatus === 'pending' && (
            <Button variant="outline" className="w-full">
              <Clock size={16} />
              <span>Pending</span>
            </Button>
          )}
          {lead.connectStatus === 'connected' && (
            <Button variant="outline" className="w-full">
              <MessageSquare size={16} />
              <span>Message</span>
            </Button>
          )}
        </motion.div>
        
        <Button variant="ghost" size="icon">
          <ChevronDown size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LeadCard;
