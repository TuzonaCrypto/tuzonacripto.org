import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BusinessApprovalPanel from '@/components/admin/BusinessApprovalPanel';
import UserManagementPanel from '@/components/admin/UserManagementPanel';

const AdminDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs defaultValue="businesses" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="businesses"><ShieldCheck className="w-4 h-4 mr-2" />Aprobar Negocios</TabsTrigger>
          <TabsTrigger value="users"><Users className="w-4 h-4 mr-2" />Gestionar Usuarios</TabsTrigger>
        </TabsList>
        <TabsContent value="businesses">
          <BusinessApprovalPanel />
        </TabsContent>
        <TabsContent value="users">
          <UserManagementPanel />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AdminDashboard;