import React, { useState, useEffect } from 'react';

function TodoList({ tasks, setTasks, onStartTask, currentTaskId, onToggleComplete }) {
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskTitle.trim()) {
      const newTask = { id: Date.now(), title: taskTitle, isDone: false, pomodoroCount: 0 };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
    }
  };

  return (
    <div>
      <h2>代辦任務</h2>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="新增任務"
      />
      <button onClick={addTask} disabled={currentTaskId !== null}>新增</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => onToggleComplete(task.id)}
              disabled={!task.isDone}
            />
            {task.title}
            <button onClick={() => onStartTask(task.id)} disabled={currentTaskId !== null}>Start</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
