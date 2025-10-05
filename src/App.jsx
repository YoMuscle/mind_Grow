import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import PomodoroTimer from './components/PomodoroTimer';
import TreeDisplay from './components/TreeDisplay';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, title: 'Kingstone Paper', isDone: false, pomodoroCount: 0 },
      { id: 2, title: 'W3 作業', isDone: false, pomodoroCount: 0 }
    ];
  });
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const handleStartTask = (taskId) => {
    setCurrentTaskId(taskId);
  };

  const handleReset = () => {
    setCurrentTaskId(null);
  };

  const handleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, isDone: true, pomodoroCount: task.pomodoroCount + 1 } : task
    ));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, isDone: !task.isDone } : task
    ));
  };

  return (
    <div className="App">
      <h1>專注小樹</h1>
      <TreeDisplay />
      <TodoList tasks={tasks} setTasks={setTasks} onStartTask={handleStartTask} currentTaskId={currentTaskId} onToggleComplete={handleToggleComplete} />
      <PomodoroTimer tasks={tasks} currentTaskId={currentTaskId} onReset={handleReset} onComplete={handleComplete} />
    </div>
  );
}

export default App;
