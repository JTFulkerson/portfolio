import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Work Experience", path: "/work" },
    { name: "Resume", path: "/documents/Fulkerson_John_Resume.pdf" }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.header 
      className="w-full z-50 bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.h1 
          className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          JT Fulkerson
        </motion.h1>
        
        <motion.nav 
          className="hidden md:flex md:items-center md:w-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col md:flex-row md:items-center">
            {navItems.map((item) => (
              <motion.div 
                key={item.name} 
                variants={itemVariants} 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {item.path.startsWith('/documents/') ? (
                  <a 
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-500 relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ) : (
                  <Link 
                    to={item.path}
                    className={`inline-block px-4 py-2 font-medium text-lg ${
                      location.pathname === item.path 
                        ? "text-blue-600" 
                        : "text-gray-700 hover:text-blue-500"
                    } relative group`}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.nav>
        
        <motion.div 
          className="flex md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5 fill-current"
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
        </motion.div>
      </div>
      
      <AnimatePresence>
        {showMenu && (
          <motion.div 
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {navItems.map((item) => (
              <motion.div 
                key={item.name}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {item.path.startsWith('/documents/') ? (
                  <a 
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowMenu(false)}
                    className="block px-6 py-3 font-medium text-lg text-gray-700 hover:text-blue-500 hover:bg-gray-50 transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link 
                    to={item.path}
                    onClick={() => setShowMenu(false)}
                    className={`block px-6 py-3 font-medium text-lg ${
                      location.pathname === item.path 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                    } transition-colors duration-300`}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;