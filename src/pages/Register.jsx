// import { useState, useContext } from 'react';
// import api from '../api/axios';
// import { AuthContext } from '../context/AuthContext';

// export default function Register() {
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ name:'', email: '', password: '' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { data } = await api.post('/auth/register', form);
//     login(data.token);
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
//         <h1 className="text-xl font-bold text-center">Register</h1>
//         <input className="w-full p-2 border rounded" placeholder="Name"
//           onChange={e => setForm({ ...form, name: e.target.value })} />
//         <input className="w-full p-2 border rounded" placeholder="Email"
//           onChange={e => setForm({ ...form, email: e.target.value })} />
//         <input className="w-full p-2 border rounded" placeholder="Password" type="password"
//           onChange={e => setForm({ ...form, password: e.target.value })} />
//         <button className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600">Register</button>
//       </form>
//     </div>
//   );
// }
import { useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name:'', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/register', form);
    login(data.token);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-200">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-10 rounded-2xl shadow-xl w-96 space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-green-700">Register</h1>
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input 
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 transition-colors">
          Register
        </button>
        <p className="text-center text-gray-500">
          Already have an account? <a href="/login" className="text-green-600 font-medium">Login</a>
        </p>
      </form>
    </div>
  );
}
