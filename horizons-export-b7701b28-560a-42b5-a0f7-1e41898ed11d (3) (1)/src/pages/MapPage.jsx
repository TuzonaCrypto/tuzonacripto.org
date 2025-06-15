import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, Filter, MapPin, Star, Bitcoin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { mockBusinesses } from '@/data/mockData';
import { businessCategories as allCategories } from '@/data/mockData';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get('search') || '';

  const [allBusinesses, setAllBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [mapCenter, setMapCenter] = useState([10.4806, -66.9036]); 
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBusinesses = useCallback(async () => {
    setLoading(true);
    try {
      const { data: supabaseBusinesses, error: supabaseError } = await supabase
        .from('businesses')
        .select('*')
        .eq('verified', true);

      if (supabaseError) throw supabaseError;
      
      const normalizedMocks = mockBusinesses.map(b => ({
        ...b,
        id: `mock-${b.id}`,
        accepted_cryptos: b.acceptedCryptos || [],
        reviews_count: b.reviews || 0,
        plan_id: b.plan,
      }));

      const combined = [
        ...(supabaseBusinesses || []),
        ...normalizedMocks
      ];
      
      setAllBusinesses(combined);
    } catch (error) {
      console.error('Error fetching businesses from Supabase:', error);
      if (error.message.includes('Failed to fetch')) {
        toast({
          title: "Error de Conexión",
          description: "No se pudo conectar para cargar los negocios. Mostrando datos de ejemplo.",
          variant: "destructive",
          duration: 5000,
        });
      }
      const normalizedMocks = mockBusinesses.map(b => ({...b, id: `mock-${b.id}`}));
      setAllBusinesses(normalizedMocks);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          if (!initialSearchTerm) { 
            setMapCenter([latitude, longitude]);
          }
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
  }, [initialSearchTerm]);

  useEffect(() => {
    if (loading) return; 

    let filtered = allBusinesses;
    const lowerSearchTerm = searchTerm.toLowerCase();

    if (lowerSearchTerm) {
      filtered = filtered.filter(business =>
        (business.name || '').toLowerCase().includes(lowerSearchTerm) ||
        (business.category || '').toLowerCase().includes(lowerSearchTerm) ||
        (business.address || '').toLowerCase().includes(lowerSearchTerm) ||
        (business.description || '').toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }

    setFilteredBusinesses(filtered);
  }, [searchTerm, selectedCategory, allBusinesses, loading]);

  const categories = [...new Set(allCategories)];

  const svgIconString = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 21.9 12.5 41 12.5 41S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="#EF4444"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      <text x="12.5" y="16.5" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#EF4444">C</text>
    </svg>
  `;
  
  const customIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgIconString),
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
  });

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Mapa Interactivo</span></h1>
          <p className="text-xl text-gray-300">Explora negocios cripto-amigables cerca de ti</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="glass-effect rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input type="text" placeholder="Buscar negocios, servicios, categoría..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-10 bg-black/30 border-red-500/30 text-white placeholder-gray-400" />
              {searchTerm && (
                <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white" onClick={handleClearSearch}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 rounded-md bg-black/30 border border-red-500/30 text-white">
              <option value="" className="bg-slate-800">Todas las categorías</option>
              {categories.map(category => (<option key={category} value={category} className="bg-slate-800">{category}</option>))}
            </select>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-2">
            <div className="glass-effect rounded-xl p-4 h-[600px]">
              {loading ? <div className="flex items-center justify-center h-full text-white">Cargando mapa...</div> :
              <MapContainer center={mapCenter} zoom={userLocation ? 13 : 6} style={{ height: '100%', width: '100%' }} className="rounded-lg">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                {filteredBusinesses.map((business) => {
                  const coordinates = Array.isArray(business.coordinates) 
                    ? { lat: business.coordinates[0], lng: business.coordinates[1] } 
                    : business.coordinates;
                  
                  return (
                    coordinates && typeof coordinates.lat === 'number' && typeof coordinates.lng === 'number' &&
                    <Marker key={business.id} position={[coordinates.lat, coordinates.lng]} icon={customIcon}>
                      <Popup className="custom-popup">
                        <div className="p-2 bg-gray-800 text-white rounded-md w-64">
                          <h3 className="font-semibold text-lg mb-1 text-red-400">{business.name}</h3>
                          <p className="text-red-300 text-sm mb-2">{business.category}</p>
                          <div className="flex items-center mb-2"><Star className="w-4 h-4 text-yellow-400 fill-current mr-1" /><span className="text-sm">{business.rating || 'N/A'}</span></div>
                          <div className="flex items-center mb-2"><MapPin className="w-4 h-4 text-gray-400 mr-1" /><span className="text-sm truncate">{business.address}</span></div>
                          <div className="flex items-center mb-3"><Bitcoin className="w-4 h-4 text-red-400 mr-1" /><span className="text-sm">{(business.accepted_cryptos || []).length} criptos</span></div>
                          <Link to={`/negocio/${business.id}`}><Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">Ver Detalles</Button></Link>
                        </div>
                      </Popup>
                    </Marker>
                  )
                })}
                {userLocation && (<Marker position={userLocation} icon={new L.Icon({ iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-blue.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', shadowSize: [41, 41] })}><Popup>Estás aquí</Popup></Marker>)}
              </MapContainer>
              }
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="space-y-6">
            <div className="glass-effect rounded-xl p-4">
              <h3 className="text-xl font-semibold text-white mb-4">Negocios Encontrados ({filteredBusinesses.length})</h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {loading ? <div className="text-gray-400 text-center py-4">Cargando negocios...</div> :
                 filteredBusinesses.length > 0 ? filteredBusinesses.map((business) => (
                  <div key={business.id} className="crypto-card p-4 rounded-lg border-red-500/30">
                    <div className="flex items-start justify-between mb-2">
                      <div><h4 className="font-semibold text-white">{business.name}</h4><p className="text-red-400 text-sm">{business.category}</p></div>
                      <div className="flex items-center"><Star className="w-4 h-4 text-yellow-400 fill-current mr-1" /><span className="text-white text-sm">{business.rating || 'N/A'}</span></div>
                    </div>
                    <p className="text-gray-300 text-sm mb-2 truncate">{business.address}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center"><Bitcoin className="w-4 h-4 text-red-400 mr-1" /><span className="text-sm text-gray-300">{(business.accepted_cryptos || []).length} criptos</span></div>
                      <Link to={`/negocio/${business.id}`}><Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">Ver</Button></Link>
                    </div>
                  </div>
                )) : (<p className="text-gray-400 text-center py-4">No se encontraron negocios con los filtros actuales.</p>)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;