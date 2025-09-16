import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from './Navbar';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await api.get(`/tasks/${id}`);
        setTask(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTask();
  }, [id]);

  if (!task) return <div className="p-6 text-center">Loading...</div>;

  // ✅ Priority badge colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-700 border border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-300';
    }
  };

  // ✅ Status badge colors
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto bg-white shadow rounded p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>

        <p className="text-gray-700 mb-2">
          <strong>Description:</strong> {task.description || 'No description'}
        </p>

        {/* ✅ Status badge */}
        <div className="mb-2">
          <strong>Status: </strong>
          <span
            className={`px-2 py-1 text-sm rounded-full font-semibold ${getStatusColor(
              task.status
            )}`}
          >
            {task.status}
          </span>
        </div>

        {/* ✅ Priority badge */}
        <div className="mb-2">
          <strong>Priority: </strong>
          <span
            className={`px-2 py-1 text-sm rounded-full font-semibold ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>

        <p className="text-gray-700">
          <strong>Due Date:</strong>{' '}
          {new Date(task.dueDate).toLocaleString()}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}
