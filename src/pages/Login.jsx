
// import { useState, useContext } from 'react'; 
// import api from '../api/axios';
// import { AuthContext } from '../context/AuthContext';

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Validate fields
//     if (!form.email || !form.password) {
//       alert('Please enter both email and password');
//       return;
//     }

//     try {
//       setLoading(true);
//       const { data } = await api.post('/auth/login', form);
//       login(data.token); // Save token in context
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
//         <h1 className="text-xl font-bold text-center">Login</h1>
        
//         <input
//           className="w-full p-2 border rounded"
//           placeholder="Email"
//           type="email"
//           value={form.email}
//           onChange={e => setForm({ ...form, email: e.target.value })}
//         />
        
//         <input
//           className="w-full p-2 border rounded"
//           placeholder="Password"
//           type="password"
//           value={form.password}
//           onChange={e => setForm({ ...form, password: e.target.value })}
//         />

//         <button
//           type="submit"
//           className={`bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 ${
//             loading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//           disabled={loading}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', form);
    login(data.token);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-10 rounded-2xl shadow-xl w-96 space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-blue-700">Login</h1>
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input 
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Login
        </button>
        <p className="text-center text-gray-500">
          Don't have an account? <a href="/register" className="text-blue-600 font-medium">Register</a>
        </p>
      </form>
    </div>
  );
}
