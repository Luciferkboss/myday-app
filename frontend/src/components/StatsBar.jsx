import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <ListTodo size={20} className="stat-icon total-icon" />
        <div>
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total</div>
        </div>
      </div>
      <div className="stat-card">
        <CheckCircle2 size={20} className="stat-icon done-icon" />
        <div>
          <div className="stat-number">{completed}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>
      <div className="stat-card">
        <Clock size={20} className="stat-icon pending-icon" />
        <div>
          <div className="stat-number">{pending}</div>
          <div className="stat-label">Pending</div>
        </div>
      </div>
      <div className="stat-card progress-card">
        <div className="progress-info">
          <span className="stat-label">Daily Progress</span>
          <span className="progress-percent">{percent}%</span>
        </div>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
