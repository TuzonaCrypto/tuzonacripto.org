import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, Briefcase, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const ContactInfoCard = ({ icon, title, children, delay }) => {
  const Icon = icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="crypto-card p-6 rounded-xl shadow-lg border-red-500/30 flex flex-col"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-red-600/80 to-red-800/80 rounded-lg flex items-center justify-center mr-4 shadow-md">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <div className="text-gray-300 space-y-2 text-sm">{children}</div>
    </motion.div>
  );
};

const ContactPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: t('contact.success_title'),
      description: t('contact.success_desc'),
    });
    e.target.reset();
  };

  const contactDetails = {
    phones: [
      { number: '+58 412-3268864', type: 'WhatsApp' },
      { number: '+58 424-2257710', type: 'WhatsApp' },
    ],
    emails: [
      { address: 'tuzonacripto@gmail.com', type: 'General' },
      { address: 'soporte@tuzonacripto.org', type: 'Soporte' },
      { address: 'darwingiraud@tuzonacripto.org', type: 'Dirección' },
    ],
    address: 'Municipio Chacao, Oficina 1-E, Edificio Centrum',
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Mail className="w-20 h-20 mx-auto mb-6 text-red-500" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">
              {t('contact.title')}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
             <h2 className="text-3xl font-bold text-white mb-6">{t('contact.info_title')}</h2>
            <ContactInfoCard icon={Phone} title={t('contact.telephones')} delay={0.1}>
              {contactDetails.phones.map((phone, i) => (
                <p key={i} className="flex items-center">
                  {phone.number} <span className="text-xs text-green-400 ml-2 py-0.5 px-1.5 bg-green-900/50 rounded-full">{phone.type}</span>
                </p>
              ))}
            </ContactInfoCard>
            <ContactInfoCard icon={Mail} title={t('contact.emails')} delay={0.2}>
              {contactDetails.emails.map((email, i) => (
                <p key={i}>
                  <a href={`mailto:${email.address}`} className="hover:text-red-400 transition-colors">{email.address}</a>
                  <span className="text-xs text-gray-400 ml-2">({email.type})</span>
                </p>
              ))}
            </ContactInfoCard>
            <ContactInfoCard icon={MapPin} title={t('contact.address')} delay={0.3}>
              <p>{contactDetails.address}</p>
            </ContactInfoCard>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
             <h2 className="text-3xl font-bold text-white mb-6">{t('contact.form_title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6 crypto-card p-8 rounded-xl border-red-500/30">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input type="text" placeholder={t('contact.name_placeholder')} required className="pl-10 h-12 bg-black/30 border-red-500/30 text-white placeholder-gray-400" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input type="email" placeholder={t('contact.email_placeholder')} required className="pl-10 h-12 bg-black/30 border-red-500/30 text-white placeholder-gray-400" />
              </div>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input type="text" placeholder={t('contact.subject_placeholder')} required className="pl-10 h-12 bg-black/30 border-red-500/30 text-white placeholder-gray-400" />
              </div>
              <div className="relative">
                 <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                <textarea
                  placeholder={t('contact.message_placeholder')}
                  required
                  rows="5"
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-red-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                ></textarea>
              </div>
              <Button type="submit" size="lg" className="w-full h-12 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                {t('contact.send_button')} <Send className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;