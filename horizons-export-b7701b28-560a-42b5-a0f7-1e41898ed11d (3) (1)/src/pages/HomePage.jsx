import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Search, Star, Bitcoin, Shield, Users, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import BusinessCard from '@/components/BusinessCard';
import { supabase } from '@/lib/supabaseClient';
import { mockBusinesses } from '@/data/mockData'; 

const EthereumIcon = ({ className, size = "w-16 h-16" }) => (
  <svg 
    className={`${className} ${size} text-red-500/30`} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0.75L11.25 8.5L12 10.5L12.75 8.5L12 0.75Z" />
    <path d="M12 11.625L7.5 14.25L12 16.125L16.5 14.25L12 11.625Z" />
    <path d="M12 23.25L12.75 17.25L12 16.125L11.25 17.25L12 23.25Z" />
    <path d="M12 16.125L7.5 14.25V10.5L12 11.625V16.125Z" />
    <path d="M12 16.125L16.5 14.25V10.5L12 11.625V16.125Z" />
    <path d="M7.5 10.5L12 8.25L16.5 10.5L12 11.625L7.5 10.5Z" />
  </svg>
);


const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);
  const [allBusinessesData, setAllBusinessesData] = useState([]);
  const [totalBusinesses, setTotalBusinesses] = useState(0);
  const navigate = useNavigate();

  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const fetchAllBusinesses = useCallback(async () => {
    try {
      const { data: supabaseBusinesses, error: supabaseError, count } = await supabase
        .from('businesses')
        .select('*', { count: 'exact' });

      if (supabaseError) throw supabaseError;
      
      const normalizedMocks = mockBusinesses.map(b => ({
        ...b,
        id: `mock-${b.id}`,
        accepted_cryptos: b.acceptedCryptos || [],
        reviews_count: b.reviews || 0,
        plan_id: b.plan,
      }));

      const combinedBusinesses = [
        ...(supabaseBusinesses || []),
        ...normalizedMocks
      ];
      
      setAllBusinessesData(combinedBusinesses);
      setTotalBusinesses((count || 0) + mockBusinesses.length);
      
      const shuffledCombined = shuffleArray([...combinedBusinesses]);
      setFeaturedBusinesses(shuffledCombined.slice(0, 9));

    } catch (error) {
      console.error('Error fetching businesses from Supabase:', error);
      if (error.message.includes('Failed to fetch')) {
        toast({
          title: "Error de Conexión",
          description: "No se pudo conectar para cargar los negocios. Revisa tu conexión a internet y vuelve a intentarlo.",
          variant: "destructive",
          duration: 5000,
        });
      }
      const shuffledMocks = shuffleArray([...mockBusinesses].map(b => ({...b, id: `mock-${b.id}`}))).slice(0, 9);
      setFeaturedBusinesses(shuffledMocks);
      setTotalBusinesses(mockBusinesses.length);
    }
  }, []);

  useEffect(() => {
    fetchAllBusinesses();
  }, [fetchAllBusinesses]);

  useEffect(() => {
    if (searchTerm === '') {
      const shuffledCombined = shuffleArray([...allBusinessesData]);
      setFeaturedBusinesses(shuffledCombined.slice(0, 9));
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const filtered = allBusinessesData.filter(business =>
        (business.name || '').toLowerCase().includes(lowerSearchTerm) ||
        (business.category || '').toLowerCase().includes(lowerSearchTerm) ||
        (business.description || '').toLowerCase().includes(lowerSearchTerm)
      );
      setFeaturedBusinesses(filtered.slice(0, 9));
    }
  }, [searchTerm, allBusinessesData]);
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/mapa?search=${encodeURIComponent(searchTerm)}`);
  };

  const features = [
    { icon: MapPin, title: 'Geolocalización Precisa', description: 'Encuentra negocios cripto-amigables cerca de ti con nuestro mapa interactivo', gradient: 'from-red-500 to-orange-500' },
    { icon: Shield, title: 'Verificación Confiable', description: 'Negocios verificados para tu tranquilidad', gradient: 'from-red-600 to-pink-600' },
    { icon: Bitcoin, title: 'Cripto-Amigable', description: 'Comercios que aceptan diversas criptomonedas', gradient: 'from-red-700 to-rose-700' },
    { icon: Users, title: 'Comunidad Activa', description: 'Reseñas y valoraciones de otros usuarios cripto', gradient: 'from-red-400 to-red-600' }
  ];

  const stats = [
    { number: `${totalBusinesses}+`, label: 'Negocios Registrados' },
    { number: '20+', label: 'Estados de Venezuela' },
    { number: '1K+', label: 'Usuarios Activos (Simulado)' },
    { number: '4.5+', label: 'Calificación Promedio (Simulado)' }
  ];

  return (
    <div className="pt-0">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-80" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute floating-animation" style={{ 
            top: `${Math.random() * 80 + 10}%`, 
            left: `${Math.random() * 80 + 10}%`,
            animationDelay: `${Math.random() * 5}s`
          }}>
            <EthereumIcon size={`w-${Math.floor(Math.random() * 10) + 10} h-${Math.floor(Math.random() * 10) + 10}`} />
          </div>
        ))}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">TuZonaCripto</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              El directorio más completo de negocios cripto-amigables en Venezuela. Encuentra comercios, servicios y profesionales que aceptan criptomonedas.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input type="text" placeholder="Buscar negocios, servicios..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 h-12 bg-black/30 border-red-500/30 text-white placeholder-gray-400" />
            </form>
            <Button onClick={handleSearchSubmit} size="lg" className="h-12 px-8 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              <MapPin className="w-5 h-5 mr-2" /> Ver Mapa
            </Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">{stat.number}</div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gray-900/80 to-black/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">¿Por qué TuZonaCripto?</span></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">La plataforma más confiable para conectar la comunidad cripto con negocios locales</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} className="crypto-card p-6 rounded-xl text-center border-red-500/30">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}><Icon className="w-8 h-8 text-white" /></div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">Negocios Destacados</span></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Descubre los mejores comercios y servicios cripto-amigables cerca de ti</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredBusinesses.map((business, index) => (
              <motion.div key={business.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }}>
                <BusinessCard business={business} />
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/mapa">
              <Button size="lg" className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Ver Todos los Negocios <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-800/10 via-red-900/10 to-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6"><span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">¿Tienes un Negocio?</span></h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Únete a la revolución cripto y conecta con miles de usuarios que buscan negocios como el tuyo</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/planes"><Button size="lg" className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"><TrendingUp className="w-5 h-5 mr-2" /> Ver Planes</Button></Link>
              <Link to="/auth"><Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">Registrar Negocio</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;