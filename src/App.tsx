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
const profilePic = "assets/profile.png"; // Place your profile.png in the 'public' folder 

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
  images?: string[];
  videoUrl?: string;
  videoUrls?: string[];
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
          <div className="relative w-full h-full flex items-center justify-center">
            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            {/* 80% Opacity color overlay that disappears on hover */}
            <div className={`absolute inset-0 ${project.bg} opacity-80 group-hover:opacity-0 transition-opacity duration-500`} />
            {/* Icon kept on top, fully visible */}
            <div className="relative z-10 text-white opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none">
              <project.icon size={64} className="drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]" />
            </div>
          </div>
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
    gallery: ["assets/arnisense/overview.jpg", "assets/arnisense/system.jpg", "assets/arnisense/hardware1.jpg", "assets/arnisense/software1.jpg", "assets/arnisense/testing.jpg", "assets/arnisense/testing2.jpg"],
    features: ["Motion & Impact integration", "Raspberry Pi processing", "Python performance UI"],
    videoUrl: "https://drive.google.com/file/d/1WKlFyYLxQKgMl9-jRXXyVaLRSJUkyl4r/preview",
    image: "assets/arnisense/overview.jpg",
    sections: [
      {
        title: "Overview",
        content: "ARNISENSE is a training system designed to improve Arnis performance using real-time sensor feedback. It combines a sensor-equipped dummy and wearable devices to track strike accuracy, timing, and movement, turning traditional training into measurable performance data.",
        image: "assets/arnisense/overview.jpg",
        images: ["assets/arnisense/system.jpg"],
        videoUrl: "https://drive.google.com/file/d/1WKlFyYLxQKgMl9-jRXXyVaLRSJUkyl4r/preview"
      },
      {
        title: "Problem",
        content: "Traditional Arnis training relies on observation and subjective feedback, making it difficult to measure performance consistently.",
        bullets: [
          "No objective measurement of strike accuracy",
          "Limited feedback during solo training",
          "Difficult to track improvement over time"
        ],
        image: "assets/arnisense/problem.jpg"
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
        image: "assets/arnisense/system.jpg"
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
        image: "assets/arnisense/systemarhi.jpg"
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
        images: ["assets/arnisense/hardware1.jpg", "assets/arnisense/hardware2.jpg", "assets/arnisense/hardwaredev.jpg"]
      },
      {
        title: "Software Stack",
        content: "The software logic is optimized for low-latency processing to ensure that feedback is meaningful.",
        bullets: [
          "Python (system logic)",
          "PySide6 (Qt for Python)",
          "Serial communication (Arduino ↔ Raspberry Pi)",
          "Bluetooth integration for wireless communication"
        ],
        images: ["assets/arnisense/software.jpg", "assets/arnisense/software1.jpg", "assets/arnisense/software2.jpg"]
      },
      {
        title: "Key Features",
        content: "ArniSense provides a comprehensive feature set for both novice and advanced practitioners.",
        bullets: [
          "Real-time strike detection and scoring",
          "Motion tracking using wearable sensors",
          "Live impact force meter",
          "Timing and cadence tracking",
          "Performance monitoring during sessions"
        ],
        image: "assets/arnisense/features.jpg"
      },
      {
        title: "System Interface",
        content: "The system provides a real-time interface showing score, timing, and performance metrics, allowing users to monitor their training sessions and adjust their techniques.",
        image: "assets/arnisense/system.jpg",
        images: ["assets/arnisense/software.jpg"]
      },
      {
        title: "Development Process & Testing",
        content: "The engineering cycle focused on precision and hardware durability, validated through extensive field testing.",
        bullets: [
          "Hardware and software unit testing",
          "Sensor integration and calibration",
          "System-level testing in training scenarios",
          "Iteration based on actual usage and feedback"
        ],
        images: ["assets/arnisense/testing.jpg", "assets/arnisense/testing2.jpg"],
        videoUrls: [
          "https://drive.google.com/file/d/1WKlFyYLxQKgMl9-jRXXyVaLRSJUkyl4r/preview",
          "assets/arnisense/testing.mp4"
        ]
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
    image: "assets/epm/overview.jpg",
    gallery: ["assets/epm/maindashboard.JPG", "assets/epm/admincontrol.JPG", "assets/epm/loginandreg.JPG", "assets/epm/testingresults.JPG", "assets/epm/developmenttimeframe.JPG", "assets/epm/corefeatures.JPG", "assets/epm/workflow1.JPG"],
    features: ["RBAC Implementation", "SQL Encryption", "Audit Logs"],
    sections: [
      {
        title: "Overview",
        content: "EPM4 Password Vault is a desktop-based credential management system developed to centralize and secure password storage within the Test IT environment. It replaces manual and decentralized workflows with a structured, secure, and efficient system.",
        image: "assets/epm/overview.jpg",
        images: ["assets/epm/maindashboard.JPG"]
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
        image: "assets/epm/problem.JPG",
        images: ["assets/epm/before.JPG"]
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
        image: "assets/epm/after.JPG"
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
        image: "assets/epm/workflow1.JPG",
        images: ["assets/epm/workflow2.JPG", "assets/epm/workflow3.JPG"]
      },
      {
        title: "Core Security Features",
        content: "Implemented multi-layered security to ensure data integrity and confidentiality.",
        bullets: [
          "Encrypted password storage",
          "Role-Based Access Control (RBAC)",
          "Department-level isolation",
          "Comprehensive audit logs",
          "Auto-timeout for inactivity"
        ],
        image: "assets/epm/corefeatures.JPG"
      },
      {
        title: "Password Management Features",
        content: "Advanced management features for critical engineering credentials.",
        bullets: [
          "Centralized vault system",
          "Smart categorization of credentials",
          "Password strength indicator",
          "Secure reveal and copy functionality"
        ],
        image: "assets/epm/passwordmanagement.JPG"
      },
      {
        title: "User Administration",
        content: "Granular control over user permissions and access levels.",
        bullets: [
          "User management system",
          "Approval-based access control",
          "Flexible sharing permissions",
          "Ownership protection of credentials"
        ],
        image: "assets/epm/admincontrol.JPG"
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
        image: "assets/epm/maindashboard.JPG",
        images: ["assets/epm/loginandreg.JPG", "assets/epm/testingresults.JPG"]
      },
      {
        title: "Technology Stack",
        content: "Built on a stable foundation for corporate and engineering use.",
        bullets: [
          ".NET Framework 4.0 (desktop application)",
          "C# (application logic)",
          "SQL Server (database management)",
          "SSMS for database administration"
        ],
        image: "assets/epm/stack.jpg",
        images: ["assets/epm/techstack1.jpg", "assets/epm/techstack2.jpg", "assets/epm/techstack3.jpg"]
      },
      {
        title: "Build & Testing",
        content: "Comprehensive validation phase with extensive test coverage.",
        bullets: [
          "Prototype development and iteration",
          "System migration from initial version",
          "74 structured test cases executed",
          "Functional validation of all modules",
          "Documentation and user manual creation"
        ],
        image: "assets/epm/developmenttimeframe.JPG",
        images: ["assets/epm/testingresults.JPG", "assets/epm/testingresults2.JPG"]
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
    image: "assets/homeauto/overview.jpg",
    gallery: ["assets/homeauto/finalproduct.JPG", "assets/homeauto/webinterface.JPG", "assets/homeauto/hardware1.JPG", "assets/homeauto/hardware2.JPG", "assets/homeauto/schematicdiagram.JPG"],
    sections: [
      {
        title: "Overview",
        content: "This project is a miniature home automation system built using ESP32, designed to control electrical devices wirelessly through a web interface. It demonstrates how embedded systems and networking can be combined to create simple smart home solutions.",
        image: "assets/homeauto/overview.jpg",
        images: ["assets/homeauto/finalproduct.JPG"],
        videoUrl: "assets/homeauto/demo.mp4"
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
        image: "assets/homeauto/problem.jpg"
      },
      {
        title: "Design & Process",
        content: "The development followed an Agile methodology, focusing on iterative prototyping and testing.",
        image: "assets/homeauto/agile.jpg",
        images: ["assets/homeauto/prototyping.jpg"]
      },
      {
        title: "3D Modeling & Design",
        content: "Detailed 3D models were created to visualize the final enclosure and hardware layout.",
        bullets: [
          "Enclosure design for component protection",
          "Space-optimized layout",
          "Prototyping using 3D modeling tools"
        ],
        image: "assets/homeauto/final3d.JPG",
        images: ["assets/homeauto/3dmodel.JPG", "assets/homeauto/3dmodel1.JPG", "assets/homeauto/3dmodel2.JPG", "assets/homeauto/3dmodel3.JPG"]
      },
      {
        title: "System Architecture",
        content: "The system integrates schematic precision with optimized data flow logic.",
        bullets: [
          "ESP32 acts as the central web server",
          "HTTP requests are processed in real-time",
          "Control signals are sent to relay modules",
          "Visual feedback provided through the web interface"
        ],
        image: "assets/homeauto/schematicdiagram.JPG",
        images: ["assets/homeauto/systemprocessflow.JPG"]
      },
      {
        title: "Hardware Integration",
        content: "Multiple hardware versions were built to test stability and reliability.",
        bullets: [
          "ESP32 Microcontroller",
          "5V Relay Modules",
          "Power Management Circuitry",
          "Miniature Housing Fabrication"
        ],
        image: "assets/homeauto/hardware1.JPG",
        images: ["assets/homeauto/hardware2.JPG", "assets/homeauto/hardware3.JPG", "assets/homeauto/hardware4.JPG", "assets/homeauto/hardware5.JPG", "assets/homeauto/hardware6.JPG", "assets/homeauto/hardware7.JPG"]
      },
      {
        title: "User Interface",
        content: "The system provides a simple web dashboard where users can control connected devices using buttons or toggles in real time.",
        image: "assets/homeauto/webinterface.JPG"
      }
    ]
  },
  {
    title: "AUTOCAB RFID SYSTEM",
    subtitle: "RFID Logging System & Project Proposal Documentation",
    desc: "An automated RFID-based logging system designed to replace manual shuttle service tracking with a real-time, efficient, and secure data management solution.",
    longDesc: "AutoCAB is an RFID-based shuttle service logging system that automates vehicle entry and exit tracking within a subdivision. This documentation serves as a comprehensive project proposal, detailing the technical architecture, hardware integration, and systematic workflow required for a centralized transportation management solution.",
    tags: ["Arduino", "RFID", "ESP8266", "IoT", "Web System", "Embedded Systems"],
    color: "text-kurz-blue",
    bg: "bg-kurz-blue",
    icon: Bus,
    image: "assets/autocab/overview.JPG",
    gallery: ["assets/autocab/overview.JPG", "assets/autocab/systemoverview.JPG", "assets/autocab/hw1.JPG", "assets/autocab/schematic.JPG", "assets/autocab/sdlc.JPG", "assets/autocab/3dmodel.JPG"],
    sections: [
      {
        title: "Overview",
        content: "AutoCAB integrates hardware and a web-based system to provide real-time monitoring and accurate data recording for shuttle services.",
        image: "assets/autocab/overview.JPG",
        images: ["assets/autocab/systemoverview.JPG"]
      },
      {
        title: "Problem",
        content: "The existing logging system relies on manual recording, which leads to inefficiencies and inaccuracies.",
        bullets: [
          "Manual logging is time-consuming",
          "High probability of human error",
          "Lack of real-time monitoring",
          "Difficult data retrieval and tracking"
        ],
        image: "assets/autocab/problem.jpg"
      },
      {
        title: "System Workflow",
        content: "The system follows a structured process from RFID detection to data storage and monitoring.",
        bullets: [
          "RFID tag detection and UID transmission",
          "Data validation and processing in MCU",
          "Wireless transmission via ESP8266",
          "Storage in centralized web database"
        ],
        image: "assets/autocab/systemflow.JPG",
        images: ["assets/autocab/userflowdiagram.JPG", "assets/autocab/userflowdiagram1.JPG"]
      },
      {
        title: "Core Hardware Components",
        content: "High-performance components selected for reliability in transportation environments.",
        bullets: [
          "UHF RFID Reader & Tags",
          "Arduino UNO R3 Controller",
          "ESP8266 Wi-Fi Module",
          "Custom 3D-Printed Enclosures",
          "Stable Power Management"
        ],
        image: "assets/autocab/hw1.JPG",
        images: ["assets/autocab/hw2.JPG", "assets/autocab/hw3.JPG", "assets/autocab/hw4.JPG", "assets/autocab/3dmodel.JPG"]
      },
      {
        title: "System Architecture",
        content: "A multi-layered architecture ensuring seamless data flow and high availability.",
        image: "assets/autocab/schematic.JPG",
        bullets: [
          "RFID Data Acquisition Layer",
          "Edge Processing Layer (Arduino)",
          "Cloud Connectivity Layer",
          "Web Management Portal"
        ]
      },
      {
        title: "System Development Lifecycle",
        content: "Developed using the Waterfall SDLC model to ensure rigorous planning and validation.",
        image: "assets/autocab/sdlc.JPG"
      },
      {
        title: "User Interface",
        content: "The web interface provides an intuitive platform for real-time monitoring and analytics.",
        image: "assets/autocab/ui.jpg"
      },
      {
        title: "Build & Development",
        content: "Hardware integration phase including physical prototype assembly and CAD modeling.",
        image: "assets/autocab/build.jpg"
      }
    ],
    features: ["RFID Integration", "Web Dashboard", "Real-time Logging"]
  },
  {
    title: "OSAS SECURITY SYSTEM",
    subtitle: "Object Storage with Automated Security and Locking Mechanism",
    desc: "A smart object storage security system designed to protect personal items using multi-layer authentication, sensor-based detection, and automated locking mechanisms.",
    longDesc: "OSAS (Object Security Automated System) is an advanced hardware-based security solution. This documentation traces the evolution of the system from a modular prototype to a compact, production-ready enclosure. It integrates keypad authentication, environmental sensing, and servo-actuated locking to ensure high-level security for stored valuables.",
    tags: ["Arduino", "Embedded Systems", "Sensors", "Security", "Automation"],
    color: "text-kurz-red",
    bg: "bg-kurz-red",
    icon: Lock,
    image: "assets/osas/overview.jpg",
    gallery: ["assets/osas/overview.jpg", "assets/osas/osasnew.jpg", "assets/osas/osasnew1.jpg", "assets/osas/oldosasoverview.jpg", "assets/osas/oldosasschematics.jpg", "assets/osas/newosasprototyping.jpg"],
    sections: [
      {
        title: "Overview",
        content: "OSAS (Object Security Automated System) provides a secure environment for stored items, combining physical barriers with digital authentication and sensory monitoring.",
        image: "assets/osas/overview.jpg",
        images: ["assets/osas/osasnew.jpg", "assets/osas/osasnew1.jpg"]
      },
      {
        title: "Version 1 – Modular Prototype",
        content: "The initial prototype was built to validate the core logic, featuring an externalized interface and a modular assembly for testing sensor responsiveness.",
        bullets: [
          "Password authentication via 4x4 keypad",
          "Visual status updates via character LCD",
          "Environmental monitoring for light and distance",
          "External alert system with high-frequency buzzer"
        ],
        image: "assets/osas/oldosasoverview.jpg",
        images: ["assets/osas/oldosasprototyping.jpg"],
        videoUrl: "assets/osas/oldosas.mp4"
      },
      {
        title: "System Architecture & Logic",
        content: "The system schematic defines the power distribution and signal routing between the microcontroller and the various security modules.",
        image: "assets/osas/oldosasschematics.jpg",
        bullets: [
          "Arduino-driven central processing",
          "Servo motor actuation logic",
          "Non-volatile memory for password storage",
          "Real-time sensor polling and interrupt handling"
        ]
      },
      {
        title: "Version 2 – Compact Integration",
        content: "The second iteration focused on miniaturization and durability, integrating the components into a singular, space-optimized enclosure.",
        bullets: [
          "All-in-one compact housing",
          "Improved wire management and soldering",
          "Sturdier deadbolt alignment",
          "Refined user interface layout"
        ],
        image: "assets/osas/osasnew.jpg",
        images: ["assets/osas/osasnew1.jpg"]
      },
      {
        title: "Prototyping & Build Process",
        content: "Continuous iteration allowed for the detection of mechanical stress points and the optimization of the locking mechanism's travel distance.",
        bullets: [
          "Breadboard validation for circuit paths",
          "Component mounting and stress testing",
          "Enclosure fabrication and finishing",
          "Firmware debugging for error handling"
        ],
        images: ["assets/osas/newosasprototyping.jpg", "assets/osas/newosasprototyping1.jpg"]
      }
    ],
    features: ["Keypad Security", "Intrusion Sensors", "Auto-Lock Servo"]
  },
  {
    title: "SUMOBOT",
    subtitle: "Autonomous Mini Sumo Robot",
    desc: "A compact autonomous robot designed to detect and push opponents out of the ring using basic sensors and embedded control logic.",
    longDesc: "This project is a mini sumobot built for robotics competitions. It uses distance sensors and programmed logic to detect opponents and execute aggressive pushing strategies within a restricted circular ring (Dohyo). The development covered mechanical chassis fabrication, motor speed control, and real-time sensor processing.",
    tags: ["Arduino", "Robotics", "Embedded Systems", "Electronics"],
    color: "text-kurz-pink",
    bg: "bg-kurz-pink",
    icon: Zap,
    image: "assets/sumobot/overview.jpg",
    gallery: ["assets/sumobot/overview.jpg", "assets/sumobot/1v1.jpg", "assets/sumobot/combat.jpg", "assets/sumobot/3dmodel.jpg", "assets/sumobot/casing.jpg"],
    sections: [
      {
        title: "Overview",
        content: "An autonomous combat robot designed for high-stiffness pushing and obstacle detection using embedded intelligence.",
        image: "assets/sumobot/overview.jpg",
        images: ["assets/sumobot/combat.jpg"],
        videoUrls: ["assets/sumobot/sumobotcombat.mp4", "assets/sumobot/battle.mp4"]
      },
      {
        title: "Technical Drawings & 3D Modeling",
        content: "Precise dimensions and weight distribution were calculated to ensure maximum traction and stability during collisions.",
        bullets: [
          "CAD modeling for chassis components",
          "Technical drawings for structural assembly",
          "Balanced center of gravity for improved pushing",
          "Compact footprint compliant with mini-sumo standards"
        ],
        image: "assets/sumobot/3dmodel.jpg",
        images: ["assets/sumobot/drawings.jpg", "assets/sumobot/drawings1.jpg"]
      },
      {
        title: "Fabrication & Assembly",
        content: "Iterative development of the robot's physical structure, ranging from breadboard prototypes to a finalized durable casing.",
        bullets: [
          "Custom-fabricated chassis and wedge",
          "Integrated wheels and high-torque motors",
          "Protective casing for electronics",
          "Wiring optimization and power management"
        ],
        image: "assets/sumobot/casing.jpg",
        images: ["assets/sumobot/development1.jpg", "assets/sumobot/development2.jpg"]
      },
      {
        title: "System Setup & Programming",
        content: "The robot uses an autonomous logic loop to search for opponents and engage when detection thresholds are met.",
        bullets: [
          "Ultrasonic distance sensing for tracking",
          "PWM-based motor speed control",
          "Interrupt-driven logic for emergency stops",
          "Aggressive search and attack algorithms"
        ],
        image: "assets/sumobot/setup.jpg",
        videoUrl: "assets/sumobot/motorprogrammingtest.mp4"
      },
      {
        title: "Performance Testing",
        content: "Combat simulations were performed to calibrate sensor sensitivity and motor response speed.",
        bullets: [
          "1v1 combat simulations",
          "Detection range calibration",
          "Surface traction optimization",
          "Wedge efficiency testing"
        ],
        image: "assets/sumobot/1v1.jpg",
        images: ["assets/sumobot/testing.jpg"]
      }
    ],
    features: ["Autonomous movement", "Opponent detection", "Compact Design"]
  },
  {
    title: "PCB PROJECTS",
    subtitle: "Custom Board Design & Fabrication",
    desc: "Custom PCB designs including a regulated 9V power supply, relay modules, and logic-based locking systems, developed using KiCad from schematic to physical testing.",
    longDesc: "This project showcases the design and fabrication of functional Printed Circuit Boards. Using KiCad, I developed several modules including a regulated 9V power supply, a 4-channel relay module, and a security locking system utilizing discrete logic gates. The process involved schematic capture, PCB layout routing, surface-zone optimization, and hands-on assembly and validation.",
    tags: ["PCB Design", "Electronics", "KiCad", "Hardware", "Prototyping"],
    color: "text-kurz-orange",
    bg: "bg-kurz-orange",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    gallery: ["assets/pcb/9vfinal.jpg", "assets/pcb/relayfinal.jpg", "assets/pcb/locksystempcb.jpg", "assets/pcb/9vfrontsilkscreen.JPG", "assets/pcb/relayschematics.jpg", "assets/pcb/locksystemschematics.jpg"],
    sections: [
      {
        title: "Overview",
        content: "A collection of hardware projects focused on circuit efficiency, modular design, and reliable power management.",
        image: "assets/pcb/overview.jpg",
        images: ["assets/pcb/techstack.jpg"]
      },
      {
        title: "9V Regulated Power Supply",
        content: "A robust power module designed to provide a stable 9V DC output from an AC transformer source, featuring ripple filtration and thermal stability.",
        bullets: [
          "KiCad-designed dual-layer PCB",
          "Bridge rectification and smoothing capacitors",
          "Fixed 9V output regulation",
          "Compact form factor with mounting holes"
        ],
        image: "assets/pcb/9vfinal.jpg",
        images: ["assets/pcb/schematic.jpg", "assets/pcb/9voutline.JPG", "assets/pcb/9vwithfilledzone.JPG", "assets/pcb/9vfrontsilkscreen.JPG"],
        videoUrl: "assets/pcb/testing.mp4"
      },
      {
        title: "4-Channel Relay Module",
        content: "Developed for high-power switching applications, this module allows a microcontroller to control higher voltage loads with optical isolation.",
        bullets: [
          "Discrete transistor-based switching",
          "Flyback diode protection for inductive loads",
          "Integrated LED status indicators",
          "Isolated high-voltage and low-voltage paths"
        ],
        image: "assets/pcb/relayfinal.jpg",
        images: ["assets/pcb/relayschematics.jpg", "assets/pcb/relaybefore.jpg"],
        videoUrl: "assets/pcb/relaytesting.mp4"
      },
      {
        title: "Locking System (Logic Gates)",
        content: "A security logic board that implements complex truth tables using discrete ICs to control physical locking mechanisms.",
        bullets: [
          "Combinational logic-based authentication",
          "PCB layout optimized for minimal signal cross-talk",
          "Integration with external solenoids/servos",
          "Hardware-level security without microcontrollers"
        ],
        image: "assets/pcb/locksystempcb.jpg",
        images: ["assets/pcb/locksystemschematics.jpg"]
      },
      {
        title: "Fabrication & Prototyping",
        content: "The transition from virtual design to physical hardware involved breadboard validation and careful component soldering.",
        bullets: [
          "Pre-fabrication breadboard verification",
          "Component sourcing and layout planning",
          "Soldering and continuity testing",
          "Final casing and system integration"
        ],
        image: "assets/pcb/fabrication.jpg",
        images: ["assets/pcb/9vbreadboard.jpg", "assets/pcb/9vprototyping.jpg", "assets/pcb/9vtesting.jpg", "assets/pcb/9vcasing.jpg"]
      }
    ],
    features: ["KiCad Design", "Power Management", "Discrete Logic"]
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
    image: "assets/website/overview.JPG",
    gallery: ["assets/website/overview.JPG", "assets/website/browser.JPG", "assets/website/dashboard.JPG", "assets/website/store.JPG", "assets/website/donation.JPG", "assets/website/gallery.JPG", "assets/website/about.JPG"],
    externalUrl: "http://olliesvault.page.gd",
    sections: [
      {
        title: "Overview",
        content: "An experimental web project exploring the boundaries of visual design using WordPress and Elementor. The site features a curated set of interactive components themed around pixelated cat art.",
        image: "assets/website/overview.JPG",
        images: ["assets/website/browser.JPG"]
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
        image: "assets/website/about.JPG"
      },
      {
        title: "Core Interface & Modules",
        content: "The website includes several themed modules such as a digital store, a donation gateway, and an interactive art gallery.",
        bullets: [
          "Interactive dashboard for navigation",
          "E-commerce module for themed merchandise",
          "Secure donation tracking simulation",
          "Responsive gallery for pixel art showcase"
        ],
        image: "assets/website/dashboard.JPG",
        images: ["assets/website/store.JPG", "assets/website/donation.JPG", "assets/website/gallery.JPG"]
      },
      {
        title: "Technology & Design Stack",
        content: "The project utilized a mix of visual builders and custom CSS to achieve the desired aesthetic while maintaining professional standards.",
        bullets: [
          "WordPress CMS foundation",
          "Elementor Pro for layout precision",
          "Custom pixelized CSS filters",
          "Thematic asset management and optimization"
        ],
        images: ["assets/website/techstack1.jpg", "assets/website/techstack2.jpg", "assets/website/techstack3.jpg"]
      }
    ],
    features: ["Thematic Web Design", "Elementor Integration", "Interactive UX"]
  }
];

const Lightbox = ({ image, onClose }: { image: string | null, onClose: () => void }) => (
  <AnimatePresence>
    {image && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 pointer-events-auto"
      >
        <div 
          onClick={onClose}
          className="absolute inset-0 bg-space-void/90 backdrop-blur-xl cursor-zoom-out"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-7xl max-h-screen z-10 pointer-events-none flex items-center justify-center"
        >
          <img 
            src={image} 
            alt="Zoomed view" 
            className="w-full h-auto max-h-[90vh] object-contain rounded-xl shadow-2xl pointer-events-auto" 
          />
          <button 
            onClick={onClose}
            className="absolute -top-12 right-0 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white pointer-events-auto transition-colors"
          >
            <X size={24} />
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ProjectModal = ({ project, onClose, onZoom }: { project: Project | null, onClose: () => void, onZoom: (img: string) => void }) => (
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
          <div className="w-full py-20 relative flex items-center justify-center overflow-hidden shrink-0">
             {/* Modal header with only clean image, no extra color overlay besides readability gradient */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
             {project.image && (
               <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
             )}
             <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
               <project.icon size={220} className="text-white" />
             </div>
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
                        <div className="space-y-4">
                          {[...(section.videoUrls || []), ...(section.videoUrl ? [section.videoUrl] : [])].map((vUrl, vIdx) => (
                            <div key={vIdx} className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-xl aspect-video">
                              {vUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                                <video 
                                  src={vUrl} 
                                  controls 
                                  className="w-full h-full object-contain bg-black"
                                />
                              ) : (
                                <iframe 
                                  className="w-full h-full"
                                  src={vUrl}
                                  title={`${section.title} Video ${vIdx}`}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                  allowFullScreen
                                ></iframe>
                              )}
                            </div>
                          ))}
                          
                          {/* Media Grid */}
                          <div className={`grid gap-4 ${((section.images?.length || 0) + (section.image ? 1 : 0)) > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {section.image && (
                              <div 
                                onClick={() => onZoom(section.image!)}
                                className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-xl group cursor-zoom-in"
                              >
                                <img src={section.image} alt={section.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                              </div>
                            )}
                            {section.images?.map((img, i) => (
                              <div 
                                key={i} 
                                onClick={() => onZoom(img)}
                                className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-xl group cursor-zoom-in"
                              >
                                <img src={img} alt={`${section.title} media ${i}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  ))
                )}

                {/* Gallery Subsection */}
                {project.gallery && project.gallery.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-1.5 h-6 bg-kurz-yellow rounded-full" />
                      <h3 className="text-xl font-bold font-display uppercase tracking-widest text-white/80">Visual Gallery</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {project.gallery.map((img, i) => (
                        <div 
                          key={i} 
                          onClick={() => onZoom(img)}
                          className="aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10 group cursor-zoom-in"
                        >
                          <img src={img} alt={`${project.title} gallery ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                      ))}
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
        <a href="https://github.com/johnoliversolis06-cpu" target="_blank"><Monitor size={18} /></a>
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
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
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
        <motion.a whileHover={{ y: -5, color: '#facc15' }} href="https://github.com/johnoliversolis06-cpu" target="_blank" className="text-white/60 hover:text-white transition-colors">
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
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onZoom={(img) => setZoomedImage(img)}
      />

      {/* Global Image Lightbox */}
      <Lightbox image={zoomedImage} onClose={() => setZoomedImage(null)} />

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
                    "Trained in Cisco Networking configuration",
                    "Gained exposure to QGIS for urban mapping systems and data analysis",
                    "Participated in Cybersecurity orientation and infrastructure hardening training activities"
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
                  { title: "TESDA Programming NC IV", image: "certs/tesdaprogrammingnciv.jpg" },
                  { title: "DICT: JavaScript Essentials", image: "certs/javascriptessentialsfromcisconetworkingacademy.JPG" },
                  { title: "DICT: Cybersecurity 101", image: "certs/dictcybersecurity101.JPG" },
                  { title: "IP Networking Essentials", image: "certs/ipnetworkingessentialwithbasicciscocommandsfromdict.jpg" }
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
              href="https://github.com/johnoliversolis06-cpu"
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
