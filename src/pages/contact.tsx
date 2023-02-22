import React from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold mb-8">Contact Me</h1>
        <a href="mailto:johnfulky@mac.com">
          <h1>Email: johnfulky@mac.com</h1>
        </a>
        <a href="tel:+1234567890">
          <h1>Phone Number: 703-342-2187</h1>
        </a>
      </div>
    </div>
  );
};

export default Contact;
