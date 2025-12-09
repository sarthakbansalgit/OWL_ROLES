import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-12 md:py-16 border-t-2 border-blue-500">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <h2 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent mb-2 md:mb-3'>Owl Roles</h2>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
              Connecting talented professionals with their dream jobs. Your career journey starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm md:text-lg font-bold mb-3 md:mb-4 text-white">For Job Seekers</h3>
            <ul className="space-y-1 md:space-y-2 text-gray-300 text-xs md:text-sm">
              <li><a href="/" className="hover:text-blue-400 transition">Browse Jobs</a></li>
              <li><a href="/browse" className="hover:text-blue-400 transition">Search Jobs</a></li>
              <li><a href="/profile" className="hover:text-blue-400 transition">My Profile</a></li>
              <li><a href="/browse" className="hover:text-blue-400 transition">Career Tips</a></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-sm md:text-lg font-bold mb-3 md:mb-4 text-white">For Employers</h3>
            <ul className="space-y-1 md:space-y-2 text-gray-300 text-xs md:text-sm">
              <li><a href="/admin/companies" className="hover:text-blue-400 transition">Post Jobs</a></li>
              <li><a href="/admin/companies" className="hover:text-blue-400 transition">Pricing</a></li>
              <li><a href="/admin" className="hover:text-blue-400 transition">Dashboard</a></li>
              <li><a href="/" className="hover:text-blue-400 transition">Company Info</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm md:text-lg font-bold mb-3 md:mb-4 text-white">Connect With Us</h3>
            <div className="flex gap-2 md:gap-4">
              <a href="#" className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300">
                <Github className="w-4 md:w-5 h-4 md:h-5 text-gray-300 hover:text-white" />
              </a>
              <a href="#" className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gray-800 hover:bg-blue-400 flex items-center justify-center transition-all duration-300">
                <Twitter className="w-4 md:w-5 h-4 md:h-5 text-gray-300 hover:text-white" />
              </a>
              <a href="#" className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300">
                <Linkedin className="w-4 md:w-5 h-4 md:h-5 text-gray-300 hover:text-white" />
              </a>
              <a href="#" className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300">
                <Mail className="w-4 md:w-5 h-4 md:h-5 text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6 md:my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center">
          <div className="text-gray-400 text-xs md:text-sm text-center md:text-left">
            <p>© 2024 Owl Roles Job Portal. All rights reserved.</p>
          </div>
          
          <div className="flex gap-4 md:gap-8 text-xs md:text-sm text-gray-400 flex-wrap justify-center">
            <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;