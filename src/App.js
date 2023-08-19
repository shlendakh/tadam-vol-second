import React, { useState, useEffect } from 'react';
import './App.scss';
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import Controls from "./components/Controls";

const App = () => {
  // state
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [currentMinutes, setCurrentMinutes] = useState(25);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  // component did mount
  useEffect(() => {
    let interval;

    if (isRunning && (currentMinutes > 0 || currentSeconds > 0)) {
      interval = setInterval(() => {
        if (currentSeconds === 0) {
          setCurrentMinutes(currentMinutes - 1);
          setCurrentSeconds(59);
        } else {
          setCurrentSeconds(currentSeconds - 1);
        }
      }, 1000);
    } else if (isRunning && currentMinutes === 0 && currentSeconds === 0) {
      playSound();

      setIsSession(!isSession);
      if (isSession) {
        setCurrentMinutes(breakTime);
      } else {
        setCurrentMinutes(sessionTime);
      }
      setCurrentSeconds(0);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, currentSeconds, breakTime, currentMinutes, isSession, sessionTime]);

  const playSound = () => {
    let playCount = 0;
    const audio = new Audio('/assets/bing.mp3');

    audio.onended = () => {
      playCount++;
      if (playCount < 3) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    audio.play();
  };

  const handleIncrease = (label) => {
    if (label === "Session Time") {
      setSessionTime(prev => {
        const updatedTime = Math.min(prev + 1, 60);
        setCurrentMinutes(updatedTime);  // Aktualizuj currentMinutes
        setCurrentSeconds(0);
        return updatedTime;
      });
    } else {
      setBreakTime(prev => Math.min(prev + 1, 60));
    }
  };

  const handleDecrease = (label) => {
    if (label === "Session Time") {
      setSessionTime(prev => {
        const updatedTime = Math.max(prev - 1, 1);
        setCurrentMinutes(updatedTime);  // Aktualizuj currentMinutes
        setCurrentSeconds(0);
        return updatedTime;
      });
    } else {
      setBreakTime(prev => Math.max(prev - 1, 1));
    }
  };

  const handleTimeChange = (e, label) => {
    const value = parseInt(e.target.value);
    if (label === "Session Time") {
      setSessionTime(Math.max(1, value));
    } else {
      setBreakTime(Math.max(1, value));
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsSession(true);
    setCurrentMinutes(sessionTime);
    setCurrentSeconds(0);
  };

  return (
    <div className="app">
      <header>Tadam (well... almost)</header>
      <Settings
        label="Session Time"
        time={sessionTime}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onTimeChange={handleTimeChange}
      />
      <Settings
        label="Break Time"
        time={breakTime}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onTimeChange={handleTimeChange}
      />
      <Timer minutes={currentMinutes} seconds={currentSeconds} />
      <Controls
        onStartPause={() => setIsRunning(!isRunning)}
        onReset={handleReset}
        isRunning={isRunning}
      />
    </div>
  );
}

export default App;
