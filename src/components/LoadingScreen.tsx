"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scene, setScene] = useState<"sky" | "house" | "room" | "computer" | "screen">("sky");

  useEffect(() => {
    // Check if user has already seen the loading screen this session
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");

    if (hasSeenLoader) {
      setIsLoading(false);
      return;
    }

    // Scene transitions
    const sceneTimeline = [
      { time: 0, scene: "sky" as const },
      { time: 1000, scene: "house" as const },
      { time: 2000, scene: "room" as const },
      { time: 3000, scene: "computer" as const },
      { time: 4000, scene: "screen" as const },
    ];

    sceneTimeline.forEach(({ time, scene: newScene }) => {
      setTimeout(() => setScene(newScene), time);
    });

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("hasSeenLoader", "true");
          }, 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {/* Sky Scene - Drone View */}
      <div className={`scene-container ${scene === "sky" ? "active" : ""}`}>
        <div className="sky-gradient" />
        <div className="clouds">
          <div className="cloud cloud-1" />
          <div className="cloud cloud-2" />
          <div className="cloud cloud-3" />
        </div>
        <div className="horizon" />
      </div>

      {/* House Scene - Approaching */}
      <div className={`scene-container ${scene === "house" ? "active" : ""}`}>
        <div className="house-exterior">
          <div className="house-wall" />
          <div className="window window-target">
            <div className="window-glow" />
          </div>
        </div>
      </div>

      {/* Room Scene - Inside */}
      <div className={`scene-container ${scene === "room" ? "active" : ""}`}>
        <div className="room-interior">
          <div className="wall-texture" />
          <div className="desk-silhouette" />
          <div className="monitor-outline">
            <div className="screen-glow" />
          </div>
        </div>
      </div>

      {/* Computer Scene - Close to Screen */}
      <div className={`scene-container ${scene === "computer" ? "active" : ""}`}>
        <div className="monitor-bezel">
          <div className="screen-frame">
            <div className="screen-scanlines" />
          </div>
        </div>
      </div>

      {/* Screen Scene - MB Sphere */}
      <div className={`scene-container ${scene === "screen" ? "active" : ""}`}>
        <div className="screen-content">
          <div className="digital-grid" />
          <div className="data-streams">
            <div className="stream stream-1" />
            <div className="stream stream-2" />
            <div className="stream stream-3" />
          </div>
        </div>
      </div>

      {/* Glitch lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glitch-line" style={{ top: "20%", animationDelay: "0s" }} />
        <div className="glitch-line" style={{ top: "45%", animationDelay: "0.5s" }} />
        <div className="glitch-line" style={{ top: "70%", animationDelay: "1s" }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Chrome Sphere with MB Logo - Only shows in final scene */}
        <div className={`mb-12 relative flex items-center justify-center transition-all duration-1000 ${
          scene === "screen" ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}>
          <div className="chrome-sphere">
            <div className="sphere-inner">
              <h1 className="text-[80px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 tracking-wider relative z-10">
                MB
              </h1>
            </div>
            {/* Spinning rings around sphere */}
            <div className="orbit-ring orbit-ring-1"></div>
            <div className="orbit-ring orbit-ring-2"></div>
            <div className="orbit-ring orbit-ring-3"></div>
          </div>
        </div>

        {/* Terminal-style loading text - Only shows in final scene */}
        <div className={`text-cyan-400 font-mono text-sm mb-6 h-6 transition-opacity duration-500 ${
          scene === "screen" ? "opacity-100" : "opacity-0"
        }`}>
          {progress < 25 && (
            <span className="typing-text">$ Initializing system...</span>
          )}
          {progress >= 25 && progress < 50 && (
            <span className="typing-text">$ Loading modules... ✓</span>
          )}
          {progress >= 50 && progress < 75 && (
            <span className="typing-text">$ Compiling assets... ✓</span>
          )}
          {progress >= 75 && progress < 95 && (
            <span className="typing-text">$ Establishing connection... ✓</span>
          )}
          {progress >= 95 && (
            <span className="typing-text text-green-400">$ Welcome ✓</span>
          )}
        </div>

        {        /* Progress bar - Only shows in final scene */}
        <div className={`w-64 mx-auto h-1 bg-gray-800 rounded-full overflow-hidden shadow-lg transition-opacity duration-500 ${
          scene === "screen" ? "opacity-100" : "opacity-0"
        }`}>
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(34,211,238,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage - Only shows in final scene */}
        <div className={`mt-4 text-white font-mono text-xs transition-opacity duration-500 ${
          scene === "screen" ? "opacity-100" : "opacity-0"
        }`}>
          <span className="text-cyan-400">[</span>
          {progress}%
          <span className="text-cyan-400">]</span>
        </div>
      </div>

      <style jsx>{`
        /* Scene Container */
        .scene-container {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          pointer-events: none;
        }

        .scene-container.active {
          opacity: 1;
        }

        /* Sky Scene */
        .sky-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #001f3f 0%, #005f8f 50%, #87ceeb 100%);
          animation: skyMove 3s ease-in-out forwards;
        }

        @keyframes skyMove {
          from {
            transform: translateY(0) scale(1);
          }
          to {
            transform: translateY(30%) scale(1.3);
          }
        }

        .clouds {
          position: absolute;
          inset: 0;
        }

        .cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 100px;
          filter: blur(20px);
          animation: cloudDrift 8s linear infinite;
        }

        .cloud-1 {
          width: 200px;
          height: 60px;
          top: 20%;
          left: -200px;
        }

        .cloud-2 {
          width: 300px;
          height: 80px;
          top: 40%;
          left: -300px;
          animation-delay: 2s;
        }

        .cloud-3 {
          width: 250px;
          height: 70px;
          top: 60%;
          left: -250px;
          animation-delay: 4s;
        }

        @keyframes cloudDrift {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(100vw + 300px));
          }
        }

        .horizon {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 30%;
          background: linear-gradient(180deg, transparent 0%, #2a5f3f 100%);
          animation: horizonApproach 2s ease-out forwards;
        }

        @keyframes horizonApproach {
          from {
            transform: translateY(100%) scale(0.5);
          }
          to {
            transform: translateY(0) scale(1.5);
          }
        }

        /* House Scene */
        .house-exterior {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: houseZoom 1.5s ease-in-out forwards;
        }

        @keyframes houseZoom {
          from {
            transform: scale(0.3) translateY(100%);
          }
          to {
            transform: scale(2) translateY(0);
          }
        }

        .house-wall {
          position: absolute;
          width: 400px;
          height: 300px;
          background: linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%);
          border-radius: 8px;
        }

        .window {
          position: absolute;
          width: 180px;
          height: 220px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(180deg, #1a4d6f 0%, #0a2540 100%);
          border: 6px solid #3a3a3a;
          border-radius: 8px;
          overflow: hidden;
        }

        .window-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, transparent 70%);
          animation: windowPulse 2s ease-in-out infinite;
        }

        @keyframes windowPulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        /* Room Scene */
        .room-interior {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: roomEntry 1.5s ease-out forwards;
        }

        @keyframes roomEntry {
          from {
            transform: translateZ(-1000px) scale(0.5);
            filter: blur(10px);
          }
          to {
            transform: translateZ(0) scale(1);
            filter: blur(0);
          }
        }

        .wall-texture {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
        }

        .desk-silhouette {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 35%;
          background: linear-gradient(180deg, transparent 0%, #0a0a0a 100%);
        }

        .monitor-outline {
          position: relative;
          width: 500px;
          height: 350px;
          background: #1a1a1a;
          border: 8px solid #2a2a2a;
          border-radius: 12px;
          animation: monitorFocus 1.5s ease-in-out forwards;
        }

        @keyframes monitorFocus {
          from {
            transform: scale(0.7);
          }
          to {
            transform: scale(1.5);
          }
        }

        .screen-glow {
          position: absolute;
          inset: 8px;
          background: radial-gradient(ellipse at center, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
          animation: screenFlicker 3s ease-in-out infinite;
        }

        @keyframes screenFlicker {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        /* Computer Scene */
        .monitor-bezel {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bezelZoom 1.5s ease-in-out forwards;
        }

        @keyframes bezelZoom {
          from {
            transform: scale(0.5);
          }
          to {
            transform: scale(3);
          }
        }

        .screen-frame {
          position: relative;
          width: 80%;
          height: 80%;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          border: 3px solid #333;
          overflow: hidden;
        }

        .screen-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 255, 255, 0.03) 0px,
            transparent 2px,
            transparent 4px
          );
          animation: scanlineMove 3s linear infinite;
        }

        @keyframes scanlineMove {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(20px);
          }
        }

        /* Screen Scene */
        .screen-content {
          position: absolute;
          inset: 0;
          animation: screenReveal 1.5s ease-out forwards;
        }

        @keyframes screenReveal {
          from {
            transform: scale(5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .digital-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 2s linear infinite;
        }

        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        .data-streams {
          position: absolute;
          inset: 0;
        }

        .stream {
          position: absolute;
          width: 2px;
          height: 100px;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 255, 255, 0.8) 50%, transparent 100%);
          animation: streamFall 3s linear infinite;
        }

        .stream-1 {
          left: 20%;
          animation-delay: 0s;
        }

        .stream-2 {
          left: 50%;
          animation-delay: 1s;
        }

        .stream-3 {
          left: 80%;
          animation-delay: 2s;
        }

        @keyframes streamFall {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        .glitch-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 255, 255, 0.8) 50%, 
            transparent 100%
          );
          animation: glitchScan 1.5s ease-in-out infinite;
        }

        @keyframes glitchScan {
          0%, 100% {
            opacity: 0;
            transform: translateX(-100%);
          }
          50% {
            opacity: 1;
            transform: translateX(100%);
          }
        }

        /* Chrome Sphere Styles */
        .chrome-sphere {
          position: relative;
          width: 280px;
          height: 280px;
          margin: 0 auto;
          perspective: 1000px;
        }

        .sphere-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(
            circle at 30% 30%,
            #ffffff 0%,
            #e0e0e0 20%,
            #a0a0a0 40%,
            #707070 60%,
            #404040 80%,
            #1a1a1a 100%
          );
          box-shadow: 
            inset -25px -25px 40px rgba(0, 0, 0, 0.5),
            inset 10px 10px 40px rgba(255, 255, 255, 0.3),
            0 0 60px rgba(0, 255, 255, 0.3),
            0 0 100px rgba(0, 255, 255, 0.2);
          animation: sphereRotate 4s linear infinite, spherePulse 2s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .sphere-inner::before {
          content: '';
          position: absolute;
          top: 15%;
          left: 20%;
          width: 35%;
          height: 35%;
          border-radius: 50%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0.4) 40%,
            transparent 70%
          );
          filter: blur(8px);
          animation: highlight 3s ease-in-out infinite;
        }

        @keyframes sphereRotate {
          0% {
            transform: rotateY(0deg) rotateX(10deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(10deg);
          }
        }

        @keyframes spherePulse {
          0%, 100% {
            box-shadow: 
              inset -25px -25px 40px rgba(0, 0, 0, 0.5),
              inset 10px 10px 40px rgba(255, 255, 255, 0.3),
              0 0 60px rgba(0, 255, 255, 0.3),
              0 0 100px rgba(0, 255, 255, 0.2);
          }
          50% {
            box-shadow: 
              inset -25px -25px 40px rgba(0, 0, 0, 0.5),
              inset 10px 10px 40px rgba(255, 255, 255, 0.3),
              0 0 80px rgba(0, 255, 255, 0.5),
              0 0 120px rgba(0, 255, 255, 0.3);
          }
        }

        @keyframes highlight {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        /* Orbit Rings */
        .orbit-ring {
          position: absolute;
          border: 2px solid rgba(0, 255, 255, 0.3);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform-style: preserve-3d;
        }

        .orbit-ring-1 {
          width: 320px;
          height: 320px;
          margin: -160px 0 0 -160px;
          animation: orbit1 3s linear infinite;
        }

        .orbit-ring-2 {
          width: 360px;
          height: 360px;
          margin: -180px 0 0 -180px;
          animation: orbit2 4s linear infinite;
          border-color: rgba(138, 43, 226, 0.3);
        }

        .orbit-ring-3 {
          width: 400px;
          height: 400px;
          margin: -200px 0 0 -200px;
          animation: orbit3 5s linear infinite;
          border-color: rgba(255, 0, 255, 0.3);
        }

        @keyframes orbit1 {
          0% {
            transform: rotateX(75deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(75deg) rotateY(360deg);
          }
        }

        @keyframes orbit2 {
          0% {
            transform: rotateX(60deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(60deg) rotateY(-360deg);
          }
        }

        @keyframes orbit3 {
          0% {
            transform: rotateX(45deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(45deg) rotateY(360deg);
          }
        }

        .typing-text {
          display: inline-block;
          animation: blink 0.7s step-end infinite;
        }

        .typing-text::after {
          content: '_';
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

