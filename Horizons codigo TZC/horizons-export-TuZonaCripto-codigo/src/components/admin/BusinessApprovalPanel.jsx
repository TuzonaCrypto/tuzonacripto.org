import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient'; // Importa el cliente Supabase
import { toast } from '@/components/ui/use-toast';
import { ShieldCheck, Clock } from 'lucide-react';
import BusinessApprovalCard from '@/components/admin/BusinessApprovalCard';

const BusinessApprovalPanel = () => {
  const [pendingBusinesses, setPendingBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingBusinesses = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select(`*, owner:profiles(full_name)`)
        .eq('verified', false)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setPendingBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching pending businesses:', error);
      let title = "Error al cargar negocios pendientes";
      let description = "No se pudieron cargar los negocios. Por favor, revisa tu conexión a internet.";
      if (error.message.includes('Failed to fetch')) {
        title = "Error de Configuración o Red";
        description = "No se pudo conectar con el servidor. Revisa tu red o la configuración CORS en tu proyecto de Supabase.";
      }
      toast({ title, description, variant: "destructive", duration: 9000 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingBusinesses();
  }, [fetchPendingBusinesses]);

  const handleApprove = async (businessId) => {
    try {
      const { error } = await supabase.from('businesses').update({ verified: true, updated_at: new Date().toISOString() }).eq('id', businessId);
      if (error) throw error;
      toast({ title: "Negocio Aprobado", description: "El negocio ahora es visible en el mapa." });
      fetchPendingBusinesses();
    } catch (error) {
      toast({ title: "Error", description: `No se pudo aprobar el negocio: ${error.message}`, variant: "destructive" });
    }
  };
  
  const handleReject = async (businessId) => {
    try {
      const { error } = await supabase.from('businesses').delete().eq('id', businessId);
      if (error) throw error;
      toast({ title: "Negocio Rechazado", description: "El negocio ha sido eliminado.", variant: "destructive" });
      fetchPendingBusinesses();
    } catch (error) {
      toast({ title: "Error", description: `No se pudo rechazar el negocio: ${error.message}`, variant: "destructive" });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="glass-effect rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white flex items-center mb-6">
        <Clock className="w-6 h-6 mr-3 text-yellow-400" />
        Negocios Pendientes ({pendingBusinesses.length})
      </h2>
      
      {loading && <p className="text-center text-gray-300">Cargando...</p>}
      
      {!loading && pendingBusinesses.length === 0 ? (
        <div className="text-center py-12">
          <ShieldCheck className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">¡Todo al día!</h3>
          <p className="text-gray-400">No hay negocios pendientes de aprobación.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingBusinesses.map(business => (
            <BusinessApprovalCard 
              key={business.id}
              business={business}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BusinessApprovalPanel;