
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { subscriptionPlans } from '@/data/mockData';
import { Plus, Briefcase, AlertCircle, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import BusinessFormModal from '@/components/dashboard/BusinessFormModal';
import BusinessListItem from '@/components/dashboard/BusinessListItem';

const BusinessOwnerDashboard = ({ user, userProfile, businesses, fetchBusinesses, pageLoading }) => {
  const [showAddBusinessModal, setShowAddBusinessModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [newBusinessData, setNewBusinessData] = useState({
    name: '', category: '', description: '', address: '', phone: '', hours: '', 
    accepted_cryptos: [], images: [], website: '', social: { instagram: '', twitter: ''},
    coordinates: { lat: 0, lng: 0 }, rating: 0, reviews_count: 0
  });
  const [formLoading, setFormLoading] = useState(false);

  const planId = userProfile?.current_plan_id || 'freemium';
  const currentUserPlan = subscriptionPlans.find(p => p.id === planId) || subscriptionPlans.find(p => p.id === 'freemium');

  const getPlanLimits = useCallback(() => {
    if (!currentUserPlan) return { maxBusinesses: 0, maxImages: 0, canVerify: false, canAddVideo: false }; 

    let maxBusinesses = 1, maxImages = 1, canVerify = false, canAddVideo = false;
    if (currentUserPlan.id === 'basico') { maxBusinesses = 1; maxImages = 3; }
    else if (currentUserPlan.id === 'premium') { maxBusinesses = 3; maxImages = 10; canVerify = true; canAddVideo = true;}
    else if (currentUserPlan.id === 'empresarial') { maxBusinesses = 10; maxImages = 20; canVerify = true; canAddVideo = true;}
    
    return { maxBusinesses, maxImages, canVerify, canAddVideo };
  }, [currentUserPlan]);

  const planLimits = getPlanLimits();

  const openAddModal = () => {
    setEditingBusiness(null);
    setNewBusinessData({ 
      name: '', category: '', description: '', address: '', phone: '', hours: '', 
      accepted_cryptos: [], images: [], website: '', social: { instagram: '', twitter: '' },
      coordinates: { lat: 0, lng: 0 }, rating: 0, reviews_count: 0
    });
    setShowAddBusinessModal(true);
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

    const businessPayload = {
      ...newBusinessData,
      owner_id: user.id,
      plan_id: currentUserPlan?.id || 'freemium',
      verified: editingBusiness ? editingBusiness.verified : planLimits.canVerify, 
      coordinates: editingBusiness?.coordinates || { lat: parseFloat((Math.random() * 1 + 10).toFixed(4)), lng: parseFloat((Math.random() * 1 - 67).toFixed(4)) }, 
      rating: editingBusiness?.rating || parseFloat((Math.random() * 2 + 3).toFixed(1)), 
      reviews_count: editingBusiness?.reviews_count || Math.floor(Math.random() * 50 + 5), 
      updated_at: new Date().toISOString(),
    };
    
    delete businessPayload.id; 

    let error;
    if (editingBusiness) {
      ({ error } = await supabase.from('businesses').update(businessPayload).eq('id', editingBusiness.id));
    } else {
      businessPayload.created_at = new Date().toISOString();
      ({ error } = await supabase.from('businesses').insert([businessPayload]));
    }

    if (error) {
      toast({ title: "Error", description: `No se pudo guardar el negocio: ${error.message}`, variant: "destructive" });
    } else {
      toast({ title: editingBusiness ? "Negocio Actualizado" : "Negocio Agregado", description: "Tu listado ha sido guardado con éxito." });
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
      accepted_cryptos: business.accepted_cryptos || [],
      social: business.social || { instagram: '', twitter: '' } 
    });
    setShowAddBusinessModal(true);
  };

  const handleDeleteBusiness = async (businessId) => {
    const { error } = await supabase.from('businesses').delete().eq('id', businessId);
    if (error) {
      toast({ title: "Error al eliminar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Negocio eliminado" });
      fetchBusinesses();
    }
  };
  
  const stats = [
    { title: 'Negocios Registrados', value: businesses.length, icon: Briefcase, color: 'from-red-500 to-orange-600' },
    { title: 'Plan Actual', value: currentUserPlan?.name || 'N/A', icon: ShieldCheck, color: 'from-red-600 to-pink-600' },
    { title: 'Límite de Fotos', value: `${planLimits.maxImages}`, icon: ImageIcon, color: 'from-yellow-500 to-orange-500' },
    { title: 'Verificado', value: planLimits.canVerify ? 'Sí' : 'No', icon: ShieldCheck, color: 'from-green-500 to-teal-500' }
  ];

  return (
    <>
      <DashboardStats stats={stats} loading={pageLoading && businesses.length === 0} />
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
              className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" /> Agregar Negocio
            </Button>
          ) : (
            <p className="text-yellow-400 text-sm"><AlertCircle className="inline w-4 h-4 mr-1"/>Has alcanzado el límite de negocios para tu plan.</p>
          )}
        </div>
        {businesses.length === 0 && !pageLoading ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No tienes negocios registrados</h3>
            <p className="text-gray-400 mb-4">Comienza agregando tu primer negocio para atraer clientes cripto.</p>
            <Button onClick={openAddModal} className="bg-gradient-to-r from-red-600 to-red-800 text-white">Agregar Primer Negocio</Button>
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
