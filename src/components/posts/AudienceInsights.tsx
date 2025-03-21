
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  GraduationCap, 
  Map, 
  BarChart,
  Clock,
  Globe,
  UserPlus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';

// Sample data for demonstration
const industryData = [
  { name: 'Technology', value: 42 },
  { name: 'Finance', value: 18 },
  { name: 'Marketing', value: 15 },
  { name: 'Education', value: 12 },
  { name: 'Healthcare', value: 8 },
  { name: 'Other', value: 5 },
];

const jobTitles = [
  { title: 'Product Manager', percentage: 24 },
  { title: 'Software Engineer', percentage: 18 },
  { title: 'Marketing Manager', percentage: 14 },
  { title: 'UX Designer', percentage: 12 },
  { title: 'Data Scientist', percentage: 10 },
  { title: 'CEO/Founder', percentage: 8 },
  { title: 'Other', percentage: 14 },
];

const educationData = [
  { name: "Bachelor's", value: 45 },
  { name: "Master's", value: 38 },
  { name: "PhD", value: 12 },
  { name: "High School", value: 5 },
];

const locationData = [
  { name: 'United States', value: 35 },
  { name: 'United Kingdom', value: 18 },
  { name: 'Canada', value: 15 },
  { name: 'Australia', value: 12 },
  { name: 'Germany', value: 10 },
  { name: 'Other', value: 10 },
];

const activeTimeData = [
  { time: '6-9 AM', percentage: 12 },
  { time: '9-12 PM', percentage: 28 },
  { time: '12-3 PM', percentage: 22 },
  { time: '3-6 PM', percentage: 18 },
  { time: '6-9 PM', percentage: 15 },
  { time: '9-12 AM', percentage: 5 },
];

const growthData = [
  { month: 'Jan', followers: 1250 },
  { month: 'Feb', followers: 1380 },
  { month: 'Mar', followers: 1510 },
  { month: 'Apr', followers: 1640 },
  { month: 'May', followers: 1820 },
  { month: 'Jun', followers: 2150 },
];

const COLORS = ['#3b82f6', '#10b981', '#f97316', '#9333ea', '#ec4899', '#64748b'];

const AudienceInsights = () => {
  const { mode } = useMode();
  
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-medium">Audience Demographics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-500" />
                Industry Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {industryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart className="w-4 h-4 text-blue-500" />
                Top Job Titles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobTitles.map((job, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{job.title}</span>
                      <span className="font-medium">{job.percentage}%</span>
                    </div>
                    <Progress value={job.percentage} 
                      className="h-2" 
                      indicatorClassName={cn(
                        index === 0 ? "bg-blue-500" :
                        index === 1 ? "bg-green-500" :
                        index === 2 ? "bg-orange-500" :
                        index === 3 ? "bg-purple-500" :
                        index === 4 ? "bg-pink-500" :
                        "bg-gray-500"
                      )} 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-green-500" />
                Education Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={educationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {educationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-500" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationData.map((location, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{location.name}</span>
                      <span className="font-medium">{location.value}%</span>
                    </div>
                    <Progress value={location.value} 
                      className="h-2" 
                      indicatorClassName={cn(
                        index === 0 ? "bg-blue-500" :
                        index === 1 ? "bg-green-500" :
                        index === 2 ? "bg-orange-500" :
                        index === 3 ? "bg-purple-500" :
                        index === 4 ? "bg-pink-500" :
                        "bg-gray-500"
                      )} 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <Clock className="w-5 h-5 text-orange-600" />
          <h2 className="text-xl font-medium">Audience Activity</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">Peak Active Hours</CardTitle>
              <CardDescription>When your audience is most active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTimeData.map((timeSlot, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{timeSlot.time}</span>
                      <span className="font-medium">{timeSlot.percentage}%</span>
                    </div>
                    <Progress value={timeSlot.percentage} 
                      className="h-2" 
                      indicatorClassName={cn(
                        timeSlot.percentage > 25 ? "bg-green-500" :
                        timeSlot.percentage > 15 ? "bg-blue-500" :
                        "bg-gray-500"
                      )} 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-green-500" />
                Follower Growth
              </CardTitle>
              <CardDescription>Last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold">2,150</h3>
                  <p className="text-sm text-muted-foreground">Total followers</p>
                </div>
                <div className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+72%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                {growthData.map((month, index) => (
                  <div key={index} className="grid grid-cols-[80px_1fr] gap-2 items-center">
                    <span className="text-sm">{month.month}</span>
                    <div className="space-y-1">
                      <div 
                        className="h-8 bg-primary/20 rounded-sm flex items-center"
                        style={{ width: `${(month.followers / 2150) * 100}%` }}
                      >
                        <span className="px-2 text-xs font-medium">{month.followers}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default AudienceInsights;
