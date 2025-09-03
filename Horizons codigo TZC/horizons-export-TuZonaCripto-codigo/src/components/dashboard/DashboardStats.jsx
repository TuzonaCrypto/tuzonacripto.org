import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/dashboard/StatCard';

const DashboardStats = ({ stats, loading }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2, staggerChildren: 0.1 }}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
  >
    {stats.map((stat, index) => (
      <StatCard key={index} {...stat} loading={loading} />
    ))}
  </motion.div>
);

export default DashboardStats;