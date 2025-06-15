
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Building, Bitcoin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('customer'); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
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
      if (isLogin) {
        const { error } = await signIn({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        toast({
          title: 'Inicio de sesión exitoso',
          description: 'Bienvenido de vuelta a TuZonaCripto',
        });
        navigate('/dashboard');
      } else {
        const { data: { user }, error: signUpError } = await signUp({
          email: formData.email,
          password: formData.password,
        });

        if (signUpError) throw signUpError;
        if (!user) throw new Error("No se pudo crear el usuario.");

        const profileData = {
          id: user.id,
          full_name: formData.name,
          phone: formData.phone,
          user_type: userType,
          current_plan_id: userType === 'business' ? 'freemium' : null
        };

        const { error: profileError } = await supabase.from('profiles').insert([profileData]);

        if (profileError) {
          console.error("Profile creation error:", profileError);
          // Attempt to clean up the created user if profile creation fails
          // This is advanced and might be omitted, but good practice.
          // await supabase.auth.admin.deleteUser(user.id); // Requires admin privileges, so we'll just log it.
          throw new Error(`Error al crear el perfil: ${profileError.message}`);
        }
        
        toast({
          title: 'Registro exitoso',
          description: 'Tu cuenta ha sido creada. Revisa tu email para confirmar y luego inicia sesión.',
        });
        setIsLogin(true); 
      }
    } catch (error) {
      toast({
        title: 'Error de autenticación',
        description: error.message || 'Ocurrió un error. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="floating-animation mb-8">
              <div className="w-20 h-20 crypto-gradient rounded-full flex items-center justify-center mx-auto lg:mx-0">
                <Bitcoin className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">
                Únete a TuZonaCripto
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              {isLogin 
                ? 'Accede a tu cuenta y descubre negocios cripto-amigables cerca de ti'
                : 'Crea tu cuenta y forma parte de la comunidad cripto más grande de Venezuela'
              }
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-gray-300">Crea tu perfil de cliente o de negocio</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Bitcoin className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-gray-300">Encuentra y paga con criptomonedas</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Building className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-gray-300">Promociona tu negocio y atrae más clientes</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect rounded-2xl p-8"
          >
            <div className="flex bg-gray-800/50 rounded-lg p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  isLogin 
                    ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
                disabled={loading}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  !isLogin 
                    ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
                disabled={loading}
              >
                Registrarse
              </button>
            </div>

            {!isLogin && (
              <div className="mb-6">
                <label className="block text-white text-sm font-semibold mb-3">
                  Tipo de cuenta
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType('customer')}
                    className={`p-3 rounded-lg border transition-all ${
                      userType === 'customer'
                        ? 'border-red-500 bg-red-500/20 text-red-400 shadow-md'
                        : 'border-gray-600 text-gray-400 hover:border-red-500/50'
                    }`}
                    disabled={loading}
                  >
                    <User className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">Cliente</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('business')}
                    className={`p-3 rounded-lg border transition-all ${
                      userType === 'business'
                        ? 'border-red-500 bg-red-500/20 text-red-400 shadow-md'
                        : 'border-gray-600 text-gray-400 hover:border-red-500/50'
                    }`}
                    disabled={loading}
                  >
                    <Building className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">Negocio</span>
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 bg-black/30 border-red-500/30 text-white placeholder-gray-400"
                  required
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  name="password"
                  placeholder="Contraseña (mínimo 6 caracteres)"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 bg-black/30 border-red-500/30 text-white placeholder-gray-400"
                  required
                  disabled={loading}
                />
              </div>

              {!isLogin && (
                <>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      name="name"
                      placeholder="Nombre completo"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 bg-black/30 border-red-500/30 text-white placeholder-gray-400"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Teléfono"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 bg-black/30 border-red-500/30 text-white placeholder-gray-400"
                      required
                      disabled={loading}
                    />
                  </div>
                </>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white py-3 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-red-400 hover:text-red-300 ml-1"
                  disabled={loading}
                >
                  {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
