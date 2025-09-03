import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient'; // Importa el cliente Supabase
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, User, Shield, Briefcase, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const UserManagementPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      let title = "Error al cargar usuarios";
      let description = "No se pudieron cargar los usuarios. Por favor, revisa tu conexión a internet.";
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
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const { error } = await supabase.from('profiles').update({ user_type: newRole }).eq('id', userId);
      if (error) throw error;
      toast({ title: "Rol Actualizado", description: `El usuario ahora es ${newRole}.` });
      fetchUsers(); // Refresh list
    } catch (error) {
      toast({ title: "Error", description: "No se pudo cambiar el rol.", variant: "destructive" });
    }
  };

  const UserRow = ({ user }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="crypto-card rounded-lg p-4 flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-full ${user.user_type === 'admin' ? 'bg-green-500/20' : user.user_type === 'business' ? 'bg-blue-500/20' : 'bg-gray-500/20'}`}>
          {user.user_type === 'admin' && <Shield className="w-5 h-5 text-green-400" />}
          {user.user_type === 'business' && <Briefcase className="w-5 h-5 text-blue-400" />}
          {user.user_type === 'customer' && <User className="w-5 h-5 text-gray-400" />}
        </div>
        <div>
          <p className="font-semibold text-white">{user.full_name || user.business_name || 'Sin nombre'}</p>
          <p className="text-sm text-gray-400">{user.email || 'Sin email'}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-300 capitalize px-2 py-1 rounded-md bg-gray-700/50">{user.user_type}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 text-slate-50">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700"/>
            <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'admin')} className="hover:!bg-slate-800">Hacer Admin</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'business')} className="hover:!bg-slate-800">Hacer Negocio</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'customer')} className="hover:!bg-slate-800">Hacer Cliente</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700"/>
            <DropdownMenuItem className="text-red-500 hover:!bg-red-500/20 hover:!text-red-400" onClick={() => toast({ title: "🚧 ¡Próximamente!", description: "La eliminación de usuarios estará disponible pronto." })}>
              <Trash2 className="w-4 h-4 mr-2" /> Eliminar Usuario
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );

  if (loading) {
    return <p className="text-center text-gray-300">Cargando usuarios...</p>;
  }

  return (
    <div className="space-y-4">
      {users.length > 0 ? (
        users.map(user => <UserRow key={user.id} user={user} />)
      ) : (
        <p className="text-center text-gray-400">No se encontraron usuarios.</p>
      )}
    </div>
  );
};

export default UserManagementPanel;