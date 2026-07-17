import { useTasks } from '../context/TaskContext';
import { Trash2, Edit2, Clock, Tag, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const priorityColors = {
  High: 'priority-high',
  Medium: 'priority-medium',
  Low: 'priority-low',
};

const categoryColors = {
  Health: 'cat-health',
  Work: 'cat-work',
  Personal: 'cat-personal',
  Study: 'cat-study',
  Fitness: 'cat-fitness',
  Other: 'cat-other',
};

export default function TaskCard({ task, onEdit }) {
  const { toggleTask, deleteTask } = useTasks();

  const handleToggle = async () => {
    try {
      await toggleTask(task._id);
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(task._id);
      toast.success('Task deleted');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className={`task-card ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-card-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="task-checkbox"
        />
      </div>
      <div className="task-card-body">
        <div className="task-card-header">
          <h3 className={`task-title ${task.completed ? 'strikethrough' : ''}`}>
            {task.title}
          </h3>
          <div className="task-badges">
            <span className={`badge ${priorityColors[task.priority]}`}>
              <AlertCircle size={11} />
              {task.priority}
            </span>
            <span className={`badge ${categoryColors[task.category]}`}>
              <Tag size={11} />
              {task.category}
            </span>
          </div>
        </div>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        {task.time && (
          <div className="task-time">
            <Clock size={13} />
            <span>{task.time}</span>
          </div>
        )}
      </div>
      <div className="task-card-actions">
        <button onClick={() => onEdit(task)} className="icon-btn edit-btn" title="Edit">
          <Edit2 size={15} />
        </button>
        <button onClick={handleDelete} className="icon-btn delete-btn" title="Delete">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
