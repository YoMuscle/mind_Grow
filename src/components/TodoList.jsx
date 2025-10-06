import React, { useState, useEffect } from 'react';

function TodoList({ tasks, setTasks, onStartTask, currentTaskId, onToggleComplete }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskTitle.trim()) {
      const newTask = { id: Date.now(), title: taskTitle, description: taskDescription, isDone: false, pomodoroCount: 0 };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  return (
    <div>
      <h2>代辦任務</h2>
      <div className="add-task">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="new todo"
        />
        <button onClick={addTask} disabled={currentTaskId !== null}>add</button>
      </div>
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="description"
      />
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-header" onClick={() => toggleExpand(task.id)}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => onToggleComplete(task.id)}
                disabled={!task.isDone}
              />
              <span>{task.title}</span>
              <button onClick={() => onStartTask(task.id)} disabled={currentTaskId !== null}>start</button>
              <button onClick={() => deleteTask(task.id)}>delete</button>
            </div>
            {expandedTaskId === task.id && <div className="description">{task.description}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
