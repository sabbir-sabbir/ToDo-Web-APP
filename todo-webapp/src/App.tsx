"use client"

import { useState } from 'react';
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

      // Task updatedd
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
      <section className="w-full bg-[url('/backgroundtwo.jpg')]	  bg-cover bg-no-repeat mx-auto h-screen flex flex-col justify-center items-center ">
      <div className='flex  gap-8'>
        <div> <h1 className="font-style text-lg md:text-3xl  lg:text-5xl font-bold mb-5 text-white pr-6 border-r-2 border-pink-300">To-Do List </h1></div>
       <div><span ><img   className='w-8 h-8  md:w-12 md:h-12 ' src="addtask.png" alt="task" /></span></div>
      </div>
       
        <div className="flex gap-1">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className=" w-[400px] md:w-[600px]  lg:w-[700px] border-2 px-3 py-1 ml-5 md:ml-0 border-sky-300 outline-none bg-slate-200 hover:ring-1 ring-orange-200"
            placeholder="Write your task for today..."
          />
          <button
            onClick={handleAddTask}
            className="px-4 bg-blue-500 text-white  font-bold leading-tight hover:bg-blue-400 hover:rounded-md"
          >
            {isEditing ? 'Update' : 'ADD'}
          </button>
        </div>
        <div className=" w-[400px] md:w-[600px]  lg:w-[700px]  ml-12 md:ml-0 mt-5 bg-slate-200 px-2 mr-[50px] overflow-y-auto " >
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
