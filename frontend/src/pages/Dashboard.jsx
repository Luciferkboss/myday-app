import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import StatsBar from '../components/StatsBar';
import { Plus, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const toDateStr = (date) => date.toISOString().split('T')[0];

const formatDisplay = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const isToday = (dateStr) => toDateStr(new Date()) === dateStr;

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(toDateStr(new Date()));
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('All');
  const { tasks, loading, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks(selectedDate);
  }, [selectedDate, fetchTasks]);

  const navigateDay = (dir) => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + dir);
    setSelectedDate(toDateStr(d));
  };

  const goToday = () => setSelectedDate(toDateStr(new Date()));

  const openAdd = () => {
    setEditTask(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditTask(null);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return t.completed;
    if (filter === 'Pending') return !t.completed;
    return t.category === filter;
  });

  const categories = ['All', 'Pending', 'Completed', 'Health', 'Work', 'Personal', 'Study', 'Fitness', 'Other'];

  return (
    <div className="dashboard">
      {/* Date Navigator */}
      <div className="date-navigator">
        <button className="icon-btn nav-btn" onClick={() => navigateDay(-1)}>
          <ChevronLeft size={20} />
        </button>
        <div className="date-display">
          <Calendar size={18} />
          <span className="date-text">{formatDisplay(selectedDate)}</span>
          {isToday(selectedDate) && <span className="today-badge">Today</span>}
        </div>
        <button className="icon-btn nav-btn" onClick={() => navigateDay(1)}>
          <ChevronRight size={20} />
        </button>
        {!isToday(selectedDate) && (
          <button className="btn btn-ghost btn-sm today-btn" onClick={goToday}>
            Today
          </button>
        )}
      </div>

      {/* Stats */}
      <StatsBar tasks={tasks} />

      {/* Filter + Add */}
      <div className="task-toolbar">
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} />
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {loading ? (
          <div className="empty-state">
            <div className="spinner" />
            <p>Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">
            <Calendar size={48} className="empty-icon" />
            <h3>No tasks for this day</h3>
            <p>Click <strong>Add Task</strong> to create your first routine!</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={openEdit} />
          ))
        )}
      </div>

      {/* Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={closeModal}
        editTask={editTask}
        selectedDate={selectedDate}
      />
    </div>
  );
}
