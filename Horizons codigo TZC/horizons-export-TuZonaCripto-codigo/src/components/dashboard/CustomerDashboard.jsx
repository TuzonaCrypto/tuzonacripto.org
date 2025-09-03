import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Briefcase, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient'; // Importa el cliente Supabase
import { toast } from '@/components/ui/use-toast';

const CustomerDashboard = ({ user, refreshProfile }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleBecomeBusiness = async () => {
    if (!user) {
      toast({ title: "Error", description: "Debes iniciar sesión para realizar esta acción.", variant: "destructive" });
      return;
    }
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ user_type: 'business' })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "¡Felicidades!",
        description: "Tu perfil ha sido actualizado. Ahora puedes registrar tus negocios.",
      });

      if (refreshProfile) {
        await refreshProfile();
      }
    } catch (error) {
      toast({
        title: "Error al actualizar perfil",
        description: error.message || "No se pudo cambiar tu tipo de cuenta.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.2 }} 
        className="glass-effect rounded-xl p-8 shadow-lg text-center mb-8"
      >
        <Users className="w-16 h-16 text-red-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Panel de Cliente</h2>
        <p className="text-gray-300 mb-6">¡Bienvenido! Desde aquí puedes explorar el mapa y encontrar los mejores negocios que aceptan cripto.</p>
        <Link to="/mapa">
          <Button className="bg-gradient-to-r from-red-600 to-red-800 text-white hover:shadow-xl">
            <MapPin className="w-5 h-5 mr-2" /> Explorar Negocios en el Mapa
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass-effect rounded-xl p-8 shadow-lg text-center"
      >
        <Briefcase className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">¿Tienes un Negocio?</h2>
        <p className="text-gray-300 mb-6">Regístra tu negocio en TuZonaCripto para llegar a miles de clientes y ser parte de la revolución cripto en Venezuela.</p>
        <Button 
          onClick={handleBecomeBusiness} 
          disabled={isUpdating}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-xl"
        >
          {isUpdating ? (
            <><RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Actualizando...</>
          ) : (
            <><Briefcase className="w-5 h-5 mr-2" /> Registrar mi Negocio</>
          )}
        </Button>
      </motion.div>
    </>
  );
};

export default CustomerDashboard;