import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { businessCategories } from '@/data/categoriesAndStates';

const RegisterForm = ({ userType, formData, handleInputChange, handleSubmit, loading }) => {
  return (
    <motion.form
      key="register-form"
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

      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          name="name"
          placeholder={userType === 'business' ? 'Nombre del propietario' : 'Nombre completo'}
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

      {userType === 'business' && (
        <>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              name="businessName"
              placeholder="Nombre del negocio"
              value={formData.businessName}
              onChange={handleInputChange}
              className="pl-10 bg-black/30 border-red-500/30 text-white placeholder-gray-400"
              required
              disabled={loading}
            />
          </div>

          <select
            name="businessCategory"
            value={formData.businessCategory}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md bg-black/30 border border-red-500/30 text-white"
            required
            disabled={loading}
          >
            <option value="" className="bg-gray-800">Seleccionar categoría</option>
            {businessCategories.map(cat => <option key={cat} value={cat} className="bg-gray-800">{cat}</option>)}
          </select>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              name="businessAddress"
              placeholder="Dirección del negocio"
              value={formData.businessAddress}
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
        {loading ? 'Procesando...' : 'Crear Cuenta'}
      </Button>
    </motion.form>
  );
};

export default RegisterForm;