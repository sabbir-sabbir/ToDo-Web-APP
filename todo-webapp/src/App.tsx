import React, { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import './App.css';

interface Task {
  id: number;
  text: string;
}

function App() {
  // All states are here ...
  const [tasks, setTasks] =  useLocalStorage<Task[]>('tasks', []);
  const [taskInput, setTaskInput] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);

  const handleAddTask = () => {
    if (taskInput.trim() === '') return; // Prevent adding empty tasks
    if (isEditing && currentTaskId !== null) {

      // Update the task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === currentTaskId ? { ...task, text: taskInput } : task
        )
      );
      setIsEditing(false);
      setCurrentTaskId(null);
    } else {

      // Add a new task
      const newTask: Task = { id: Date.now(), text: taskInput };
      setTasks([...tasks, newTask]);
    }
    setTaskInput('');
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setTaskInput(taskToEdit.text);
      setIsEditing(true);
      setCurrentTaskId(id);
    }
  };

  return (
    <>
      <section className="w-full bg-[url('background.jpg')]	  bg-cover bg-no-repeat mx-auto h-screen flex flex-col justify-center items-center ">
        <h1 className="font-style text-5xl font-bold mb-5 text-white pr-2 border-r-2 border-pink-300">To-Do List</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="w-[700px] border-2 px-3 py-1 border-sky-300 outline-none hover:ring-1 ring-orange-300"
            placeholder="Write your task for today..."
          />
          <button
            onClick={handleAddTask}
            className="px-4 bg-blue-500 text-white font-style font-bold leading-tight hover:bg-blue-400 hover:rounded-md"
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
        <div className="w-[700px] mt-5 bg-white px-2 mr-[50px] overflow-y-auto " >
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center py-2 border-b"
              >
                <span>{task.text}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditTask(task.id)}
                    className="text-sm bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default App;
