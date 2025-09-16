import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
    </nav>
  );
}
