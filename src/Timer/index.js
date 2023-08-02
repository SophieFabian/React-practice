import React, { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(0);
  let intervalId;

  useEffect(() => {
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [time, isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };
  const stopTimer = () => {
    setIsRunning(false);
  };
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h3>Implement a timer</h3>
      <ol>
        <li>Start Timer start the timer</li>
        <li>Stop Timer stops it</li>
        <li>Reset timer resets to 0</li>
      </ol>
      <h1>TIMER</h1>

      <p style={{ display: "flex", justifyContent: "center" }}>
        Counting: {time}
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={startTimer} style={{ margin: 16, width: 160 }}>
          Start Timer
        </button>
        <button onClick={stopTimer} style={{ margin: 16, width: 160 }}>
          Stop Timer
        </button>
        <button onClick={resetTimer} style={{ margin: 16, width: 160 }}>
          Reset Timer
        </button>
      </div>
    </div>
  );
}
