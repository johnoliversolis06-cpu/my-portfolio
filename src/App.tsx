import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, LayoutGroup } from "motion/react";
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
  Bus,
  Lock,
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

interface ProjectSection {
  title: string;
  content: string;
  bullets?: string[];
  image?: string;
}

interface Project {
  title: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  tags: string[];
  color: string;
  bg: string;
  features?: string[];
  gallery?: string[]; 
  sections?: ProjectSection[];
  videoUrl?: string;
  externalUrl?: string;
  icon: any;
  image?: string;
}

interface Certification {
  title: string;
  issuer?: string;
  image?: string;
}

const ProjectCard: React.FC<{ project: Project, index: number, onClick: () => void }> = ({ project, index, onClick }) => (
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
    subtitle: "Sensor-Integrated Arnis Training System",
    desc: "A sensor-based training system that provides real-time feedback for Arnis techniques using a smart dummy and wearable motion tracking.",
    longDesc: "ARNISENSE was developed to bridge the gap between traditional martial arts and data-driven training. Using a Raspberry Pi integrated with accelerometers and force sensors, the system records the velocity and impact of every strike. The real-time dashboard allows coaches to analyze performance metrics like reaction time and strike power with sub-millisecond accuracy.",
    tags: ["IoT", "Python", "Raspberry Pi", "Embedded Systems", "Sensors"],
    color: "text-kurz-yellow",
    bg: "bg-kurz-yellow",
    icon: Target,
    gallery: [],
    features: ["Motion & Impact integration", "Raspberry Pi processing", "Python performance UI"],
    // videoUrl: "https://www.youtube.com/embed/your-video-id", // Add your video link here!
    sections: [
      {
        title: "Overview",
        content: "ARNISENSE is a training system designed to improve Arnis performance using real-time sensor feedback. It combines a sensor-equipped dummy and wearable devices to track strike accuracy, timing, and movement, turning traditional training into measurable performance data.",
        image: "/assets/arnisense/overview.jpg"
      },
      {
        title: "Problem",
        content: "Traditional Arnis training relies on observation and subjective feedback, making it difficult to measure performance consistently.",
        bullets: [
          "No objective measurement of strike accuracy",
          "Limited feedback during solo training",
          "Difficult to track improvement over time"
        ],
        image: "/assets/arnisense/problem.jpg"
      },
      {
        title: "Objectives",
        content: "The primary goals of the project focus on creating a closed-loop feedback environment for martial artists.",
        bullets: [
          "Develop a sensor-integrated training dummy",
          "Implement wearable motion tracking system",
          "Provide real-time visual, audio, and haptic feedback",
          "Analyze strike accuracy and timing",
          "Support consistent and repeatable training sessions"
        ],
        image: "/assets/arnisense/objectives.jpg"
      },
      {
        title: "System Architecture",
        content: "The system captures strike and motion data using sensors, processes it through a Raspberry Pi, and provides real-time feedback based on performance evaluation.",
        bullets: [
          "Sensors detect impact and movement",
          "Arduino handles sensor input",
          "Raspberry Pi processes data",
          "Feedback is delivered instantly to the user"
        ],
        image: "/assets/arnisense/architecture.png"
      },
      {
        title: "Hardware Components",
        content: "A carefully selected suite of hardware components ensures high-speed data acquisition and reliable feedback.",
        bullets: [
          "Raspberry Pi 4 (main controller)",
          "Arduino Uno/Nano (sensor interface)",
          "MPU-6050 IMU (motion tracking)",
          "Push-button sensors (impact detection)",
          "WS2812B LED strips (visual feedback)",
          "Vibration motors (haptic feedback)",
          "HC-05 Bluetooth module (communication)"
        ],
        image: "/assets/arnisense/hardware.jpg"
      },
      {
        title: "Software Stack",
        content: "The software logic is optimized for low-latency processing to ensure that feedback is meaningful.",
        bullets: [
          "Python (system logic)",
          "Pygame (user interface)",
          "Serial communication (Arduino ↔ Raspberry Pi)",
          "Bluetooth integration for wireless communication"
        ],
        image: "/assets/arnisense/software.jpg"
      },
      {
        title: "Key Features",
        content: "ArniSense provides a comprehensive feature set for both novice and advanced practitioners.",
        bullets: [
          "Real-time strike detection and scoring",
          "Motion tracking using wearable sensors",
          "Multi-feedback system (LED, sound, vibration)",
          "Gamified training modes",
          "Performance monitoring during sessions"
        ],
        image: "/assets/arnisense/features.jpg"
      },
      {
        title: "System Interface",
        content: "The system provides a real-time interface showing score, timing, and performance metrics, allowing users to monitor their training sessions and adjust their techniques.",
        image: "/assets/arnisense/ui.jpg"
      },
      {
        title: "Development Process",
        content: "The engineering cycle focused on precision and hardware durability.",
        bullets: [
          "Hardware and software unit testing",
          "Sensor integration and calibration",
          "System-level testing in training scenarios",
          "Iteration based on actual usage and feedback"
        ],
        image: "/assets/arnisense/testing.jpg"
      }
    ]
  },
  {
    title: "EPM4: PASSWORD VAULT",
    subtitle: "Secure Credential Management System",
    desc: "A centralized password management system developed to replace manual credential handling with a secure, role-based, and auditable solution for engineering environments.",
    longDesc: "EPM4 Password Vault is a desktop-based credential management system developed to centralize and secure password storage within the Test IT environment. It replaces manual and decentralized workflows with a structured, secure, and efficient system.",
    tags: ["C#", ".NET", "SQL Server", "Security", "RBAC"],
    color: "text-kurz-indigo",
    bg: "bg-kurz-indigo",
    icon: ShieldCheck,
    gallery: [],
    features: ["RBAC Implementation", "SQL Encryption", "Audit Logs"],
    sections: [
      {
        title: "Overview",
        content: "EPM4 Password Vault is a desktop-based credential management system developed to centralize and secure password storage within the Test IT environment. It replaces manual and decentralized workflows with a structured, secure, and efficient system.",
        image: "/assets/epm/overview.jpg"
      },
      {
        title: "Problem",
        content: "The previous password handling process was manual and decentralized, leading to inefficiencies and security risks.",
        bullets: [
          "Passwords stored in scattered locations",
          "Time-consuming retrieval process",
          "High risk of unauthorized access",
          "Lack of tracking and accountability",
          "Dependence on manual documentation"
        ],
        image: "/assets/epm/problem.jpg"
      },
      {
        title: "Solution",
        content: "EPM4 introduces a centralized password vault system with controlled access, secure storage, and full activity tracking.",
        bullets: [
          "Centralized password storage",
          "Role-Based Access Control (RBAC)",
          "Department-based access isolation",
          "Secure password reveal and usage",
          "Automated activity logging"
        ],
        image: "/assets/epm/solution.jpg"
      },
      {
        title: "System Workflow",
        content: "The system simplifies password management into a structured workflow for secure and efficient usage.",
        bullets: [
          "User login authentication",
          "Search or filter stored credentials",
          "Secure reveal or copy password",
          "Activity logging for every action"
        ],
        image: "/assets/epm/workflow.png"
      },
      {
        title: "Core Security Features",
        content: "",
        bullets: [
          "Encrypted password storage",
          "Role-Based Access Control (RBAC)",
          "Department-level isolation",
          "Comprehensive audit logs",
          "Auto-timeout for inactivity"
        ],
        image: "/assets/epm/security.jpg"
      },
      {
        title: "Password Management Features",
        content: "",
        bullets: [
          "Centralized vault system",
          "Smart categorization of credentials",
          "Password strength indicator",
          "Secure reveal and copy functionality"
        ],
        image: "/assets/epm/features.jpg"
      },
      {
        title: "User Administration",
        content: "",
        bullets: [
          "User management system",
          "Approval-based access control",
          "Flexible sharing permissions",
          "Ownership protection of credentials"
        ],
        image: "/assets/epm/admin.jpg"
      },
      {
        title: "System Interface",
        content: "The application provides a structured interface for managing credentials, including dashboard, search functionality, and secure viewing windows.",
        bullets: [
          "Login and registration system",
          "Main vault dashboard",
          "Add/Edit credential entries",
          "Secure password viewer",
          "Audit logs interface"
        ],
        image: "/assets/epm/ui.jpg"
      },
      {
        title: "Technology Stack",
        content: "",
        bullets: [
          ".NET Framework 4.0 (desktop application)",
          "C# (application logic)",
          "SQL Server (database management)",
          "SSMS for database administration"
        ],
        image: "/assets/epm/stack.jpg"
      },
      {
        title: "Build & Testing",
        content: "",
        bullets: [
          "Prototype development and iteration",
          "System migration from initial version",
          "74 structured test cases executed",
          "Functional validation of all modules",
          "Documentation and user manual creation"
        ],
        image: "/assets/epm/testing.jpg"
      }
    ]
  },
  {
    title: "ESP32 HOME AUTOMATION",
    subtitle: "Web-Based Smart Control System",
    desc: "A miniature home automation system using ESP32 that allows wireless control of appliances through a web-based interface.",
    longDesc: "This project is a miniature home automation system built using ESP32, designed to control electrical devices wirelessly through a web interface. It demonstrates how embedded systems and networking can be combined to create simple smart home solutions.",
    tags: ["ESP32", "IoT", "Embedded Systems", "Web Control", "WiFi"],
    color: "text-kurz-green",
    bg: "bg-kurz-green",
    icon: Microchip,
    sections: [
      {
        title: "Overview",
        content: "This project is a miniature home automation system built using ESP32, designed to control electrical devices wirelessly through a web interface. It demonstrates how embedded systems and networking can be combined to create simple smart home solutions.",
        image: "/assets/homeauto/overview.jpg"
      },
      {
        title: "Problem",
        content: "Traditional electrical systems require manual switching and lack remote accessibility.",
        bullets: [
          "No remote control of appliances",
          "Limited automation in basic setups",
          "Lack of centralized control system",
          "Inconvenience in managing multiple devices"
        ],
        image: "/assets/homeauto/problem.jpg"
      },
      {
        title: "Objectives",
        content: "The project aimed to provide a seamless bridge between a local web server and physical electrical relays.",
        bullets: [
          "Develop a wireless control system using ESP32",
          "Create a web-based interface for device control",
          "Enable real-time ON/OFF switching of appliances",
          "Implement stable WiFi communication",
          "Demonstrate a functional smart home prototype"
        ],
        image: "/assets/homeauto/objectives.jpg"
      },
      {
        title: "System Architecture",
        content: "The ESP32 acts as a web server, allowing users to connect through a browser and control connected devices over a local WiFi network.",
        bullets: [
          "User connects via browser",
          "ESP32 hosts web interface",
          "Commands sent over WiFi",
          "ESP32 controls relays/output devices"
        ],
        image: "/assets/homeauto/architecture.png"
      },
      {
        title: "Hardware Components",
        content: "Selected components were integrated into a modular layout for easy maintenance.",
        bullets: [
          "ESP32 microcontroller",
          "Relay module (for appliance control)",
          "Power supply module",
          "Wiring and load connections",
          "Prototype board / miniature house model"
        ],
        image: "/assets/homeauto/hardware.jpg"
      },
      {
        title: "Software & Communication",
        content: "The code utilizes efficient HTTP handling to minimize latency in device response.",
        bullets: [
          "Embedded C / Arduino IDE",
          "ESP32 WiFi library",
          "HTTP web server implementation",
          "HTML/CSS interface for control panel",
          "Client-server communication over local network"
        ],
        image: "/assets/homeauto/software.jpg"
      },
      {
        title: "System Features",
        content: "The interface is designed to be zero-config, working on any device within the same network.",
        bullets: [
          "Wireless control via web browser",
          "Real-time device switching",
          "Multiple device control interface",
          "No external app required",
          "Local network-based communication"
        ],
        image: "/assets/homeauto/features.jpg"
      },
      {
        title: "User Interface",
        content: "The system provides a simple web dashboard where users can control connected devices using buttons or toggles in real time.",
        image: "/assets/homeauto/ui.jpg"
      },
      {
        title: "Build & Testing",
        content: "Rigorous testing focused on WiFi stability and relay transition relay times.",
        bullets: [
          "ESP32 setup and programming",
          "Relay integration and wiring validation",
          "WiFi connectivity testing",
          "Web interface debugging",
          "Functional testing of device switching"
        ],
        image: "/assets/homeauto/testing.jpg"
      }
    ]
  },
  {
    title: "AUTOCAB RFID SYSTEM",
    subtitle: "RFID-Based Shuttle Service Logging System",
    desc: "An automated RFID-based logging system designed to replace manual shuttle service tracking with a real-time, efficient, and secure data management solution for transportation cooperatives.",
    longDesc: "AutoCAB is an RFID-based shuttle service logging system that automates vehicle entry and exit tracking within a subdivision. It integrates hardware and a web-based system to provide real-time monitoring, accurate data recording, and centralized management.",
    tags: ["Arduino", "RFID", "ESP8266", "IoT", "Web System", "Embedded Systems"],
    color: "text-kurz-blue",
    bg: "bg-kurz-blue",
    icon: Bus,
    sections: [
      {
        title: "Overview",
        content: "AutoCAB is an RFID-based shuttle service logging system that automates vehicle entry and exit tracking within a subdivision. It integrates hardware and a web-based system to provide real-time monitoring, accurate data recording, and centralized management.",
        image: "/assets/autocab/overview.jpg"
      },
      {
        title: "Problem",
        content: "The existing logging system relies on manual recording, which leads to inefficiencies and inaccuracies.",
        bullets: [
          "Manual logging is time-consuming",
          "High probability of human error",
          "Lack of real-time monitoring",
          "Difficult data retrieval and tracking",
          "No centralized database system"
        ],
        image: "/assets/autocab/problem.jpg"
      },
      {
        title: "Solution",
        content: "AutoCAB introduces an automated RFID-based logging system integrated with a web database for real-time monitoring and data management.",
        bullets: [
          "Automated vehicle identification using RFID",
          "Real-time data transmission to server",
          "Centralized web-based database",
          "Reduced human intervention",
          "Improved accuracy and efficiency"
        ],
        image: "/assets/autocab/solution.jpg"
      },
      {
        title: "System Workflow",
        content: "The system follows a structured process from RFID detection to data storage and monitoring.",
        bullets: [
          "RFID tag scanning via UHF reader",
          "Data transmission to microcontroller",
          "Signal conversion using RS232 Shield",
          "Processing via Arduino UNO",
          "Upload to web server through ESP8266",
          "Storage in centralized database"
        ],
        image: "/assets/autocab/workflow.png"
      },
      {
        title: "Core Hardware Components",
        content: "Key components chosen for durability and communication stability.",
        bullets: [
          "UHF RFID Tag (vehicle identification)",
          "UHF RFID Reader (data acquisition)",
          "Arduino UNO R3 (main controller)",
          "ESP8266 Wi-Fi Module (connectivity)",
          "RS232 Shield (signal conversion)",
          "S-60-12 Power Supply (power management)"
        ],
        image: "/assets/autocab/hardware.jpg"
      },
      {
        title: "System Architecture",
        content: "The system integrates hardware and software components to ensure seamless data flow from detection to storage.",
        bullets: [
          "RFID-based identification layer",
          "Microcontroller processing unit",
          "Wireless communication module",
          "Web-based server and database",
          "User interface for monitoring"
        ],
        image: "/assets/autocab/architecture.jpg"
      },
      {
        title: "Data Flow Process",
        content: "The system processes data dynamically depending on connectivity and system conditions.",
        bullets: [
          "RFID tag detection and UID transmission",
          "Data validation and processing in MCU",
          "Online mode: upload to server",
          "Offline mode: local data storage",
          "Auto-retry for failed uploads",
          "Periodic system cleanup and maintenance"
        ],
        image: "/assets/autocab/dataflow.jpg"
      },
      {
        title: "Web System Features",
        content: "The AutoCAB system includes a web-based platform for monitoring and management.",
        bullets: [
          "User authentication (login/register)",
          "Dashboard overview of system data",
          "Logs tracking (Time In/Out, Driver, Passengers)",
          "Fuel consumption monitoring",
          "Graphical data visualization",
          "Settings and account management"
        ],
        image: "/assets/autocab/web.jpg"
      },
      {
        title: "User Interface",
        content: "The web interface provides an intuitive and structured platform for users to manage shuttle data.",
        bullets: [
          "Login and authentication system",
          "Dashboard with navigation modules",
          "Logs and records management",
          "Graph and analytics visualization",
          "User settings and account control"
        ],
        image: "/assets/autocab/ui.jpg"
      },
      {
        title: "Build & Development",
        content: "Integration phase involve schematic design and 3D fabrication.",
        bullets: [
          "Hardware integration and prototyping",
          "3D model design and fabrication",
          "System schematic and circuit design",
          "Web system development",
          "Database integration and testing"
        ],
        image: "/assets/autocab/build.jpg"
      },
      {
        title: "Testing & Evaluation",
        content: "Rigorous evaluation using statistical methods ensured system reliability.",
        bullets: [
          "Pre-test and post-test experimental design",
          "Control vs RFID-based system comparison",
          "Efficiency and accuracy measurement",
          "Statistical analysis using T-test and ANOVA",
          "Validation using 95% confidence level (p < 0.05)"
        ],
        image: "/assets/autocab/testing.jpg"
      },
      {
        title: "System Development Lifecycle",
        content: "The project follows a structured SDLC Waterfall Model to ensure organized development and deployment.",
        bullets: [
          "Planning and problem identification",
          "System analysis and requirements definition",
          "Design of hardware and software architecture",
          "Implementation and coding",
          "Testing and validation",
          "Maintenance and system improvements"
        ],
        image: "/assets/autocab/sdlc.jpg"
      }
    ],
    features: ["RFID Integration", "Web Dashboard", "Real-time Logging"]
  },
  {
    title: "OSAS SECURITY SYSTEM",
    subtitle: "Object Storage with Automated Security and Locking Mechanism",
    desc: "A smart object storage security system designed to protect personal items using multi-layer authentication, sensor-based detection, and automated locking mechanisms.",
    longDesc: "OSAS (Object Security Automated System) is a hardware-based security solution that integrates password authentication, environmental sensing, and automated locking. It is designed to secure stored items and detect unauthorized access attempts.",
    tags: ["Arduino", "Embedded Systems", "Sensors", "Security", "Automation"],
    color: "text-kurz-red",
    bg: "bg-kurz-red",
    icon: Lock,
    sections: [
      {
        title: "Overview",
        content: "OSAS (Object Security Automated System) is a hardware-based security solution that integrates password authentication, environmental sensing, and automated locking. It is designed to secure stored items and detect unauthorized access attempts.",
        image: "/assets/osas/overview.jpg"
      },
      {
        title: "Problem",
        content: "Traditional storage systems lack intelligent security features and real-time protection mechanisms.",
        bullets: [
          "No authentication system for access control",
          "Vulnerable to unauthorized access",
          "No alert or intrusion detection system",
          "Manual locking mechanisms only",
          "Lack of compact and integrated design"
        ],
        image: "/assets/osas/problem.jpg"
      },
      {
        title: "Solution",
        content: "OSAS introduces a layered security system combining password authentication, sensors, alarms, and automated locking.",
        bullets: [
          "Keypad-based password authentication",
          "Ultrasonic sensor for intrusion detection",
          "LDR sensor for light-based tampering detection",
          "Buzzer for alert system",
          "Servo motor for automated locking mechanism"
        ],
        image: "/assets/osas/solution.jpg"
      },
      {
        title: "System Workflow",
        content: "The system follows a secure interaction flow for both authorized and unauthorized access attempts.",
        bullets: [
          "User inputs password via keypad",
          "System verifies credentials",
          "If correct → unlock via servo motor",
          "If incorrect → trigger alarm system",
          "Sensors monitor environment for intrusion",
          "Alerts activated on suspicious activity"
        ],
        image: "/assets/osas/workflow.png"
      },
      {
        title: "Version 1 – Prototype Security System",
        content: "The first version focuses on core functionality and security features with a visible and modular setup.",
        bullets: [
          "4-pin password authentication system",
          "LCD display for user interface feedback",
          "Basic servo motor locking mechanism",
          "Ultrasonic and LDR sensors for detection",
          "Audible alarm system using buzzer",
          "External deterrent mechanism for security alerts"
        ],
        image: "/assets/osas/v1.jpg"
      },
      {
        title: "Version 2 – Compact Automated System",
        content: "The second version improves the system with a more compact design, better integration, and enhanced automation.",
        bullets: [
          "Compact and optimized hardware layout",
          "Improved locking mechanism design",
          "Auto-locking feature after access",
          "More efficient wiring and enclosure",
          "Enhanced reliability and responsiveness",
          "Cleaner and more user-friendly build"
        ],
        image: "/assets/osas/v2.jpg"
      },
      {
        title: "Core Components",
        content: "Embedded hardware components chosen for small footprint and reliability.",
        bullets: [
          "Arduino Microcontroller",
          "4x4 Keypad (password input)",
          "LCD Display (user interface)",
          "Ultrasonic Sensor (distance detection)",
          "LDR Sensor (light detection)",
          "Servo Motor (locking system)",
          "Buzzer (alarm system)"
        ],
        image: "/assets/osas/components.jpg"
      },
      {
        title: "Key Features",
        content: " Layered security ensuring high levels of protection for stored valuables.",
        bullets: [
          "Multi-layer authentication system",
          "Real-time intrusion detection",
          "Automated locking and unlocking",
          "Visual feedback via LCD display",
          "Audio alert system",
          "Compact embedded design (Version 2)"
        ],
        image: "/assets/osas/features.jpg"
      },
      {
        title: "Build & Development",
        content: "Iterative development process from breadboard to finalized enclosure.",
        bullets: [
          "Initial breadboard prototyping",
          "Sensor integration and calibration",
          "Password logic implementation",
          "Servo motor control development",
          "System refinement and compact redesign",
          "Final enclosure and hardware optimization"
        ],
        image: "/assets/osas/build.jpg"
      },
      {
        title: "Improvements Across Versions",
        content: "Evolution of the project over time focusing on user experience and form factor.",
        bullets: [
          "From bulky prototype → compact system",
          "From manual locking → automated locking",
          "Improved wiring and stability",
          "Better response time and reliability",
          "Cleaner and more professional design"
        ],
        image: "/assets/osas/improvements.jpg"
      }
    ],
    features: ["Keypad Security", "Intrusion Sensors", "Auto-Lock Servo"]
  },
  {
    title: "SUMOBOT",
    subtitle: "Autonomous Mini Sumo Robot",
    desc: "A compact autonomous robot designed to detect and push opponents out of the ring using basic sensors and embedded control logic.",
    longDesc: "This project is a mini sumobot built for robotics competitions. It uses basic sensors and programmed logic to detect opponents and execute pushing strategies within a sumo ring.",
    tags: ["Arduino", "Robotics", "Embedded Systems", "Electronics"],
    color: "text-kurz-pink",
    bg: "bg-kurz-pink",
    icon: Zap,
    sections: [
      {
        title: "Overview",
        content: "This project is a mini sumobot built for robotics competitions. It uses basic sensors and programmed logic to detect opponents and execute pushing strategies within a sumo ring.",
        image: "/assets/sumobot/overview.jpg"
      },
      {
        title: "Objective",
        content: "",
        bullets: [
          "Build a functional autonomous sumobot",
          "Implement basic opponent detection",
          "Control movement using motor drivers",
          "Design a stable and compact chassis"
        ],
        image: "/assets/sumobot/objective.jpg"
      },
      {
        title: "System Setup",
        content: "The robot uses sensors to detect opponents and a microcontroller to process inputs and control movement through motor drivers.",
        bullets: [
          "Ultrasonic sensor for distance detection",
          "Motor drivers for wheel control",
          "Microcontroller for decision logic",
          "Battery-powered system"
        ],
        image: "/assets/sumobot/setup.jpg"
      },
      {
        title: "Key Features",
        content: "",
        bullets: [
          "Autonomous movement",
          "Opponent detection using sensors",
          "Basic attack and search behavior",
          "Compact and durable design"
        ],
        image: "/assets/sumobot/features.jpg"
      },
      {
        title: "Mechanical Design",
        content: "The robot features a custom-designed chassis focused on balance and stability during movement and pushing.",
        bullets: [
          "Low-profile structure",
          "Custom casing design",
          "Balanced weight distribution"
        ],
        image: "/assets/sumobot/design.jpg"
      },
      {
        title: "Testing",
        content: "",
        bullets: [
          "Movement and control testing",
          "Sensor response validation",
          "Basic match simulation"
        ],
        image: "/assets/sumobot/testing.jpg"
      }
    ],
    features: ["Autonomous movement", "Opponent detection", "Compact Design"]
  },
  {
    title: "PCB PROJECTS",
    subtitle: "Power Supply & Relay Module Design",
    desc: "Custom PCB designs including a regulated 9V power supply and a relay module, developed from schematic design to fabrication and testing.",
    longDesc: "This project involves the design and fabrication of functional PCBs, including a regulated 9V power supply and a relay module. The work covers the full development process from circuit design to physical board testing.",
    tags: ["PCB Design", "Electronics", "KiCad", "Power Supply", "Hardware"],
    color: "text-kurz-orange",
    bg: "bg-kurz-orange",
    icon: Layers,
    sections: [
      {
        title: "Overview",
        content: "This project involves the design and fabrication of functional PCBs, including a regulated 9V power supply and a relay module. The work covers the full development process from circuit design to physical board testing.",
        image: "/assets/pcb/overview.jpg"
      },
      {
        title: "9V Power Supply Board",
        content: "A compact power supply circuit designed to convert AC input into a stable and adjustable DC output.",
        image: "/assets/pcb/psu_overview.jpg"
      },
      {
        title: "Circuit Design",
        content: "",
        bullets: [
          "AC input from 220V source",
          "Step-down transformer (AC to low-voltage AC)",
          "Bridge rectifier for AC to DC conversion",
          "Capacitor filtering for ripple reduction",
          "Voltage regulator for stable output",
          "Potentiometer for adjustable 0–9V output"
        ],
        image: "/assets/pcb/psu_schematic.png"
      },
      {
        title: "System Flow",
        content: "The circuit follows a standard power conversion process from AC input to regulated DC output.",
        image: "/assets/pcb/psu_flow.png"
      },
      {
        title: "PCB Layout",
        content: "The board was designed in a compact 2x2 inch layout, focusing on proper component placement and clean routing.",
        bullets: [
          "Compact 2x2 inch PCB design",
          "Optimized trace routing",
          "Proper grounding considerations",
          "Component spacing for heat and safety"
        ],
        image: "/assets/pcb/psu_layout.png"
      },
      {
        title: "Testing",
        content: "",
        bullets: [
          "Voltage output verification",
          "Adjustment testing (0–9V range)",
          "Ripple and stability checking",
          "Load testing"
        ],
        image: "/assets/pcb/psu_testing.jpg"
      },
      {
        title: "Relay Module Board",
        content: "A compact relay module designed to control external loads with visual LED indication for each channel.",
        image: "/assets/pcb/relay_overview.jpg"
      },
      {
        title: "Circuit Design",
        content: "",
        bullets: [
          "Relay switching circuit",
          "Transistor-based control",
          "Flyback diode protection",
          "LED indicators for relay status"
        ],
        image: "/assets/pcb/relay_schematic.png"
      },
      {
        title: "PCB Layout",
        content: "The relay module was designed in a 1x2 inch PCB format, optimized for compact control applications.",
        bullets: [
          "Compact 1x2 inch design",
          "Clear separation of control and load paths",
          "Indicator LED placement",
          "Simple and clean routing"
        ],
        image: "/assets/pcb/relay_layout.png"
      },
      {
        title: "Key Features",
        content: "",
        bullets: [
          "Relay-based load control",
          "LED status indication",
          "Compact PCB form factor",
          "Reliable switching operation"
        ],
        image: "/assets/pcb/relay_features.jpg"
      },
      {
        title: "Testing",
        content: "",
        bullets: [
          "Relay switching validation",
          "LED indicator functionality",
          "Load testing with external devices"
        ],
        image: "/assets/pcb/relay_testing.jpg"
      }
    ],
    features: ["Regulated DC Output", "Relay Switching", "Compact Layout"]
  },
  {
    title: "PIXELATED CATS",
    subtitle: "Web Design Experiment",
    desc: "A playful, cat-themed website developed during an internship at the City Government of Carmona to experiment with various web design elements.",
    longDesc: "Pixelated Cats was my first foray into the world of web design, created while interning at the City Government of Carmona. Built using Elementor, this project served as a creative playground to experiment with typography, layout, and interactive elements—all wrapped in a charming pixel-art cat aesthetic. It marks the beginning of my journey in creating digital experiences that are both functional and visually engaging.",
    tags: ["Web Design", "Elementor", "WordPress", "Internship", "UI/UX"],
    color: "text-kurz-yellow",
    bg: "bg-kurz-yellow",
    icon: Globe,
    externalUrl: "http://olliesvault.page.gd",
    sections: [
      {
        title: "Overview",
        content: "An experimental web project exploring the boundaries of visual design using WordPress and Elementor. The site features a curated set of interactive components themed around pixelated cat art.",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Internship Context",
        content: "Developed during my internship at the City Government of Carmona as a study in modern web design trends and user engagement through thematic consistency.",
        bullets: [
          "Explored drag-and-drop design builders",
          "Implemented responsive layout principles",
          "Focused on thematic asset consistency",
          "Co-developed within a government IT environment"
        ],
        image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&q=80&w=800"
      }
    ],
    features: ["Thematic Web Design", "Elementor Integration", "Interactive UX"]
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
                {/* Intro Section */}
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-2 h-10 ${project.bg} rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]`} />
                    <h3 className="text-2xl font-bold font-display uppercase tracking-widest text-kurz-yellow">Technical Brief</h3>
                  </div>
                  <p className="text-xl text-slate-300 leading-relaxed font-medium mb-8">
                    {project.longDesc}
                  </p>
                  
                  {project.videoUrl && (
                    <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl mb-8">
                      <iframe 
                        className="w-full h-full"
                        src={project.videoUrl}
                        title={`${project.title} Video Showcase`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </section>

                {/* Project Sections */}
                {project.sections && project.sections.length > 0 && (
                  project.sections.map((section, sidx) => (
                    <section key={sidx} className="space-y-8">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-white/20 rounded-full" />
                        <h3 className="text-xl font-bold font-display uppercase tracking-widest text-white/80">{section.title}</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-6">
                          {section.content && (
                            <p className="text-slate-300 leading-relaxed">{section.content}</p>
                          )}
                          {section.bullets && (
                            <ul className="space-y-3">
                              {section.bullets.map((bullet, bidx) => (
                                <li key={bidx} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-kurz-yellow mt-1.5 shrink-0 opacity-50" />
                                  <span className="text-sm text-slate-400">{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {section.image && (
                          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-xl group">
                            <img src={section.image} alt={section.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        )}
                      </div>
                    </section>
                  ))
                )}

                {/* Gallery Subsection (Legacy support) */}
                {(!project.sections || project.sections.length === 0) && (
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
                )}
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

                {project.externalUrl ? (
                  <a 
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-3 p-6 rounded-2xl ${project.bg} text-space-void font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-kurz-yellow/5 group`}
                  >
                    VISIT WEBSITE <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                ) : (
                  <a 
                    href="#" 
                    className={`flex items-center justify-center gap-3 p-6 rounded-2xl ${project.bg} text-space-void font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-kurz-yellow/5 group opacity-50 cursor-not-allowed`}
                    onClick={(e) => e.preventDefault()}
                  >
                    SOURCE REPOSITORY <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                )}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Nav = ({ activeSection }: { activeSection: string }) => (
  <motion.nav 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-transparent"
  >
    <div className="flex items-center gap-3">
      <OlliesVaultLogo />
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex items-center gap-8 px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-white relative">
        <LayoutGroup id="nav">
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About" },
            { id: "projects", label: "Projects" },
            { id: "experience", label: "Experience" },
          ].map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              className={`text-xs font-bold uppercase tracking-widest relative px-1 py-1 transition-colors ${activeSection === item.id ? 'text-kurz-yellow' : 'hover:text-kurz-yellow/80'}`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-kurz-yellow rounded-full shadow-[0_0_10px_#facc15]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a href="#contact" className={`text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full transition-all hover:scale-105 ${activeSection === 'contact' ? 'bg-kurz-yellow text-space-void' : 'bg-white text-space-void'}`}>Contact</a>
        </LayoutGroup>
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
  const [activeSection, setActiveSection] = useState("home");
  
  // Profile Scroll Animation
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const profileImgOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const cpuIconOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0.3, 0]);
  const cpuScale = useTransform(scrollYProgress, [0.3, 0.5], [1, 0.8]);

  // Intersection Observer for Active Section
  useEffect(() => {
    const sections = ["home", "about", "projects", "experience", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-kurz-yellow selection:text-space-void font-sans">
      <ParallaxBackground />
      <Nav activeSection={activeSection} />
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
          className="max-w-6xl flex flex-col items-center"
        >
          <div className="inline-block bg-kurz-indigo/50 border border-kurz-indigo/30 text-indigo-100 px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wider mb-12">
            Computer Engineering Projects
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 mb-10">
            <div className="shrink-0">
              <OlliesVaultLogo size="2xl" hideText={true} />
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black leading-[0.8] tracking-tighter uppercase text-white text-center md:text-left">
              Ollie's <br />
              <span className="text-kurz-yellow">VAULT</span>
            </h1>
          </div>
          
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
            <a 
              href="/resume.pdf" 
              download="Ollie_Solis_Resume.pdf"
              className="btn-3d-indigo tracking-widest uppercase text-sm flex items-center gap-2 text-white no-underline"
            >
              Resume <Download size={18} />
            </a>
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
                className="absolute inset-0 z-10 text-white flex flex-col items-center justify-center"
              >
                 <CpuIcon size={120} className="opacity-20 translate-y-4" />
                 <span className="font-mono text-[8px] tracking-[0.4em] opacity-30 mt-4">CORE_AUTH_REQ</span>
              </motion.div>

              {/* Layer 2: Profile Picture (Fades In) */}
              <motion.div
                style={{ opacity: profileImgOpacity }}
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
                color: "kurz-yellow" 
              },
              { 
                category: "Hardware", 
                skills: "Embedded Systems, PCB Design (Altium/KiCad), Sensors", 
                icon: Microchip, 
                color: "kurz-cyan" 
              },
              { 
                category: "Engineering Tools", 
                skills: "Visual Studio, GitHub, AutoCAD, SSMS, MS Office", 
                icon: Terminal, 
                color: "kurz-green" 
              },
              { 
                category: "Networking & Others", 
                skills: "Cisco Basics, QGIS Mapping, Cybersecurity", 
                icon: Globe, 
                color: "kurz-blue" 
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
      <section id="experience" className="py-32 px-6 bg-white/[0.02]">
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
