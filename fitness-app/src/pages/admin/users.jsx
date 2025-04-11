import React, { useState, useEffect } from 'react';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = (userId) => {
    console.log(`Deleting user with ID: ${userId}`);
    // Implement your API call to delete the user
    // After successful deletion, update the users state:
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEditUser = (userId) => {
    console.log(`Editing user with ID: ${userId}`);
    // Implement your logic to edit the user (e.g., navigate to an edit page or open a modal)
  };

  const handleBlockUnblockUser = async (userId, isCurrentlyBlocked) => {
    const action = isCurrentlyBlocked ? 'unblock' : 'block';
    console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} user with ID: ${userId}`);

    try {
      const response = await fetch(`/api/admin/users/${userId}/${action}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary authorization headers
        },
        // You might need to send a body depending on your API
        // body: JSON.stringify({ /* ... */ }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Failed to update user status'}`);
      }

      // Update the local state to reflect the change
      setUsers(users.map(user =>
        user.id === userId ? { ...user, isBlocked: !isCurrentlyBlocked } : user
      ));

    } catch (e) {
      console.error(`Error ${action}ing user:`, e);
      setError(e.message);
      // Optionally, you could show a more user-friendly error message
    }
  };

  if (loading) {
    return <div className="container mx-auto py-12">Loading users...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-12 text-red-500">Error loading users: {error}</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin - User Management</h1>

      <div className="bg-white shadow-md rounded-md overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Username
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Registered
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {user.id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {user.username}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {user.email}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {user.isBlocked ? (
                    <span className="text-red-500 font-semibold">Blocked</span>
                  ) : (
                    <span className="text-green-500 font-semibold">Active</span>
                  )}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {new Date(user.registrationDate).toLocaleDateString()}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button onClick={() => handleEditUser(user.id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                    Edit
                  </button>
                  <button
                    onClick={() => handleBlockUnblockUser(user.id, user.isBlocked)}
                    className={`bg-${user.isBlocked ? 'green' : 'red'}-500 hover:bg-${user.isBlocked ? 'green' : 'red'}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsersPage;