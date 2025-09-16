// import { useEffect, useState } from 'react';
// import api from '../api/axios';

// export default function TaskList({ refresh, onEdit }) {
//   const [tasks, setTasks] = useState([]);
//   const [page, setPage] = useState(1);s

//   const loadTasks = async () => {
//     try {
//       const { data } = await api.get(`/tasks?page=${page}&limit=5`);
//       setTasks(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     loadTasks();
//   }, [page, refresh]);

//   const deleteTask = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this task?')) return;
//     try {
//       await api.delete(`/tasks/${id}`);
//       loadTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return '';
//     const d = new Date(dateStr);
//     return d.toLocaleDateString('en-GB') + ', ' + d.toLocaleTimeString('en-US');
//   };

//   return (
//     <div className="bg-blue p-4 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4 text-center">Todo List</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 text-sm text-left">
//           <thead>
//             <tr className="bg-blue-100 text-gray-800">
//               <th className="px-4 py-2 border">Task</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Deadline</th>
//               <th className="px-4 py-2 border text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-gray-500">
//                   No tasks found
//                 </td>
//               </tr>
//             ) : (
//               tasks.map((t) => (
//                 <tr key={t._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border font-medium">{t.title}</td>
//                   <td className="px-4 py-2 border">{t.status}</td>
//                   <td className="px-4 py-2 border">{formatDate(t.dueDate)}</td>
//                   <td className="px-4 py-2 border text-center space-x-2">
//                     <button
//                       onClick={() => onEdit && onEdit(t)}
//                       className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteTask(t._id)}
//                       className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex gap-2 mt-4 justify-center">
//         <button
//           onClick={() => setPage((p) => Math.max(p - 1, 1))}
//           className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//         >
//           Prev
//         </button>
//         <button
//           onClick={() => setPage((p) => p + 1)}
//           className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from 'react';
// import api from '../api/axios';

// export default function TaskForm({ onCreated, editingTask, onUpdated, clearEdit }) {
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     dueDate: '',
//     priority: 'Low',
//     status: 'Pending'
//   });

//   useEffect(() => {
//     if (editingTask) {
//       setForm({
//         title: editingTask.title,
//         description: editingTask.description,
//         dueDate: editingTask.dueDate?.slice(0,10),
//         priority: editingTask.priority || 'Low',
//         status: editingTask.status || 'Pending'
//       });
//     }
//   }, [editingTask]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingTask) {
//       await api.put(`/tasks/${editingTask._id}`, form);
//       onUpdated();
//       clearEdit();
//     } else {
//       await api.post('/tasks', form);
//       onCreated();
//     }

//     setForm({ title: '', description: '', dueDate: '', priority: 'Low', status: 'Pending' });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800 text-center">
//         {editingTask ? 'Edit Task' : 'Create Task'}
//       </h2>

//       {/* Title & Due Date */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="block mb-2">Title</label>
//           <input
//             type="text"
//             required
//             className="w-full p-3 border rounded"
//             value={form.title}
//             onChange={e => setForm({ ...form, title: e.target.value })}
//           />
//         </div>
//         <div>
//           <label className="block mb-2">Due Date</label>
//           <input
//             type="date"
//             required
//             className="w-full p-3 border rounded"
//             value={form.dueDate}
//             onChange={e => setForm({ ...form, dueDate: e.target.value })}
//           />
//         </div>
//       </div>

//       {/* Description */}
//       <div>
//         <label className="block mb-2">Description</label>
//         <textarea
//           required
//           className="w-full p-3 border rounded"
//           rows={4}
//           value={form.description}
//           onChange={e => setForm({ ...form, description: e.target.value })}
//         />
//       </div>

//       {/* Priority */}
//       <div>
//         <label className="block mb-2">Priority</label>
//         <select
//           className="w-full p-3 border rounded"
//           value={form.priority}
//           onChange={e => setForm({ ...form, priority: e.target.value })}
//         >
//           <option>Low</option>
//           <option>Medium</option>
//           <option>High</option>
//         </select>
//       </div>

//       {/* Status */}
//       <div>
//         <label className="block mb-2">Status</label>
//         <select
//           className="w-full p-3 border rounded"
//           value={form.status}
//           onChange={e => setForm({ ...form, status: e.target.value })}
//         >
//           <option>Pending</option>
//           <option>In Progress</option>
//           <option>Completed</option>
//         </select>
//       </div>

//       <button
//         type="submit"
//         className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         {editingTask ? 'Update Task' : 'Add Task'}
//       </button>

//       {editingTask && (
//         <button
//           type="button"
//           onClick={clearEdit}
//           className="w-full py-2 mt-2 bg-gray-300 text-gray-700 rounded"
//         >
//           Cancel Edit
//         </button>
//       )}
//     </form>
//   );
// }
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

  // Jab editingTask change ho to form me data set karo
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

  