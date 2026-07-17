import { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async (date) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/tasks?date=${date}`);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (taskData) => {
    const { data } = await api.post('/tasks', taskData);
    setTasks((prev) => [...prev, data]);
    return data;
  };

  const updateTask = async (id, taskData) => {
    const { data } = await api.put(`/tasks/${id}`, taskData);
    setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    return data;
  };

  const toggleTask = async (id) => {
    const { data } = await api.patch(`/tasks/${id}/toggle`);
    setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    return data;
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks, addTask, updateTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
