
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Bitcoin, Gift, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { subscriptionPlans } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';
import { useStripe, useElements } from '@stripe/react-stripe-js'; // Import useElements
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const STRIPE_PRICE_IDS = {
  basico: 'price_1RZ2FHInS4ZVnXVLLpskHF3u', 
  premium: 'price_1RZ2IIInS4ZVnXVLr0UNKc78', 
  empresarial: 'price_1RZ2LHInS4ZVnXVL9VXMLMgV', 
};


const PricingPage = () => {
  const stripe = useStripe();
  const elements = useElements(); // useElements hook
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null); 

  const handleSelectPlan = async (plan) => {
    setIsLoading(plan.id);

    if (!user) {
      toast({
        title: "Inicia Sesión Primero",
        description: "Debes iniciar sesión o registrarte para seleccionar un plan.",
        variant: "destructive",
      });
      navigate('/auth?redirect=/planes');
      setIsLoading(null);
      return;
    }

    if (plan.price === 0) {
      try {
        const { data: updatedProfile, error: profileError } = await supabase
          .from('profiles')
          .update({ current_plan_id: plan.id })
          .eq('id', user.id)
          .select()
          .single();

        if (profileError) {
          console.error('Error updating profile for Freemium:', profileError);
          throw new Error('Error al actualizar el perfil del usuario para el plan Freemium.');
        }
        
        // Update localStorage if needed, or rely on profile data from AuthContext/Dashboard
        localStorage.setItem('selected_plan', JSON.stringify(plan)); 
        if(updatedProfile) localStorage.setItem('user_profile', JSON.stringify(updatedProfile));


        toast({
          title: "Plan Freemium Activado",
          description: "¡Comienza a configurar tu perfil!",
        });
        navigate('/dashboard');

      } catch (error) {
        console.error('Freemium plan activation error:', error);
        toast({
          title: "Error al Activar Plan Freemium",
          description: error.message || "Ocurrió un problema al activar el plan Freemium.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(null);
      }
      return;
    }

    // Ensure Stripe and Elements are loaded before proceeding
    if (!stripe || !elements) {
      toast({
        title: "Error de Inicialización de Stripe",
        description: "El sistema de pagos aún no está listo. Por favor, espera un momento y vuelve a intentarlo.",
        variant: "destructive",
      });
      console.error("Stripe.js o Elements no está cargado. Stripe:", stripe, "Elements:", elements);
      setIsLoading(null);
      return;
    }

    const priceId = STRIPE_PRICE_IDS[plan.id];
    if (!priceId) { 
      toast({
        title: "Error de Configuración del Plan",
        description: `El Price ID para el plan "${plan.name}" no está configurado correctamente. Por favor, contacta a soporte.`,
        variant: "destructive",
      });
      console.error(`Price ID no encontrado para el plan ${plan.name} (ID: ${plan.id}). Verifica STRIPE_PRICE_IDS.`);
      setIsLoading(null);
      return; 
    }
    
    try {
      console.log(`Redirigiendo a Stripe Checkout para el plan ${plan.name} (ID: ${plan.id}) con Price ID: ${priceId}`);
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/payment-success?plan_id=${plan.id}&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/payment-cancel?plan_id=${plan.id}`,
        clientReferenceId: user.id, 
        customerEmail: user.email,
      });

      if (error) {
        console.error('Error de Stripe redirectToCheckout:', error);
        toast({
          title: "Error al Redirigir a Stripe",
          description: error.message || "No se pudo iniciar el proceso de pago. Intenta de nuevo.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('Error inesperado durante handleSelectPlan:', err);
      toast({
        title: "Error Inesperado",
        description: "Ocurrió un problema procesando tu solicitud. Por favor, intenta de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      // isLoading se resetea aquí para que el botón se reactive si hay un error antes de la redirección.
      // Si la redirección es exitosa, el usuario navega fuera de esta página.
      setIsLoading(null); 
    }
  };

  const getPlanIcon = (planId) => {
    switch (planId) {
      case 'freemium': return Gift;
      case 'basico': return Star;
      case 'premium': return Zap;
      case 'empresarial': return Crown;
      default: return Star;
    }
  };

  const getPlanGradient = (planId) => {
    switch (planId) {
      case 'freemium': return 'from-gray-500 to-gray-600';
      case 'basico': return 'from-red-500 to-red-600';
      case 'premium': return 'from-red-600 to-red-700';
      case 'empresarial': return 'from-red-700 to-red-900';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">Planes de Suscripción</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Elige el plan perfecto para tu negocio y comienza a recibir clientes cripto-amigables hoy mismo.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {subscriptionPlans.map((plan, index) => {
            const Icon = getPlanIcon(plan.id);
            const gradient = getPlanGradient(plan.id);
            
            return (
              <motion.div
                key={plan.id}
                id={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`relative crypto-card rounded-2xl p-8 border-red-500/30 shadow-lg flex flex-col ${plan.popular ? 'ring-2 ring-red-500 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">Más Popular</div>
                  </div>
                )}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-white">{plan.price === 0 ? 'Gratis' : `${plan.price}`}</span>
                    {plan.price > 0 && (
                      <div className="text-left">
                        <div className="text-red-400 font-semibold">{plan.currency}</div>
                        <div className="text-gray-400 text-sm">/{plan.duration}</div>
                      </div>
                    )}
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                 <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={isLoading === plan.id}
                      className={`w-full mt-auto ${
                        plan.popular
                          ? 'bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900'
                          : plan.id === 'freemium' 
                            ? 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900'
                            : 'bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800'
                      } text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                    >
                      {isLoading === plan.id ? 'Procesando...' : (plan.price === 0 ? 'Comenzar Gratis' : 'Seleccionar Plan')}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-800 border-red-500/50 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar Plan: {plan.name}</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-300">
                        {plan.price === 0 ? `Estás a punto de activar el plan ${plan.name}.` : `Serás redirigido a Stripe para completar el pago seguro del plan ${plan.name} por ${plan.price} ${plan.currency}/${plan.duration}.`}
                        {!user && " Debes iniciar sesión o crear una cuenta para continuar."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-gray-300 border-gray-600 hover:bg-gray-700">Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleSelectPlan(plan)}
                        disabled={isLoading === plan.id || (!stripe || !elements && plan.price > 0)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        {isLoading === plan.id ? 'Procesando...' : 'Continuar'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="glass-effect rounded-2xl p-8 mb-16 shadow-lg">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Comparación de Características</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 text-white px-2">Características</th>
                  {subscriptionPlans.map(plan => (<th key={plan.id} className="text-center py-4 text-white px-2 whitespace-nowrap">{plan.name}</th>))}
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  { name: "Listado en directorio", values: ["check", "check", "check", "check"] },
                  { name: "Número de fotos", values: ["1", "3", "10", "Ilimitadas"] },
                  { name: "Destacado en búsquedas", values: ["-", "-", "check", "check"] },
                  { name: "Estadísticas detalladas", values: ["-", "-", "Básicas", "Avanzadas"] },
                  { name: "Múltiples ubicaciones", values: ["-", "-", "-", "Hasta 3"] },
                  { name: "Soporte", values: ["Comunitario", "Email", "Prioritario", "Dedicado"] },
                  { name: "Badge de Verificado", values: ["-", "-", "check", "check"] },
                ].map((feature, idx) => (
                    <tr key={idx} className="border-b border-gray-700 last:border-b-0">
                      <td className="py-3 px-2">{feature.name}</td>
                      {feature.values.map((value, planIdx) => (
                        <td key={planIdx} className="text-center py-3 px-2">
                          {value === "check" ? <Check className="w-5 h-5 text-red-400 mx-auto" /> : value}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="glass-effect rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Preguntas Frecuentes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {q: "¿Cómo funciona el pago?", a: "Utilizamos Stripe para procesar pagos de forma segura. Aceptamos las principales tarjetas de crédito y débito. Para el pago con criptomonedas (cuando esté disponible), se mostrarán las opciones en el checkout de Stripe."},
              {q: "¿Puedo cambiar de plan en cualquier momento?", a: "Sí, puedes actualizar tu plan en cualquier momento desde tu dashboard. Los cambios se aplicarán en el siguiente ciclo de facturación."},
              {q: "¿Hay descuentos por pagos anuales?", a: "Actualmente ofrecemos suscripciones mensuales. Estamos trabajando para ofrecer planes anuales con descuento en el futuro."},
              {q: "¿Qué incluye el soporte técnico?", a: "El plan Freemium tiene soporte comunitario. Los planes pagos incluyen soporte por email, y los planes Premium y Empresarial ofrecen soporte prioritario y manager dedicado respectivamente."}
            ].map((faq, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl text-gray-300 mb-8">Únete a cientos de negocios que ya están recibiendo clientes cripto-amigables.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => {const popularPlan = subscriptionPlans.find(p => p.popular) || subscriptionPlans[0]; const element = document.getElementById(popularPlan.id); if (element) element.scrollIntoView({behavior: 'smooth'});}}
              className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              <Bitcoin className="w-5 h-5 mr-2" /> Ver Planes
            </Button>
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  <Info className="w-5 h-5 mr-2" /> Más Información
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-800 border-red-500/50 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Contáctanos</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-300">
                    Para consultas sobre planes empresariales personalizados o cualquier otra pregunta, no dudes en contactarnos a <a href="mailto:soporte@tuzonacripto.com" className="text-red-400 hover:underline">soporte@tuzonacripto.com</a>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white">Entendido</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;