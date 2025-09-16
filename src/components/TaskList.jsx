
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Pencil, Trash2 } from 'lucide-react';

export default function TaskList({ refresh, onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);

  const loadTasks = async () => {
    try {
      const { data } = await api.get(`/tasks?page=${page}&limit=5`);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [page, refresh]);

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB') + ', ' + d.toLocaleTimeString('en-US');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-red-100 text-red-700 border border-red-300';
      case 'InProgress':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
      case 'Completed':
        return 'bg-green-100 text-green-700 border border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-300';
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead>
            <tr className="bg-blue-100 text-gray-800">
              <th className="px-4 py-2 border">Task</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Deadline</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No tasks found
                </td>
              </tr>
            ) : (
              tasks.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50">
               
                  <td className="px-4 py-2 border font-medium text-blue-600 hover:underline">
                    <Link to={`/tasks/${t._id}`}>{t.title}</Link>
                  </td>

                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td className="px-4 py-2 border">{formatDate(t.dueDate)}</td>

                  <td className="px-4 py-2 border text-center space-x-2">
                   
                    <button
                      onClick={() => onEdit(t)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={18} />
                    </button>

                
                    <button
                      onClick={() => deleteTask(t._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 mt-4 justify-center">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
