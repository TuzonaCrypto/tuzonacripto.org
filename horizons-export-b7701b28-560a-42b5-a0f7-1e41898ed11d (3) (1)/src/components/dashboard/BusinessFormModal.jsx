
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { businessCategories, cryptoCurrencies } from '@/data/mockData';
import { Image as ImageIcon, Video, Trash2, RefreshCw } from 'lucide-react';

const BusinessFormModal = ({ 
  show, 
  onClose, 
  onSubmit, 
  editingBusiness, 
  newBusiness, 
  setNewBusiness, 
  planLimits,
  isLoadingForm
}) => {
  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialNetwork = name.split('.')[1];
      setNewBusiness(prev => ({ ...prev, social: { ...prev.social, [socialNetwork]: value }}));
    } else {
      setNewBusiness(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleCryptoChange = (crypto) => {
    setNewBusiness(prev => {
      const currentCryptos = prev.accepted_cryptos || [];
      return { ...prev, accepted_cryptos: currentCryptos.includes(crypto) ? currentCryptos.filter(c => c !== crypto) : [...currentCryptos, crypto] };
    });
  };

  const handleImageUpload = () => {
    if ((newBusiness.images || []).length >= planLimits.maxImages) {
      toast({ title: "Límite de imágenes alcanzado", description: `Tu plan permite hasta ${planLimits.maxImages} imágenes.`, variant: "destructive"});
      return;
    }
    
    const placeholderImageUrl = `https://source.unsplash.com/random/800x600?sig=${Math.random()}`;
    setNewBusiness(prev => ({ ...prev, images: [...(prev.images || []), placeholderImageUrl] }));
    toast({ title: "Imagen Agregada", description: "Se ha añadido un marcador de posición. Sube tu imagen real en un sistema completo." });
  };
  
  const removeImage = (indexToRemove) => {
    setNewBusiness(prev => ({ ...prev, images: (prev.images || []).filter((_, index) => index !== indexToRemove) }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-red-500/30"
      >
        <h3 className="text-xl font-bold text-white mb-6">{editingBusiness ? 'Editar Negocio' : 'Agregar Nuevo Negocio'}</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input placeholder="Nombre del negocio" name="name" value={newBusiness.name || ''} onChange={handleInputChange} className="bg-black/30 border-red-500/30 text-white" required disabled={isLoadingForm}/>
          <select name="category" value={newBusiness.category || ''} onChange={handleInputChange} className="w-full px-3 py-2 rounded-md bg-black/30 border border-red-500/30 text-white" required disabled={isLoadingForm}>
            <option value="" className="bg-gray-800">Seleccionar categoría</option>
            {businessCategories.map(cat => <option key={cat} value={cat} className="bg-gray-800">{cat}</option>)}
          </select>
          <textarea placeholder="Descripción" name="description" value={newBusiness.description || ''} onChange={handleInputChange} className="w-full h-24 px-3 py-2 rounded-md bg-black/30 border border-red-500/30 text-white resize-none" required disabled={isLoadingForm}/>
          <Input placeholder="Dirección" name="address" value={newBusiness.address || ''} onChange={handleInputChange} className="bg-black/30 border-red-500/30 text-white" required disabled={isLoadingForm}/>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Teléfono" name="phone" value={newBusiness.phone || ''} onChange={handleInputChange} className="bg-black/30 border-red-500/30 text-white" disabled={isLoadingForm}/>
            <Input placeholder="Horarios (ej: L-V 9am-5pm)" name="hours" value={newBusiness.hours || ''} onChange={handleInputChange} className="bg-black/30 border-red-500/30 text-white" disabled={isLoadingForm}/>
          </div>
          <Input placeholder="Sitio Web (ej: https://ejemplo.com)" name="website" value={newBusiness.website || ''} onChange={handleInputChange} className="bg-black/30 border-red-500/30 text-white" disabled={isLoadingForm}/>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Instagram (ej: @tunegocio)" name="social.instagram" value={newBusiness.social?.instagram || ''} onChange={handleInputChange} className="bg-black/30 border-red-500/30 text-white" disabled={isLoadingForm}/>
            <Input placeholder="Twitter (ej: @tunegocio)" name="social.twitter" value={newBusiness.social?.twitter || ''} onChange={handleInputChange} className="bg-black/30 border-red-500/30 text-white" disabled={isLoadingForm}/>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Criptomonedas Aceptadas:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-32 overflow-y-auto p-2 bg-black/20 rounded-md">
              {cryptoCurrencies.map(crypto => (
                <label key={crypto} className="flex items-center space-x-2 p-2 rounded-md hover:bg-black/40 cursor-pointer">
                  <input type="checkbox" checked={(newBusiness.accepted_cryptos || []).includes(crypto)} onChange={() => handleCryptoChange(crypto)} className="form-checkbox h-4 w-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" disabled={isLoadingForm}/>
                  <span className="text-white text-sm">{crypto}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">Imágenes (Máx: {planLimits.maxImages}):</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {(newBusiness.images || []).map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img.startsWith('http') ? img : (typeof img === 'object' ? URL.createObjectURL(img) : img) } alt={`preview ${index}`} className="w-full h-20 object-cover rounded"/>
                  <Button type="button" size="icon" variant="destructive" onClick={() => removeImage(index)} className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" disabled={isLoadingForm}>
                    <Trash2 className="h-3 w-3"/>
                  </Button>
                </div>
              ))}
            </div>
            {(newBusiness.images || []).length < planLimits.maxImages && (
              <Button type="button" onClick={handleImageUpload} variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10" disabled={isLoadingForm}>
                <ImageIcon className="w-4 h-4 mr-2"/> Agregar Imagen (Simulado)
              </Button>
            )}
             {planLimits.canAddVideo && (
              <Button type="button" onClick={() => toast({ title: "Próximamente", description: "La subida de videos estará disponible pronto."})} variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10 mt-2" disabled={isLoadingForm}>
                <Video className="w-4 h-4 mr-2"/> Agregar Video (Próximamente)
              </Button>
            )}
          </div>

          <div className="flex space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-gray-500 text-gray-400 hover:bg-gray-500/10 hover:border-gray-400" disabled={isLoadingForm}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md" disabled={isLoadingForm}>
              {isLoadingForm ? (<><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Guardando...</>) : (editingBusiness ? 'Guardar Cambios' : 'Agregar Negocio')}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BusinessFormModal;
