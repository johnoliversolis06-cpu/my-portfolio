import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Rocket, 
  Code2, 
  Paintbrush, 
  Monitor, 
  Link as LinkIcon, 
  Mail, 
  ChevronDown,
  ExternalLink,
  Terminal,
  Layers,
  Download,
  FileBadge,
  Cpu as CpuIcon,
  Globe,
  Target,
  FlaskConical,
  Microchip,
  ShieldCheck,
  Zap,
  X,
  Plus
} from "lucide-react";
import { TiltCard } from "./components/TiltCard";
import { ParallaxBackground } from "./components/ParallaxBackground";
import { OlliesVaultLogo } from "./components/OlliesVaultLogo";

// Fallback image if profile.png is not uploaded yet. 
// Once you upload profile.png to src/assets/, this will show your photo.
const profilePic = "/src/assets/profile.png"; 

// HOW TO IMPORT YOUR IMAGES:
// 1. Upload your images (PNG/JPG) to the 'src/assets' folder.
// 2. Import them like this:
// import arnisenseImg from "./assets/arnisense.png";
// 3. Add 'image: arnisenseImg' to the project object in the 'projects' array below.

interface Project {
  title: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  tags: string[];
  color: string;
  bg: string;
  features?: string[];
  gallery?: string[]; // Added for gallery support
  icon: any;
  image?: string;
}

interface Certification {
  title: string;
  issuer?: string;
  image?: string;
}

const ProjectCard = ({ project, index, onClick }: { project: Project, index: number, onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className="cursor-pointer"
  >
    <TiltCard className="flex flex-col h-full border border-white/5 active:scale-95 transition-transform group">
      {/* Visual Header */}
      <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-white/5 border border-white/10 group">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className={`w-full h-full ${project.bg} flex items-center justify-center text-space-void transition-colors group-hover:opacity-90`}>
            <project.icon size={64} className="group-hover:rotate-12 transition-transform" />
          </div>
        )}
        <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center font-black text-kurz-yellow group-hover:bg-kurz-yellow group-hover:text-space-void transition-all">
          {index + 1}
        </div>
      </div>

      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{project.subtitle}</h4>
      <h3 className="text-3xl text-white font-display font-black mb-4 uppercase tracking-tighter">{project.title}</h3>
      <p className="text-slate-400 mb-8 flex-grow leading-relaxed text-sm line-clamp-3">{project.desc}</p>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-3 py-1 bg-white/5 text-[10px] font-black uppercase tracking-widest rounded-md text-white/40 border border-white/10">
            {tag}
          </span>
        ))}
      </div>
      
      <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-kurz-yellow group-hover:gap-4 transition-all">
        VIEW SPECIFICATIONS <Plus size={14} />
      </button>
    </TiltCard>
  </motion.div>
);

