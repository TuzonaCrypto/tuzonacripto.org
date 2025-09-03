import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { subscriptionPlans } from '@/data/mockData';

const PaymentCancelPage = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan_id');
  const plan = subscriptionPlans.find(p => p.id === planId);

  return (
    <div className="pt-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <XCircle className="w-24 h-24 text-orange-500 mx-auto mb-8" />
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Pago Cancelado</h1>
        {plan ? (
          <p className="text-lg text-gray-300 mb-8">
            Has cancelado el proceso de suscripción para el plan <span className="font-semibold text-red-400">{plan.name}</span>.
            No se ha realizado ningún cargo.
          </p>
        ) : (
           <p className="text-lg text-gray-300 mb-8">
            El proceso de pago ha sido cancelado. No se ha realizado ningún cargo.
          </p>
        )}
        <p className="text-gray-400 mb-8">
          Puedes volver a la página de planes e intentarlo de nuevo cuando quieras.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/planes">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white">
              <ShoppingCart className="w-5 h-5 mr-2" /> Ver Planes de Nuevo
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
              <ArrowLeft className="w-5 h-5 mr-2" /> Volver al Inicio
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancelPage;