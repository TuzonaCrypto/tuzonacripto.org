import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const TermsAndConditionsModal = ({ isOpen, onOpenChange, onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] glass-effect text-white border-red-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">
            Términos y Condiciones de Uso de TuZonaCripto
          </DialogTitle>
          <DialogDescription className="text-gray-400 pt-2">
            Por favor, lee y acepta los términos antes de continuar con el registro de tu negocio.
          </DialogDescription>
        </DialogHeader>
        <div className="prose prose-sm max-w-none text-gray-300 max-h-[50vh] overflow-y-auto pr-4 space-y-4 text-justify">
          <h3 className="font-bold text-red-400">Preámbulo: Objeto y Naturaleza del Servicio</h3>
          <p>
            El objeto de la plataforma TuZonaCripto.org es funcionar como un directorio digital y una plataforma publicitaria que conecta a usuarios y comercios en Venezuela, facilitando la búsqueda de servicios y productos que aceptan criptoactivos como medio de pago.
          </p>
          <p>
            El uso de nuestra plataforma es voluntario. TuZonaCripto no es ni opera como un Exchange, casa de cambio, ni custodio de fondos. Tampoco somos un proveedor de servicios de activos virtuales (VASP) que realicen intermediación, gestión de carteras, minería o cualquier otra actividad que requiera permiso especial de la Superintendencia Nacional de Criptoactivos y Actividades Conexas (SUNACRIP), conforme a lo establecido en la Ley Constitucional del Sistema Integral de Criptoactivos (Gaceta Oficial Extraordinaria N° 6.370).
          </p>

          <h3 className="font-bold text-red-400 pt-2">Artículo 1: Definición Legal de la Plataforma</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold">1.1. Naturaleza y no Intermediación:</span> La plataforma actúa exclusivamente como un servicio de directorio y suscripción publicitaria. No mediamos ni participamos en las transacciones de criptoactivos que los usuarios y comercios puedan realizar entre sí.</li>
            <li><span className="font-semibold">1.2. No Custodia:</span> TuZonaCripto no tiene acceso, custodia ni resguarda criptoactivos. Los fondos y la seguridad de las transacciones son responsabilidad exclusiva del usuario y del comercio, quienes operan desde sus propias billeteras digitales.</li>
            <li><span className="font-semibold">1.3. Naturaleza de las Suscripciones:</span> El servicio de suscripción ofrecido en la plataforma no está relacionado con la intermediación de activos virtuales. Los pagos de estas suscripciones, ya sean en criptoactivos o en moneda fiduciaria a través de PayPal, corresponden a la adquisición de servicios de publicidad y posicionamiento digital dentro del directorio, una actividad que no se encuentra expresamente prohibida ni regulada por la SUNACRIP.</li>
          </ul>

          <h3 className="font-bold text-red-400 pt-2">Artículo 2: Obligaciones y Declaraciones</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold">2.1. Declaración Jurada de Fondos Lícitos:</span> De conformidad con la normativa sobre la Administración y Fiscalización de los Riesgos de Legitimación de Capitales y Financiamiento al Terrorismo (LA/FT) aplicable en Venezuela, cada usuario y comercio registrado declara, bajo juramento, que los fondos utilizados provienen de actividades lícitas. Esta es una cláusula esencial para la legitimidad del negocio.</li>
            <li><span className="font-semibold">2.2. Responsabilidad de la Información:</span> Los comercios son responsables de la exactitud de la información publicada en sus perfiles. Por otro lado, los usuarios son responsables de verificar la información y de gestionar sus transacciones de forma segura.</li>
            <li><span className="font-semibold">2.3. No Asesoramiento Financiero:</span> La información en la plataforma no constituye asesoría financiera. TuZonaCripto no es responsable por las decisiones de inversión, transacciones o acuerdos comerciales que los usuarios realicen.</li>
          </ul>

          <h3 className="font-bold text-red-400 pt-2">Artículo 3: Cumplimiento Normativo y Reporte</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold">3.1. Normas de Prevención LA/FT:</span> Aunque no estamos clasificados como sujetos obligados que requieran registro en la SUNACRIP para operar como un directorio, TuZonaCripto se compromete a colaborar con las autoridades en la lucha contra la Legitimación de Capitales. Nuestro módulo CriptoSafe nos permitirá detectar señales de alerta para la generación de reportes internos que, en caso de ser requeridos por las autoridades, podríamos proporcionar.</li>
            <li><span className="font-semibold">3.2. Referencias Legales:</span> Este documento se rige por la legislación venezolana, incluyendo, pero no limitándose a:
                <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Decreto Constituyente sobre el Sistema Integral de Criptoactivos (Gaceta Oficial Extraordinaria N° 6.370).</li>
                    <li>Ley Orgánica contra la Delincuencia Organizada y Financiamiento al Terrorismo.</li>
                    <li>Providencia N° 044-2021 de la SUNACRIP.</li>
                </ul>
            </li>
          </ul>
            
          <h3 className="font-bold text-red-400 pt-2">Artículo 4: Exclusión de Responsabilidad y Cláusulas Adicionales</h3>
          <p>
            La plataforma no se hace responsable por la calidad de los productos o servicios de terceros. El uso de la plataforma es una aceptación completa de estos términos. La participación en el directorio no implica una relación laboral o de sociedad entre TuZonaCripto y los comercios.
          </p>
        </div>
        <DialogFooter className="flex-col sm:flex-row sm:justify-between items-center pt-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={isChecked} onCheckedChange={setIsChecked} />
            <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              He leído y acepto los Términos y Condiciones
            </Label>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button
              onClick={onAccept}
              disabled={!isChecked}
              className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white"
            >
              Aceptar y Continuar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditionsModal;