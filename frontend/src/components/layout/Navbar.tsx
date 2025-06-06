// components/layout/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ userEmail }: { userEmail: string }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <Link to="/">
        <span className="text-xl font-bold text-indigo-700 cursor-pointer">
          Nemosora
        </span>
      </Link>
      <div className="flex items-center space-x-6">
        <span className="text-sm text-gray-600">Logged in as: {userEmail}</span>
        <Link to="/admin/logs">
          <span className="text-sm font-medium text-indigo-700 hover:underline">
            View Logs
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
