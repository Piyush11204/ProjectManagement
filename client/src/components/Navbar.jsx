import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, FolderPlus, UserPlus, Briefcase } from 'lucide-react';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
    { path: '/clients', label: 'Clients', icon: <Users className="w-5 h-5" /> },
    { path: '/addproject', label: 'Add Project', icon: <FolderPlus className="w-5 h-5" /> },
    { path: '/addclient', label: 'Add Client', icon: <UserPlus className="w-5 h-5" /> },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-800 text-white">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-xl font-bold">
              Project Manager
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActivePath(item.path)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-gray-800 shadow-xl">
            <div className="flex items-center justify-between h-16 px-6">
              <span className="text-xl font-bold">Menu</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-md text-gray-400 hover:text-white focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActivePath(item.path)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;