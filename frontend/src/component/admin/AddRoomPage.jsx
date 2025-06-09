import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const AddRoomPage = () => {
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
  const [roomTypes, setRoomTypes] = useState([]);
  const [newRoomType, setNewRoomType] = useState(false);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching room types:', error.message);
      }
    };
    fetchRoomTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoomTypeChange = (e) => {
    if (e.target.value === 'new') {
      setNewRoomType(true);
      setRoomDetails((prevState) => ({ ...prevState, roomType: '' }));
    } else {
      setNewRoomType(false);
      setRoomDetails((prevState) => ({ ...prevState, roomType: e.target.value }));
    }
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

  const addRoom = async () => {
    if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomDescription) {
      setError('All room details must be provided.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    if (!window.confirm('Do you want to add this room?')) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('roomType', roomDetails.roomType);
      formData.append('roomPrice', roomDetails.roomPrice);
      formData.append('roomDescription', roomDetails.roomDescription);

      if (file) {
        formData.append('photo', file);
      }

      const result = await ApiService.addRoom(formData);
      if (result.statusCode === 200) {
        setSuccess('Room Added successfully.');

        setTimeout(() => {
          setSuccess('');
          navigate('/admin/manage-rooms');
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Add New Room</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center">
            {success}
          </div>
        )}

        <div className="space-y-6">
          <div>
            {preview && (
              <img
                src={preview}
                alt="Room Preview"
                className="w-full h-64 object-cover rounded-md mb-3 border border-gray-300"
              />
            )}
            <input
              type="file"
              name="roomPhoto"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100
              "
            />
          </div>

          <div>
            <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
              Room Type
            </label>
            <select
              id="roomType"
              name="roomType"
              value={roomDetails.roomType}
              onChange={handleRoomTypeChange}
              className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3
                         shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Select a room type</option>
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
              <option value="new">Other (please specify)</option>
            </select>

            {newRoomType && (
              <input
                type="text"
                name="roomType"
                placeholder="Enter new room type"
                value={roomDetails.roomType}
                onChange={handleChange}
                className="mt-3 block w-full rounded-md border border-gray-300 py-2 px-3
                           shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            )}
          </div>

          <div>
            <label htmlFor="roomPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Room Price
            </label>
            <input
              type="text"
              name="roomPrice"
              id="roomPrice"
              value={roomDetails.roomPrice}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 py-2 px-3
                         shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="roomDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Room Description
            </label>
            <textarea
              name="roomDescription"
              id="roomDescription"
              value={roomDetails.roomDescription}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-md border border-gray-300 py-2 px-3
                         shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 resize-none"
            ></textarea>
          </div>

          <button
            onClick={addRoom}
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPage;
