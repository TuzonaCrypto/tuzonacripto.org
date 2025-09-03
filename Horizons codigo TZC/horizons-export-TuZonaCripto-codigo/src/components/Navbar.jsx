import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Menu, X, User, Briefcase, LayoutDashboard, Rocket, Newspaper, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/b7701b28-560a-42b5-a0f7-1e41898ed11d/5a22bc78bcb42f59c47a43f0c6d5fda2.jpg";

  const navItems = [
    { name: t('nav.inicio'), path: '/', icon: null },
    { name: t('nav.mapa'), path: '/mapa', icon: MapPin },
    { name: t('nav.planes'), path: '/planes', icon: Briefcase },
    { name: t('nav.noticias'), path: '/noticias', icon: Newspaper },
    { name: t('nav.proximamente'), path: '/proximamente', icon: Rocket },
    { name: t('nav.contacto'), path: '/contacto', icon: Mail },
  ];

  return (
    <nav className="sticky top-0 w-full z-40 glass-effect border-b border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={logoUrl} alt="TuZonaCripto Logo" className="h-10" />
            </motion.div>
            <span className="hidden sm:inline text-xl font-bold text-white tracking-wider">TuZonaCripto</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              if (item.path === '/') return null; 
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
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
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  {t('nav.dashboard')}
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  <User className="w-4 h-4 mr-2" />
                  {t('nav.ingresar')}
                </Button>
              </Link>
            )}
             <LanguageSwitcher />
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
             <LanguageSwitcher />
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
            {user ? (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-600/10"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{t('nav.dashboard')}</span>
              </Link>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-600/10"
              >
                <User className="w-4 h-4" />
                <span>{t('nav.ingresar')}</span>
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;