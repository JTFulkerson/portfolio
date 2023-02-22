import React from 'react';

const App = () => {
  return (
    <header className="bg-white p-6 shadow">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <h1 className="text-lg font-bold">John Fulkerson</h1>
        <nav className="">
          <a
            className="inline-block px-4 py-2 font-medium text-gray-700 hover:text-indigo-500"
            href="./"
          >
            Home
          </a>
          <a
            className="inline-block px-4 py-2 font-medium text-gray-700 hover:text-indigo-500"
            href="./About"
          >
            About
          </a>
          <a
            className="inline-block px-4 py-2 font-medium text-gray-700 hover:text-indigo-500"
            href="./Projects"
          >
            Projects
          </a>
          <a
            className="inline-block px-4 py-2 font-medium text-gray-700 hover:text-indigo-500"
            href="/pages/timer."
          >
            Timer
          </a>
          <a
            className="inline-block px-4 py-2 font-medium text-gray-700 hover:text-indigo-500"
            href="./Contact"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default App;
