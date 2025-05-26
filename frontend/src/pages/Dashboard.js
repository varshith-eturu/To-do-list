import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { getToken, removeToken } from '../auth';
import './Dashboard.css';

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('Incomplete');
  const [sortOrder, setSortOrder] = useState('Earliest');
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks', {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Error fetching tasks');
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  const handleAddTask = async () => {
    if (!title || !description || !priority || !deadline) {
      alert('Please fill all fields');
      return;
    }

    try {
      const newTask = {
        title,
        description,
        priority,
        deadline
      };

      const res = await api.post('/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      setTasks([...tasks, res.data]);
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDeadline('');
    } catch (err) {
      console.error(err);
      alert('Failed to add task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete task');
    }
  };

  const handleMarkAsDone = async (id) => {
    try {
      await api.put(`/tasks/${id}`, { completed: true }, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to mark as done');
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setDeadline(task.deadline.slice(0, 10));
    setEditId(task._id);
  };

  const handleUpdateTask = async () => {
    if (!editId) return;

    try {
      await api.put(`/tasks/${editId}`, {
        title,
        description,
        priority,
        deadline
      }, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      setEditId(null);
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDeadline('');
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to update task');
    }
  };

  const filteredTasks = tasks
    .filter(task => {
      return filterPriority === 'All' || task.priority === filterPriority;
    })
    .filter(task => {
      if (filterStatus === 'All') return true;
      return filterStatus === 'Completed' ? task.completed : !task.completed;
    })
    .sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return sortOrder === 'Earliest' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button className="add-task-button" onClick={editId ? handleUpdateTask : handleAddTask}>
        {editId ? 'Update Task' : 'Add Task'}
      </button>

      <div className="filters">
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="Earliest">Earliest First</option>
          <option value="Latest">Latest First</option>
        </select>
      </div>

      {filteredTasks.map((task) => (
        <div key={task._id} className="task-item">
          <strong>{task.title}</strong> - {task.description} ({task.priority})
          <div className="task-actions">
            {!task.completed && (
              <button onClick={() => handleMarkAsDone(task._id)}>Mark as Done</button>
            )}
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
