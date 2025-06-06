import React, { useState } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    const services = [
        {
            title: "Air Conditioning",
            description: "Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning.",
            icon: "./assets/images/ac.png"
        },
        {
            title: "Mini Bar",
            description: "Enjoy a convenient selection of beverages and snacks stocked in your room's mini bar with no additional cost.",
            icon: "./assets/images/mini-bar.png"
        },
        {
            title: "Parking",
            description: "We offer on-site parking for your convenience. Please inquire about valet parking options if available.",
            icon: "./assets/images/parking.png"
        },
        {
            title: "WiFi",
            description: "Stay connected throughout your stay with complimentary high-speed Wi-Fi access available in all guest rooms and public areas.",
            icon: "./assets/images/wifi.png"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-screen max-h-[800px] overflow-hidden">
                <img 
                    src="./assets/images/hotel.webp" 
                    alt="Phegon Hotel" 
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/70"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                        Welcome to <span className="text-amber-800">Phegon Hotel</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 drop-shadow-md">Step into a haven of comfort and care</p>
                    <button className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 hover:scale-105">
                        Explore Our Rooms
                    </button>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Find Your Perfect Stay</h2>
                    <RoomSearch handleSearchResult={handleSearchResult} />
                </div>
            </section>

            {/* Results Section */}
            {roomSearchResults.length > 0 && (
                <section className="py-12">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Available Rooms</h2>
                        <RoomResult roomSearchResults={roomSearchResults} />
                        <div className="text-center mt-8">
                            <a 
                                href="/rooms" 
                                className="text-amber-800 hover:text-amber-900 font-semibold transition-colors duration-300 inline-flex items-center"
                            >
                                View All Rooms
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* Services Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
                        Services at <span className="text-amber-800">Phegon Hotel</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <div 
                                key={index} 
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <img src={service.icon} alt={service.title} className="max-w-full max-h-full" />
                                </div>
                                <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">{service.title}</h3>
                                <p className="text-gray-600 text-center">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-800 text-white">
                <div className="container mx-auto px-4 max-w-6xl text-center">
                    <h2 className="text-3xl font-semibold mb-6">Ready for an unforgettable experience?</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a 
                            href="/rooms" 
                            className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 inline-block text-center"
                        >
                            Book Now
                        </a>
                        <a 
                            href="/contact" 
                            className="bg-transparent hover:bg-gray-700 text-white border border-white px-8 py-3 rounded-md font-medium transition-all duration-300 inline-block text-center"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;