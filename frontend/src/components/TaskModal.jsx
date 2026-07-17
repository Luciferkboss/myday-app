import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const defaultForm = {
  title: '',
  description: '',
  category: 'Other',
  time: '',
  priority: 'Medium',
};

export default function TaskModal({ isOpen, onClose, editTask, selectedDate }) {
  const { addTask, updateTask } = useTasks();
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description || '',
        category: editTask.category,
        time: editTask.time || '',
        priority: editTask.priority,
      });
    } else {
      setForm(defaultForm);
    }
  }, [editTask, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Title is required');
    setSubmitting(true);
    try {
      if (editTask) {
        await updateTask(editTask._id, form);
        toast.success('Task updated!');
      } else {
        await addTask({ ...form, date: selectedDate });
        toast.success('Task added!');
      }
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editTask ? 'Edit Task' : 'Add New Task'}</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Task Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Morning jog"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Optional details..."
              rows={2}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {['Health', 'Work', 'Personal', 'Study', 'Fitness', 'Other'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange}>
                {['Low', 'Medium', 'High'].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : editTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
