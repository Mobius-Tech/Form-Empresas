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
  const [level, setLevel] = useState<'ALTO' | 'MEDIO' | 'BAJO' | null>(null);
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
      "dedica-empresa",
      "control-negocio",
      "gestion-informacion",
      "procesos-internos",
      "errores-procesos",
      "ventas",
      "seguimiento-clientes",
      "clientes-datos",
      "tecnologia-oportunidades",
      "interes-automatizacion",
      "whatsapp"
    ];

    // Construir payload en orden exacto
    const payload: Record<string, string | number> = {};
    expectedKeys.forEach((key) => {
      payload[key] = data[key] ?? "";
    });

    console.log("📤 Enviando payload:", payload);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxKT6YNVi3uaPWY6b6hZiyo4ZE0IaVyRinnBPSH1Jwm-b0xK88h90q9PtTk_apNliQ/exec", // Link appscript
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
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

    const currentData = formDataRef.current;

    // 🧮 CALCULAR SCORE
    let score = 0;
    if (currentData['control-negocio'] === 'No') score++;
    if (currentData['procesos-internos'] === 'Sí') score++;
    if (currentData['errores-procesos'] === 'Sí') score++;
    if (currentData['ventas'] === 'No') score++;
    if (currentData['seguimiento-clientes'] === 'No') score++;
    if (currentData['clientes-datos'] === 'No') score++;

    let calculatedLevel: 'ALTO' | 'MEDIO' | 'BAJO' = 'BAJO';
    if (score >= 4) calculatedLevel = 'ALTO';
    else if (score >= 2) calculatedLevel = 'MEDIO';

    setLevel(calculatedLevel);

    try {
      await sendData(currentData);
      setIsSubmitted(true);

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
                  <p className="text-lg md:text-2xl text-text-secondary max-w-4xl mb-4 px-6" style={{ color: 'var(--text-secondary)', maxWidth: isMobile ? '36rem' : '64rem', marginBottom: '1rem' }}>
                    Hemos recibido la información de tu empresa.
                  </p>

                  <div className="flex flex-col gap-4 max-w-4xl px-8 items-center">
                    {level === 'ALTO' && (
                      <>
                        <p className="text-base md:text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                          Detectamos varias oportunidades importantes de mejora en tu empresa.
                        </p>
                        <p className="text-base md:text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                          Es muy probable que estés perdiendo tiempo, dinero o ventas por procesos manuales o falta de control.
                        </p>
                        <p className="text-base md:text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                          Nuestro equipo te enviará un diagnóstico detallado con soluciones específicas para optimizar tu operación.
                        </p>
                      </>
                    )}
                    {level === 'MEDIO' && (
                      <>
                        <p className="text-base md:text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                          Tu empresa tiene una buena base, pero hay áreas clave que pueden optimizarse.
                        </p>
                        <p className="text-base md:text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                          Con automatización y mejores procesos podrías mejorar tu eficiencia y aumentar tus resultados.
                        </p>
                        <p className="text-base md:text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                          Te enviaremos recomendaciones personalizadas para llevar tu negocio al siguiente nivel.
                        </p>
                      </>
                    )}
                    {level === 'BAJO' && (
                      <>
                        <p className="text-base md:text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                          Tu empresa tiene un buen nivel de organización y control.
                        </p>
                        <p className="text-base md:text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                          Aún así, existen oportunidades para escalar y mejorar mediante automatización.
                        </p>
                        <p className="text-base md:text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                          Nuestro equipo te compartirá ideas para potenciar aún más tu operación.
                        </p>
                      </>
                    )}

                    <p className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-main to-orange-main bg-clip-text text-transparent mt-8" style={{ marginTop: '2rem', backgroundImage: 'linear-gradient(to right, var(--purple-main), var(--orange-main))', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: 700 }}>
                      En las próximas horas recibirás tu diagnóstico gratuito por WhatsApp.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
