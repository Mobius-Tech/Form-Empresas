import React, { useState, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { QUESTIONS } from '../constants';
import { QuestionSlide } from './QuestionSlide';
import { Background } from './Background';
import type { FormData } from '../types';
import confetti from 'canvas-confetti';
import logo from '../assets/MobiusTechLogo.png';

export const FormContainer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 📝 Use a ref to always have the latest formData in async callbacks
  const formDataRef = React.useRef(formData);
  React.useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const handleAnswer = useCallback((id: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  // 🔹 ENVÍO AL BACKEND
  const sendData = useCallback(async (data: FormData) => {
    const expectedKeys = [
      "nombre-empresa",
      "control-ventas",
      "metodo-ventas",
      "top-productos",
      "gestion-inventario",
      "perdidas-inventario",
      "potencial-ventas",
      "ticket-promedio",
      "proceso-ventas",
      "tasa-conversion",
      "seguimiento-no-compradores",
      "base-datos",
      "cambio-gafas",
      "personalizacion-ofertas"
    ];

    // Construir payload en orden exacto
    const payload: Record<string, string | number> = {};
    expectedKeys.forEach((key) => {
      payload[key] = data[key] ?? "";
    });

    console.log("📤 Enviando payload:", payload);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwGRCry2R3ce9FGOLEgRWzwTTRgp22lxMYmx_f6fKsb70yTjwteBj7s0lZPSdwpZrhX/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );
      
      // Con no-cors no podemos leer la respuesta, pero el envío se realiza
      console.log("📥 Envío finalizado (modo no-cors)");
    } catch (error) {
      console.error("❌ Error enviando datos:", error);
      throw error;
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);


    try {
      // Uso el ref para asegurar que tengo la última respuesta guardada 
      // justo antes del envío (evita cierres obsoletos en el setTimeout)
      await sendData(formDataRef.current);
      setIsSubmitted(true);
      
      // 🎉 Confetti al completar
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#f97316', '#ffffff'],
      });
    } catch (err) {
      setError('Hubo un problema al enviar tus respuestas. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  }, [sendData]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  }, [currentIndex, handleSubmit]);

  // Progress percentage
  const progress = useMemo(() => ((currentIndex) / QUESTIONS.length) * 100, [currentIndex]);

  // Logo position and scale logic
  const logoState = useMemo(() => {
    if (isSubmitted || isSubmitting) {
      return { 
        left: '50%', 
        top: isMobile ? '25%' : '35%', 
        x: '-50%',
        y: '-50%',
        scale: isMobile ? 1.1 : 1.3,
        transformOrigin: 'center',
        filter: 'drop-shadow(0 0 30px var(--purple-glow))'
      };
    }
    if (currentIndex === 0) {
      return { 
        left: '50%', 
        top: '25vh', 
        x: '-50%', 
        y: '0%',
        scale: 1,
        transformOrigin: 'center',
        filter: 'drop-shadow(0 0 30px var(--purple-glow))'
      };
    }
    return { 
      left: isMobile ? '50%' : '1.75rem', 
      top: isMobile ? '2.5rem' : '1.75rem', 
      x: isMobile ? '-50%' : '0%', 
      y: '0%',
      scale: isMobile ? 0.6 : 0.45,
      transformOrigin: isMobile ? 'center' : 'top left',
      filter: isMobile ? 'drop-shadow(0 0 15px var(--purple-glow))' : 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))'
    };
  }, [isSubmitted, isSubmitting, currentIndex, isMobile]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      
      {/* Unified Logo with Continuous Travel - Optimized with Transforms */}
      <motion.div 
        animate={logoState}
        transition={{ 
          type: 'spring', 
          stiffness: 100, 
          damping: 20,
          mass: 0.8
        }}
        className="fixed z-50 flex items-center justify-center pointer-events-none"
        style={{ 
          position: 'fixed',
          zIndex: 100,
          willChange: 'transform, filter'
        }}
      >
        <img 
          src={logo} 
          alt="MobiusTech Logo" 
          fetchPriority="high"
          loading="eager"
          style={{ 
            height: '100px',
            objectFit: 'contain'
          }} 
        />
      </motion.div>

      {/* Progress Bar */}
      {!isSubmitted && !isSubmitting && (
        <div 
          className="fixed top-0 left-0 h-1 bg-zinc-800 w-full z-50"
          style={{ height: '4px', backgroundColor: '#18181b', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-main to-orange-main glow-purple"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            style={{ 
                height: '100%', 
                background: 'linear-gradient(to right, var(--purple-main), var(--orange-main))',
                boxShadow: '0 0 10px var(--purple-glow)',
                willChange: 'width'
            }}
          />
        </div>
      )}

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {(!isSubmitted && !isSubmitting) ? (
            <QuestionSlide
              key={QUESTIONS[currentIndex].id}
              question={QUESTIONS[currentIndex]}
              isActive={true}
              onAnswer={handleAnswer}
              onNext={handleNext}
              value={formData[QUESTIONS[currentIndex].id] || ''}
              isMobile={isMobile}
            />
          ) : isSubmitting ? (
            <motion.div
              key="submitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-start min-h-screen text-center px-4"
              style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '100vh',
                  textAlign: 'center',
                  paddingTop: '58vh'
              }}
            >
              <div className="w-16 h-16 border-4 border-purple-main/20 border-t-purple-main rounded-full animate-spin mb-6" style={{ width: '4rem', height: '4rem', border: '4px solid rgba(168, 85, 247, 0.2)', borderTop: '4px solid var(--purple-main)', borderRadius: '50%', marginBottom: '1.5rem' }} />
              <p className="text-xl text-text-secondary animate-pulse" style={{ color: 'var(--text-secondary)' }}>
                Enviando tu diagnóstico...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="thank-you"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col items-center justify-start min-h-screen text-center px-4"
              style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  textAlign: 'center',
                  paddingTop: isMobile ? '38vh' : '55vh'
              }}
            >
              {error ? (
                <>
                  <h1 className="text-4xl md:text-5xl font-black mb-6 text-orange-main leading-tight" style={{ fontWeight: 900, marginBottom: '1.5rem', color: 'var(--orange-main)', lineHeight: 1.1 }}>
                    ¡UPS!
                  </h1>
                  <p className="text-base md:text-xl text-text-secondary max-w-xl mb-12" style={{ color: 'var(--text-secondary)', maxWidth: '36rem', marginBottom: '3rem' }}>
                    {error}
                  </p>
                  <button 
                    onClick={() => handleSubmit()}
                    className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-all duration-300 text-lg"
                    style={{ padding: '0.8rem 2.5rem', backgroundColor: 'white', color: 'black', borderRadius: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Reintentar envío
                  </button>
                </>
              ) : (
                <>
                  <h1 className="text-3xl md:text-[5.5rem] font-black mb-6 text-glow-purple leading-tight px-4" style={{ fontWeight: 900, marginBottom: '2rem', textShadow: '0 0 20px var(--purple-glow)', lineHeight: 1.05 }}>
                    ¡DIAGNÓSTICO COMPLETADO!
                  </h1>
                  <p className="text-lg md:text-4xl text-text-secondary max-w-4xl mb-12 px-6" style={{ color: 'var(--text-secondary)', maxWidth: isMobile ? '36rem' : '64rem', marginBottom: '3rem' }}>
                    Tus respuestas han sido enviadas a nuestro equipo. Prepárate para el futuro de la visión.
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
