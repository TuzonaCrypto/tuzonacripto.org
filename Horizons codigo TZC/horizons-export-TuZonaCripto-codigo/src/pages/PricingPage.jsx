import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Bitcoin, Gift, ArrowRight, Info, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { subscriptionPlans } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog.jsx';

const PaymentOptionsModal = ({ plan, onConfirm, onCancel, isLoading }) => (
  <Dialog open={!!plan} onOpenChange={(isOpen) => !isOpen && onCancel()}>
    <DialogContent className="bg-gray-800 border-red-500/50 text-white">
      <DialogHeader>
        <DialogTitle>Elige tu Método de Pago</DialogTitle>
        <DialogDescription className="text-gray-300">
          Estás a punto de suscribirte al plan <span className="font-bold text-red-400">{plan?.name}</span> por <span className="font-bold text-white">${plan?.price}</span>.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4 py-4">
        <Button 
          onClick={() => onConfirm('CrixtoPay')} 
          disabled={isLoading}
          className="w-full justify-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 text-lg"
        >
          {isLoading === 'CrixtoPay' ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : <CreditCard className="w-6 h-6 mr-2" />}
          Pagar con CrixtoPay
        </Button>
        <Button 
          onClick={() => onConfirm('PayPal')} 
          disabled={isLoading}
          className="w-full justify-center bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white py-6 text-lg"
        >
          {isLoading === 'PayPal' ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M7.44,2.34L6.23,10.69L5,18.88C5,18.88 5,19.06 5.17,19.23C5.33,19.41 5.5,19.5 5.72,19.5H9.2L11.5,4.35L12.7,12.55L11.5,20.5H14.74C15,20.5 15.2,20.41 15.34,20.25C15.5,20.09 15.55,19.92 15.55,19.92L16.29,15.53C16.31,15.38 16.36,15.25 16.44,15.14C17.3,14.06 18.4,13.43 19.66,13.43H20.2C21.03,13.43 21.73,13.56 22.29,13.82C22.62,13.97 22.8,13.86 22.89,13.55L23.3,11.72C23.33,11.58 23.28,11.47 23.18,11.39C22.5,10.94 21.6,10.63 20.46,10.63H19.5C18.1,10.63 17.03,11.63 16.88,12.95L16.2,17.75C16.14,18.23 15.73,18.58 15.25,18.58H12.68L14.28,8.66C14.43,7.46 15.5,6.46 16.83,6.46H17.76C18.66,6.46 19.46,6.7 20.06,7.16C20.31,7.33 20.58,7.25 20.66,7L21.5,4.2C21.59,3.9 21.4,3.69 21.13,3.55C20.5,3.21 19.65,2.94 18.59,2.94H17.5C16.03,2.94 14.8,3.83 14.5,5.29L12.7,15.8L11,2.41C10.82,1.21 9.75,0.34 8.44,0.34H3.88C3.34,0.34 2.87,0.7 2.8,1.24L2,6.96C1.94,7.26 2.14,7.54 2.45,7.54H5.67C6.67,7.54 7.5,6.8 7.63,5.84L7.9,3.61C7.94,3.26 8.21,3 8.5,3H8.79C9.27,3 9.68,3.35 9.74,3.83L7.44,2.34Z" /></svg>}
          Pagar con PayPal
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);


const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState(null); // 'CrixtoPay' | 'PayPal'
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    if (!user) {
      toast({
        title: "Inicia Sesión Primero",
        description: "Debes iniciar sesión o registrarte para seleccionar un plan.",
        variant: "destructive",
      });
      navigate('/auth?redirect=/planes');
      return;
    }

    if (plan.price === 0) {
      activateFreemiumPlan(plan);
    } else {
      setSelectedPlan(plan);
    }
  };

  const activateFreemiumPlan = async (plan) => {
    setLoadingPlan('freemium');
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ current_plan_id: plan.id })
        .eq('id', user.id);

      if (error) throw error;
      
      toast({ title: "Plan Freemium Activado", description: "¡Comienza a configurar tu perfil!" });
      navigate('/dashboard');
    } catch (error) {
      console.error('Freemium plan activation error:', error);
      toast({ title: "Error al Activar Plan Freemium", description: error.message, variant: "destructive" });
    } finally {
      setLoadingPlan(null);
    }
  };

  const handlePaymentConfirm = async (provider) => {
    setLoadingPlan(provider);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula la llamada a la API
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ current_plan_id: selectedPlan.id })
        .eq('id', user.id);

      if (profileError) throw profileError;
      
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(startDate.getMonth() + 1);

      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan_id: selectedPlan.id,
          status: 'active',
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          current_period_end: endDate.toISOString(),
          payment_provider: provider,
          payment_provider_id: `txn_${provider.toLowerCase()}_${Date.now()}`
        });

      if (subscriptionError) throw subscriptionError;

      setSelectedPlan(null); // Cierra el modal
      navigate(`/payment-success?plan_id=${selectedPlan.id}&provider=${provider}`);

    } catch (error) {
      console.error(`Error processing ${provider} payment:`, error);
      toast({ title: `Error en pago con ${provider}`, description: error.message, variant: "destructive" });
    } finally {
      setLoadingPlan(null);
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
    <>
      <PaymentOptionsModal 
        plan={selectedPlan}
        onConfirm={handlePaymentConfirm}
        onCancel={() => setSelectedPlan(null)}
        isLoading={loadingPlan}
      />
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
              const isLoadingThisPlan = loadingPlan && selectedPlan?.id === plan.id;
              
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
                      <span className="text-4xl font-bold text-white">{plan.price === 0 ? 'Gratis' : `$${plan.price}`}</span>
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
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={!!loadingPlan}
                    className={`w-full mt-auto ${
                      plan.popular
                        ? 'bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900'
                        : plan.id === 'freemium' 
                          ? 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900'
                          : 'bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800'
                    } text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                  >
                    {loadingPlan && (selectedPlan?.id === plan.id || plan.id === 'freemium') ? <Loader2 className="animate-spin" /> : (plan.price === 0 ? 'Comenzar Gratis' : 'Seleccionar Plan')}
                  </Button>
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
                {q: "¿Qué métodos de pago aceptan?", a: "Aceptamos pagos a través de CrixtoPay y PayPal, plataformas seguras y confiables que operan en Venezuela para tu comodidad."},
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
    </>
  );
};

export default PricingPage;