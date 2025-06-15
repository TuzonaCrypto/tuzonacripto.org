
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Menu, X, User, Search, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/b7701b28-560a-42b5-a0f7-1e41898ed11d/3d83369c94e99de6f92bc5a9e1848869.png";

  const navItems = [
    { name: 'Inicio', path: '/', icon: null },
    { name: 'Mapa', path: '/mapa', icon: MapPin },
    { name: 'Planes', path: '/planes', icon: Briefcase },
  ];

  return (
    <nav className="sticky top-0 w-full z-40 glass-effect border-b border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={logoUrl} alt="TuZonaCripto Logo" className="w-10 h-10" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">
              TuZonaCripto
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              if (item.path === '/') return null; 
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-red-600/20 text-red-400'
                      : 'text-gray-300 hover:text-red-400 hover:bg-red-600/10'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <User className="w-4 h-4 mr-2" />
                Ingresar
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-red-400"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 space-y-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-red-600/20 text-red-400'
                      : 'text-gray-300 hover:text-red-400 hover:bg-red-600/10'
                  }`}
                >
                  {Icon ? <Icon className="w-4 h-4" /> : item.path === '/' && <img src={logoUrl} alt="Inicio" className="w-4 h-4" />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Link
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-600/10"
            >
              <User className="w-4 h-4" />
              <span>Ingresar</span>
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
