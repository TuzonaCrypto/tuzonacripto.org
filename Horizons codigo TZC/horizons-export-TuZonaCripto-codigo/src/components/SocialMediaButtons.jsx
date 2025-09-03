import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle } from 'lucide-react';

const SocialMediaButtons = () => {
  const instagramUser = "tuzonacripto";
  const whatsappNumber = "584123268864";
  const whatsappMessage = "Hola, estoy interesado en TuZonaCripto.";

  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      href: `https://instagram.com/${instagramUser}`,
      bgColor: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500",
      hoverColor: "hover:from-pink-600 hover:via-red-600 hover:to-yellow-600",
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-6 h-6" />,
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      bgColor: "bg-gradient-to-br from-green-500 to-teal-500",
      hoverColor: "hover:from-green-600 hover:to-teal-600",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-full text-white shadow-lg transform transition-all duration-300 ease-in-out ${link.bgColor} ${link.hoverColor} hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white`}
          aria-label={`Contactar por ${link.name}`}
          initial={{ opacity: 0, scale: 0.5, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 * index }}
          whileHover={{ rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  );
};

export default SocialMediaButtons;