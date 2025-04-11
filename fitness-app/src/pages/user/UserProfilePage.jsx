import React, { useState, useEffect } from 'react';

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    // Replace with your actual API call to fetch user data
    const fetchUserProfile = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const userData = {
          id: 123,
          username: 'FitUser',
          email: 'fituser@example.com',
          displayName: 'Awesome Fit User',
          registrationDate: '2024-01-15',
          profilePicture: 'https://via.placeholder.com/150',
          // Add other relevant profile fields
        };
        setUser(userData);
        setUpdatedUser(userData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile information.', err);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    // Replace with your actual API call to update user profile
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(updatedUser);
      setIsEditing(false);
      alert('Profile updated successfully!'); // Replace with a better notification
    } catch (err) {
        
      setError('Failed to update profile.', err);
    }
  };

  const handleCancelEdit = () => {
    setUpdatedUser(user);
    setIsEditing(false);
  };

  if (loading) {
    return <div className="container mx-auto py-8">Loading profile information...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="container mx-auto py-8">No profile information available.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>

      <div className="bg-white shadow-md rounded-md p-6">
        <div className="mb-4 flex items-center">
          <img src={user.profilePicture} alt="Profile" className="rounded-full w-20 h-20 object-cover" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{user.displayName || user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500 text-sm">Registered on: {new Date(user.registrationDate).toLocaleDateString()}</p>
          </div>
        </div>

        {isEditing ? (
          <div>
            <div className="mb-4">
              <label htmlFor="displayName" className="block text-gray-700 text-sm font-bold mb-2">Display Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={updatedUser.displayName || ''}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Add more editable fields as needed */}
            <div className="flex gap-2">
              <button onClick={handleSaveProfile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save
              </button>
              <button onClick={handleCancelEdit} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={handleEditProfile} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;