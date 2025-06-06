import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';

const AdminPage = () => {
  const [adminName, setAdminName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await ApiService.getUserProfile();
        setAdminName(response.user.name);
      } catch (error) {
        console.error('Error fetching admin details:', error.message);
      }
    };

    fetchAdminName();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Welcome, <span className="text-blue-600">{adminName || 'Admin'}</span>
        </h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/admin/manage-rooms')}
            className="w-full py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Manage Rooms
          </button>

          <button
            onClick={() => navigate('/admin/manage-bookings')}
            className="w-full py-3 bg-green-600 text-white rounded-md text-lg font-semibold hover:bg-green-700 transition duration-200"
          >
            Manage Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
