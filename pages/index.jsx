import { useRef, useState,useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";


import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

/* Load Canvas client-side only */
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

/* ---------- INTELLIGENT SPHERE ---------- */
function IntelligentSphere() {
  const meshRef = useRef();
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // slow rotation
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x += 0.001;

    // floating motion
    meshRef.current.position.y = Math.sin(t) * 0.3;
    meshRef.current.position.x = Math.cos(t * 0.5) * 0.2;

    // react to mouse
    meshRef.current.rotation.y += mouse.x * 0.001;
    meshRef.current.rotation.x += mouse.y * 0.001;
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#22d3ee"
        wireframe
        emissive="#22d3ee"
        emissiveIntensity={0.4}
      />
    </Sphere>
  );
}

/* ---------- NEURAL NETWORK ---------- */
function NeuralNetwork() {
  const groupRef = useRef();

  const points = useRef(
    Array.from({ length: 25 }, () => ({
      base: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
      ],
      speed: Math.random() * 0.16 + 0.12,
    }))
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const p = points.current[i];
      child.position.x = p.base[0] + Math.cos(t * p.speed) * 10.25;
      child.position.y = p.base[1] + Math.sin(t * p.speed) * 10.25;
      child.position.z = p.base[2];
    });
  });

  return (
    <group ref={groupRef}>
      {points.current.map((p, i) => (
        <mesh key={i} position={p.base}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}




/* ---------- HERO 3D ---------- */
function Hero3D() {
  return (
    <div className="w-full h-[400px] md:h-[520px] relative z-10">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={1.3} />
        <pointLight position={[10, 10, 10]} />

        <IntelligentSphere />
        <NeuralNetwork />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

/* ---------- CHATBOT ---------- */
function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("Hi! Ask us about our AI services.");


  function sendMsg() {
    if (!msg) return;
    setReply("Thinking...");
    setTimeout(() => {
      setReply("Thanks! Our team will contact you soon.");
    }, 800);
    setMsg("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-cyan-500 p-4 rounded-full shadow-lg z-50"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-black p-4 border border-cyan-500 rounded-xl z-50">
          <p className="text-sm text-gray-300">{reply}</p>
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type your message..."
            className="w-full mt-2 bg-black border border-white/10 p-2 rounded"
          />
          <button
            onClick={sendMsg}
            className="mt-2 bg-cyan-500 px-3 py-1 rounded"
          >
            Send
          </button>
        </div>
      )}
    </>
  );
}
function SneakyRobot (){
  const [visible, setVisible] = useState(false);
  const [side, setSide] = useState("left");
  const [yPos, setYPos] = useState("50%");
  const [text, setText] = useState("");
  const [currentMsg, setCurrentMsg] = useState("");
  const [cycle, setCycle] = useState(0);



useEffect(() => {

  
  const interval = setInterval(() => {
    const newSide = Math.random() > 0.5 ? "left" : "right";
    const randomY = Math.floor(Math.random() * 60) + 20;

    setSide(newSide);
    setYPos(`${randomY}%`);


   
    // force full reset
    setVisible(false);

    setTimeout(() => {
      setCycle((c) => c + 1); // new animation instance
      setVisible(true);      // show at NEW position
    }, 100);

    setTimeout(() => setVisible(false), 5000);
  }, 7000);

  return () => clearInterval(interval);
}, []);



  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cycle"
          initial={{ x: side === "left" ? -160 : 160, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: side === "left" ? -160 : 160, opacity: 0 }}
          transition={{ duration: 2 }}   // 👈 slower exit
          className="fixed z-50 cursor-pointer"
          style={{
  top: yPos,
  left: side === "left" ? "20px" : "auto",
  right: side === "right" ? "20px" : "auto",
  maxWidth: "240px"
}}

        >
          {/* MESSAGE */}
    



          {/* ROBOT */}
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="flex flex-col items-center"
          >
            {/* HEAD */}
            <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center text-3xl">
              🤖
            </div>

            {/* BODY */}
            <div className="w-16 h-16 bg-gray-400 rounded-lg mt-1 relative">
              {/* LEFT ARM */}
              <div className="absolute -left-3 top-3 w-3 h-8 bg-gray-300 rounded" />

              {/* RIGHT ARM (WAVE) */}
              <motion.div
                animate={{ rotate: [0, 20, -20, 20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -right-3 top-3 w-3 h-8 bg-gray-300 rounded origin-top"
              />
            </div>

            {/* LEGS */}
            <div className="flex gap-2 mt-1">
              <motion.div
                animate={{ rotate: [15, -15, 15] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                className="w-3 h-6 bg-gray-300 rounded origin-top"
              />
              <motion.div
                animate={{ rotate: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                className="w-3 h-6 bg-gray-300 rounded origin-top"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}






/* ---------- MAIN PAGE ---------- */
export default function Home() {
  
  const stats = [
    { label: "Projects", value: 48 },
    { label: "Clients", value: 21 },
    { label: "Automations", value: 120 },
    { label: "Countries", value: 6 },
    
  ]
  
  ;

  

  return (
    <div className="min-h-screen bg-black text-white relative">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pb-8 overflow-visible">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text"
        >
          We Build Scaleable AI and Web Solutions
        </motion.h1>

        <p className="mt-6 text-gray-400 max-w-2xl">
          AI chatbots, automation tools, and SaaS platforms for modern businesses.
        </p>

        <Hero3D />
      </section>

      {/* STATS */}
      <section className="py-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 p-6 rounded-xl border border-white/10"
          >
            <h3 className="text-4xl font-bold text-cyan-400">{s.value}+</h3>
            <p className="text-gray-400">{s.label}</p>
          </motion.div>
        ))}
      </section>

      {/* SERVICES */}
      <section className="py-20 px-8 grid md:grid-cols-3 gap-8">
        {[
          "AI Chatbots",
          "AI Agents",
          "Automation Systems",
          "RAG Models",
          "SaaS Platforms",
          "Web Applications",
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:scale-105 hover:border-cyan-400 transition"
          >
            <h3 className="text-xl font-bold">{s}</h3>
            <p className="text-gray-400 mt-2">
              Custom intelligent solutions for your business.
            </p>
          </motion.div>
        ))}
      </section>

      {/* PROJECTS */}
      <section className="py-20 px-8">
        <h2 className="text-4xl font-bold text-center mb-10">Our Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            "AI Support Bot for E‑commerce",
            "SaaS Analytics Dashboard",
            "RAG Chatbot for Documents",
            "Appointment Booking Automation",
          ].map((p, i) => (
            <div
              key={i}
              className="group bg-white/5 p-6 rounded-xl border border-white/10 relative overflow-hidden"
            >
              <h3 className="text-xl font-semibold">{p}</h3>
              <p className="text-gray-400 mt-2">
                Built to solve real business problems using AI and automation.
              </p>
              <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
     <section className="py-20 text-center px-8">
  <h2 className="text-4xl font-bold">Book a Free Call</h2>
  <p className="text-gray-400 mt-3">
    Schedule a free strategy call with our team.
  </p>

  <a
    href="https://calendly.com/rasoolkhan990880/30min"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-6 bg-cyan-500 px-8 py-3 rounded-xl font-semibold hover:bg-cyan-400 transition"
  >
    Book Call
  </a>
</section>


      {/* ABOUT */}
      <section className="py-20 px-8 text-center">
        <h2 className="text-4xl font-bold">About Us</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mt-4">
          We are a small team of developers building scalable AI-powered web systems for startups and businesses worldwide.
        </p>
      </section>

      {/* CONTACT */}
      <section className="py-20 px-8 text-center">
        <h2 className="text-4xl font-bold">Let’s Build Something Intelligent</h2>
        <p className="text-gray-400 mt-4">contact@youragency.com</p>
      </section>
<ChatbotWidget />
<SneakyRobot  />
  

    </div>
  );
}
