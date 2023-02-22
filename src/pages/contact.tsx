import React from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Contact Me</h1>
        <a href="mailto:johnfulky@mac.com">
          <img src="" alt="Email" className="h-8 w-8" />
          <h1>Email: johnfulky@mac.com</h1>
        </a>
        <a href="tel:+1234567890">
          <img src="/phone.png" alt="Phone" className="h-8 w-8" />
        </a>
      </div>
    </div>
  );
};

export default Contact;
