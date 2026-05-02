import { motion } from "motion/react";
import { Cpu } from "lucide-react";

export const OlliesVaultLogo = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
  const isLarge = size === "lg";

  return (
    <div className={`flex items-center gap-3 group cursor-pointer`}>
      {/* Animated Vault Icon */}
      <div className="relative">
        <motion.div
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className={`${isLarge ? 'w-16 h-16' : 'w-10 h-10'} rounded-xl bg-space-void border border-white/20 flex items-center justify-center relative overflow-hidden group-hover:border-kurz-yellow/50 transition-colors shadow-2xl active:scale-95`}
        >
          {/* Circuit Lines Background */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
            <svg width="100%" height="100%" viewBox="0 0 40 40">
              <path d="M0 20 H40 M20 0 V40" stroke="white" strokeWidth="0.5" fill="none" />
              <circle cx="20" cy="20" r="15" stroke="white" strokeWidth="0.5" fill="none" />
            </svg>
          </div>

          {/* The Core */}
          <motion.div
            animate={{ 
              filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative z-10 text-kurz-yellow"
          >
            <Cpu size={isLarge ? 32 : 20} className="group-hover:rotate-90 transition-transform duration-500" />
          </motion.div>

          {/* Scanning Line */}
          <motion.div 
            animate={{ y: [-40, 40] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-kurz-yellow/30 to-transparent z-20 pointer-events-none"
          />
        </motion.div>

        {/* Outer Glow */}
        <div className="absolute inset-0 rounded-xl bg-kurz-yellow/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      </div>

      {/* Text Elements */}
      <div className="flex flex-col">
        <span className={`font-black tracking-tighter text-white uppercase font-display leading-none ${isLarge ? 'text-3xl' : 'text-xl'}`}>
          Ollie's <span className="text-kurz-yellow">Vault</span>
        </span>
        {isLarge && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.5, x: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-kurz-cyan mt-1"
          >
            Computer Engineering Projects
          </motion.span>
        )}
      </div>
    </div>
  );
};
