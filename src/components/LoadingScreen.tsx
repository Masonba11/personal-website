"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has already seen the loading screen this session
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");

    if (hasSeenLoader) {
      setIsLoading(false);
      return;
    }

    // Simulate loading progress - 2-3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("hasSeenLoader", "true");
          }, 300);
          return 100;
        }
        return prev + 4; // Faster increment for shorter duration
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "gridMove 2s linear infinite",
          }}
        />
      </div>

      {/* Glitch lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glitch-line" style={{ top: "20%", animationDelay: "0s" }} />
        <div className="glitch-line" style={{ top: "45%", animationDelay: "0.5s" }} />
        <div className="glitch-line" style={{ top: "70%", animationDelay: "1s" }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Chrome Sphere with MB Logo */}
        <div className="mb-12 relative flex items-center justify-center">
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

        {/* Terminal-style loading text */}
        <div className="text-cyan-400 font-mono text-sm mb-6 h-6">
          {progress < 30 && (
            <span className="typing-text">$ Initializing...</span>
          )}
          {progress >= 30 && progress < 70 && (
            <span className="typing-text">$ Loading... ✓</span>
          )}
          {progress >= 70 && (
            <span className="typing-text text-green-400">$ Welcome ✓</span>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto h-1 bg-gray-800 rounded-full overflow-hidden shadow-lg">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(34,211,238,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <div className="mt-4 text-white font-mono text-xs">
          <span className="text-cyan-400">[</span>
          {progress}%
          <span className="text-cyan-400">]</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
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

