
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, LogOut, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { subscriptionPlans } from '@/data/mockData';
import BusinessOwnerDashboard from '@/components/dashboard/BusinessOwnerDashboard';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';

const DashboardPage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const fetchUserProfileAndPlan = useCallback(async () => {
    if (!user) {
      setPageLoading(false);
      return;
    }
    
    setPageLoading(true);
    setFetchError(null);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*, current_plan_id')
        .eq('id', user.id)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          console.warn('Profile not found for user, retrying...');
          setTimeout(fetchUserProfileAndPlan, 2000); 
        } else {
          throw profileError;
        }
      } else {
        setUserProfile(profileData);
        const planId = profileData.current_plan_id || 'freemium';
        const planDetails = subscriptionPlans.find(p => p.id === planId) || subscriptionPlans.find(p => p.id === 'freemium');
        localStorage.setItem('user_profile', JSON.stringify(profileData)); 
        localStorage.setItem('selected_plan', JSON.stringify(planDetails));
        setPageLoading(false);
      }
      
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setFetchError(error);
      setPageLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) {
      return;
    }
    if (!user) {
      navigate('/auth');
    } else {
      fetchUserProfileAndPlan();
    }
  }, [user, authLoading, navigate, fetchUserProfileAndPlan]);

  const fetchBusinesses = useCallback(async () => {
    if (!user || !userProfile || userProfile.user_type !== 'business') {
      setBusinesses([]);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', user.id);

      if (error) throw error;
      setBusinesses(data || []);
    } catch (error) {
      toast({ title: "Error al cargar negocios", description: `No se pudieron cargar tus negocios: ${error.message}`, variant: "destructive" });
      setBusinesses([]);
    }
  }, [user, userProfile]);

  useEffect(() => {
    if (userProfile && userProfile.user_type === 'business') { 
      fetchBusinesses();
    }
  }, [userProfile, fetchBusinesses]);
  
  const handleSignOut = async () => {
    await signOut();
    localStorage.removeItem('user_profile');
    localStorage.removeItem('selected_plan');
    navigate('/auth');
  };

  if (pageLoading || authLoading) {
    return (
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="mb-8">
          <RefreshCw className="w-16 h-16 text-red-500" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Cargando Dashboard...</h1>
        <p className="text-lg text-gray-300">Un momento por favor.</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Error de Conexión</h1>
          <p className="text-lg text-gray-300 mb-6 max-w-md">No pudimos cargar tu información. Por favor, revisa tu conexión a internet e inténtalo de nuevo.</p>
          <div className="flex gap-4">
            <Button onClick={fetchUserProfileAndPlan} className="bg-gradient-to-r from-red-600 to-red-800 text-white">
                <RefreshCw className="w-4 h-4 mr-2" /> Reintentar
            </Button>
            <Button onClick={handleSignOut} variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
              <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
            </Button>
          </div>
      </div>
    );
  }

  if (!userProfile) {
     return (
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Finalizando configuración...</h1>
          <p className="text-lg text-gray-300 mb-6">Estamos preparando tu cuenta. Esto puede tardar un momento.</p>
          <RefreshCw className="w-8 h-8 text-red-500 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="mb-8 flex flex-wrap justify-between items-center gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-300">Bienvenido, <span className="font-semibold text-red-400">{userProfile?.full_name || user?.email}</span></p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/planes')} variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10">
              <Star className="w-4 h-4 mr-2" /> Cambiar Plan
            </Button>
            <Button onClick={handleSignOut} variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
              <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
            </Button>
          </div>
        </motion.div>

        {userProfile?.user_type === 'business' ? (
          <BusinessOwnerDashboard 
            user={user} 
            userProfile={userProfile} 
            businesses={businesses} 
            fetchBusinesses={fetchBusinesses}
            pageLoading={pageLoading}
          />
        ) : (
          <CustomerDashboard />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
