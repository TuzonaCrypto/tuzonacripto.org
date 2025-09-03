import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home, ServerCrash, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { subscriptionPlans } from '@/data/mockData';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [planName, setPlanName] = useState('');

  useEffect(() => {
    if (authLoading) {
      return; 
    }

    if (!user) {
      setStatus('error');
      toast({ title: "Error de Autenticación", description: "No se encontró sesión de usuario.", variant: "destructive"});
      return;
    }

    const planId = searchParams.get('plan_id');
    const provider = searchParams.get('provider');
    
    if (!planId || !provider) {
      setStatus('error');
      toast({ title: "Error de Parámetros", description: "Faltan datos para verificar la suscripción.", variant: "destructive"});
      return;
    }

    const selectedPlan = subscriptionPlans.find(p => p.id === planId);
    if (selectedPlan) {
      setPlanName(selectedPlan.name);
      localStorage.setItem('selected_plan', JSON.stringify(selectedPlan));
      toast({ title: "¡Pago Exitoso!", description: `Tu suscripción al plan ${selectedPlan.name} está activa.` });
      setStatus('success');
    } else {
      setStatus('error');
      toast({ title: "Error de Plan", description: `Plan con ID "${planId}" no encontrado.`, variant: "destructive"});
    }
  }, [searchParams, user, authLoading]);

  if (status === 'verifying' || authLoading) {
    return (
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mb-8"
        >
          <Loader2 className="w-16 h-16 text-red-500" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Verificando tu pago...</h1>
        <p className="text-lg text-gray-300">Por favor, espera un momento.</p>
      </div>
    );
  }
  
  if (status === 'error') {
     return (
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <ServerCrash className="w-24 h-24 text-red-500 mx-auto mb-8" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">¡Oops! Algo Salió Mal</h1>
          <p className="text-lg text-gray-300 mb-8">
            No pudimos verificar tu suscripción en este momento. Por favor, contacta a soporte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/planes">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white">
                Ver Planes <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                <Home className="w-5 h-5 mr-2" /> Volver al Inicio
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-8" />
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">¡Pago Exitoso!</h1>
        <p className="text-lg text-gray-300 mb-8">
          Tu suscripción al plan <span className="font-semibold text-red-400">{planName || 'seleccionado'}</span> ha sido activada.
          ¡Gracias por unirte a TuZonaCripto!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white">
              Ir al Dashboard <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
              <Home className="w-5 h-5 mr-2" /> Volver al Inicio
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;