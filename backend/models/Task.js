const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      enum: ['Health', 'Work', 'Personal', 'Study', 'Fitness', 'Other'],
      default: 'Other',
    },
    time: {
      type: String,
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String, // stored as 'YYYY-MM-DD'
      required: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
