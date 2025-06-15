
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home, ServerCrash, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';
import { subscriptionPlans } from '@/data/mockData';


const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth(); // Añadido authLoading
  const [status, setStatus] = useState('processing'); // processing, success, error
  const [planName, setPlanName] = useState('');
  const [processingMessage, setProcessingMessage] = useState('Procesando tu suscripción...');

  useEffect(() => {
    if (authLoading) {
      setProcessingMessage('Verificando sesión de usuario...');
      return; // Esperar a que la autenticación termine
    }

    setProcessingMessage('Validando información del pago...');
    const planId = searchParams.get('plan_id');
    const sessionId = searchParams.get('session_id');

    if (!user) {
      setStatus('error');
      toast({ title: "Error de Autenticación", description: "No se encontró sesión de usuario. Por favor, inicia sesión e intenta de nuevo.", variant: "destructive"});
      console.error("Error en PaymentSuccessPage: Usuario no autenticado.");
      return;
    }

    if (!planId || !sessionId) {
      setStatus('error');
      toast({ title: "Error de Parámetros", description: "Faltan datos para procesar la suscripción (plan o sesión no encontrados en URL).", variant: "destructive"});
      console.error("Error en PaymentSuccessPage: Falta plan_id o session_id en la URL.");
      return;
    }
    
    const selectedPlan = subscriptionPlans.find(p => p.id === planId);
    if (selectedPlan) {
      setPlanName(selectedPlan.name);
    } else {
      setStatus('error');
      toast({ title: "Error de Plan", description: `Plan con ID "${planId}" no encontrado.`, variant: "destructive"});
      console.error(`Error en PaymentSuccessPage: Plan con ID "${planId}" no encontrado.`);
      return;
    }

    setProcessingMessage('Actualizando tu perfil y suscripción...');
    const processSubscription = async () => {
      try {
        // 1. Actualizar el perfil del usuario con el nuevo plan (current_plan_id)
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ current_plan_id: planId })
          .eq('id', user.id)
          .select() // Para verificar si la actualización fue exitosa

        if (profileError) {
          console.error('Error updating profile:', profileError);
          throw new Error(`Error al actualizar el perfil: ${profileError.message}`);
        }
        
        // 2. Guardar la suscripción en la tabla 'subscriptions'
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + 1);

        const { data: existingSubscription, error: fetchError } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('user_id', user.id)
          .eq('stripe_subscription_id', sessionId) // Evitar duplicados por refresco de página
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching existing subscription:', fetchError);
          throw new Error(`Error al verificar suscripción existente: ${fetchError.message}`);
        }

        if (existingSubscription) {
          console.log('Suscripción ya procesada para esta sesión:', sessionId);
          setStatus('success');
          toast({ title: "Suscripción Ya Registrada", description: `Tu suscripción al plan ${selectedPlan?.name || planId} ya está activa.`});
          localStorage.setItem('selected_plan', JSON.stringify(selectedPlan));
          return;
        }

        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .insert({
            user_id: user.id,
            plan_id: planId,
            status: 'active', 
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(), // Para suscripciones simples; Stripe puede manejar esto con webhooks
            current_period_end: endDate.toISOString(), 
            stripe_subscription_id: sessionId, 
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        
        if (subscriptionError) {
          console.error('Error saving subscription:', subscriptionError);
          throw new Error(`Error al guardar la suscripción: ${subscriptionError.message}`);
        }
        
        localStorage.setItem('selected_plan', JSON.stringify(selectedPlan));
        setStatus('success');
        toast({ title: "¡Pago Exitoso!", description: `Tu suscripción al plan ${selectedPlan?.name || planId} está activa.`});

      } catch (error) {
        console.error('Subscription processing error:', error);
        setStatus('error');
        toast({ title: "Error de Procesamiento", description: error.message || "No se pudo completar el proceso de suscripción.", variant: "destructive"});
      }
    };

    processSubscription();

  }, [searchParams, user, authLoading]); // Añadido authLoading como dependencia

  if (status === 'processing' || authLoading) { // Mostrar loading si auth está cargando también
    return (
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mb-8"
        >
          <Loader2 className="w-16 h-16 text-red-500" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{processingMessage}</h1>
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
            No pudimos procesar tu suscripción en este momento. Verifica los mensajes de error o contacta a soporte.
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
