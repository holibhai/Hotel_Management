import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout?');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
            window.location.reload(); // Refresh to update auth state
        }
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Brand Logo */}
                    <div className="flex items-center">
                        <NavLink 
                            to="/home" 
                            className="text-xl font-bold text-amber-800 hover:text-amber-900 transition-colors duration-300"
                        >
                            Phegon Hotel
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink 
                            to="/home" 
                            className={({ isActive }) => 
                                `px-3 py-2 text-sm font-medium ${isActive ? 'text-amber-800 border-b-2 border-amber-800' : 'text-gray-700 hover:text-amber-800'} transition-colors duration-300`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/rooms" 
                            className={({ isActive }) => 
                                `px-3 py-2 text-sm font-medium ${isActive ? 'text-amber-800 border-b-2 border-amber-800' : 'text-gray-700 hover:text-amber-800'} transition-colors duration-300`
                            }
                        >
                            Rooms
                        </NavLink>
                        <NavLink 
                            to="/find-booking" 
                            className={({ isActive }) => 
                                `px-3 py-2 text-sm font-medium ${isActive ? 'text-amber-800 border-b-2 border-amber-800' : 'text-gray-700 hover:text-amber-800'} transition-colors duration-300`
                            }
                        >
                            Find my Booking
                        </NavLink>

                        {isUser && (
                            <NavLink 
                                to="/profile" 
                                className={({ isActive }) => 
                                    `px-3 py-2 text-sm font-medium ${isActive ? 'text-amber-800 border-b-2 border-amber-800' : 'text-gray-700 hover:text-amber-800'} transition-colors duration-300`
                                }
                            >
                                Profile
                            </NavLink>
                        )}

                        {isAdmin && (
                            <NavLink 
                                to="/admin" 
                                className={({ isActive }) => 
                                    `px-3 py-2 text-sm font-medium ${isActive ? 'text-amber-800 border-b-2 border-amber-800' : 'text-gray-700 hover:text-amber-800'} transition-colors duration-300`
                                }
                            >
                                Admin
                            </NavLink>
                        )}

                        {!isAuthenticated ? (
                            <>
                                <NavLink 
                                    to="/login" 
                                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-800 transition-colors duration-300"
                                >
                                    Login
                                </NavLink>
                                <NavLink 
                                    to="/register" 
                                    className="px-4 py-2 text-sm font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-md transition-colors duration-300"
                                >
                                    Register
                                </NavLink>
                            </>
                        ) : (
                            <button 
                                onClick={handleLogout}
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-800 transition-colors duration-300"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-amber-800 focus:outline-none transition-colors duration-300">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation (hidden by default) */}
            <div className="md:hidden hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink 
                        to="/home" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-800 hover:bg-gray-50 transition-colors duration-300"
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/rooms" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-800 hover:bg-gray-50 transition-colors duration-300"
                    >
                        Rooms
                    </NavLink>
                    <NavLink 
                        to="/find-booking" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-800 hover:bg-gray-50 transition-colors duration-300"
                    >
                        Find my Booking
                    </NavLink>

                    {isUser && (
                        <NavLink 
                            to="/profile" 
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-800 hover:bg-gray-50 transition-colors duration-300"
                        >
                            Profile
                        </NavLink>
                    )}

                    {isAdmin && (
                        <NavLink 
                            to="/admin" 
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-800 hover:bg-gray-50 transition-colors duration-300"
                        >
                            Admin
                        </NavLink>
                    )}

                    {!isAuthenticated ? (
                        <>
                            <NavLink 
                                to="/login" 
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-800 hover:bg-gray-50 transition-colors duration-300"
                            >
                                Login
                            </NavLink>
                            <NavLink 
                                to="/register" 
                                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-amber-800 hover:bg-amber-900 transition-colors duration-300"
                            >
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <button 
                            onClick={handleLogout}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-800 hover:bg-gray-50 transition-colors duration-300"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;