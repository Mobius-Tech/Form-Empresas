import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from '../types';
import { ArrowRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface QuestionSlideProps {
  question: Question;
  isActive: boolean;
  onAnswer: (id: string, value: string | number) => void;
  onNext: () => void;
  value: string | number;
  isMobile: boolean;
}

export const QuestionSlide: React.FC<QuestionSlideProps> = React.memo(({
  question,
  isActive,
  onAnswer,
  onNext,
  value,
  isMobile,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [isLeaving, setIsLeaving] = useState(false);

  // Reset isLeaving when the question ID changes (new question)
  useEffect(() => {
    setIsLeaving(false);
  }, [question.id]);

  // Sync local value when question changes or external value changes (e.g. going back/forward)
  useEffect(() => {
    setLocalValue(value);
  }, [value, question.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const syncAnswer = useCallback(() => {
    if (localValue !== value) {
      onAnswer(question.id, localValue);
    }
  }, [localValue, value, onAnswer, question.id]);

  const handleNextClick = () => {
    if (isLeaving) return;
    setIsLeaving(true);
    syncAnswer();
    onNext();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isLeaving) return;
      if (question.type === 'text' || question.type === 'email') {
        if (localValue) {
          setIsLeaving(true);
          syncAnswer();
          onNext();
        }
      }
    }
  };

  const containerStyles = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: question.id === 'nombre-empresa' ? 'flex-start' : 'center' as const,
    height: '100vh',
    width: '100vw',
    padding: question.id === 'nombre-empresa' ? '45vh 2rem 0' : (isMobile ? '7rem 2rem 0' : '5rem 2rem 0'),
    textAlign: 'center' as const,
    willChange: 'transform, opacity'
  }), [question.id]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={cn(
        "flex flex-col items-center min-h-screen w-full px-6 text-center",
        question.id === 'nombre-empresa' ? "justify-start pt-[45vh]" : "justify-center pt-20"
      )}
      style={containerStyles}
    >
      <div className="max-w-6xl w-full flex flex-col items-center mx-auto">
        {!question.description && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-purple-main font-bold tracking-widest uppercase mb-2 text-sm md:text-base"
            style={{ 
              color: 'var(--purple-main)', 
              fontWeight: 'bold', 
              letterSpacing: '0.2em', 
              marginBottom: question.id === 'nombre-empresa' ? '1.5rem' : '0.5rem', 
              fontSize: isMobile ? (question.id === 'nombre-empresa' ? '1rem' : '0.875rem') : (question.id === 'nombre-empresa' ? '1.25rem' : '1.125rem') 
            }}
          >
            {question.id === 'nombre-empresa' ? 'BIENVENIDO' : question.id.replace(/-/g, ' ')}
          </motion.p>
        )}
        
        {question.description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-purple-main font-bold tracking-widest uppercase mb-4"
            style={{ 
              color: 'var(--purple-main)', 
              fontWeight: 700, 
              fontSize: isMobile ? '0.875rem' : '1.125rem',
              letterSpacing: '0.1em',
              marginBottom: isMobile ? '8px' : '12px'
            }}
          >
            {question.description}
          </motion.p>
        )}
        
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-black mb-8 text-glow-purple leading-tight w-full break-words px-4 text-center"
          style={{ 
            fontWeight: 900, 
            marginBottom: '3rem', 
            textShadow: '0 0 10px var(--purple-glow)', 
            lineHeight: 1.1,
            fontSize: isMobile ? '1.5rem' : '2.5rem',
            width: '100%',
            textAlign: 'center'
          }}
        >
          {question.question}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative w-full flex flex-col items-center"
        >
          {question.type === 'text' || question.type === 'email' ? (
            <div className="relative w-full flex flex-col items-center">
              <input
                type={question.type}
                placeholder={question.placeholder}
                value={localValue as string}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                   setIsFocused(false);
                   syncAnswer();
                }}
                autoFocus
                className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-xl sm:text-2xl md:text-[3rem] focus:outline-none focus:border-purple-main transition-colors text-center placeholder:text-zinc-700 font-medium mb-8"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `2px solid ${isFocused ? 'var(--purple-main)' : '#27272a'}`,
                  padding: '1rem 0',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 500,
                  marginBottom: '2rem',
                  fontSize: isMobile ? '1.5rem' : '2rem'
                }}
              />
              {isFocused && (
                <motion.div 
                  layoutId="underline"
                  className="absolute bottom-[2rem] left-0 right-0 h-0.5 bg-purple-main glow-purple"
                  style={{ position: 'absolute', bottom: '2rem', left: 0, right: 0, height: '2px', backgroundColor: 'var(--purple-main)', boxShadow: '0 0 10px var(--purple-glow)' }}
                />
              )}
              
              <AnimatePresence>
                {localValue && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex flex-col items-center justify-center w-full gap-4 mt-20"
                    style={{ margin: '0 auto', textAlign: 'center' }}
                  >
                    <motion.button
                      whileHover={isLeaving ? {} : { scale: 1.05 }}
                      whileTap={isLeaving ? {} : { scale: 0.95 }}
                      onClick={handleNextClick}
                      disabled={isLeaving}
                      className={cn(
                        "group flex items-center justify-center gap-2 px-12 py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-all duration-300 text-lg",
                        isLeaving && "opacity-50 cursor-not-allowed pointer-events-none"
                      )}
                      style={{
                        padding: '0.8rem 2.5rem',
                        backgroundColor: 'white',
                        color: 'black',
                        borderRadius: '0.75rem',
                        fontWeight: '700',
                        cursor: isLeaving ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        minWidth: '240px',
                        margin: '0 auto',
                        fontSize: '1.2rem'
                      }}
                    >
                      Continuar
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : question.type === 'choice' ? (
            <div 
              className="w-full"
              style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                gap: isMobile ? '1rem' : '4rem',
                marginTop: '2rem'
              }}
            >
              {question.options?.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05, borderColor: 'var(--orange-main)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                      if (isLeaving) return;
                      setIsLeaving(true);
                      onAnswer(question.id, option);
                      setTimeout(onNext, 400);
                  }}
                  className={cn(
                    "w-full px-8 py-4 rounded-xl border-2 transition-all duration-300 font-bold text-lg text-center",
                    !isMobile && "md:w-auto md:text-xl",
                    value === option 
                      ? "border-orange-main bg-orange-main/10 text-orange-main glow-orange" 
                      : "border-zinc-800 hover:border-zinc-600 text-zinc-400",
                    isLeaving && "opacity-50 pointer-events-none"
                  )}
                  style={{
                    padding: '1rem 2rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${value === option ? 'var(--orange-main)' : '#27272a'}`,
                    backgroundColor: value === option ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                    color: value === option ? 'var(--orange-main)' : '#a1a1aa',
                    fontWeight: 'bold',
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    cursor: isLeaving ? 'not-allowed' : 'pointer',
                    boxShadow: value === option ? '0 0 15px var(--orange-glow)' : 'none',
                    minWidth: isMobile ? '100%' : '220px'
                  }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          ) : question.type === 'rating' ? (
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 w-full max-w-2xl mx-auto" style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '0.4rem' : '1rem' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ y: -5, scale: 1.1 }}
                  onClick={() => {
                      if (isLeaving) return;
                      setIsLeaving(true);
                      onAnswer(question.id, num);
                      setTimeout(onNext, 400);
                  }}
                  className={cn(
                    "w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center font-black text-xl transition-all",
                    value === num 
                      ? "border-purple-main bg-purple-main text-white glow-purple" 
                      : "border-zinc-800 text-zinc-500",
                    isLeaving && "opacity-50 pointer-events-none"
                  )}
                  style={{
                    width: isMobile ? '2.5rem' : '3.5rem',
                    height: isMobile ? '2.5rem' : '3.5rem',
                    borderRadius: '50%',
                    border: `2px solid ${value === num ? 'var(--purple-main)' : '#27272a'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    backgroundColor: value === num ? 'var(--purple-main)' : 'transparent',
                    color: value === num ? 'white' : '#71717a',
                    cursor: isLeaving ? 'not-allowed' : 'pointer',
                    boxShadow: value === num ? '0 0 15px var(--purple-glow)' : 'none'
                  }}
                >
                  {num}
                </motion.button>
              ))}
            </div>
          ) : null}
        </motion.div>
      </div>
    </motion.div>
  );
});