const projects: Project[] = [
  {
    title: "ARNISENSE",
    subtitle: "Sensor Training Dummy",
    desc: "Smart system with wearable sensors monitoring Arnis techniques in real time.",
    longDesc: "ArniSense was developed to bridge the gap between traditional martial arts and data-driven training. Using a Raspberry Pi integrated with accelerometers and force sensors, the system records the velocity and impact of every strike. The real-time dashboard allows coaches to analyze performance metrics like reaction time and strike power with sub-millisecond accuracy.",
    tags: ["IoT", "Python", "Raspberry Pi", "Sensors"],
    color: "text-kurz-yellow",
    bg: "bg-kurz-yellow",
    icon: Target,
    gallery: [], // Ready for your images
    features: ["Motion & Impact integration", "Raspberry Pi processing", "Python performance UI"]
  },
  {
    title: "SECURE ECMS",
    subtitle: "Engineering Credentials",
    desc: "Desktop application with RBAC and encryption for sensitive credential management.",
    longDesc: "Secure ECMS is an enterprise-grade credentials management solution designed for high-security engineering environments. It implements advanced RBAC (Role-Based Access Control) and uses encryption for sensitive data fields. The system's cornerstone is its immutable audit trail, ensuring every movement of corporate engineering assets is tracked and verified.",
    tags: ["C#", ".NET", "SQL"],
    color: "text-kurz-indigo",
    bg: "bg-kurz-indigo",
    icon: ShieldCheck,
    gallery: [],
    features: ["RBAC Implementation", "SQL Encryption", "Audit Logs"]
  },
  {
    title: "HELLMECH",
    subtitle: "Sumobot Engineering",
    desc: "Competitive sumobot with strategic movement logic and performance-optimized hardware.",
    longDesc: "HellMech is a testament to sophisticated hardware-software harmony in competitive robotics. It features custom-built motor drivers and a strategic movement logic designed for high-speed responsiveness. The robot uses ultrasonic and infrared sensor arrays to autonomously locate and push opponents out of the ring with over 3kg of pushing force.",
    tags: ["C++", "Circuit Design", "Robotics"],
    color: "text-kurz-pink",
    bg: "bg-kurz-pink",
    icon: Zap,
    gallery: [],
    features: ["Strategic Movement Logic", "Custom Hardware Integration", "Performance Optimized"]
  },
  {
    title: "OSAS",
    subtitle: "Object Security Automated",
    desc: "Security system with real-time detection and integrated alert mechanisms.",
    longDesc: "OSAS focusing on localized edge computing for security protocols. Unlike cloud-dependent systems, this hub processes sensor data locally to ensure zero-latency emergency triggers. It was designed to detect unauthorized movement in restricted zones, alerting authorities through integrated network protocols before security is compromised.",
    tags: ["Sensors", "Automation", "Security"],
    color: "text-kurz-cyan",
    bg: "bg-kurz-cyan",
    icon: ShieldCheck,
    gallery: [],
    features: ["Real-time Detection", "Integrated Alerts", "Automated Logic"]
  },
  {
    title: "BT-CONTROL",
    subtitle: "Wireless Systems",
    desc: "Developed wireless-controlled devices using Bluetooth modules and embedded communication.",
    longDesc: "BT-CONTROL addresses the challenge of remote infrastructure management in hard-to-reach areas. By implementing a custom noise-filtering protocol and data redundancy checks, it ensures stable Bluetooth communication between mobile controllers and distributed IoT nodes, even in noisy industrial environments.",
    tags: ["Embedded", "Bluetooth", "IoT"],
    color: "text-kurz-green",
    bg: "bg-kurz-green",
    icon: Microchip,
    gallery: [],
    features: ["Wireless Integration", "Embedded Comms", "Remote Logic"]
  },
  {
    title: "PCB PROJECTS",
    subtitle: "Design & Fabrication",
    desc: "9V Supply Modules and Relay Module PCBs fabricated with a focus on stability.",
    longDesc: "This series of PCB projects represents the professional tier of hardware fabrication. The project focused on designing high-efficiency power supply modules for laboratory environments. Key design features include optimized thermal dissipation traces and heavy copper pour for high current stability, ensuring reliability for sensitive testing equipment.",
    tags: ["Altium", "Fabrication", "Electronics"],
    color: "text-kurz-orange",
    bg: "bg-kurz-orange",
    icon: Layers,
    gallery: [],
    features: ["Altium/KiCad Design", "9V Supply Modules", "Professional Fabricating"]
  }
];

