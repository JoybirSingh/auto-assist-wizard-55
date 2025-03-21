
import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, TrendingUp, ArrowUpRight, Clock, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { useMode } from '@/context/ModeContext';

// Sample data for demonstration
const weeklyPerformance = [
  { day: 'Mon', impressions: 245, engagements: 42, clicks: 18 },
  { day: 'Tue', impressions: 380, engagements: 65, clicks: 27 },
  { day: 'Wed', impressions: 430, engagements: 78, clicks: 35 },
  { day: 'Thu', impressions: 520, engagements: 95, clicks: 42 },
  { day: 'Fri', impressions: 610, engagements: 112, clicks: 51 },
  { day: 'Sat', impressions: 320, engagements: 58, clicks: 25 },
  { day: 'Sun', impressions: 210, engagements: 38, clicks: 16 },
];

const monthlyTrends = [
  { month: 'Jan', engagementRate: 2.2, clickRate: 0.8, profileViews: 124 },
  { month: 'Feb', engagementRate: 2.5, clickRate: 0.9, profileViews: 145 },
  { month: 'Mar', engagementRate: 2.8, clickRate: 1.1, profileViews: 178 },
  { month: 'Apr', engagementRate: 3.2, clickRate: 1.3, profileViews: 210 },
  { month: 'May', engagementRate: 3.6, clickRate: 1.5, profileViews: 256 },
  { month: 'Jun', engagementRate: 3.9, clickRate: 1.7, profileViews: 312 },
];

const metricsCards = [
  {
    title: "Engagement Rate",
    value: "3.9%",
    change: "+0.7%",
    positive: true,
    icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    description: "vs. last month"
  },
  {
    title: "Click-Through Rate",
    value: "1.7%",
    change: "+0.4%",
    positive: true,
    icon: <ArrowUpRight className="w-5 h-5 text-indigo-500" />,
    description: "vs. last month"
  },
  {
    title: "Avg. Response Time",
    value: "42 min",
    change: "-12 min",
    positive: true,
    icon: <Clock className="w-5 h-5 text-blue-500" />,
    description: "vs. last month"
  },
  {
    title: "Profile Views",
    value: "312",
    change: "+56",
    positive: true,
    icon: <Eye className="w-5 h-5 text-purple-500" />,
    description: "vs. last month"
  },
];

const PerformanceInsights = () => {
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
          <Gauge className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-medium">Performance Overview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metricsCards.map((card, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-semibold">{card.value}</h3>
                      <span className={cn(
                        "text-xs px-1.5 py-0.5 rounded-md flex items-center gap-0.5",
                        card.positive ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
                      )}>
                        {card.change}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                  </div>
                  <div className="p-2 rounded-full bg-muted">{card.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer 
                  className="w-full" 
                  config={{
                    impressions: { color: '#9333ea' },
                    engagements: { color: mode === 'assisted' ? '#10b981' : '#3b82f6' },
                    clicks: { color: '#f97316' },
                  }}
                >
                  <BarChart data={weeklyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="impressions" name="Impressions" fill="var(--color-impressions)" />
                    <Bar dataKey="engagements" name="Engagements" fill="var(--color-engagements)" />
                    <Bar dataKey="clicks" name="Clicks" fill="var(--color-clicks)" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer 
                  className="w-full" 
                  config={{
                    engagementRate: { color: '#10b981' },
                    clickRate: { color: '#f97316' },
                    profileViews: { color: '#9333ea' },
                  }}
                >
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="engagementRate" 
                      stroke="var(--color-engagementRate)" 
                      name="Engagement Rate (%)"
                      strokeWidth={2}
                      yAxisId="left"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="clickRate" 
                      stroke="var(--color-clickRate)" 
                      name="Click Rate (%)"
                      strokeWidth={2}
                      yAxisId="left"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="profileViews" 
                      stroke="var(--color-profileViews)" 
                      name="Profile Views"
                      strokeWidth={2}
                      yAxisId="right"
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceInsights;
