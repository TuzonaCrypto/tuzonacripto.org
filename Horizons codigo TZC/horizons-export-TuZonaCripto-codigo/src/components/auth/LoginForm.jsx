import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LoginForm = ({ formData, handleInputChange, handleSubmit, loading, showResend, handleResendConfirmation }) => {
  return (
    <motion.form
      key="login-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit} 
      className="space-y-4"
    >
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
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleInputChange}
          className="pl-10 bg-black/30 border-red-500/30 text-white placeholder-gray-400"
          required
          disabled={loading}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white py-3 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        disabled={loading}
      >
        {loading ? 'Procesando...' : 'Iniciar Sesión'}
      </Button>

      {showResend && (
        <Button
          type="button"
          variant="link"
          className="w-full mt-2 text-red-400 hover:text-red-300"
          onClick={handleResendConfirmation}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Reenviar correo de confirmación'}
        </Button>
      )}
    </motion.form>
  );
};

export default LoginForm;