import TaskForm from "./TaskForm"
import TaskStatus from "./TaskStatus"
import Task from "./Task"
import loaderUrl from "../assets/loader.gif"

import { useEffect, useState } from "react"

import { toast } from 'react-toastify';
import axios from "axios"


const TaskList = () => {
  const [formData, setFormData] = useState({
    name: '',
    completed: false
  });

  const { name } = formData;

  const [tasks, setTasks] = useState([]);

  const [completedTasks, setCompletedTasks] = useState([]);

  const[isLoading, setIsLoading] = useState(false);

const handleInputChange = async (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
}

const createTask = async (e) => {
  e.preventDefault();
  if(!name.trim()) {
    return toast.error('Input field can not be empty')
  }

  try {
    await axios.post('/api/tasks', formData)
    return toast.success('Task was created');
  } catch (error) {
    return toast.error(error.message);
  }
}

const getTasks = async (e) => {
  setIsLoading(true);
  try {
    const { data } = await axios.get('/api/tasks');
    setTasks(data);
    setIsLoading(false);
  } catch (error) {
    return toast.error(error.message);
  }
}

useEffect(() => {
  getTasks();
}, []);

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm handleInputChange={ handleInputChange } 
                createTask={ createTask } />
      <TaskStatus />
      {
        isLoading && (
          <div className="--flex-center">
              <img src={ loaderUrl } alt="loader" />
          </div>
        )
      }
      {
        isLoading && !tasks.length 
        ? (<p className="--py">
          No task added
        </p>)
        : (<>
        {
        tasks.map((task, index,) => {
          console.log(task)
          return <Task key={task._id} name={task.name} index={index} />
        })}
        </>)
      }
      
    </div>
  )
}

export default TaskList