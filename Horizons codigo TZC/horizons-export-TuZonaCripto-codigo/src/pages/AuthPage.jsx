import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building, Bitcoin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import TermsAndConditionsModal from '@/components/auth/TermsAndConditionsModal';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('customer'); // 'customer' or 'business'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    businessName: '',
    businessCategory: '',
    businessAddress: ''
  });
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleResendConfirmation = async () => {
    if (!formData.email) {
      toast({
        title: 'Correo necesario',
        description: 'Por favor, introduce tu correo electrónico en el campo correspondiente.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: formData.email,
      });
      if (error) throw error;
      toast({
        title: 'Correo de confirmación reenviado',
        description: 'Hemos enviado un nuevo enlace de confirmación a tu correo.',
      });
      setShowResend(false);
    } catch (error) {
      toast({
        title: 'Error al reenviar',
        description: error.message || 'No se pudo reenviar el correo de confirmación.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const proceedWithRegistration = async () => {
    setLoading(true);
    setShowResend(false);
    const siteURL = window.location.origin;

    try {
      const { data: { user }, error: signUpError } = await signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${siteURL}/dashboard`,
          data: {
            full_name: formData.name,
            phone: formData.phone,
            user_type: userType,
            business_name: userType === 'business' ? formData.businessName : null,
            business_category: userType === 'business' ? formData.businessCategory : null,
            business_address: userType === 'business' ? formData.businessAddress : null,
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!user) throw new Error("No se pudo crear el usuario.");
      
      toast({
        title: 'Registro exitoso',
        description: 'Tu cuenta ha sido creada. Revisa tu email para confirmar y luego inicia sesión.',
      });
      setIsLogin(true);
      setFormData({ email: formData.email, password: '', name: '', phone: '', businessName: '', businessCategory: '', businessAddress: '' });
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error) => {
    if (error && error.message && (error.message.includes('Email not confirmed') || error.message.includes('Email link is invalid or has expired'))) {
      toast({
        title: 'Confirmación de correo pendiente o enlace inválido',
        description: 'Revisa tu bandeja de entrada (y spam) para confirmar tu correo. Si el enlace expiró o no lo recibiste, puedes reenviar el correo de confirmación.',
        variant: 'destructive',
        duration: 9000,
      });
      setShowResend(true);
    } else {
      toast({
        title: 'Error de autenticación',
        description: error.message || 'Ocurrió un error. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      setLoading(true);
      try {
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
      } catch (error) {
        handleAuthError(error);
      } finally {
        setLoading(false);
      }
    } else {
      // Registration attempt
      if (userType === 'business') {
        setIsTermsModalOpen(true);
      } else {
        proceedWithRegistration();
      }
    }
  };

  const handleAcceptTerms = () => {
    setIsTermsModalOpen(false);
    proceedWithRegistration();
  };


  return (
    <>
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
                  ? 'Accede a tu cuenta y descubre negocios cripto-amigables cerca de ti.'
                  : 'Crea tu cuenta y forma parte de la comunidad cripto más grande de Venezuela.'
                }
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center"><MapPin className="w-4 h-4 text-red-400" /></div>
                  <span className="text-gray-300">Encuentra negocios cerca de ti</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center"><Bitcoin className="w-4 h-4 text-red-400" /></div>
                  <span className="text-gray-300">Paga con tus criptomonedas favoritas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center"><Building className="w-4 h-4 text-red-400" /></div>
                  <span className="text-gray-300">Promociona tu negocio</span>
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
                <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 px-4 rounded-md transition-all ${ isLogin ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md' : 'text-gray-400 hover:text-white'}`} disabled={loading}>
                  Iniciar Sesión
                </button>
                <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 px-4 rounded-md transition-all ${ !isLogin ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md' : 'text-gray-400 hover:text-white'}`} disabled={loading}>
                  Registrarse
                </button>
              </div>

              {!isLogin && (
                <div className="mb-6">
                  <label className="block text-white text-sm font-semibold mb-3">Tipo de cuenta</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setUserType('customer')} className={`p-3 rounded-lg border transition-all ${ userType === 'customer' ? 'border-red-500 bg-red-500/20 text-red-400 shadow-md' : 'border-gray-600 text-gray-400 hover:border-red-500/50'}`} disabled={loading}>
                      <User className="w-5 h-5 mx-auto mb-1" /> <span className="text-sm">Cliente</span>
                    </button>
                    <button type="button" onClick={() => setUserType('business')} className={`p-3 rounded-lg border transition-all ${ userType === 'business' ? 'border-red-500 bg-red-500/20 text-red-400 shadow-md' : 'border-gray-600 text-gray-400 hover:border-red-500/50'}`} disabled={loading}>
                      <Building className="w-5 h-5 mx-auto mb-1" /> <span className="text-sm">Negocio</span>
                    </button>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {isLogin ? (
                  <LoginForm
                    key="login"
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    showResend={showResend}
                    handleResendConfirmation={handleResendConfirmation}
                  />
                ) : (
                  <RegisterForm
                    key="register"
                    userType={userType}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                  />
                )}
              </AnimatePresence>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                  <button onClick={() => setIsLogin(!isLogin)} className="text-red-400 hover:text-red-300 ml-1" disabled={loading}>
                    {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <TermsAndConditionsModal
        isOpen={isTermsModalOpen}
        onOpenChange={setIsTermsModalOpen}
        onAccept={handleAcceptTerms}
      />
    </>
  );
};

export default AuthPage;