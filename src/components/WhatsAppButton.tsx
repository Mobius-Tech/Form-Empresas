import React from 'react';
import { motion } from 'framer-motion';
import whatsappIcon from '../assets/whatsapp.svg';

export const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    // Obfuscation to prevent simple web scraping
    const p = ['30', '1289', '5852'];
    const c = ['5', '7'];
    const phoneNumber = c.join('') + p.join('');
    
    const messageParts = [
      'Hola ', 'MobiusTech', ', ',
      'acabo de completar el diagnóstico', ' y me gustaría ',
      'agendar una cita', ' para conversar sobre ',
      'las oportunidades de mejorar mi empresa.'
    ];
    
    const encodedMessage = encodeURIComponent(messageParts.join(''));
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(url, '_blank', 'noreferrer,noopener');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      style={{
         position: 'fixed',
         bottom: '20px',
         right: '20px',
         zIndex: 9999,
         padding: 0,
         border: 'none',
         background: 'transparent',
         cursor: 'pointer'
      }}
      aria-label="Contactar por WhatsApp"
    >
      <div style={{
         width: '60px',
         height: '60px',
         backgroundColor: 'white',
         borderRadius: '50%',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
         border: '3px solid #25D366',
         overflow: 'hidden'
      }}>
         <img 
           src={whatsappIcon} 
           alt="WhatsApp" 
           style={{ 
             width: '40px',
             height: '40px',
             display: 'block'
           }}
         />
      </div>
    </motion.button>
  );
};
