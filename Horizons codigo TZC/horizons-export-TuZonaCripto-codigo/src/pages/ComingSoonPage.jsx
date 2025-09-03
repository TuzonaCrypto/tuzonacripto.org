import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { moduleDetails } from '@/data/moduleDetails';
import { useTranslation } from 'react-i18next';

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  gradient,
  path
}) => {
  const { t } = useTranslation();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="crypto-card p-6 rounded-xl shadow-lg border-red-500/30 flex flex-col h-full"
    >
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center mr-4 shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 mb-3 text-sm flex-grow">{description}</p>
      <div className="mt-auto pt-4 border-t border-red-500/20">
        <Link to={path}>
          <Button className="w-full bg-gradient-to-r from-red-600/80 to-red-800/80 hover:from-red-600 hover:to-red-800 text-white">
            {t('comingsoon.learn_more')} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

const ComingSoonPage = () => {
  const { t } = useTranslation();
  const modules = Object.values(moduleDetails);
  
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <Rocket className="w-20 h-20 mx-auto mb-6 text-red-500" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">{t('comingsoon.title')}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            {t('comingsoon.subtitle')}
          </p>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto">
            {t('comingsoon.description')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.3 }} 
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">
            {t('comingsoon.modules_title')}
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {modules.map((module) => (
            <FeatureCard 
              key={module.id} 
              icon={module.icon} 
              title={module.title} 
              description={module.shortDescription} 
              gradient={module.gradient}
              path={module.path}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.5 }} 
          className="text-center"
        >
          <p className="text-2xl font-semibold text-red-400">
            {t('comingsoon.final_cta')}
          </p>
          <TrendingUp className="w-16 h-16 mx-auto mt-8 text-red-500 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoonPage;