import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { subscriptionPlans } from '@/data/mockData';
import { Plus, Briefcase, AlertCircle, ShieldCheck, Image as ImageIcon, EyeOff, Eye, RefreshCw, MapPin } from 'lucide-react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import BusinessFormModal from '@/components/dashboard/BusinessFormModal';
import BusinessListItem from '@/components/dashboard/BusinessListItem';

const BusinessOwnerDashboard = ({ user, userProfile, businesses: initialBusinesses, fetchBusinesses: propFetchBusinesses, pageLoading }) => {
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [showAddBusinessModal, setShowAddBusinessModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [newBusinessData, setNewBusinessData] = useState({
    name: '', category: '', description: '', address: '', phone: '', hours: '', 
    acceptedCryptos: [], images: [], website: '', social: { instagram: '', twitter: ''},
    coordinates: { lat: 0, lng: 0 }, rating: 0, reviews_count: 0, verified: false
  });
  const [formLoading, setFormLoading] = useState(false);
  const [isFetchingBusinesses, setIsFetchingBusinesses] = useState(pageLoading);

  const planId = userProfile?.current_plan_id || 'freemium';
  const currentUserPlan = subscriptionPlans.find(p => p.id === planId) || subscriptionPlans.find(p => p.id === 'freemium');

  const getPlanLimits = useCallback(() => {
    if (!currentUserPlan) return { maxBusinesses: 0, maxImages: 0, canVerify: false, canAddVideo: false }; 

    let maxBusinesses = 1, maxImages = 1, canVerify = false, canAddVideo = false;
    if (currentUserPlan.id === 'freemium') { maxBusinesses = 1; maxImages = 1; }
    else if (currentUserPlan.id === 'basico') { maxBusinesses = 1; maxImages = 3; }
    else if (currentUserPlan.id === 'premium') { maxBusinesses = 3; maxImages = 10; canVerify = true; canAddVideo = true;}
    else if (currentUserPlan.id === 'empresarial') { maxBusinesses = 10; maxImages = 20; canVerify = true; canAddVideo = true;}
    
    return { maxBusinesses, maxImages, canVerify, canAddVideo };
  }, [currentUserPlan]);

  const planLimits = getPlanLimits();

  const fetchBusinesses = useCallback(async () => {
    setIsFetchingBusinesses(true);
    await propFetchBusinesses(); 
    setIsFetchingBusinesses(false);
  }, [propFetchBusinesses]);

  useEffect(() => {
    setBusinesses(initialBusinesses);
  }, [initialBusinesses]);

  useEffect(() => {
    if (pageLoading !== isFetchingBusinesses) {
        setIsFetchingBusinesses(pageLoading);
    }
  }, [pageLoading]);


  const openAddModal = () => {
    setEditingBusiness(null);
    setNewBusinessData({ 
      name: '', category: '', description: '', address: '', phone: '', hours: '', 
      acceptedCryptos: [], images: [], website: '', social: { instagram: '', twitter: '' },
      coordinates: { lat: 0, lng: 0 }, 
      rating: 0, reviews_count: 0, verified: planLimits.canVerify 
    });
    setShowAddBusinessModal(true);
  };

  const geocodeAddress = async (address) => {
    if (!address) return null;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=VE&limit=1`);
      if (!response.ok) {
        throw new Error(`Nominatim API request failed with status ${response.status}`);
      }
      const data = await response.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
      return null;
    } catch (error) {
      console.error("Error geocoding address:", error);
      toast({ title: "Error de Geocodificación", description: "No se pudo obtener la ubicación para la dirección. Por favor, verifica la dirección o inténtalo más tarde.", variant: "destructive" });
      return null;
    }
  };

  const handleSubmitBusiness = async (e) => {
    e.preventDefault();
    if (!user) return;
    setFormLoading(true);

    if (!editingBusiness && businesses.length >= planLimits.maxBusinesses) {
       toast({ title: "Límite de negocios alcanzado", description: `Tu plan actual permite hasta ${planLimits.maxBusinesses} negocios.`, variant: "destructive"});
       setFormLoading(false);
       return;
    }

    let finalCoordinates = newBusinessData.coordinates;
    if (newBusinessData.address && (!editingBusiness || newBusinessData.address !== editingBusiness.address)) {
      toast({ title: "Geocodificando dirección...", description: "Obteniendo coordenadas para la nueva dirección.", variant: "default" });
      const geocodedCoords = await geocodeAddress(newBusinessData.address);
      if (geocodedCoords) {
        finalCoordinates = geocodedCoords;
        toast({ title: "Dirección Geocodificada", description: `Coordenadas obtenidas: Lat ${geocodedCoords.lat.toFixed(4)}, Lng ${geocodedCoords.lng.toFixed(4)}`, variant: "success" });
      } else {
        if (!editingBusiness) {
            finalCoordinates = { lat: parseFloat((Math.random() * (10.6 - 10.3) + 10.3).toFixed(6)), lng: parseFloat((Math.random() * (-66.8 - -67.0) + -67.0).toFixed(6)) }; // Fallback a aleatorias en Caracas
            toast({ title: "Geocodificación Fallida", description: "No se pudo obtener la ubicación exacta. Se usará una ubicación aproximada. Por favor, revisa la dirección.", variant: "destructive" });
        } else {
            finalCoordinates = editingBusiness.coordinates; // Mantener las viejas si es edición y falla
            toast({ title: "Geocodificación Fallida", description: "No se pudo actualizar la ubicación. Se mantendrán las coordenadas anteriores. Por favor, revisa la dirección.", variant: "destructive" });
        }
      }
    }


    const businessPayload = {
      name: newBusinessData.name,
      category: newBusinessData.category,
      description: newBusinessData.description,
      address: newBusinessData.address,
      phone: newBusinessData.phone,
      hours: newBusinessData.hours,
      website: newBusinessData.website,
      social: newBusinessData.social,
      images: newBusinessData.images || [],
      accepted_cryptos: newBusinessData.acceptedCryptos || [],
      owner_id: user.id,
      plan_id: currentUserPlan?.id || 'freemium',
      verified: editingBusiness ? editingBusiness.verified : planLimits.canVerify, 
      coordinates: finalCoordinates, 
      rating: editingBusiness?.rating || parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)), 
      reviews_count: editingBusiness?.reviews_count || Math.floor(Math.random() * 30 + 5), 
      updated_at: new Date().toISOString(),
    };
    
    let error;
    if (editingBusiness) {
      ({ error } = await supabase.from('businesses').update(businessPayload).eq('id', editingBusiness.id));
    } else {
      businessPayload.created_at = new Date().toISOString();
      ({ error } = await supabase.from('businesses').insert([businessPayload]));
    }

    if (error) {
      console.error("Error saving business:", error);
      toast({ title: "Error", description: `No se pudo guardar el negocio: ${error.message}`, variant: "destructive" });
    } else {
      toast({ title: editingBusiness ? "Negocio Actualizado" : "Negocio Agregado", description: `Tu listado ha sido guardado. ${!businessPayload.verified && currentUserPlan.id !== 'freemium' ? "Será revisado por un administrador." : (businessPayload.verified ? "Está visible en el mapa." : "No está verificado y podría no aparecer en el mapa público.")}` });
      fetchBusinesses(); 
      setShowAddBusinessModal(false);
      setEditingBusiness(null);
    }
    setFormLoading(false);
  };

  const handleEditBusiness = (business) => {
    setEditingBusiness(business);
    setNewBusinessData({ 
      ...business,
      acceptedCryptos: business.accepted_cryptos || [],
      social: business.social || { instagram: '', twitter: '' },
      images: business.images || [],
      coordinates: business.coordinates || { lat: 0, lng: 0 }
    });
    setShowAddBusinessModal(true);
  };

  const handleDeleteBusiness = async (businessId) => {
    setFormLoading(true);
    const businessToDelete = businesses.find(b => b.id === businessId);
    if (businessToDelete && businessToDelete.images && businessToDelete.images.length > 0) {
      for (const imageUrl of businessToDelete.images) {
        if (imageUrl.includes('supabase.co')) {
          try {
            const filePath = imageUrl.substring(imageUrl.indexOf('business_images/') + 'business_images/'.length);
            await supabase.storage.from('business_images').remove([filePath]);
          } catch (storageError) {
            console.error("Error deleting image from storage during business deletion:", storageError);
            toast({ title: "Advertencia", description: "No se pudieron eliminar todas las imágenes del almacenamiento, pero el negocio será eliminado.", variant: "destructive" });
          }
        }
      }
    }

    const { error } = await supabase.from('businesses').delete().eq('id', businessId);
    if (error) {
      toast({ title: "Error al eliminar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Negocio eliminado" });
      fetchBusinesses();
    }
    setFormLoading(false);
  };
  
  const stats = [
    { title: 'Negocios Registrados', value: businesses.length, icon: Briefcase, color: 'from-red-500 to-orange-600' },
    { title: 'Plan Actual', value: currentUserPlan?.name || 'N/A', icon: ShieldCheck, color: 'from-red-600 to-pink-600' },
    { title: 'Límite de Fotos', value: `${planLimits.maxImages}`, icon: ImageIcon, color: 'from-yellow-500 to-orange-500' },
    { title: 'Geolocalización', value: <MapPin className="text-blue-400"/>, icon: MapPin, color: 'from-blue-500 to-sky-500' }
  ];

  return (
    <>
      <DashboardStats stats={stats} loading={isFetchingBusinesses && businesses.length === 0} />
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.4 }} 
        className="glass-effect rounded-xl p-6 mb-8 shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-white">Mis Negocios ({businesses.length}/{planLimits.maxBusinesses})</h2>
          {businesses.length < planLimits.maxBusinesses ? (
            <Button onClick={openAddModal}
              className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200" disabled={formLoading || isFetchingBusinesses}>
              <Plus className="w-4 h-4 mr-2" /> Agregar Negocio
            </Button>
          ) : (
            <p className="text-yellow-400 text-sm"><AlertCircle className="inline w-4 h-4 mr-1"/>Has alcanzado el límite de negocios para tu plan.</p>
          )}
        </div>
        {isFetchingBusinesses && businesses.length === 0 ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-red-500 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold text-white mb-2">Cargando tus negocios...</h3>
          </div>
        ) : businesses.length === 0 && !isFetchingBusinesses ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No tienes negocios registrados</h3>
            <p className="text-gray-400 mb-4">Comienza agregando tu primer negocio para atraer clientes cripto.</p>
            <Button onClick={openAddModal} className="bg-gradient-to-r from-red-600 to-red-800 text-white" disabled={formLoading}>Agregar Primer Negocio</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <BusinessListItem 
                key={business.id} 
                business={business} 
                onEdit={handleEditBusiness} 
                onDelete={handleDeleteBusiness} 
              />
            ))}
          </div>
        )}
      </motion.div>
      <BusinessFormModal 
        show={showAddBusinessModal}
        onClose={() => { setShowAddBusinessModal(false); setEditingBusiness(null); }}
        onSubmit={handleSubmitBusiness}
        editingBusiness={editingBusiness}
        newBusiness={newBusinessData}
        setNewBusiness={setNewBusinessData}
        planLimits={planLimits}
        isLoadingForm={formLoading}
      />
    </>
  );
};

export default BusinessOwnerDashboard;