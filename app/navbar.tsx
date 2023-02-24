import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-white p-6 shadow">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <h1 className="text-xl font-bold"> </h1>
        <nav className="">
          <Link
            href="/"
            className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500"
          >
            Projects
          </Link>
          <Link
            href="/documents/Fulkerson_John_Resume.pdf"
            className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500"
          >
            Resume
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
