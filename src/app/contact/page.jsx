'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="p-16 bg-white text-gray-900">
      <ul className="list-none mb-8">
        <li className="mb-6 text-xl"><strong>Email:</strong> <a href="mailto:dan@danspelt.com" className="text-blue-500">dan@danspelt.com</a></li>
        <li className="mb-6 text-xl"><strong>Phone:</strong> 250-208-7997</li>
        <li className="mb-6 text-xl"><strong>Location:</strong> Victoria, Canada</li>
        <li className="flex items-center space-x-8">
          <Link href="https://www.linkedin.com/in/danspelt" className="text-blue-500 hover:text-blue-700"><FaLinkedin size={36} /></Link>
          <Link href="https://github.com/danspelt" className="text-gray-900 hover:text-gray-700"><FaGithub size={36} /></Link>
        </li>
      </ul>
      <h3 className="text-4xl font-semibold mb-8">Or send me a message directly:</h3>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="name" className="block text-2xl font-medium">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-3 p-4 w-full border border-gray-300 rounded-md text-xl"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-2xl font-medium">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-3 p-4 w-full border border-gray-300 rounded-md text-xl"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-2xl font-medium">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-3 p-4 w-full border border-gray-300 rounded-md text-xl"
          />
        </div>
        <button type="submit" className="px-8 py-4 bg-blue-500 text-white rounded-md text-xl">Send</button>
      </form>
    </div>
  );
};

export default ContactMe;