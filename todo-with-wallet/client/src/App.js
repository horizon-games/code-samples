import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { sequence } from '0xsequence';
import { ethers } from 'ethers';
import TodoAbi from './utils/Todo.json';
import Task from './Task';
import { TodoContractAddress } from './config';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const goerliChainId = '0x05';

  // This assumes your dapp runs on Goerli and initiates the sequence wallet
  sequence.initWallet('goerli');

  // Calls the contract to get all current tasks and loads it in the State
  const getAllTasks = async () => {
    try {
      const wallet = sequence.getWallet();

      if (wallet) {

        const signer = wallet.getSigner();

        const TaskContract = new ethers.Contract(
          TodoContractAddress,
          TodoAbi.abi,
          signer,
        );

        const allTasks = await TaskContract.getMyTasks();

        setTasks(allTasks);

      } else {
        console.log('Not signed in');
      }
    } catch (error) {
      console.log(error);
    }
  };


  // Calls Sequence to connect wallet and update if there are any tasks already
  const connectWallet = async () => {
    const wallet = sequence.getWallet();

    const connectDetails = await wallet.connect({
      networkId: goerliChainId,
      app: 'Todo',
      authorize: true,
      settings: {
        theme: 'light',
      },
    });

    console.log(connectDetails);

    if (!connectDetails.connected) {
      console.log('User wallet not connected. Error:', connectDetails.error);
    } else if (connectDetails.connected) {
      console.log('Users signed connect proof to valid their account address:', connectDetails.proof);
    }

    getAllTasks();
    setCurrentAccount(connectDetails.session.accountDetails);
  };

  const addTask = async (e) => {
    e.preventDefault();

    const task = {
      taskText: input,
      isDeleted: false,
    };

    try {
      const wallet = sequence.getWallet();

      if (wallet) {
        const signer = wallet.getSigner(goerliChainId);
        const TaskContract = new ethers.Contract(
          TodoContractAddress,
          TodoAbi.abi,
          signer,
        );

        await TaskContract.addTask(task.taskText, task.isDeleted)
          .then((response) => {
            setTasks([...tasks, task]);
            console.log('Completed Task', response);
          })
          .catch((err) => {
            console.log('Error occured while adding a new task', err);
          });
      } else {
        console.log('Ethereum object doesn\'t exist!');
      }
    } catch (error) {
      console.log('Error submitting new TODO', error);
    }

    setInput('');
  };

  const deleteTask = (key) => async () => {

    // The key of our TODO is the index in the smart contract which should be the same as the index in our React state.
    try {
      const wallet = sequence.getWallet();

      if (wallet) {
        const signer = wallet.getSigner();

        const TaskContract = new ethers.Contract(
          TodoContractAddress,
          TodoAbi.abi,
          signer,
        );

        await TaskContract.deleteTask(key, true);

        const allTasks = await TaskContract.getMyTasks();

        setTasks(allTasks);
      } else {
        console.log('Ethereum object doesn\'t exist');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=''>
      {currentAccount === '' ? (
        <div className="flex items-center justify-center h-screen">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      ) : (
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
                key={index}
                taskText={item.taskText}
                onClick={deleteTask(item.id)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
