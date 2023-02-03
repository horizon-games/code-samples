import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Task from './Task';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Adds a task to the state
  const addTask = async (e) => {
    e.preventDefault();

    const task = {
      taskText: input,
      isDeleted: false,
    };

    setTasks([...tasks, task]);
    setInput('');
  };

  // Delete the task in position 'key' from the state
  const deleteTask = (key) => async () => {
    const newTasks = tasks;
    newTasks.splice(key,1);
    setTasks([...newTasks]);
  };

  return (
    <div className=''>
      {
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className='font-sans font-semibold text-lg mb-3'> Task Management App</h2>
          <form className=''>
            <TextField
              id="outlined-basic"
              label="Make Todo"
              variant="outlined"
              style={{ margin: '0px 10px' }}
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={addTask}>Add Task</Button>
          </form>
          <ul>
            {tasks.map((item, index) => (
              <Task
                key={item.taskText}
                taskText={item.taskText}
                onClick={deleteTask(index)}
              />
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
