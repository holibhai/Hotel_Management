import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ApiService.getUserProfile();
        const userPlusBookings = await ApiService.getUserBookings(response.user.id);
        setUser(userPlusBookings.user);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    ApiService.logout();
    navigate('/home');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {user && <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {user.name}</h2>}

      <div className="flex justify-end gap-4 mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

      {user && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">My Profile Details</h3>
          <p className="text-gray-600 mb-2">
            <strong className="text-gray-800">Email:</strong> {user.email}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Phone Number:</strong> {user.phoneNumber}
          </p>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">My Booking History</h3>
        <div className="space-y-6">
          {user && user.bookings.length > 0 ? (
            user.bookings.map((booking) => (
              <div key={booking.id} className="border p-4 rounded-lg shadow-sm">
                <p className="text-gray-700"><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
                <p className="text-gray-700"><strong>Check-in Date:</strong> {booking.checkInDate}</p>
                <p className="text-gray-700"><strong>Check-out Date:</strong> {booking.checkOutDate}</p>
                <p className="text-gray-700"><strong>Total Guests:</strong> {booking.totalNumOfGuest}</p>
                <p className="text-gray-700"><strong>Room Type:</strong> {booking.room.roomType}</p>
                <img
                  src={booking.room.roomPhotoUrl}
                  alt="Room"
                  className="w-full h-48 object-cover mt-3 rounded"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
