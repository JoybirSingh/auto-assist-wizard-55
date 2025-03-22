
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Check, ChevronDown, Filter, RefreshCw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

interface LeadFiltersProps {
  onMinScoreChange: (value: number) => void;
  minScore: number;
  onReset: () => void;
}

const industries = [
  "Technology", "Finance", "Healthcare", "Manufacturing", 
  "Retail", "Education", "Entertainment", "Marketing"
];

const roles = [
  "CEO", "CTO", "CFO", "CMO", "Director", "VP", "Manager", 
  "Specialist", "Analyst", "Consultant"
];

const LeadFilters = ({ onMinScoreChange, minScore, onReset }: LeadFiltersProps) => {
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="h-8 gap-1">
          <RefreshCw size={14} />
          <span>Reset</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        {/* Lead score filter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Minimum Lead Score</label>
            <span className="text-sm font-medium">{minScore}</span>
          </div>
          <Slider
            defaultValue={[minScore]}
            max={100}
            step={1}
            onValueChange={([value]) => onMinScoreChange(value)}
          />
        </div>
        
        {/* Industries filter */}
        <div>
          <label className="text-sm font-medium block mb-2">Industries</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Select Industries</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full min-w-[240px]">
              <DropdownMenuLabel>Select Industries</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {industries.map(industry => (
                <DropdownMenuItem 
                  key={industry}
                  className="flex items-center justify-between"
                  onSelect={() => addFilter(industry)}
                >
                  {industry}
                  {activeFilters.includes(industry) && <Check size={14} />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Roles filter */}
        <div>
          <label className="text-sm font-medium block mb-2">Roles</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Select Roles</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full min-w-[240px]">
              <DropdownMenuLabel>Select Roles</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {roles.map(role => (
                <DropdownMenuItem 
                  key={role}
                  className="flex items-center justify-between"
                  onSelect={() => addFilter(role)}
                >
                  {role}
                  {activeFilters.includes(role) && <Check size={14} />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Location filter */}
        <div>
          <label className="text-sm font-medium block mb-2">Location</label>
          <Input placeholder="Enter location..." />
        </div>
        
        {/* Connection status */}
        <div>
          <label className="text-sm font-medium block mb-2">Connection Status</label>
          <Select defaultValue="any">
            <SelectTrigger>
              <SelectValue placeholder="Any status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any status</SelectItem>
              <SelectItem value="not_connected">Not Connected</SelectItem>
              <SelectItem value="pending">Connection Pending</SelectItem>
              <SelectItem value="connected">Connected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div>
            <label className="text-sm font-medium block mb-2">Active Filters</label>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map(filter => (
                <Badge 
                  key={filter} 
                  variant="outline"
                  className="flex items-center gap-1 cursor-pointer hover:bg-muted-foreground/10"
                  onClick={() => removeFilter(filter)}
                >
                  {filter}
                  <span className="text-xs ml-1">×</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <Button className="w-full mt-2">
          <Filter size={16} className="mr-2" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default LeadFilters;
