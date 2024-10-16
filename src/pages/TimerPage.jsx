"use client";
// import React, { useState, useEffect, useRef } from "react";
// import './TimerPage.css'; 
// import alertSound from 'D:/projects/GSSOC/counter-app/src/components/audio/alert-85101.mp3'; 
// import Navbar from "../components/navbar"; 
// import Controls from "../components/controls"; 
// import PopupNotification from "../components/pop-up"; 

// const Timer = () => {
//     const [minutes, setMinutes] = useState(0);
//     const [seconds, setSeconds] = useState(0);
//     const [isRunning, setIsRunning] = useState(false);
//     const [totalTime, setTotalTime] = useState(0);
//     const [notificationVisible, setNotificationVisible] = useState(false);
//     const [isPaused, setIsPaused] = useState(false); 
//     const alertSoundRef = useRef(null);
//     const countdownRef = useRef(null);
//     const [theme, setTheme] = useState("light"); 

//     useEffect(() => {
        
//         if (isRunning && !isPaused) {
//             countdownRef.current = setInterval(() => {
//                 setTotalTime((prev) => {
//                     if (prev <= 1) {
//                         clearInterval(countdownRef.current);
//                         playNotificationSound();
//                         setNotificationVisible(true);  
//                         setIsRunning(false);
//                         return 0; 
//                     }
//                     return prev - 1;
//                 });
//             }, 1000);
//         }

//         return () => clearInterval(countdownRef.current);
//     }, [isRunning, isPaused]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const total = parseInt(minutes) * 60 + parseInt(seconds);

//         if (total <= 0) {
//             alert('Please set a valid timer duration.');
//             return;
//         }

//         setTotalTime(total);
//         setIsRunning(true);
//         setNotificationVisible(false);
//     };

//     const stopCountdown = () => {
//         clearInterval(countdownRef.current);
//         setIsRunning(false);
//         setTotalTime(0);
//         setNotificationVisible(false);
//         setIsPaused(false); 
//     };

//     const pauseCountdown = () => {
//         setIsPaused(true);
//     };

//     const resumeCountdown = () => {
//         setIsPaused(false);
//     };

//     const playNotificationSound = () => {
//         if (alertSoundRef.current) {
//             alertSoundRef.current.play().catch((error) => {
//                 console.log("Error playing sound:", error);
//             });
//         }
//     };

//     const stopSound = () => {
//         if (alertSoundRef.current) {
//             alertSoundRef.current.pause();
//             alertSoundRef.current.currentTime = 0;
//         }
//     };

//     const displayTime = () => {
//         const mins = Math.floor(totalTime / 60);
//         const secs = totalTime % 60;
//         return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
//     };

//     const toggleTheme = () => {
//         setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
//     };

//     return (
//         <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
//             <Navbar theme={theme} toggleTheme={toggleTheme} />
//             <div className="container mx-auto px-2 py-4 max-w-xl">
//                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//                     <div className="p-4 sm:p-6">
//                         <h1 className="text-4xl font-extrabold text-center">Set a Timer</h1>
//                         <form onSubmit={handleSubmit} className="flex flex-col items-center">
//                             <label className="mt-4">
//                                 Minutes: 
//                                 <input 
//                                     type="number" 
//                                     value={minutes} 
//                                     onChange={(e) => setMinutes(e.target.value)} 
//                                     min="0" 
//                                     required 
//                                     className="ml-2 border rounded p-1"
//                                 />
//                             </label>
//                             <label className="mt-4">
//                                 Seconds: 
//                                 <input 
//                                     type="number" 
//                                     value={seconds} 
//                                     onChange={(e) => setSeconds(e.target.value)} 
//                                     min="0" 
//                                     max="59" 
//                                     required 
//                                     className="ml-2 border rounded p-1"
//                                 />
//                             </label>
//                             <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out">
//                                 Start Timer
//                             </button>
//                         </form>
                        
//                         <h2 className="mt-6 text-lg"><span id="timer-display">{displayTime()}</span></h2>

//                         {isRunning && (
//                             <div className="flex space-x-4">
//                                 {!isPaused ? (
//                                     <button onClick={pauseCountdown} className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out">
//                                         Pause
//                                     </button>
//                                 ) : (
//                                     <button onClick={resumeCountdown} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out">
//                                         Resume
//                                     </button>
//                                 )}
//                                 <button onClick={() => { stopCountdown(); stopSound(); }} className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out">
//                                     Reset
//                                 </button>
//                             </div>
//                         )}

                        
//                         {notificationVisible && (
//                             <PopupNotification 
//                                 message="Time is up!" 
//                                 onClose={() => { stopSound(); setNotificationVisible(false); }} 
//                             />
//                         )}
//                     </div>
//                 </div>
//             </div>

//             <audio ref={alertSoundRef} src={alertSound}></audio>
//         </div>
//     );
// };

// export default Timer;
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../components/navbar"; 
import SwitchTab from "../components/SwitchTab"; 
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Slim version for smaller bundle
import './TimerPage.css';
import Footer from "../components/Footer";


const TimerPage = () => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [customTime, setCustomTime] = useState(0);
  const timerRef = useRef(null);
  const [theme, setTheme] = useState("light");
  const [init, setInit] = useState(false);

  // Load particle engine only once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Load theme from local storage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Apply theme changes to body and local storage
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (isRunning && !isPaused && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      clearInterval(timerRef.current);
      alert("Time's up!");
      setIsRunning(false);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, isPaused, secondsLeft]);

  const handleStart = () => {
    setSecondsLeft(customTime);
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    clearInterval(timerRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(0);
    clearInterval(timerRef.current);
  };

  const handlePreset = (time) => {
    setCustomTime(time);
    setSecondsLeft(time);
    setIsRunning(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <div className={`h-svh bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${theme === 'dark' ? 'dark:bg-gray-900' : 'bg-white'}`}>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
                resize: true,
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            particles: {
              color: {
                value: theme === "dark" ? "#ffffff" : "#000000",
              },
              links: {
                color: theme === "dark" ? "#ffffff" : "#000000",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 3,
                straight: false,
              },
              number: {
                density: { enable: true, area: 800 },
                value: 80,
              },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 5 } },
            },
            detectRetina: true,
          }}
        />
      )}
      <Navbar theme={theme} toggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))} />
      <div className="flex flex-col items-center justify-center h-[84vh] p-4 sm:p-6 md:p-8">
        <div className="bg-slate-400bg-opacity-10 backdrop-blur-sm dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg transition-all duration-300 ease-in-out">
          <h1>Timer</h1>
          <div className="timer-display">{formatTime(secondsLeft)}</div>
          <div>
            <input
              type="number"
              placeholder="Enter time in seconds"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button className="start-button" onClick={handleStart}>Start</button>
            <button className="pause-button" onClick={handlePause}>{isPaused ? "Resume" : "Pause"}</button>
            <button className="reset-button" onClick={handleReset}>Reset</button>
          </div>
          <div className="preset-buttons">
            <button onClick={() => handlePreset(60)}>1 Min</button>
            <button onClick={() => handlePreset(300)}>5 Mins</button>
            <button onClick={() => handlePreset(600)}>10 Mins</button>
          </div>
          <SwitchTab /> {/* Include the SwitchTab component here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TimerPage;