const ProjectModal = ({ project, onClose }: { project: Project | null, onClose: () => void }) => (
  <AnimatePresence>
    {project && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-space-void/95 backdrop-blur-2xl pointer-events-auto"
        />
        <motion.div
          layoutId={`project-${project.title}`}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative w-full max-w-6xl bg-glass border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-full max-h-[90vh] text-white pointer-events-auto"
        >
          {/* Header Section */}
          <div className={`w-full py-20 ${project.bg} relative flex items-center justify-center overflow-hidden shrink-0`}>
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
             {project.image ? (
               <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
             ) : (
               <project.icon size={180} className="relative z-0 text-white/10" />
             )}
             <div className="relative z-20 text-center px-6">
                <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-4 text-white/60">{project.subtitle}</h4>
                <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-white">{project.title}</h2>
             </div>
             <button 
               onClick={onClose} 
               className="absolute top-8 right-8 z-30 p-4 bg-black/40 hover:bg-black/60 rounded-full transition-colors border border-white/10 group"
             >
                <X size={24} className="group-hover:rotate-90 transition-transform" />
             </button>
          </div>
          
          {/* Content Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#070b14]">
            <div className="max-w-5xl mx-auto p-8 md:p-16 grid lg:grid-cols-3 gap-16">
              
              {/* Detailed Info */}
              <div className="lg:col-span-2 space-y-16">
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-2 h-10 ${project.bg} rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]`} />
                    <h3 className="text-2xl font-bold font-display uppercase tracking-widest text-kurz-yellow">Technical Brief</h3>
                  </div>
                  <p className="text-xl text-slate-300 leading-relaxed font-medium">
                    {project.longDesc}
                  </p>
                </section>

                {/* Gallery Subsection */}
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white/40">Visual Documentation</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {project.gallery && project.gallery.length > 0 ? (
                      project.gallery.map((img, i) => (
                        <div key={i} className="aspect-video bg-white/5 rounded-3xl overflow-hidden border border-white/10 group">
                          <img src={img} alt={`Exhibition ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full h-64 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-white/10 space-y-4">
                        <Paintbrush size={48} className="opacity-20" />
                        <span className="font-mono text-xs uppercase tracking-widest">[ VISUAL_ASSETS_PENDING ]</span>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Sidebar Specifications */}
              <div className="space-y-12">
                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-8">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-kurz-cyan mb-6">Stack Overview</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-kurz-cyan/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-kurz-cyan border border-kurz-cyan/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-kurz-pink mb-6">Core Modules</h4>
                    <ul className="space-y-4">
                      {project.features?.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="p-1 bg-kurz-pink/20 rounded-md mt-1">
                            <Plus size={12} className="text-kurz-pink" />
                          </div>
                          <span className="text-sm text-slate-300 font-bold leading-tight">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a 
                  href="#" 
                  className={`flex items-center justify-center gap-3 p-6 rounded-2xl ${project.bg} text-space-void font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-kurz-yellow/5 group`}
                >
                  SOURCE REPOSITORY <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Nav = () => (
  <motion.nav 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-transparent"
  >
    <div className="flex items-center gap-3">
      <OlliesVaultLogo />
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex items-center gap-8 px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-white">
        <a href="#home" className="text-xs font-bold uppercase tracking-widest hover:text-kurz-yellow transition-colors">Home</a>
        <a href="#about" className="text-xs font-bold uppercase tracking-widest hover:text-kurz-yellow transition-colors">About</a>
        <a href="#projects" className="text-xs font-bold uppercase tracking-widest hover:text-kurz-yellow transition-colors">Projects</a>
        <a href="#contact" className="text-xs font-bold uppercase tracking-widest bg-white text-space-void px-4 py-1 rounded-full transition-all hover:scale-105">Contact</a>
      </div>
      
      {/* Mobile Socials */}
      <div className="flex md:hidden items-center gap-4 text-white/60">
        <a href="https://github.com/johnoliversolis06" target="_blank"><Monitor size={18} /></a>
        <a href="https://linkedin.com/in/john-oliver-solis-524629318" target="_blank"><LinkIcon size={18} /></a>
      </div>
    </div>
  </motion.nav>
);

const SectionHeading = ({ children, color = "kurz-yellow" }: { children: React.ReactNode, color?: string }) => (
  <div className="flex flex-col gap-4 mb-16">
    <div className={`inline-block self-start px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-${color}/20 border border-${color}/30 text-${color}`}>
      {children}
    </div>
    <div className="flex items-center gap-4">
      <h2 className="text-5xl font-display font-black tracking-tighter leading-none uppercase text-white">{children}</h2>
    </div>
  </div>
);

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  
  // Profile Scroll Animation
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const profileImgOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const cpuIconOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0.3, 0]);
  const cpuScale = useTransform(scrollYProgress, [0.3, 0.5], [1, 0.8]);

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-kurz-yellow selection:text-space-void font-sans">
      <ParallaxBackground />
      <Nav />
      {/* Fixed Socials */}
      <div className="fixed left-6 bottom-0 z-50 hidden lg:flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-32 after:bg-white/20">
        <motion.a whileHover={{ y: -5, color: '#facc15' }} href="https://github.com/johnoliversolis06" target="_blank" className="text-white/60 hover:text-white transition-colors">
          <Monitor size={20} />
        </motion.a>
        <motion.a whileHover={{ y: -5, color: '#6366f1' }} href="https://linkedin.com/in/john-oliver-solis-524629318" target="_blank" className="text-white/60 hover:text-white transition-colors">
          <LinkIcon size={20} />
        </motion.a>
        <motion.a whileHover={{ y: -5, color: '#f472b6' }} href="mailto:johnoliversolis06@gmail.com" className="text-white/60 hover:text-white transition-colors">
          <Mail size={20} />
        </motion.a>
      </div>

      {/* Project Exhibition Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Certification Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-space-void/95 backdrop-blur-3xl cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-xl font-display font-black uppercase tracking-widest text-white">{selectedCert.title}</h3>
                <button onClick={() => setSelectedCert(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
              </div>
              <div className="p-8 flex justify-center items-center bg-black/40">
                {selectedCert.image ? (
                  <img src={selectedCert.image} alt={selectedCert.title} className="max-w-full max-h-[60vh] rounded-lg shadow-2xl" />
                ) : (
                  <div className="py-20 flex flex-col items-center gap-6 opacity-20">
                    <FileBadge size={80} />
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-center">CERTIFICATE_DOCUMENT_NOT_FOUND</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl flex flex-col items-center"
        >
          <div className="mb-12">
            <OlliesVaultLogo size="lg" />
          </div>

          <div className="inline-block bg-kurz-indigo/50 border border-kurz-indigo/30 text-indigo-100 px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wider mb-8">
            Computer Engineering Graduate
          </div>
          
          <h1 className="text-6xl md:text-9xl font-display font-black mb-6 leading-[0.85] tracking-tighter uppercase text-white">
            Ollie's <br />
            <span className="text-kurz-yellow">VAULT</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-tight mb-12 font-bold uppercase tracking-tighter">
            Building systems where hardware <span className="text-kurz-pink">meets</span> software.
          </p>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Focused on reliability, automation, and real-world performance—from PCB fabrication and embedded systems to secure desktop applications.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#projects" className="btn-3d-pink tracking-widest uppercase text-sm flex items-center gap-2">
              View Projects <Rocket size={18} />
            </a>
            <button className="btn-3d-indigo tracking-widest uppercase text-sm flex items-center gap-2 text-white">
              Resume <Download size={18} />
            </button>
            <a href="#contact" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl tracking-widest uppercase text-sm hover:bg-white/10 transition-all">
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 cursor-pointer text-white"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section 
        ref={aboutRef}
        id="about" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-32 px-6 max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative flex justify-center items-center">
            {/* ASSET_GUIDE: 
                1. Upload your photo to src/assets/profile.png
                2. Add at the top of this file: import profilePic from "./assets/profile.png"
                3. Replace the 'src: ""' below with 'src: profilePic'
            */}
            <TiltCard className="w-80 h-80 rounded-full overflow-hidden border-4 border-white/10 flex items-center justify-center relative shadow-2xl bg-gradient-to-tr from-kurz-indigo to-purple-800">
              
              {/* Layer 1: Technical Core (CPU) */}
              <motion.div 
                style={{ opacity: cpuIconOpacity, scale: cpuScale }}
                className="relative z-10 text-white flex flex-col items-center just"
              >
                 <CpuIcon size={120} className="opacity-20 translate-y-4" />
                 <span className="font-mono text-[8px] tracking-[0.4em] opacity-30 mt-4">CORE_AUTH_REQ</span>
              </motion.div>

              {/* Layer 2: Profile Picture (Fades In) */}
              <motion.div
                style={{ opacity: profileImgOpacity }}
                /* ADJUST_SIZE_HERE: Change the padding 'p-2' below to 'p-0' for full size or 'p-10' for smaller. */
                // className="  inset-0 z-0 flex items-center justify-center p-0"
                className="relative z-20 flex items-center justify-center w-[200px] h-[400px] p-0"
              >
                <img 
                  src={profilePic}  
                  alt="John Oliver Solis" 
                  className="w-full h-full object-cover rounded-full border-2 border-white/10"
                  onError={(e) => {
                    // Falls back to a subtle gradient if no image
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>

              {/* Scanning Overlay Effect */}
              <motion.div 
                animate={{ y: [-320, 320] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-[1px] bg-kurz-yellow/40 blur-[1px] z-30 pointer-events-none"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-25" />
            </TiltCard>

            {/* Orbiting Tech Particles */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[440px] h-[440px] border border-white/5 rounded-full pointer-events-none"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-kurz-cyan rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            </motion.div>
            
            <div className="absolute -bottom-6 w-64 h-8 bg-black/60 rounded-[100%] blur-2xl -z-10" />
          </div>

          <div>
            <SectionHeading color="kurz-yellow">ABOUT ME</SectionHeading>
            <p className="text-xl text-slate-300 leading-relaxed mb-8 font-medium">
              I enjoy building practical solutions that combine hardware and software. My goal is to develop <span className="text-kurz-pink font-black">efficient, reliable, and scalable systems</span> for engineering teams.
            </p>
            <p className="text-slate-400 leading-relaxed mb-12">
              My experience includes supported test development engineering in the semiconductor industry, building secure applications, and maintaining automated test systems.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl"
              >
                <div className="w-12 h-12 bg-kurz-cyan/20 text-kurz-cyan rounded-xl flex items-center justify-center mb-4">
                  <Target size={24} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-kurz-cyan mb-2">Vision</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To become a highly skilled engineer bridging hardware and software for real-world applications.
                </p>
              </motion.div>
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 20 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl"
              >
                <div className="w-12 h-12 bg-kurz-pink/20 text-kurz-pink rounded-xl flex items-center justify-center mb-4">
                  <FlaskConical size={24} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-kurz-pink mb-2">Mission</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To implement engineering solutions while continuously improving performance, security, and usability.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading color="kurz-green">CORE SKILLS</SectionHeading>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                category: "Programming", 
                skills: "C# (.NET), Python, C/C++, SQL, JS/HTML/CSS", 
                icon: Code2, 
                color: "kurz-orange" 
              },
              { 
                category: "Hardware", 
                skills: "Embedded Systems, PCB Design (Altium/KiCad), Sensors", 
                icon: Microchip, 
                color: "kurz-green" 
              },
              { 
                category: "Engineering Tools", 
                skills: "Visual Studio, GitHub, AutoCAD, SSMS, MS Office", 
                icon: Terminal, 
                color: "kurz-cyan" 
              },
              { 
                category: "Networking & Others", 
                skills: "Cisco Basics, QGIS Mapping, Cybersecurity", 
                icon: Globe, 
                color: "kurz-pink" 
              }
            ].map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              >
                <TiltCard className="flex flex-col h-full group">
                  <div className={`w-12 h-12 bg-${group.color} rounded-xl flex-shrink-0 flex items-center justify-center text-space-void mb-6 group-hover:rotate-12 transition-transform`}>
                    <group.icon size={24} />
                  </div>
                  <h4 className={`text-xs font-black uppercase tracking-[0.2em] text-${group.color} mb-3`}>{group.category}</h4>
                  <p className="text-sm font-bold text-slate-100 leading-relaxed">{group.skills}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading color="kurz-pink">FEATURED PROJECTS</SectionHeading>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <ProjectCard 
                key={p.title} 
                project={p} 
                index={i} 
                onClick={() => setSelectedProject(p)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading color="kurz-yellow">EXPERIENCE</SectionHeading>
            <div className="space-y-8">
              {[
                {
                  title: "Apprentice Engineer",
                  company: "Amkor Technology Philippines Inc.",
                  period: "2025–2026",
                  details: [
                    "Developed secure desktop applications for engineering systems",
                    "Supported server and network migrations",
                    "Maintained ATE equipment and automated workflows"
                  ],
                  main: true
                },
                {
                  title: "Engineering Intern (OJT)",
                  company: "City Government of Carmona - IT Department",
                  period: "2024",
                  details: [
                    "Underwent specialized training in Web Development and System Management",
                    "Assisted in Cisco Networking configurations and equipment audits",
                    "Gained exposure to QGIS for urban mapping systems and data analysis",
                    "Participated in Cybersecurity orientation and infrastructure hardening tasks"
                  ],
                  main: false
                }
              ].map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative pl-8 border-l border-white/10"
                >
                  <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full ${exp.main ? 'bg-kurz-yellow shadow-[0_0_10px_#facc15]' : 'bg-white/20'}`} />
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold font-display uppercase tracking-tighter text-white">{exp.title}</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-kurz-yellow">{exp.period}</span>
                  </div>
                  <p className="text-sm font-bold opacity-80 mb-4 text-white">{exp.company}</p>
                  <ul className="text-sm text-slate-400 space-y-4">
                    {exp.details.map((detail, di) => (
                      <li key={di} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-kurz-yellow mt-1.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Certs */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <SectionHeading color="kurz-indigo">BACKGROUND</SectionHeading>
            <div className="space-y-12">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-glass p-8 rounded-3xl border border-white/10 transition-colors hover:border-kurz-indigo/50"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-black uppercase tracking-tighter mb-1">BS Computer Engineering</h3>
                    <p className="text-sm font-bold opacity-60">Cavite State University – Carmona</p>
                  </div>
                  <div className="px-3 py-1 bg-kurz-yellow text-space-void text-[10px] font-black uppercase rounded-md shadow-[0_0_15px_rgba(250,204,21,0.3)] shrink-0 ml-4">
                    Cum Laude
                  </div>
                </div>
                <p className="text-sm text-slate-300">GPA: 1.546 • Focus on Embedded Systems & Software Development</p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "TESDA Programming NC IV", image: undefined },
                  { title: "DICT: JavaScript", image: undefined },
                  { title: "Amkor: Process Control", image: undefined },
                  { title: "IP Networking", image: undefined }
                ].map((cert, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedCert(cert)}
                    className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer overflow-hidden"
                  >
                    {cert.image ? (
                      <img src={cert.image} alt={cert.title} className="w-full h-auto rounded-lg mb-2" />
                    ) : (
                      <div className="w-full h-24 bg-kurz-indigo/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-kurz-indigo/20 transition-colors">
                        <FileBadge className="text-kurz-indigo" size={32} />
                      </div>
                    )}
                    <span className="text-[10px] font-black font-display text-center uppercase tracking-wider opacity-90 leading-tight block w-full">{cert.title}</span>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus size={12} className="text-kurz-indigo" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-32 px-6 text-center border-t border-white/5 bg-space-void/50">
        <div className="max-w-3xl mx-auto">
          <SectionHeading color="kurz-pink">CONTACT</SectionHeading>
          <h2 className="text-5xl md:text-8xl font-display font-black mb-12 leading-none uppercase tracking-tighter text-white">
            Let's build <br/> the <span className="text-kurz-yellow">FUTURE</span>.
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-20 text-white">
            <motion.a 
              href="mailto:johnoliversolis06@gmail.com"
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-glass border border-white/10 flex flex-col items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-kurz-pink/20 text-kurz-pink rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Email</span>
              <span className="text-[10px] font-bold truncate w-full">johnoliversolis06@gmail.com</span>
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/john-oliver-solis-524629318"
              target="_blank"
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-glass border border-white/10 flex flex-col items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-kurz-indigo/20 text-kurz-indigo rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <LinkIcon size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">LinkedIn</span>
              <span className="text-[10px] font-bold">Connect</span>
            </motion.a>
            <motion.a 
              href="https://github.com/johnoliversolis06"
              target="_blank"
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-glass border border-white/10 flex flex-col items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-kurz-yellow/20 text-kurz-yellow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Monitor size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">GitHub</span>
              <span className="text-[10px] font-bold">Code</span>
            </motion.a>
          </div>

          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
            &copy; 2026 OLLIE'S VAULT &bull; DESIGNED FOR DISCOVERY &bull; JOHN OLIVER SOLIS
          </p>
        </div>
      </footer>
    </div>
  );
}
