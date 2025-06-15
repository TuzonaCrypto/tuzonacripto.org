
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const CryptoTicker = () => {
  const [topCoins, setTopCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h');
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setTopCoins(data);
      } catch (err) {
        console.error("Failed to fetch crypto data:", err);
        setError(err.message);
        setTopCoins([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchTopCoins();
    const intervalId = setInterval(fetchTopCoins, 60000); 

    return () => clearInterval(intervalId);
  }, []);

  if (loading && topCoins.length === 0) {
    return (
      <div className="bg-black/80 text-white py-2 px-4 text-xs text-center backdrop-blur-sm">
        Cargando precios de criptomonedas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/80 text-white py-2 px-4 text-xs text-center backdrop-blur-sm">
        Error al cargar precios: {error}. Intentando de nuevo...
      </div>
    );
  }
  
  if (topCoins.length === 0 && !loading) {
     return (
      <div className="bg-gray-800/80 text-white py-2 px-4 text-xs text-center backdrop-blur-sm">
        No se pudieron cargar los datos de criptomonedas en este momento.
      </div>
    );
  }


  const tickerVariants = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: topCoins.length * 4, 
          ease: 'linear',
        },
      },
    },
  };

  return (
    <div className="bg-black/80 text-white py-2 overflow-hidden backdrop-blur-sm border-b border-red-500/10">
      <motion.div
        className="flex whitespace-nowrap"
        variants={tickerVariants}
        animate="animate"
      >
        {topCoins.concat(topCoins).map((coin, index) => ( 
          <div key={`${coin.id}-${index}`} className="inline-flex items-center mx-4 text-xs">
            <img src={coin.image} alt={coin.name} className="w-4 h-4 mr-2" />
            <span className="font-semibold mr-1">{coin.symbol.toUpperCase()}:</span>
            <span className="mr-2">${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className={`flex items-center ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CryptoTicker;
