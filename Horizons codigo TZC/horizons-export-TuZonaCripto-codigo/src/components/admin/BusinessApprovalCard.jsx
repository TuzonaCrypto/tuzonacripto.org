import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, X, User, Tag, Calendar, Building } from 'lucide-react';

const BusinessApprovalCard = ({ business, onApprove, onReject }) => {
  const ownerName = business.owner ? business.owner.full_name : 'No disponible';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="crypto-card rounded-lg p-4 border-red-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
    >
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-white flex items-center">
            <Building className="w-5 h-5 mr-2 text-red-400" />
            {business.name}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-300 mt-2">
            <span className="flex items-center"><User className="w-4 h-4 mr-2 text-red-400/80"/>{ownerName}</span>
            <span className="flex items-center"><Tag className="w-4 h-4 mr-2 text-red-400/80"/>{business.category}</span>
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-red-400/80"/>{new Date(business.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex space-x-2 flex-shrink-0 self-end md:self-center">
        <Button onClick={() => onReject(business.id)} size="sm" variant="outline" className="border-red-700 text-red-500 hover:bg-red-700/20">
          <X className="w-4 h-4 mr-1" /> Rechazar
        </Button>
        <Button onClick={() => onApprove(business.id)} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
          <Check className="w-4 h-4 mr-1" /> Aprobar
        </Button>
      </div>
    </motion.div>
  );
};

export default BusinessApprovalCard;