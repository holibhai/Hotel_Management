import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditRoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState({
    roomPhotoUrl: '',
    roomType: '',
    roomPrice: '',
    roomDescription: '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails({
          roomPhotoUrl: response.room.roomPhotoUrl,
          roomType: response.room.roomType,
          roomPrice: response.room.roomPrice,
          roomDescription: response.room.roomDescription,
        });
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };
    fetchRoomDetails();
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('roomType', roomDetails.roomType);
      formData.append('roomPrice', roomDetails.roomPrice);
      formData.append('roomDescription', roomDetails.roomDescription);
      if (file) formData.append('photo', file);

      const result = await ApiService.updateRoom(roomId, formData);
      if (result.statusCode === 200) {
        setSuccess('Room updated successfully.');
        setTimeout(() => {
          setSuccess('');
          navigate('/admin/manage-rooms');
        }, 3000);
      }
      setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Do you want to delete this room?')) {
      try {
        const result = await ApiService.deleteRoom(roomId);
        if (result.statusCode === 200) {
          setSuccess('Room deleted successfully.');
          setTimeout(() => {
            setSuccess('');
            navigate('/admin/manage-rooms');
          }, 3000);
        }
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Edit Room</h2>

        {error && (
          <p className="mb-4 text-red-600 bg-red-100 p-3 rounded font-medium">{error}</p>
        )}
        {success && (
          <p className="mb-4 text-green-700 bg-green-100 p-3 rounded font-medium">{success}</p>
        )}

        <div className="space-y-6">
          {/* Image preview and file input */}
          <div className="flex flex-col items-center">
            {(preview || roomDetails.roomPhotoUrl) && (
              <img
                src={preview || roomDetails.roomPhotoUrl}
                alt="Room Preview"
                className="w-64 h-40 object-cover rounded-md mb-4 shadow-sm"
              />
            )}
            <input
              type="file"
              name="roomPhoto"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100
              "
            />
          </div>

          {/* Room Type */}
          <div>
            <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
              Room Type
            </label>
            <input
              type="text"
              id="roomType"
              name="roomType"
              value={roomDetails.roomType}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 
                         placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter room type"
            />
          </div>

          {/* Room Price */}
          <div>
            <label htmlFor="roomPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Room Price
            </label>
            <input
              type="text"
              id="roomPrice"
              name="roomPrice"
              value={roomDetails.roomPrice}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 
                         placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter room price"
            />
          </div>

          {/* Room Description */}
          <div>
            <label htmlFor="roomDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Room Description
            </label>
            <textarea
              id="roomDescription"
              name="roomDescription"
              value={roomDetails.roomDescription}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 
                         placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
              placeholder="Enter room description"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between space-x-4">
            <button
              onClick={handleUpdate}
              className="flex-1 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm
                         hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update Room
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm
                         hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoomPage;
