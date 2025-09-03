import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TermsOfServicePage = () => {
  return (
    <>
      <Helmet>
        <title>Términos y Condiciones - TuZonaCripto</title>
        <meta name="description" content="Lee los Términos y Condiciones de Uso de la plataforma TuZonaCripto." />
        <meta property="og:title" content="Términos y Condiciones - TuZonaCripto" />
        <meta property="og:description" content="Entiende las reglas, responsabilidades y el marco legal de nuestra plataforma de directorio de comercios cripto-amigables en Venezuela." />
      </Helmet>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <ShieldCheck className="w-20 h-20 mx-auto mb-6 text-red-500" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">
                Términos y Condiciones de Uso
              </span>
            </h1>
            <p className="text-lg text-gray-400">Última actualización: 27 de agosto de 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none text-gray-300 glass-effect p-8 rounded-xl border border-red-500/20"
          >
            <div className="space-y-6 text-justify">
                <h2 className="font-bold text-red-400">Preámbulo: Objeto y Naturaleza del Servicio</h2>
                <p>
                    El objeto de la plataforma TuZonaCripto.org es funcionar como un directorio digital y una plataforma publicitaria que conecta a usuarios y comercios en Venezuela, facilitando la búsqueda de servicios y productos que aceptan criptoactivos como medio de pago.
                </p>
                <p>
                    El uso de nuestra plataforma es voluntario. TuZonaCripto no es ni opera como un Exchange, casa de cambio, ni custodio de fondos. Tampoco somos un proveedor de servicios de activos virtuales (VASP) que realicen intermediación, gestión de carteras, minería o cualquier otra actividad que requiera permiso especial de la Superintendencia Nacional de Criptoactivos y Actividades Conexas (SUNACRIP), conforme a lo establecido en la Ley Constitucional del Sistema Integral de Criptoactivos (Gaceta Oficial Extraordinaria N° 6.370).
                </p>

                <h2 className="font-bold text-red-400 pt-4">Artículo 1: Definición Legal de la Plataforma</h2>
                <ul className="list-disc list-inside space-y-3">
                    <li><strong className="text-gray-100">1.1. Naturaleza y no Intermediación:</strong> La plataforma actúa exclusivamente como un servicio de directorio y suscripción publicitaria. No mediamos ni participamos en las transacciones de criptoactivos que los usuarios y comercios puedan realizar entre sí.</li>
                    <li><strong className="text-gray-100">1.2. No Custodia:</strong> TuZonaCripto no tiene acceso, custodia ni resguarda criptoactivos. Los fondos y la seguridad de las transacciones son responsabilidad exclusiva del usuario y del comercio, quienes operan desde sus propias billeteras digitales.</li>
                    <li><strong className="text-gray-100">1.3. Naturaleza de las Suscripciones:</strong> El servicio de suscripción ofrecido en la plataforma no está relacionado con la intermediación de activos virtuales. Los pagos de estas suscripciones, ya sean en criptoactivos o en moneda fiduciaria a través de PayPal, corresponden a la adquisición de servicios de publicidad y posicionamiento digital dentro del directorio, una actividad que no se encuentra expresamente prohibida ni regulada por la SUNACRIP.</li>
                </ul>

                <h2 className="font-bold text-red-400 pt-4">Artículo 2: Obligaciones y Declaraciones</h2>
                <ul className="list-disc list-inside space-y-3">
                    <li><strong className="text-gray-100">2.1. Declaración Jurada de Fondos Lícitos:</strong> De conformidad con la normativa sobre la Administración y Fiscalización de los Riesgos de Legitimación de Capitales y Financiamiento al Terrorismo (LA/FT) aplicable en Venezuela, cada usuario y comercio registrado declara, bajo juramento, que los fondos utilizados provienen de actividades lícitas. Esta es una cláusula esencial para la legitimidad del negocio.</li>
                    <li><strong className="text-gray-100">2.2. Responsabilidad de la Información:</strong> Los comercios son responsables de la exactitud de la información publicada en sus perfiles. Por otro lado, los usuarios son responsables de verificar la información y de gestionar sus transacciones de forma segura.</li>
                    <li><strong className="text-gray-100">2.3. No Asesoramiento Financiero:</strong> La información en la plataforma no constituye asesoría financiera. TuZonaCripto no es responsable por las decisiones de inversión, transacciones o acuerdos comerciales que los usuarios realicen.</li>
                </ul>

                <h2 className="font-bold text-red-400 pt-4">Artículo 3: Cumplimiento Normativo y Reporte</h2>
                <ul className="list-disc list-inside space-y-3">
                    <li><strong className="text-gray-100">3.1. Normas de Prevención LA/FT:</strong> Aunque no estamos clasificados como sujetos obligados que requieran registro en la SUNACRIP para operar como un directorio, TuZonaCripto se compromete a colaborar con las autoridades en la lucha contra la Legitimación de Capitales. Nuestro módulo CriptoSafe nos permitirá detectar señales de alerta para la generación de reportes internos que, en caso de ser requeridos por las autoridades, podríamos proporcionar.</li>
                    <li><strong className="text-gray-100">3.2. Referencias Legales:</strong> Este documento se rige por la legislación venezolana, incluyendo, pero no limitándose a:
                        <ul className="list-disc list-inside ml-6 mt-2">
                            <li>Decreto Constituyente sobre el Sistema Integral de Criptoactivos (Gaceta Oficial Extraordinaria N° 6.370).</li>
                            <li>Ley Orgánica contra la Delincuencia Organizada y Financiamiento al Terrorismo.</li>
                            <li>Providencia N° 044-2021 de la SUNACRIP, que establece las normas sobre la administración de riesgos de LA/FT para los proveedores de servicios de activos virtuales, en la cual se distingue nuestra actividad de un Directorio de servicios de aquellas que requieren registro.</li>
                        </ul>
                    </li>
                </ul>
                
                <h2 className="font-bold text-red-400 pt-4">Artículo 4: Exclusión de Responsabilidad y Cláusulas Adicionales</h2>
                <p>
                    La plataforma no se hace responsable por la calidad de los productos o servicios de terceros. El uso de la plataforma es una aceptación completa de estos términos. La participación en el directorio no implica una relación laboral o de sociedad entre TuZonaCripto y los comercios.
                </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsOfServicePage;