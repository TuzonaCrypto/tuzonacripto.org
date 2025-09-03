import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const GooglePlayIcon = () => (
    <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 20.999L10.53 14.303L3 7.61V20.999ZM4.717 3L13.11 12L4.717 21L20.25 12L4.717 3Z" fill="#4285F4"/>
      <path d="M3 20.999L10.53 14.303L3 7.61V20.999Z" fill="#34A853"/>
      <path d="M20.25 12L4.717 3L4.717 21L20.25 12Z" fill="#FBBC04"/>
      <path d="M4.717 3L13.11 12L4.717 21L20.25 12L4.717 3Z" fill="#EA4335"/>
    </svg>
);


const DownloadAppCta = () => {
    const { toast } = useToast();
    const { t } = useTranslation();

    const handleDownloadClick = () => {
        toast({
            title: t('download.soon_title'),
            description: t('download.soon_desc'),
        });
    };

    return (
        <section className="py-20 bg-gradient-to-r from-red-800/10 via-red-900/10 to-black/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">{t('download.title')}</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-lg">
                            {t('download.subtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button onClick={handleDownloadClick} size="lg" className="h-14 bg-transparent hover:bg-transparent shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 p-0">
                                <span className="sr-only">{t('download.apple_aria')}</span>
                                <img src="https://horizons-cdn.hostinger.com/b7701b28-560a-42b5-a0f7-1e41898ed11d/f579d864c3f989c0360d7a89de73e1ff.png" alt="Download on the App Store" className="h-full w-auto object-contain"/>
                            </Button>
                            <Button onClick={handleDownloadClick} size="lg" className="h-14 bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                                <GooglePlayIcon />
                                 <div>
                                    <p className="text-xs">DISPONIBLE EN</p>
                                    <p className="text-lg font-semibold">Google Play</p>
                                </div>
                            </Button>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <img  className="max-h-[500px] opacity-70" alt="Teléfono móvil mostrando el mapa interactivo de TuZonaCripto" src="https://horizons-cdn.hostinger.com/b7701b28-560a-42b5-a0f7-1e41898ed11d/54f264527eecc98bf685e5b111086e5a.jpg" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DownloadAppCta;