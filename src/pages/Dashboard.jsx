
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

import { useState } from 'react';

export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);
  const [editingTask, setEditingTask] = useState(null); 

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskForm
          onCreated={() => {
            setRefresh(!refresh);
            setEditingTask(null);
          }}
          editingTask={editingTask} 
        />
        <TaskList
          refresh={refresh}
          onEdit={(task) => setEditingTask(task)} 
        />
      </div>
    </div>
  );
}
