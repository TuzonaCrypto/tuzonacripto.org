import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, loading }) => (
  <motion.div 
    className="glass-effect rounded-xl p-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center shadow-md`}>
        {loading ? <RefreshCw className="w-6 h-6 text-white animate-spin" /> : <Icon className="w-6 h-6 text-white" />}
      </div>
      {loading ? <div className="h-8 bg-gray-700 rounded w-1/4 animate-pulse"></div> : <span className="text-2xl font-bold text-white">{value}</span> }
    </div>
    {loading ? <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div> : <p className="text-gray-300">{title}</p>}
  </motion.div>
);

export default StatCard;