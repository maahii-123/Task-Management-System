
import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function TaskForm({ onCreated, editingTask, onCancelEdit }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Pending',
  });

 
  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        dueDate: editingTask.dueDate?.slice(0, 10) || '',
        priority: editingTask.priority,
        status: editingTask.status || 'Pending',
      });
    } else {
      setForm({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low',
        status: 'Pending',
      });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingTask) {
      await api.put(`/tasks/${editingTask._id}`, form);
    } else {
      await api.post('/tasks', form);
    }

    if (onCreated) onCreated();

   
    setForm({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Low',
      status: 'Pending',
    });
  };

  const clearEdit = () => {
    if (onCancelEdit) onCancelEdit(); 
    setForm({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Low',
      status: 'Pending',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        {editingTask ? 'Edit Task' : 'Create Task'}
      </h2>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            required
            className="w-full p-3 border rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-2">Due Date</label>
          <input
            type="date"
            required
            className="w-full p-3 border rounded"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>
      </div>

     
      <div>
        <label className="block mb-2">Description</label>
        <textarea
          required
          className="w-full p-3 border rounded"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block mb-2">Priority</label>
        <select
          className="w-full p-3 border rounded"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

     
      <div>
        <label className="block mb-2">Status</label>
        <select
          className="w-full p-3 border rounded"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Pending</option>
          <option>InProgress</option>
          <option>Completed</option>
        </select>
      </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>

      {editingTask && (
        <button
          type="button"
          onClick={clearEdit}
          className="w-full py-2 mt-2 bg-gray-300 text-gray-700 rounded"
        >
          Cancel Edit
        </button>
      )}
      </div>
    </form>
  );
}

  