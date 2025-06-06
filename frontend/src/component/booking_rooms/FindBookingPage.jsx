import React, { useState } from 'react';
import ApiService from '../../service/ApiService';

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Please enter a booking confirmation code.");
            setTimeout(() => setError(''), 5000);
            return;
        }
        try {
            const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
            setBookingDetails(response.booking);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Find Booking</h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Enter your booking confirmation code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    className="w-full sm:w-2/3 border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded shadow"
                >
                    Find
                </button>
            </div>

            {error && (
                <p className="text-red-600 text-center mb-4">{error}</p>
            )}

            {bookingDetails && (
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h3>
                    <div className="space-y-2 text-gray-700">
                        <p><span className="font-medium">Confirmation Code:</span> {bookingDetails.bookingConfirmationCode}</p>
                        <p><span className="font-medium">Check-in Date:</span> {bookingDetails.checkInDate}</p>
                        <p><span className="font-medium">Check-out Date:</span> {bookingDetails.checkOutDate}</p>
                        <p><span className="font-medium">Adults:</span> {bookingDetails.numOfAdults}</p>
                        <p><span className="font-medium">Children:</span> {bookingDetails.numOfChildren}</p>
                    </div>

                    <hr className="my-6" />

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Booker Details</h3>
                    <div className="space-y-2 text-gray-700">
                        <p><span className="font-medium">Name:</span> {bookingDetails.user.name}</p>
                        <p><span className="font-medium">Email:</span> {bookingDetails.user.email}</p>
                        <p><span className="font-medium">Phone Number:</span> {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <hr className="my-6" />

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Room Details</h3>
                    <div className="space-y-2 text-gray-700">
                        <p><span className="font-medium">Room Type:</span> {bookingDetails.room.roomType}</p>
                        <img
                            src={bookingDetails.room.roomPhotoUrl}
                            alt="Room"
                            className="w-full max-w-md mt-3 rounded shadow"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindBookingPage;
