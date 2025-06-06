import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode && booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">All Bookings</h2>

            <div className="mb-6">
                <label htmlFor="search" className="block text-gray-700 font-medium mb-2">
                    Filter by Booking Number:
                </label>
                <input
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter booking number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentBookings.length > 0 ? (
                    currentBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                            <p className="mb-1 text-gray-900 font-semibold">
                                Booking Code: <span className="font-normal">{booking.bookingConfirmationCode}</span>
                            </p>
                            <p className="mb-1 text-gray-700">
                                Check In Date: <span className="font-medium">{booking.checkInDate}</span>
                            </p>
                            <p className="mb-1 text-gray-700">
                                Check Out Date: <span className="font-medium">{booking.checkOutDate}</span>
                            </p>
                            <p className="mb-4 text-gray-700">
                                Total Guests: <span className="font-medium">{booking.totalNumOfGuest}</span>
                            </p>
                            <button
                                onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                Manage Booking
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No bookings found.</p>
                )}
            </div>

            <div className="mt-8">
                <Pagination
                    roomsPerPage={bookingsPerPage}
                    totalRooms={filteredBookings.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default ManageBookingsPage;
