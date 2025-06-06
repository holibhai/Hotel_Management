import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditBookingPage = () => {
  const navigate = useNavigate();
  const { bookingCode } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await ApiService.getBookingByConfirmationCode(bookingCode);
        setBookingDetails(response.booking);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchBookingDetails();
  }, [bookingCode]);

  const acheiveBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to Achieve this booking?')) return;

    try {
      const response = await ApiService.cancelBooking(bookingId);
      if (response.statusCode === 200) {
        setSuccessMessage("The booking was successfully Achieved");
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/admin/manage-bookings');
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Booking Detail</h2>

        {error && (
          <p className="mb-4 text-red-600 font-medium bg-red-100 p-3 rounded">{error}</p>
        )}
        {success && (
          <p className="mb-4 text-green-700 font-medium bg-green-100 p-3 rounded">{success}</p>
        )}

        {bookingDetails && (
          <div className="space-y-8">
            {/* Booking Info */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">Booking Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p><span className="font-semibold">Confirmation Code:</span> {bookingDetails.bookingConfirmationCode}</p>
                <p><span className="font-semibold">Check-in Date:</span> {bookingDetails.checkInDate}</p>
                <p><span className="font-semibold">Check-out Date:</span> {bookingDetails.checkOutDate}</p>
                <p><span className="font-semibold">Number of Adults:</span> {bookingDetails.numOfAdults}</p>
                <p><span className="font-semibold">Number of Children:</span> {bookingDetails.numOfChildren}</p>
                <p><span className="font-semibold">Guest Email:</span> {bookingDetails.guestEmail}</p>
              </div>
            </section>

            {/* Booker Details */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">Booker Details</h3>
              <div className="text-gray-700 space-y-1">
                <p><span className="font-semibold">Name:</span> {bookingDetails.user.name}</p>
                <p><span className="font-semibold">Email:</span> {bookingDetails.user.email}</p>
                <p><span className="font-semibold">Phone Number:</span> {bookingDetails.user.phoneNumber}</p>
              </div>
            </section>

            {/* Room Details */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">Room Details</h3>
              <div className="text-gray-700 space-y-2">
                <p><span className="font-semibold">Room Type:</span> {bookingDetails.room.roomType}</p>
                <p><span className="font-semibold">Room Price:</span> ${bookingDetails.room.roomPrice}</p>
                <p><span className="font-semibold">Room Description:</span> {bookingDetails.room.roomDescription}</p>
                {bookingDetails.room.roomPhotoUrl && (
                  <img
                    src={bookingDetails.room.roomPhotoUrl}
                    alt="Room"
                    className="mt-3 rounded-md max-w-full h-auto shadow-sm"
                  />
                )}
              </div>
            </section>

            <div className="text-center">
              <button
                onClick={() => acheiveBooking(bookingDetails.id)}
                className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200"
              >
                Achieve Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBookingPage;
