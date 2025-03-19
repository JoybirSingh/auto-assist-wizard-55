
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';
import { Sparkles, TrendingUp, BarChart2 } from 'lucide-react';

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
      icon: <TrendingUp className="w-5 h-5" />
    },
    { 
      title: 'Comment Quality Score', 
      value: mode === 'assisted' ? '9.4/10' : '8.7/10', 
      description: mode === 'assisted' ? 'Excellent' : 'Very Good',
      icon: <Sparkles className="w-5 h-5" />
    },
    { 
      title: 'Network Growth', 
      value: '+23', 
      description: 'New connections this week',
      icon: <BarChart2 className="w-5 h-5" />
    },
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
            className="glass-card rounded-xl p-6 card-shine"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
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
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="glass-card rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-4">Weekly Engagement Overview</h3>
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
      </motion.div>
    </div>
  );
};

export default EngagementStats;
