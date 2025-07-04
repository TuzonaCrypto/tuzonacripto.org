import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Bitcoin, Clock, Phone, Globe, Instagram, Twitter, ArrowLeft, Heart, Share2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { subscriptionPlans, mockBusinesses } from '@/data/mockData';

const BusinessPage = () => {
  const { id: routeId } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const isUUID = (idString) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(idString);
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      setLoading(true);
      setBusiness(null);

      try {
        let businessData = null;
  
        if (routeId.startsWith('mock-')) {
          const mockId = parseInt(routeId.replace('mock-', ''), 10);
          const mockBusiness = mockBusinesses.find(b => b.id === mockId);
          if (mockBusiness) {
            businessData = {
              ...mockBusiness,
              id: `mock-${mockBusiness.id}`,
              accepted_cryptos: mockBusiness.acceptedCryptos || [],
              reviews_count: mockBusiness.reviews || 0,
              plan_id: mockBusiness.plan,
            };
          }
        } else if (isUUID(routeId)) {
          const { data, error } = await supabase
            .from('businesses')
            .select('*')
            .eq('id', routeId)
            .single();

          if (error && error.code !== 'PGRST116') {
            throw error;
          }
          businessData = data;
        } else {
          toast({ title: "ID de Negocio Inválido", description: "El identificador del negocio no es válido.", variant: "destructive" });
          setLoading(false);
          return;
        }
  
        if (!businessData) {
          toast({ title: "Negocio no encontrado", description: "No se pudo cargar la información del negocio.", variant: "destructive" });
          setBusiness(null);
        } else {
          setBusiness(businessData);
          if (businessData.images && businessData.images.length > 0) {
            setSelectedImageIndex(0);
          }
        }
      } catch (error) {
        console.error('Error fetching business:', error);
        if (error.message.includes('Failed to fetch')) {
          toast({
              title: "Error de Conexión",
              description: "No se pudo conectar para cargar la información del negocio. Revisa tu conexión a internet.",
              variant: "destructive",
              duration: 5000,
          });
        } else {
          toast({ title: "Error Inesperado", description: `No se pudo cargar el negocio: ${error.message}`, variant: "destructive" });
        }
        setBusiness(null);
      } finally {
        setLoading(false);
      }
    };
  
    if (routeId) {
      fetchBusiness();
    }
  }, [routeId]);

  const handleShare = () => {
    if (navigator.share && business) {
      navigator.share({
        title: business.name,
        text: business.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Enlace copiado",
        description: "El enlace ha sido copiado al portapapeles",
      });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (business) {
      toast({
        title: isFavorite ? "Eliminado de favoritos" : "Agregado a favoritos",
        description: isFavorite ? `${business.name} fue eliminado de tus favoritos` : `${business.name} fue agregado a tus favoritos`,
      });
    }
  };

  const getCryptoIcon = (crypto) => {
    if (!crypto) return 'C';
    switch (crypto.toLowerCase()) {
      case 'bitcoin': case 'btc': return 'B';
      case 'ethereum': case 'eth': return 'E';
      case 'usdt': case 'tether': return 'T';
      default: return 'C';
    }
  };
  
  const acceptedCryptosList = business?.accepted_cryptos || [];

  const mainImageSrc = business && business.images && business.images.length > selectedImageIndex && business.images[selectedImageIndex]
    ? business.images[selectedImageIndex]
    : `https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80&text=${business ? (business.name || 'Negocio').split(' ').join('+') : 'Negocio'}`;

  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = `https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80&text=Error+Imagen`;
  };

  if (loading) {
    return <div className="pt-16 min-h-screen flex items-center justify-center text-white">Cargando negocio...</div>;
  }

  if (!business) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Negocio no encontrado</h2>
          <p className="text-gray-300 mb-4">No pudimos cargar este negocio. Puede que no exista o haya un problema de conexión.</p>
          <Link to="/mapa">
            <Button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white">
              Volver al Mapa
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const planId = business.plan_id;
  const currentPlan = subscriptionPlans.find(p => p.id.toLowerCase() === planId?.toLowerCase()) || { name: 'Básico' };


  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <Link to="/mapa">
            <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Mapa
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="glass-effect rounded-xl overflow-hidden">
              <div className="relative h-64 md:h-96">
                 <img alt={`Imagen principal de ${business.name}`} className="w-full h-full object-cover" src={mainImageSrc} onError={handleImageError} />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="icon" variant="outline" onClick={toggleFavorite} className={`${isFavorite ? 'bg-red-600 border-red-700' : 'bg-black/40 border-white/30'} backdrop-blur-sm hover:bg-red-600/80 hover:border-red-700/80`}>
                    <Heart className={`w-4 h-4 ${isFavorite ? 'text-white fill-current' : 'text-white'}`} />
                  </Button>
                  <Button size="icon" variant="outline" onClick={handleShare} className="bg-black/40 border-white/30 backdrop-blur-sm text-white hover:bg-red-600/80 hover:border-red-700/80">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    {currentPlan.name}
                  </div>
                </div>
              </div>

              {business.images && business.images.length > 1 && (
                <div className="p-4 bg-black/20">
                  <h3 className="text-sm font-semibold text-white mb-2 flex items-center"><ImageIcon className="w-4 h-4 mr-2 text-red-400"/> Miniaturas</h3>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {business.images.map((imgUrl, index) => (
                      <button key={index} onClick={() => setSelectedImageIndex(index)} className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 focus:outline-none ring-2 ${selectedImageIndex === index ? 'ring-red-500' : 'ring-transparent hover:ring-red-400/50'}`}>
                        <img alt={`Miniatura ${index + 1} de ${business.name}`} className="w-full h-full object-cover" src={imgUrl} onError={handleImageError} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{business.name}</h1>
                    <p className="text-red-400 text-lg">{business.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <span className="text-white text-xl font-semibold">{business.rating || 'N/A'}</span>
                    <span className="text-gray-400">({(business.reviews_count || 0)} reseñas)</span>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{business.description}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="glass-effect rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Bitcoin className="w-6 h-6 mr-2 text-red-400" /> Criptomonedas Aceptadas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {acceptedCryptosList.map((crypto, index) => (
                  <div key={index} className="crypto-card p-4 rounded-lg text-center border-red-500/30">
                    <div className="text-3xl font-bold text-red-400 mb-2">{getCryptoIcon(crypto)}</div>
                    <p className="text-white font-semibold">{crypto}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3"><MapPin className="w-5 h-5 text-red-400 mt-1" /><div><p className="text-white font-semibold">Dirección</p><p className="text-gray-300">{business.address}</p></div></div>
                <div className="flex items-start space-x-3"><Clock className="w-5 h-5 text-red-400 mt-1" /><div><p className="text-white font-semibold">Horarios</p><p className="text-gray-300">{business.hours}</p></div></div>
                {business.phone && (<div className="flex items-start space-x-3"><Phone className="w-5 h-5 text-red-400 mt-1" /><div><p className="text-white font-semibold">Teléfono</p><a href={`tel:${business.phone}`} className="text-red-300 hover:text-red-200">{business.phone}</a></div></div>)}
                {business.website && (<div className="flex items-start space-x-3"><Globe className="w-5 h-5 text-red-400 mt-1" /><div><p className="text-white font-semibold">Sitio Web</p><a href={business.website} target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200">Visitar sitio</a></div></div>)}
              </div>
            </motion.div>

            {(business.social?.instagram || business.social?.twitter) && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="glass-effect rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Redes Sociales</h3>
                <div className="space-y-3">
                  {business.social?.instagram && (<a href={`https://instagram.com/${business.social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-300 hover:text-red-400 transition-colors"><Instagram className="w-5 h-5" /><span>{business.social.instagram}</span></a>)}
                  {business.social?.twitter && (<a href={`https://twitter.com/${business.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-300 hover:text-red-400 transition-colors"><Twitter className="w-5 h-5" /><span>{business.social.twitter}</span></a>)}
                </div>
              </motion.div>
            )}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200" onClick={() => toast({ title: "🚧 Funcionalidad no implementada", description: "Contactar al negocio aún no está disponible." })}>Contactar Negocio</Button>
              <Button variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200" onClick={() => toast({ title: "🚧 Funcionalidad no implementada", description: "Reportar problema aún no está disponible." })}>Reportar Problema</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;