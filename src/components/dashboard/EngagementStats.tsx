
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';
import { Sparkles, TrendingUp, BarChart2, Users, Award, BadgeCheck, Clock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Sample data for the chart
const data = [
  { name: 'Mon', engagement: 5, comments: 3, likes: 8 },
  { name: 'Tue', engagement: 8, comments: 5, likes: 10 },
  { name: 'Wed', engagement: 12, comments: 7, likes: 15 },
  { name: 'Thu', engagement: 10, comments: 6, likes: 13 },
  { name: 'Fri', engagement: 15, comments: 9, likes: 18 },
  { name: 'Sat', engagement: 18, comments: 12, likes: 22 },
  { name: 'Sun', engagement: 20, comments: 15, likes: 25 },
];

const EngagementStats = () => {
  const { mode } = useMode();

  const metrics = [
    { 
      title: 'Profile Views', 
      value: '+187%', 
      description: 'Increased from last week',
      icon: <TrendingUp className="w-5 h-5" />,
      badge: 'Trending Up'
    },
    { 
      title: 'Comment Quality Score', 
      value: mode === 'assisted' ? '9.4/10' : '8.7/10', 
      description: mode === 'assisted' ? 'Excellent' : 'Very Good',
      icon: <Sparkles className="w-5 h-5" />,
      badge: 'Top 5%'
    },
    { 
      title: 'Network Growth', 
      value: '+23', 
      description: 'New connections this week',
      icon: <BarChart2 className="w-5 h-5" />,
      badge: 'Accelerating'
    },
  ];

  const achievements = [
    { title: 'Consistent Engager', description: '5-day streak', icon: <Clock className="w-4 h-4" />, progress: 70 },
    { title: 'Networking Pro', description: '100+ comments', icon: <Users className="w-4 h-4" />, progress: 85 },
    { title: 'Quality Contributor', description: 'High-value insights', icon: <BadgeCheck className="w-4 h-4" />, progress: 60 },
  ];

  return (
    <div className="mb-12">
      <div className="flex flex-col space-y-2 mb-6">
        <h2 className="text-2xl font-semibold">Engagement Analytics</h2>
        <p className="text-muted-foreground">
          Track your LinkedIn engagement metrics over time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            className="glass-card rounded-xl p-6 card-shine hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-800 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {metric.badge && (
              <Badge className="absolute top-2 right-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {metric.badge}
              </Badge>
            )}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground mb-1">{metric.title}</p>
                <h3 className="text-3xl font-bold">{metric.value}</h3>
                <p className="text-sm text-muted-foreground mt-1">{metric.description}</p>
              </div>
              <div className={cn(
                "p-3 rounded-full",
                mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
              )}>
                {metric.icon}
              </div>
            </div>
            {/* Subtle hint about premium features */}
            {index === 1 && (
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Premium insight available</span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    View Details
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Achievements and Rewards Section */}
      <motion.div
        className="glass-card rounded-xl p-6 mb-8 border border-gray-100 dark:border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold">Your Achievements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                  {achievement.icon}
                </div>
                <h4 className="font-medium">{achievement.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{achievement.progress}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="outline" className="gap-2">
            <Target className="w-4 h-4" />
            <span>Set Engagement Goals</span>
          </Button>
        </div>
      </motion.div>

      <motion.div 
        className="glass-card rounded-xl p-6 border border-gray-100 dark:border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Weekly Engagement Overview</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            Real-time data
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke={mode === 'assisted' ? '#10b981' : '#3b82f6'}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="comments"
                stroke="#9333ea"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Social Proof Element */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="font-medium">523 professionals</span> like you are improving their LinkedIn presence today
              </span>
            </div>
            <Button variant="premium" size="sm" className="whitespace-nowrap">
              Join Them
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EngagementStats;
