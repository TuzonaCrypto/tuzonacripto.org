import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Star } from 'lucide-react';
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

const BusinessListItem = ({ business, onEdit, onDelete }) => {
  return (
    <motion.div 
      className="crypto-card rounded-lg p-6 border-red-500/30 shadow-md flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white line-clamp-1">{business.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${business.verified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
            {business.verified ? 'Verificado' : 'Pendiente'}
          </span>
        </div>
        <p className="text-red-400 text-sm mb-2">{business.category}</p>
        <p className="text-gray-300 text-sm mb-3 line-clamp-3 h-[60px]">{business.description}</p>
        {business.images && business.images.length > 0 && (
          <img src={business.images[0]} alt={business.name} className="w-full h-32 object-cover rounded-md mb-3"/>
        )}
      </div>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-red-500/20">
        <div className="flex items-center text-yellow-400">
          <Star className="w-4 h-4 fill-current mr-1" />
          <span className="text-sm">{business.rating || 'N/A'}</span>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => onEdit(business)} size="icon" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 h-8 w-8">
            <Edit className="w-4 h-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="outline" className="border-red-700 text-red-500 hover:bg-red-700/20 h-8 w-8">
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-800 border-red-500/50 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-300">
                  Esta acción no se puede deshacer. Esto eliminará permanentemente el negocio "{business.name}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-gray-300 border-gray-600 hover:bg-gray-700">Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(business.id)} className="bg-red-600 hover:bg-red-700 text-white">Eliminar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessListItem;