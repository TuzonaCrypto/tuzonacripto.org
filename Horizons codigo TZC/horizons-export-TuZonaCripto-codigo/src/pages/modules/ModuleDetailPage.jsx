import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ModuleDetailPage = ({ module }) => {
  if (!module) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <p className="text-2xl text-red-500">Módulo no encontrado.</p>
      </div>
    );
  }

  const {
    icon: Icon,
    title,
    subtitle,
    gradient,
    heroImage,
    mainDescription,
    features,
    gallery,
  } = module;

  return (
    <div className="pt-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative h-80 md:h-96"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img  
          className="absolute inset-0 w-full h-full object-cover"
          alt={`Hero image for ${title}`}
         src="https://images.unsplash.com/photo-1649215636705-1084bd6df97a" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`w-24 h-24 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
          >
            <Icon className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold mb-2"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl text-red-400"
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link to="/proximamente">
            <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Próximamente
            </Button>
          </Link>
          <div className="glass-effect p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-white mb-4">¿Qué es {title}?</h2>
            <p className="text-lg text-gray-300 leading-relaxed">{mainDescription}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-10">Características Clave</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="crypto-card p-6 rounded-lg text-center">
                <feature.icon className="w-10 h-10 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-10">Galería Visual</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((image, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                  src={image.src}
                  alt={image.alt}
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = `https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80&text=Imagen+No+Disponible`;
                  }}
                />
                <div className="absolute inset-0 bg-black/50 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center glass-effect p-10 rounded-xl"
        >
          <h2 className="text-3xl font-bold text-white mb-4">¡Prepárate para el futuro!</h2>
          <p className="text-xl text-gray-300 mb-8">
            {title} está en desarrollo y pronto formará parte del ecosistema TuZonaCripto.
          </p>
          <Link to="/#newsletter">
            <Button size="lg" className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Suscríbete para recibir noticias
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ModuleDetailPage;