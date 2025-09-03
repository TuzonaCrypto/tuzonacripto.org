import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-red-400 hover:bg-red-600/10">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border-red-500/30 text-white">
        <DropdownMenuItem onClick={() => changeLanguage('es')} className="cursor-pointer hover:!bg-red-600/20 focus:!bg-red-600/20">
           <span className="mr-2">🇪🇸</span> Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')} className="cursor-pointer hover:!bg-red-600/20 focus:!bg-red-600/20">
           <span className="mr-2">🇬🇧</span> English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;