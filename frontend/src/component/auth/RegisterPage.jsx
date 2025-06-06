import React, { useState } from 'react';
import ApiService from '../../service/ApiService';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, password, phoneNumber } = formData;
    return name && email && password && phoneNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage('Please fill all the fields.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    try {
      const response = await ApiService.registerUser(formData);
      if (response.statusCode === 200) {
        setFormData({ name: '', email: '', password: '', phoneNumber: '' });
        setSuccessMessage('User registered successfully');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create an Account</h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 border border-red-400 rounded px-4 py-2 mb-4 text-sm">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 border border-green-400 rounded px-4 py-2 mb-4 text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
