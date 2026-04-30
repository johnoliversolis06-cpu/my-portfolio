import { motion, useScroll, useTransform, useSpring } from "motion/react";
import React from "react";

export const ParallaxBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Create a smoothed version of the scroll progress for "inertia" feel
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const y1 = useTransform(smoothScroll, [0, 1], [0, -1800]);
  const y2 = useTransform(smoothScroll, [0, 1], [0, -900]);
  const y3 = useTransform(smoothScroll, [0, 1], [0, -450]);
  const yBeam = useTransform(smoothScroll, [0, 1], [0, -3000]); // High velocity beam
  const rotate = useTransform(smoothScroll, [0, 1], [0, 120]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Deep Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-void via-space-deep to-space-void" />

      {/* Layer: High Speed Data Beams */}
      <motion.div style={{ y: yBeam }} className="absolute inset-0">
        <div className="absolute top-[30%] left-[80%] w-[2px] h-[500px] bg-gradient-to-b from-transparent via-kurz-cyan/20 to-transparent blur-sm" />
        <div className="absolute top-[80%] left-[20%] w-[1px] h-[700px] bg-gradient-to-t from-transparent via-kurz-pink/10 to-transparent blur-xs" />
      </motion.div>
      
      {/* Subtle Digital Grid (Representing Engineering Blueprints) */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Layer 1: Distant Stars + Binary Streams */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-30"
            style={{
              top: `${Math.random() * 300}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2}px`,
              height: `${Math.random() * 2}px`,
            }}
          />
        ))}
        {/* Rapid Binary Streams */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`bin-${i}`}
            className="absolute font-mono text-[8px] text-kurz-cyan/5 whitespace-nowrap"
            style={{
              top: `${i * 40}%`,
              left: `${(i % 3) * 30}%`,
              writingMode: 'vertical-rl',
              transform: `rotate(${i * 10}deg)`
            }}
          >
            {Array(20).fill(0).map(() => Math.round(Math.random())).join('')}
          </div>
        ))}
      </motion.div>

      {/* Layer: Binary Rain Columns (Hacker Vibe) */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`rain-${i}`}
            className="absolute font-mono text-[8px] text-kurz-cyan/15 whitespace-nowrap overflow-hidden select-none"
            style={{
              top: `${(i * 7) % 200}%`,
              left: `${(i * 4) % 100}%`,
              writingMode: 'vertical-rl',
              height: `${200 + Math.random() * 400}px`
            }}
          >
            <motion.div
              animate={{ y: [0, -1000] }}
              transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {Array(100).fill(0).map(() => Math.round(Math.random())).join('\n')}
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Layer 2: Mid Layer - Circuit Traces & nodes */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {/* AND Gate Symbol (Subtle) */}
        <svg className="absolute top-[25%] left-[5%] w-16 h-16 opacity-10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
          <path d="M3 5V19C10 19 14 17 14 12C14 7 10 5 3 5Z" />
          <line x1="14" y1="12" x2="20" y2="12" />
          <line x1="2" y1="8" x2="3" y2="8" />
          <line x1="2" y1="16" x2="3" y2="16" />
        </svg>

        {/* OR Gate Symbol (Subtle) */}
        <svg className="absolute bottom-[30%] right-[5%] w-16 h-16 opacity-10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
          <path d="M3 5C5 12 5 12 3 19C10 19 16 16 20 12C16 8 10 5 3 5Z" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="2" y1="8" x2="5" y2="8" />
          <line x1="2" y1="16" x2="5" y2="16" />
        </svg>

        {/* Jagged PCB Trace 1 */}
        <svg className="absolute top-[15%] left-[65%] w-80 h-40 opacity-[0.05]" viewBox="0 0 200 100">
          <path d="M 0 0 L 50 0 L 50 50 L 150 50 L 150 100" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1.5" fill="white" />
          <circle cx="150" cy="100" r="1.5" fill="white" />
        </svg>

        {/* Jagged PCB Trace 2 */}
        <svg className="absolute top-[50%] left-[5%] w-60 h-40 opacity-[0.05]" viewBox="0 0 200 100">
          <path d="M 200 0 L 150 0 L 150 50 L 50 50 L 50 100" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="200" cy="0" r="1.5" fill="white" />
          <circle cx="50" cy="100" r="1.5" fill="white" />
        </svg>

        {/* Integrated Circuit Schematic */}
        <div className="absolute top-[75%] left-[60%] w-32 h-20 border border-white/10 opacity-10 flex flex-col justify-between p-2">
          <div className="w-full text-center text-[6px] font-mono text-white/50">CPU_CORE_v1</div>
          <div className="flex justify-between">
            <div className="space-y-1">
              {[...Array(4)].map((_, i) => <div key={i} className="w-2 h-[1px] bg-white/20" />)}
            </div>
            <div className="space-y-1">
              {[...Array(4)].map((_, i) => <div key={i} className="w-2 h-[1px] bg-white/20" />)}
            </div>
          </div>
        </div>

        {/* Resistor Symbol */}
        <svg className="absolute top-[85%] right-[20%] w-20 h-8 opacity-5 text-white" viewBox="0 0 100 20">
          <path d="M 0 10 L 20 10 L 25 5 L 35 15 L 45 5 L 55 15 L 65 5 L 75 15 L 80 10 L 100 10" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Binary Matrix Node */}
        <div className="absolute top-[10%] right-[5%] w-24 h-24 border border-kurz-cyan/5 flex flex-wrap gap-1 p-1 opacity-20">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-kurz-cyan/20 rounded-[1px]" />
          ))}
        </div>

        {/* Parallel Bus Lines (Engineering feel) */}
        <div className="absolute top-[40%] left-0 w-full h-12 flex flex-col gap-2 opacity-[0.03]">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ opacity: [0.03, 0.05, 0.03], x: [-2, 2, -2] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-[1px] bg-white" 
            />
          ))}
        </div>

        {/* Vertical Circuit Trace 1 + Node */}
        <div className="absolute top-[10%] left-[15%] w-[1px] h-80 bg-gradient-to-b from-kurz-cyan/20 to-transparent">
          <div className="absolute top-0 -left-[3px] w-2 h-2 rounded-full border border-kurz-cyan/40 bg-space-void shadow-[0_0_8px_#22d3ee22]" />
          <div className="absolute top-40 -left-10 w-20 h-[1px] bg-kurz-cyan/10 rotate-45" />
        </div>
        
        {/* Complex Circuit Path (Elbow) */}
        <div className="absolute top-[45%] right-[20%] w-40 h-40 border-t border-r border-kurz-pink/10 rounded-tr-3xl">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-kurz-pink/30" />
          <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-kurz-pink/30" />
        </div>

        {/* Technical Labeling (Subtle Schematics) */}
        <div className="absolute top-[15%] right-[25%] opacity-10">
          <div className="border border-white/20 p-2 font-mono text-[8px] text-white space-y-1">
            <div className="flex justify-between gap-4"><span>VCC</span><span className="text-kurz-yellow">+5V</span></div>
            <div className="flex justify-between gap-4"><span>GND</span><span className="opacity-40">0V</span></div>
            <div className="w-full h-[1px] bg-white/20" />
            <div className="text-[6px] opacity-30">BUS_A [0..15]</div>
          </div>
        </div>

        {/* 7-Segment Display Pattern (Ghostly) */}
        <div className="absolute top-[5%] left-[45%] opacity-[0.03] scale-50">
          <div className="relative w-12 h-20 border-2 border-white/20 flex items-center justify-center font-mono text-4xl text-white">
            8
          </div>
        </div>

        {/* Code Snippets (Ghostly) */}
        <div className="absolute bottom-[20%] left-[5%] font-mono text-[10px] text-kurz-green/5 select-none space-y-1 leading-none">
          <div>async function init_core() {'{'}</div>
          <div className="pl-4">await hardware.sync();</div>
          <div className="pl-4">monitor.start();</div>
          <div>{'}'}</div>
        </div>

        {/* Vertical Circuit Trace 2 */}
        <div className="absolute top-[60%] right-[12%] w-[1px] h-80 bg-gradient-to-t from-kurz-pink/10 to-transparent">
          <div className="absolute bottom-0 -left-[2.5px] w-1.5 h-1.5 rounded-full border border-kurz-pink/30 bg-space-void" />
        </div>

        <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-kurz-yellow/[0.02] blur-3xl" />
        <div className="absolute top-[60%] right-[15%] w-96 h-96 rounded-full bg-kurz-cyan/[0.02] blur-3xl" />
        <div className="absolute bottom-[10%] left-[20%] w-48 h-48 rounded-full bg-kurz-pink/[0.02] blur-3xl" />
      </motion.div>

      {/* Layer 3: Orbs (Slowest rotation) */}
      <motion.div style={{ y: y3, rotate }} className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/5 rounded-full rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full -rotate-12" />
      </motion.div>
    </div>
  );
};
