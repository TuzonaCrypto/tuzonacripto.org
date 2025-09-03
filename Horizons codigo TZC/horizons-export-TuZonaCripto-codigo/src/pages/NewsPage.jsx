import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Filter, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NewsCard from '@/components/NewsCard';
import { mockNewsItems, newsCategories } from '@/data/mockNewsData';
import { toast } from '@/components/ui/use-toast';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulación de carga de noticias
    setTimeout(() => {
      setArticles(mockNewsItems.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setFilteredArticles(mockNewsItems.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setIsLoading(false);
       toast({
        title: "📢 Noticias Cargadas (Simulación)",
        description: "Mostrando noticias de ejemplo. ¡La integración con API real vendrá pronto!",
      });
    }, 1500);
  }, []);

  useEffect(() => {
    let currentArticles = articles;

    if (selectedCategory !== 'all') {
      currentArticles = currentArticles.filter(article => article.category === selectedCategory);
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      currentArticles = currentArticles.filter(article =>
        article.title.toLowerCase().includes(lowerSearchTerm) ||
        article.content.toLowerCase().includes(lowerSearchTerm) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm)))
      );
    }
    setFilteredArticles(currentArticles);
  }, [selectedCategory, searchTerm, articles]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Newspaper className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">Últimas Noticias</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Mantente informado sobre Criptomonedas, IA, Tecnología y Prevención de Legitimación de Capitales.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 p-6 glass-effect rounded-xl"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar noticias..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 h-11 bg-black/30 border-red-500/30 text-white placeholder-gray-400 w-full"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-red-400" />
              <span className="text-gray-300 font-medium hidden sm:inline">Categorías:</span>
              {newsCategories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'text-gray-300 border-red-500/40 hover:bg-red-500/10 hover:text-red-300'
                  } transition-all`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Loader2 className="w-16 h-16 text-red-500 animate-spin mb-4" />
            <p className="text-xl text-gray-300">Cargando noticias...</p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {filteredArticles.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Newspaper className="w-24 h-24 mx-auto text-gray-500 mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-2">No se encontraron noticias</h3>
            <p className="text-gray-400">
              Intenta ajustar tu búsqueda o selecciona otra categoría.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;