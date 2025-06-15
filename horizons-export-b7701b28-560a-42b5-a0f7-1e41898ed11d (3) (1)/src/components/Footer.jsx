import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-900/50 text-gray-400 py-8 text-center border-t border-red-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm">
          &copy; {currentYear} TuZonaCripto. Todos los derechos reservados.
        </p>
        <p className="text-xs mt-2">
          Hecho con <span className="text-red-500 animate-pulse">❤️</span> para la comunidad cripto de Venezuela.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;