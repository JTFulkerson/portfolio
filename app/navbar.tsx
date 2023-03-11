import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white p-6 shadow">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <h1 className="text-xl font-bold"> </h1>
        <nav className="hidden md:block md:flex md:items-center md:w-auto">
          <div className="flex flex-col md:flex-row md:items-center">
            <Link href="/" passHref>
              <span className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500">
                Home
              </span>
            </Link>
            <Link href="/about" passHref>
              <span className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500">
                About
              </span>
            </Link>
            <Link href="/projects" passHref>
              <span className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500">
                Projects
              </span>
            </Link>
            <Link href="/work" passHref>
              <span className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500">
                Work Experience
              </span>
            </Link>
            <Link href="/documents/Fulkerson_John_Resume.pdf" passHref>
              <span className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500">
                Resume
              </span>
            </Link>
          </div>
        </nav>
        <div className="flex md:hidden">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-blue-500 hover:border-blue-500"
          >
            <svg
              className="w-3 h-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path
                d="M0 3h20v2H0zm0 6h20v2H0zm0 6h20v2H0z"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      {showMenu && (
        <div className="md:hidden">
          <Link href="/" passHref>
            <span className="block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500">
              Home
            </span>
          </Link>
          <Link href="/about" passHref>
            <span className="block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500">
              About
            </span>
          </Link>
          <Link href="/projects" passHref>
            <span className="block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500">
              Projects
            </span>
          </Link>
          <Link href="/work" passHref>
            <span className="block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500">
              Work Experience
            </span>
          </Link>
          <Link href="/documents/Fulkerson_John_Resume.pdf" passHref>
            <span className="block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500">
              Resume
            </span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
