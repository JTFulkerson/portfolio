import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-white p-6 shadow">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <h1 className="text-xl font-bold"> </h1>
        <nav className="">
          <a
            className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500"
            href="./"
          >
            Home
          </a>
          <a
            className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500"
            href="./About"
          >
            About
          </a>
          <a
            className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500"
            href="./Projects"
          >
            Projects
          </a>
          <a
            className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500"
            href={require('../documents/Fulkerson_John_Resume.pdf')}
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
