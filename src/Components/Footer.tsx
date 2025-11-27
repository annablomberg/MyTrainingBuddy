import React from "react";
import { Link } from "react-router-dom";
import {FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 text-slate-600 mt-16">
      <div className="max-w-5xl mx-auto w-11/12 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="/logo.png"
              alt="logo"
              width={200}
              height={40}
            />
          </div>
          <p className="text-sm text-slate-600">
            Find group workouts and training buddies near you. 
            This is a frontend prototype for my portfolio. Designed & developed by Anna Blomberg
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="text-sm space-y-1">
            <li>
              <a
                href="mailto:you@example.com"
                className="hover:underline">
                annablomberg00@gmail.com
              </a>
            </li>
            <li>Gothenburg, Sweden</li>
            <li>
              <span className="text-xs text-slate-600">
                All events and users are fictional. Frontend demo only.
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Social</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/annablomberg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-2xl hover:text-blue-600" />
            </a>
            <a
              href="https://www.linkedin.com/in/yourname"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-2xl hover:text-blue-600" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl hover:text-blue-600" />
            </a>
            <a
              href="https://tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="text-2xl hover:text-blue-600" />
            </a>
          </div>
        </div>
    
    <div>
          <h3 className="text-lg font-semibold mb-3">Pages</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/chat" className="hover:underline">
                Chat
              </Link>
            </li>
            <li>
              <Link to="/friends" className="hover:underline">
                Find friends
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Log in
              </Link>
            </li>
          </ul>
        </div>




      </div>

      <div className="border-t border-gray-400">
        <div className="max-w-5xl mx-auto w-11/12 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} My Training Buddy (prototype)</span>
          <span>Built with React, TypeScript and Tailwind CSS.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
