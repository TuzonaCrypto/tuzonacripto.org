import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const NewsCard = ({ article, index }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const fallbackImageUrl = 'https://placehold.co/800x600/CCCCCC/FFFFFF?text=Imagen+No+Disponible&font=montserrat';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="crypto-card rounded-xl overflow-hidden shadow-lg flex flex-col h-full border-red-500/30 hover:shadow-red-500/30"
    >
      <div className="relative w-full h-48 sm:h-56">
        <img
          key={article.id || article.imageUrl} 
          className="absolute inset-0 w-full h-full object-cover"
          src={article.imageUrl || fallbackImageUrl}
          alt={article.title || 'Imagen de noticia'}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = fallbackImageUrl;
            console.warn(`Failed to load image: ${article.imageUrl}. Using fallback placeholder.`);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <span className="absolute top-2 right-2 bg-red-600/80 text-white text-xs font-semibold px-2 py-1 rounded">
          {article.category.toUpperCase()}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-3 leading-tight hover:text-red-400 transition-colors duration-200">
          {article.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
          {article.content}
        </p>
        
        <div className="flex items-center text-xs text-gray-400 mb-2">
          <Calendar className="w-3.5 h-3.5 mr-1.5 text-red-400" />
          <span>{formatDate(article.date)}</span>
          <span className="mx-2">|</span>
          <span>{article.source}</span>
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs bg-gray-700/50 text-red-300 px-2 py-1 rounded-full flex items-center">
                <Tag className="w-3 h-3 mr-1" /> {tag}
              </span>
            ))}
          </div>
        )}
        
        <a
          href={`#news-article/${article.slug}`} 
          onClick={(e) => {
            e.preventDefault();
            toast({
              title: "🚧 ¡Próximamente!",
              description: "La vista detallada del artículo aún no está implementada. ¡Podrás solicitarla pronto! 🚀",
            });
          }}
          className="mt-auto inline-flex items-center text-red-400 hover:text-red-300 font-semibold group transition-colors duration-200"
        >
          Leer Más
          <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </motion.div>
  );
};

export default NewsCard;