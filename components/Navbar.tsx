
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">SkillBridge</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/') ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-600 font-medium transition-colors`}>Home</Link>
            <Link to="/analyze" className={`${isActive('/analyze') ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-600 font-medium transition-colors`}>Analyze</Link>
            <Link to="/dashboard" className={`${isActive('/dashboard') ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-600 font-medium transition-colors`}>Dashboard</Link>
            <Link to="/profile" className={`${isActive('/profile') ? 'text-indigo-600' : 'text-slate-600'} hover:text-indigo-600 font-medium transition-colors`}>My Portfolio</Link>
          </div>
          <div className="flex items-center gap-4">
             <button className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
               Get Started
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
