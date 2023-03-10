import TaskForm from "./TaskForm";
import TaskStatus from "./TaskStatus";
import Task from "./Task";
import loaderUrl from "../assets/loader.gif";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

const TaskList = () => {
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  const [tasks, setTasks] = useState([]);

  const [completedTasks, setCompletedTasks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [taskId, setTaskId] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const tasksLength = tasks.length;
  const cTasksLength = completedTasks.length;

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getTasks = async (e) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/tasks");
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.error("Input field can not be empty");
    }

    try {
      await axios.post("/api/tasks", formData);
      setFormData({ ...formData, name: "" });
      getTasks();
      return toast.success("Task was created");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      getTasks();
      return toast.success("Task was deleted");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({
      name: task.name,
      completed: false,
    });
    setTaskId(task._id);
    setIsEdit(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.error("Input field can not be empty");
    }
    try {
      await axios.put(`/api/tasks/${taskId}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEdit(false);
      getTasks();
      return toast.success("Task was updated");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  const completedTask = async (task) => {
    const newData = {
      name: task.name,
      completed: !task.completed,
    };
    try {
      await axios.put(`/api/tasks/${task._id}`, newData);
      getTasks();
      return toast.success("Tas status was changed");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    const cTasks = tasks.filter(task => {
      return task.completed === true;
    });
    setCompletedTasks(cTasks);
  }, [tasks])

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        createTask={createTask}
        updateTask={updateTask}
        handleInputChange={handleInputChange}
        isEdit={isEdit}
      />
      { tasksLength > 0 && <TaskStatus tasksLength={tasksLength} cTasksLength={cTasksLength} /> }
      {isLoading && (
        <div className="--flex-center">
          <img src={loaderUrl} alt="loader" />
        </div>
      )}
      {!isLoading && !tasksLength ? (
        <p className="--py"> There is no added task </p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                completedTask={completedTask}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
