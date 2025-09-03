import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link importado aquí
import { motion } from 'framer-motion';
import { Star, LogOut, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient'; 
import { subscriptionPlans } from '@/data/mockData';
import BusinessOwnerDashboard from '@/components/dashboard/BusinessOwnerDashboard';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';
import AdminDashboard from '@/components/admin/AdminDashboard';

const DashboardPage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const fetchUserProfileAndPlan = useCallback(async () => {
    if (!user) {
      setPageLoading(false);
      return;
    }
    
    setPageLoading(true);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*, current_plan_id')
        .eq('id', user.id)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          console.warn('Profile not found for user. This might be temporary after signup or if the handle_new_user trigger is not working as expected for admin creation.');
          if (user.email === 'drdarwingiraud@gmail.com') { 
            toast({ title: "Perfil Admin no encontrado", description: "El perfil para el administrador no se encontró. Asegúrate de que el trigger `handle_new_user` esté activo y funcione correctamente, o crea el perfil manualmente en Supabase con `user_type: 'admin'`.", variant: "destructive", duration: 9000 });
          } else {
            toast({ title: "Cargando perfil...", description: "Finalizando la configuración de tu cuenta.", variant: "default" });
          }
        } else {
          throw profileError;
        }
      } else {
        setUserProfile(profileData);
        const planId = profileData.current_plan_id || 'freemium';
        const planDetails = subscriptionPlans.find(p => p.id === planId) || subscriptionPlans.find(p => p.id === 'freemium');
        localStorage.setItem('user_profile', JSON.stringify(profileData)); 
        localStorage.setItem('selected_plan', JSON.stringify(planDetails));
      }
      
    } catch (error) {
      console.error('Error fetching profile/plan:', error);
      let title = "Error al cargar perfil";
      let description = "No se pudo cargar tu información. Intenta recargar la página.";
      if (error.message.includes('Failed to fetch')) {
        title = "Error de Configuración o Red";
        description = "No se pudo conectar con el servidor. Revisa tu red o la configuración CORS en tu proyecto de Supabase.";
      }
      toast({ title, description, variant: "destructive", duration: 9000 });
    } finally {
      setPageLoading(false);
    }
  }, [user, toast]);

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
      if (userProfile && userProfile.user_type !== 'business') {
        setPageLoading(false);
      }
      return;
    }
    setPageLoading(true); 
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', user.id);

      if (error) throw error;
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      let title = "Error al cargar negocios";
      let description = "No se pudieron cargar tus negocios. Por favor, revisa tu conexión a internet.";
      if (error.message.includes('Failed to fetch')) {
        title = "Error de Configuración o Red";
        description = "No se pudo conectar con el servidor. Revisa tu red o la configuración CORS en tu proyecto de Supabase.";
      }
      toast({ title, description, variant: "destructive", duration: 9000 });
      setBusinesses([]);
    } finally {
      setPageLoading(false); 
    }
  }, [user, userProfile, toast]);

  useEffect(() => {
    if (userProfile && userProfile.user_type === 'business') { 
      fetchBusinesses();
    }
  }, [userProfile, fetchBusinesses]);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const renderDashboardContent = () => {
    if (!userProfile) {
      if (user && user.email === 'drdarwingiraud@gmail.com' && !authLoading) {
         return (
          <div className="pt-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Error de Perfil de Administrador</h1>
              <p className="text-lg text-gray-300 mb-6">El perfil para <code className="bg-gray-700 px-1 rounded">{user.email}</code> no se encontró o no tiene el rol 'admin'.</p>
              <p className="text-md text-gray-400 mb-2">1. Asegúrate de haber usado la página <Link to="/create-master-account" className="text-red-400 hover:underline">Crear Cuenta Maestra</Link> para registrar esta cuenta.</p>
              <p className="text-md text-gray-400 mb-2">2. Verifica que el trigger <code className="bg-gray-700 px-1 rounded">handle_new_user</code> en Supabase esté activo y configurado para asignar <code className="bg-gray-700 px-1 rounded">user_type: 'admin'</code>.</p>
              <p className="text-md text-gray-400 mb-6">3. Si el perfil existe, verifica manually en la tabla 'profiles' de Supabase que <code className="bg-gray-700 px-1 rounded">user_type</code> sea 'admin' para el ID de este usuario.</p>
              <Button onClick={handleSignOut} variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                  <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión e Intentar de Nuevo
              </Button>
          </div>
        );
      }
      return (
        <div className="pt-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Perfil no encontrado</h1>
            <p className="text-lg text-gray-300 mb-6">No pudimos cargar tu perfil. Por favor, intenta cerrar sesión y volver a entrar.</p>
            <Button onClick={handleSignOut} variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
            </Button>
        </div>
      );
    }

    switch (userProfile.user_type) {
      case 'admin':
        return <AdminDashboard />;
      case 'business':
        return (
          <BusinessOwnerDashboard 
            user={user} 
            userProfile={userProfile} 
            businesses={businesses} 
            fetchBusinesses={fetchBusinesses}
            pageLoading={pageLoading}
          />
        );
      case 'customer':
      default:
        return <CustomerDashboard user={user} refreshProfile={fetchUserProfileAndPlan} />;
    }
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
            <p className="text-xl text-gray-300">Bienvenido, <span className="font-semibold text-red-400">{userProfile?.full_name || userProfile?.business_name || user?.email}</span></p>
          </div>
          <div className="flex gap-2">
            {userProfile?.user_type !== 'admin' && (
              <Button onClick={() => navigate('/planes')} variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10">
                <Star className="w-4 h-4 mr-2" /> Cambiar Plan
              </Button>
            )}
            <Button onClick={handleSignOut} variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
              <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
            </Button>
          </div>
        </motion.div>

        {renderDashboardContent()}
        
      </div>
    </div>
  );
};

export default DashboardPage;