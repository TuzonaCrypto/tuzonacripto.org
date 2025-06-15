import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, MapPin } from 'lucide-react';

const CustomerDashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, delay: 0.2 }} 
      className="glass-effect rounded-xl p-8 shadow-lg text-center"
    >
      <Users className="w-16 h-16 text-red-400 mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-white mb-4">Panel de Cliente</h2>
      <p className="text-gray-300 mb-6">¡Bienvenido! Aquí podrás gestionar tus preferencias, ver tus negocios favoritos y administrar tu suscripción (próximamente).</p>
      <Link to="/mapa">
        <Button className="bg-gradient-to-r from-red-600 to-red-800 text-white hover:shadow-xl">
          <MapPin className="w-5 h-5 mr-2" /> Explorar Negocios en el Mapa
        </Button>
      </Link>
    </motion.div>
  );
};

export default CustomerDashboard;