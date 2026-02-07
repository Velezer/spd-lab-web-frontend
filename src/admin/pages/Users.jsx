import React, { useState } from 'react';

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Users Management</h1>
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-gray-300">ID</th>
              <th className="px-6 py-3 text-gray-300">Name</th>
              <th className="px-6 py-3 text-gray-300">Email</th>
              <th className="px-6 py-3 text-gray-300">Role</th>
              <th className="px-6 py-3 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-600">
                <td className="px-6 py-4 text-gray-300">{user.id}</td>
                <td className="px-6 py-4 text-white">{user.name}</td>
                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                <td className="px-6 py-4 text-cyan-400">{user.role}</td>
                <td className="px-6 py-4">
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
