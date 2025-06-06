import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ApiService.getUserProfile();
        setUser(response.user);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDeleteProfile = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) {
      return;
    }
    try {
      await ApiService.deleteUser(user.id);
      navigate('/signup');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Profile</h2>

      {error && (
        <p className="mb-4 text-red-600 text-sm text-center font-medium">{error}</p>
      )}

      {user && (
        <div className="space-y-4">
          <p className="text-gray-700">
            <strong className="font-medium text-gray-800">Name:</strong> {user.name}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-800">Email:</strong> {user.email}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-800">Phone Number:</strong> {user.phoneNumber}
          </p>

          <div className="pt-4">
            <button
              onClick={handleDeleteProfile}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;
