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

    // Simulate loading progress
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
        return prev + 5;
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
        {/* MB Logo with glitch effect */}
        <div className="mb-8 relative">
          <h1
            className="text-[120px] font-bold text-white tracking-wider glitch-text"
            data-text="MB"
          >
            MB
          </h1>
          <div className="absolute inset-0 text-[120px] font-bold tracking-wider text-cyan-400 opacity-70 mix-blend-screen glitch-text-cyan" data-text="MB">
            MB
          </div>
          <div className="absolute inset-0 text-[120px] font-bold tracking-wider text-red-400 opacity-70 mix-blend-screen glitch-text-red" data-text="MB">
            MB
          </div>
        </div>

        {/* Terminal-style loading text */}
        <div className="text-cyan-400 font-mono text-sm mb-6 h-6">
          {progress < 30 && (
            <span className="typing-text">$ Initializing system...</span>
          )}
          {progress >= 30 && progress < 60 && (
            <span className="typing-text">$ Loading modules... ✓</span>
          )}
          {progress >= 60 && progress < 90 && (
            <span className="typing-text">$ Compiling assets... ✓</span>
          )}
          {progress >= 90 && (
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

        .glitch-text::before {
          content: attr(data-text);
          position: absolute;
          left: -2px;
          text-shadow: 2px 0 #ff00ff;
          animation: glitch-1 0.3s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }

        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 2px;
          text-shadow: -2px 0 #00ffff;
          animation: glitch-2 0.3s infinite;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        }

        @keyframes glitch-1 {
          0%, 100% {
            left: -2px;
          }
          50% {
            left: 2px;
          }
        }

        @keyframes glitch-2 {
          0%, 100% {
            left: 2px;
          }
          50% {
            left: -2px;
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

