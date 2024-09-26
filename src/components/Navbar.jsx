import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-5 text-white fixed top-0 left-0 right-0">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link to="/" className="text-2xl font-bold">Blog de Noticias</Link>
        <ul className="flex space-x-4">
          {['Technology', 'Health', 'Sports', 'Entertainment'].map((category) => (
            <li key={category}>
              <Link to={`/${category}`} className="hover:text-gray-300 capitalize">
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
