import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Bitcoin, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BusinessCard = ({ business }) => {
  const getCryptoIcon = (crypto) => {
    switch (crypto.toLowerCase()) {
      case 'bitcoin':
      case 'btc':
        return 'B'; 
      case 'ethereum':
      case 'eth':
        return 'E';
      case 'usdt':
      case 'tether':
        return 'T';
      default:
        return 'C';
    }
  };

  if (!business) {
    return null; 
  }
  
  const hasImage = business?.images?.length > 0 && business.images[0];

  // El ID para la URL ya debería estar formateado correctamente desde HomePage (con 'mock-' o como UUID)
  const businessIdForLink = business.id; 

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="crypto-card rounded-xl overflow-hidden group border-red-500/30 h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        {hasImage ? (
           <img 
             alt={`${business.name || 'Nombre no disponible'} - ${business.category || 'Categoría no disponible'}`}
             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
             src={business.images[0]}
             onError={(e) => {
                e.target.onerror = null; 
                e.target.src = `https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80&text=Imagen+No+Disponible`;
             }}
           />
        ) : (
          <img  
            alt={`${business.name || 'Nombre no disponible'} - ${business.category || 'Categoría no disponible'}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
           src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
        )}
        <div className="absolute top-4 right-4">
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {business.plan || 'N/A'}
          </div>
        </div>
        <div className="absolute bottom-4 left-4 flex space-x-1">
          {(business.acceptedCryptos || business.accepted_cryptos || []).slice(0, 3).map((crypto, index) => (
            <div
              key={index}
              className="bg-black/70 text-red-400 px-2 py-1 rounded text-xs font-bold"
            >
              {getCryptoIcon(crypto)}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{business.name || 'Nombre no disponible'}</h3>
            <p className="text-red-400 text-sm">{business.category || 'Categoría no disponible'}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm">{business.rating || 'N/A'}</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">{business.description || 'Descripción no disponible.'}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-400 text-sm">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{business.address || 'Dirección no disponible'}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{business.hours || 'Horario no disponible'}</span>
          </div>
          {business.phone && (
            <div className="flex items-center text-gray-400 text-sm">
              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{business.phone}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <Bitcoin className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-300">
              {(business.acceptedCryptos || business.accepted_cryptos || []).length} criptos
            </span>
          </div>
          <Link to={`/negocio/${businessIdForLink}`}>
            <Button size="sm" className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Ver Detalles
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessCard;