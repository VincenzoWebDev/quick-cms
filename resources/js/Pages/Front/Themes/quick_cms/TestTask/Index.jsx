import { useState } from 'react';

const TestTaskIndex = ({ title }) => {
  let tasks = [
    { id: 1, name: 'Task One', completed: false },
    { id: 2, name: 'Task Two', completed: true },
    { id: 3, name: 'Task Three', completed: false },
    { id: 4, name: 'Task Four', completed: true },
    { id: 5, name: 'Task Five', completed: false },
    { id: 6, name: 'Task Six', completed: true },
    { id: 7, name: 'Task Seven', completed: false },
    { id: 8, name: 'Task Eight', completed: true },
    { id: 9, name: 'Task Nine', completed: false },
    { id: 10, name: 'Task Ten', completed: true },
  ];

  const [stateTasks, setStateTasks] = useState(tasks);
  const [newTaskName, setNewTaskName] = useState('');

  const handleCheckboxChange = (taskId) => {
    setStateTasks(
      stateTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const handleAddTask = () => {
    if (newTaskName.trim() === '') return;

    const newTask = {
      id: stateTasks.length + 1,
      name: newTaskName,
      completed: false,
    };
    setStateTasks([...stateTasks, newTask]);
    setNewTaskName('');
  };

  const handleDeleteTask = (taskId) => {
    setStateTasks(stateTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <span>Inserisci una nuova task</span>
      <input
        type="text"
        className="border border-gray-300 rounded-md px-2 py-1"
        onChange={(e) => setNewTaskName(e.target.value)}
        value={newTaskName}
        placeholder="Task"
      />
      <button type="submit" onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
        Aggiungi
      </button>

      <h2>Lista Tasks</h2>
      <ul className="space-y-2">
        {stateTasks.map((task) => (
          <li key={task.id} className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheckboxChange(task.id)}
              className="mr-2"
            />
            <span>{task.name}</span>
            <button onClick={() => handleDeleteTask(task.id)} className="ml-auto text-red-500 hover:underline">
              Elimina
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestTaskIndex;
