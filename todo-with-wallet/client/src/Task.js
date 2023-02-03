import { React } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Task = ({ taskText, onClick }) => {
  return (
    <div className=' m-5 space-x-4 px-10 border border-sky-500 rounded-lg'>
      <List className="flex">
        <ListItem>
          <ListItemText primary={taskText} className=''/>
        </ListItem>
        <div className='self-center'>
          <DeleteIcon fontSize="medium" style={{ opacity: 0.7 }} onClick={onClick} />
        </div>
      </List>
    </div>
  );
};

export default Task;
