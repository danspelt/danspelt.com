'use client'
    
import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission, e.g., sending the data to an API or email service
    console.log('Form submitted:', formData);
  };

  return (
    <div className="p-8 bg-white text-gray-900">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <p className="mb-4">If you'd like to get in touch, feel free to reach out via email or phone:</p>
      <ul className="mb-8">
        <li><strong>Email:</strong> <a href="mailto:dan@danspelt.com" className="text-blue-500">dan@danspelt.com</a></li>
        <li><strong>Phone:</strong> 250-208-7997</li>
        <li><strong>Location:</strong> Victoria, Canada</li>
      </ul>
      <h3 className="text-2xl font-semibold mb-4">Or send me a message directly:</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-medium">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg font-medium">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Send</button>
      </form>
    </div>
  );
};

export default ContactMe;