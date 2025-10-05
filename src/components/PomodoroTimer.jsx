import React, { useState, useEffect } from 'react';

function PomodoroTimer({ currentTaskId, tasks, onReset, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [stopCount, setStopCount] = useState(0);

  const currentTask = tasks.find(task => task.id === currentTaskId);

  useEffect(() => {
    if (currentTaskId !== null) {
      setIsRunning(true);
    }
  }, [currentTaskId]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alert('時間到！');
      onComplete(currentTaskId);
      onReset();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete, onReset, currentTaskId]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (isRunning) {
      setStopCount(stopCount + 1);
    }
  };

  const resetTimer = () => {
    setTimeLeft(1500);
    setIsRunning(false);
    onReset();
  };

  const completeTask = () => {
    onComplete(currentTaskId);
    resetTimer();
  };

  return (
    <div>
      <h2>番茄鐘</h2>
      {currentTask && <div>任務: {currentTask.title}</div>}
      <div className="timer">{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</div>
      <button onClick={toggleTimer}>{isRunning ? '暫停' : '開始'}</button>
      <button onClick={resetTimer}>重設</button>
      <button onClick={completeTask}>完成</button>
    </div>
  );
}

export default PomodoroTimer;
