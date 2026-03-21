import React from 'react';
import { motion } from 'framer-motion';

export const Background: React.FC = React.memo(() => {
  return (
    <>
      <div className="neon-gradient-bg" />
      <div className="isometric-grid" style={{ willChange: 'transform' }} />
      
      {/* Animated Floating Neon Orbs - Purple */}
      <motion.div
        animate={{
          y: [0, -70, 0],
          x: [0, 40, 0],
          scale: [1, 1.4, 0.9],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'fixed',
          top: '15%',
          left: '5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--purple-glow) 0%, transparent 60%)',
          filter: 'blur(70px)',
          zIndex: -1,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Animated Floating Neon Orbs - Orange */}
      <motion.div
        animate={{
          y: [0, 80, 0],
          x: [0, -60, 0],
          scale: [1, 1.2, 1.1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        style={{
          position: 'fixed',
          bottom: '10%',
          right: '10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--orange-glow) 0%, transparent 60%)',
          filter: 'blur(90px)',
          zIndex: -1,
          willChange: 'transform, opacity'
        }}
      />

      {/* Abstract Floating Polygons - Reduced to 3 */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            y: [0, -100, 0],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
          }}
          style={{
            position: 'fixed',
            top: `${20 + i * 15}%`,
            left: `${15 + i * 20}%`,
            width: '60px',
            height: '60px',
            border: `1px solid ${i % 2 === 0 ? 'var(--purple-main)' : 'var(--orange-main)'}`,
            transform: 'rotateX(60deg) rotateZ(45deg)',
            zIndex: -1,
            boxShadow: `0 0 15px ${i % 2 === 0 ? 'var(--purple-glow)' : 'var(--orange-glow)'}`,
            willChange: 'transform, opacity'
          }}
        />
      ))}

      {/* Additional Animated Lines / Streaks - Reduced to 2 */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          animate={{ 
            x: ['100vw', '-100vw'],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 5 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2
          }}
          style={{
            position: 'fixed',
            top: `${30 + i * 20}%`,
            width: '200px',
            height: '1px',
            background: i % 2 === 0 ? 'var(--purple-main)' : 'var(--orange-main)',
            boxShadow: `0 0 10px ${i % 2 === 0 ? 'var(--purple-glow)' : 'var(--orange-glow)'}`,
            zIndex: -1,
            transform: 'rotateZ(-15deg)',
            willChange: 'transform, opacity'
          }}
        />
      ))}
      
      {/* Isometric Animated Cubes (SVG) - Simplified */}
      <div style={{ position: 'fixed', top: '15%', right: '12%', zIndex: -1, opacity: 0.3 }}>
        <svg width="250" height="250" viewBox="0 0 250 250">
           <g transform="rotate(45, 125, 125)">
              <rect x="75" y="75" width="100" height="100" fill="none" stroke="var(--purple-main)" strokeWidth="1" className="glow-purple">
                 <animate attributeName="stroke-dasharray" from="0, 400" to="400, 0" dur="8s" repeatCount="indefinite" />
              </rect>
              <rect x="85" y="85" width="80" height="80" fill="none" stroke="var(--orange-main)" strokeWidth="0.5" className="glow-orange">
                 <animate attributeName="stroke-dasharray" from="0, 320" to="320, 0" dur="10s" repeatCount="indefinite" />
              </rect>
           </g>
        </svg>
      </div>

      {/* Decorative Dots Grid */}
      <div 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'radial-gradient(circle, #ffffff11 1px, transparent 1px)', 
          backgroundSize: '40px 40px', 
          opacity: 0.2, 
          zIndex: -1 
        }} 
      />

      {/* Floating "Data" Particles - Reduced to 8 */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          animate={{ 
            y: [-10, -100 - Math.random() * 200],
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            position: 'fixed',
            bottom: `${Math.random() * 50}%`,
            left: `${Math.random() * 100}%`,
            width: '4px',
            height: '4px',
            background: Math.random() > 0.5 ? 'var(--purple-main)' : 'var(--orange-main)',
            boxShadow: `0 0 5px ${Math.random() > 0.5 ? 'var(--purple-glow)' : 'var(--orange-glow)'}`,
            zIndex: -1,
            borderRadius: '1px',
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </>
  );
});
