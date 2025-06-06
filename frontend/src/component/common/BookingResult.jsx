import React from 'react';
import { Link } from 'react-router-dom';

const BookingResult = ({ bookingSearchResults }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Booking Results</h2>
      
      {bookingSearchResults.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-6 text-center">
          <p className="text-gray-600">No bookings found</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-700">
            <div className="col-span-2">Room ID</div>
            <div className="col-span-2">User ID</div>
            <div className="col-span-2">Start Date</div>
            <div className="col-span-2">End Date</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Action</div>
          </div>
          
          {bookingSearchResults.map((booking) => (
            <div 
              key={booking.id} 
              className="grid grid-cols-12 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="col-span-2 text-gray-700">{booking.roomId}</div>
              <div className="col-span-2 text-gray-700">{booking.userId}</div>
              <div className="col-span-2 text-gray-700">{booking.startDate}</div>
              <div className="col-span-2 text-gray-700">{booking.endDate}</div>
              <div className="col-span-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              <div className="col-span-2">
                <Link 
                  to={`/admin/edit-booking/${booking.id}`} 
                  className="inline-flex items-center px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded-md transition-colors duration-300"
                >
                  Edit
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingResult;