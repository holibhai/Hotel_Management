import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const RoomResult = ({ roomSearchResults }) => {
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin();

  return (
    <section className="py-8 px-4">
      {roomSearchResults && roomSearchResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomSearchResults.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
            >
              <img
                src={room.roomPhotoUrl}
                alt={room.roomType}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {room.roomType}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium text-gray-800">Price:</span> ${room.roomPrice} / night
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Description:</span> {room.roomDescription}
                  </p>
                </div>

                <div className="mt-4">
                  {isAdmin ? (
                    <button
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition duration-300"
                      onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                    >
                      Edit Room
                    </button>
                  ) : (
                    <button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                      onClick={() => navigate(`/room-details-book/${room.id}`)}
                    >
                      View / Book Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RoomResult;
