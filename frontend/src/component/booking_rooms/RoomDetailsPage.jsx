import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoomDetailsPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roomId]);

  const handleConfirmBooking = () => {
    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Please select check-in and check-out dates.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
      setErrorMessage('Please enter valid numbers for adults and children.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    const guests = numAdults + numChildren;
    const price = roomDetails.roomPrice * totalDays;

    setTotalGuests(guests);
    setTotalPrice(price);
  };

  const acceptBooking = async () => {
    try {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const formattedCheckInDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      const formattedCheckOutDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numOfAdults: numAdults,
        numOfChildren: numChildren
      };

      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate('/rooms');
        }, 10000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  if (isLoading) return <p className="text-center text-lg">Loading room details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!roomDetails) return <p className="text-center">Room not found.</p>;

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } = roomDetails;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {showMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4 text-center">
          Booking successful! Confirmation code: {confirmationCode}. An SMS and email have been sent.
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">
          {errorMessage}
        </div>
      )}

      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Room Details</h2>
      <img src={roomPhotoUrl} alt={roomType} className="w-full h-64 object-cover rounded shadow-md mb-4" />
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-700">{roomType}</h3>
        <p className="text-lg text-gray-600 mb-1">Price: ${roomPrice} / night</p>
        <p className="text-gray-700">{description}</p>
      </div>

      {bookings?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Existing Bookings</h3>
          <ul className="space-y-1">
            {bookings.map((booking, index) => (
              <li key={booking.id} className="bg-gray-100 p-2 rounded">
                <span className="font-medium">Booking {index + 1}</span> — Check-in: {booking.checkInDate} | Check-out: {booking.checkOutDate}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button
          onClick={() => setShowDatePicker(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book Now
        </button>
        <button
          onClick={() => setShowDatePicker(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Go Back
        </button>
      </div>

      {showDatePicker && (
        <div className="bg-gray-50 p-4 rounded shadow mb-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              placeholderText="Check-in Date"
              dateFormat="dd/MM/yyyy"
              className="border px-4 py-2 rounded w-full sm:w-1/2"
            />
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate}
              placeholderText="Check-out Date"
              dateFormat="dd/MM/yyyy"
              className="border px-4 py-2 rounded w-full sm:w-1/2"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-600 mb-1">Adults</label>
              <input
                type="number"
                min="1"
                value={numAdults}
                onChange={(e) => setNumAdults(parseInt(e.target.value))}
                className="border px-3 py-2 w-full rounded"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-600 mb-1">Children</label>
              <input
                type="number"
                min="0"
                value={numChildren}
                onChange={(e) => setNumChildren(parseInt(e.target.value))}
                className="border px-3 py-2 w-full rounded"
              />
            </div>
          </div>

          <button
            onClick={handleConfirmBooking}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm Booking
          </button>
        </div>
      )}

      {totalPrice > 0 && (
        <div className="bg-blue-50 p-4 rounded shadow space-y-2">
          <p className="text-blue-700 font-medium">Total Price: ${totalPrice}</p>
          <p className="text-blue-700">Total Guests: {totalGuests}</p>
          <button
            onClick={acceptBooking}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Accept Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomDetailsPage;
