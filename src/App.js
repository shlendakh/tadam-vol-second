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
  const [previousSessionTime, setPreviousSessionTime] = useState(25);
  const [previousBreakTime, setPreviousBreakTime] = useState(5);

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
        setCurrentMinutes(updatedTime);
        setCurrentSeconds(0);
        setPreviousSessionTime(updatedTime);  // Aktualizuj previousSessionTime
        return updatedTime;
      });
    } else {
      setBreakTime(prev => {
        const updatedTime = Math.min(prev + 1, 60);
        setPreviousBreakTime(updatedTime);  // Aktualizuj previousBreakTime
        return updatedTime;
      });
    }
  };

  const handleDecrease = (label) => {
    if (label === "Session Time") {
      setSessionTime(prev => {
        const updatedTime = Math.max(prev - 1, 1);
        setCurrentMinutes(updatedTime);
        setCurrentSeconds(0);
        setPreviousSessionTime(updatedTime);  // Aktualizuj previousSessionTime
        return updatedTime;
      });
    } else {
      setBreakTime(prev => {
        const updatedTime = Math.max(prev - 1, 1);
        setPreviousBreakTime(updatedTime);  // Aktualizuj previousBreakTime
        return updatedTime;
      });
    }
  };

  const handleTimeChange = (e, label) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value);

    if (label === "Session Time") {
      setPreviousSessionTime(sessionTime);
      setSessionTime(value);
      if (typeof value === "number" && !isNaN(value) && value > 0 && value <= 60) {
        setCurrentMinutes(value);
        setCurrentSeconds(0);
      }
    } else {
      setPreviousBreakTime(breakTime);
      setBreakTime(value);
    }
  };

  const handleReset = () => {
    if (typeof sessionTime !== "number" || isNaN(sessionTime) || sessionTime <= 0 || sessionTime > 60) {
      setSessionTime(previousSessionTime);
      setCurrentMinutes(previousSessionTime); // Ustaw na poprzednią wartość
    } else {
      setCurrentMinutes(sessionTime); // Ustaw na bieżącą wartość
    }
  
    if (typeof breakTime !== "number" || isNaN(breakTime) || breakTime <= 0 || breakTime > 60) {
      setBreakTime(previousBreakTime);
    }
  
    setCurrentSeconds(0);
    setIsRunning(false);
    setIsSession(true);
  };
  

  const handleStartPause = () => {
    if (typeof sessionTime !== "number" || isNaN(sessionTime) || sessionTime <= 0 || sessionTime > 60) {
      setSessionTime(previousSessionTime);
    }
    if (typeof breakTime !== "number" || isNaN(breakTime) || breakTime <= 0 || breakTime > 60) {
      setBreakTime(previousBreakTime);
    }
    setIsRunning(!isRunning);
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
        onStartPause={handleStartPause}
        onReset={handleReset}
        isRunning={isRunning}
      />
    </div>
  );
}

export default App;
