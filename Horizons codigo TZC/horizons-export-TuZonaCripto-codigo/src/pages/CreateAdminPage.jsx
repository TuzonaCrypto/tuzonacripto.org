import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient'; // Importa supabase directamente
import { useNavigate } from 'react-router-dom';

const CreateAdminPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Primero, intentamos registrar el usuario en Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { // Estos datos se pasan a la metadata del usuario en Supabase Auth
            full_name: formData.name,
            user_type: 'admin', // Especificamos el tipo de usuario aquí
          }
        }
      });

      if (signUpError) {
        // Manejar el caso donde el email ya existe pero no está confirmado
        if (signUpError.message.includes("User already registered")) {
           toast({
            title: 'Usuario ya registrado',
            description: 'Este correo ya está registrado. Si eres tú, intenta iniciar sesión o recuperar tu contraseña. Si el correo no está confirmado, revisa tu bandeja de entrada.',
            variant: 'destructive',
          });
        } else {
          throw signUpError;
        }
      }
      
      if (authData.user) {
         // Si el trigger `handle_new_user` está configurado correctamente en Supabase,
         // el perfil se creará automáticamente con user_type: 'admin'.
         // Si no, o para asegurar, podríamos hacer un upsert aquí, pero es mejor confiar en el trigger.
        toast({
          title: '¡Cuenta Maestra Creada!',
          description: 'Revisa tu email para confirmar la cuenta y luego inicia sesión.',
        });
        navigate('/auth');
      } else if (!signUpError) {
        // Esto podría pasar si el usuario ya existe y está confirmado
        // O si hay algún otro problema no capturado por signUpError
         toast({
          title: 'Revisión Necesaria',
          description: 'El proceso de registro no devolvió un nuevo usuario, pero tampoco un error claro. Verifica si el usuario ya existe o si el correo necesita confirmación.',
          variant: 'default',
        });
      }

    } catch (error) {
      toast({
        title: 'Error de Creación',
        description: error.message || 'Ocurrió un error. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
            Crear Cuenta Maestra
          </span>
        </h1>
        <p className="text-center text-gray-400 mb-8">Esta página es para uso exclusivo del administrador.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              name="name"
              placeholder="Nombre completo del admin"
              value={formData.name}
              onChange={handleInputChange}
              className="pl-10 bg-black/30 border-green-500/30 text-white placeholder-gray-400"
              required
              disabled={loading}
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              className="pl-10 bg-black/30 border-green-500/30 text-white placeholder-gray-400"
              required
              disabled={loading}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange}
              className="pl-10 bg-black/30 border-green-500/30 text-white placeholder-gray-400"
              required
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700 hover:from-green-600 hover:to-teal-800 text-white py-3 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Administrador'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateAdminPage;