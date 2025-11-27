import React from "react";
import { Link, useLocation } from "react-router-dom";


const Navbar: React.FC = () => {


const links = [
    { id: "landingpage", label: "Home", to: "/" },
    { id: "aboutpage", label: "About", to: "/about" },
    { id: "chatpage", label: "Chat", to: "/chatpage/:id" },
    { id: "friendspage", label: "Find friends", to: "/friendspage/:id" },
  ];

const isActive = (to: string) => {
    return location.pathname === to;
  };  


return (
    <nav className="shadow-xl fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex justify-between px-5">
        <div >
          <img
            src="/logo.png"
            alt="logo"
            width={250}
            height={50} 
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className={
                "px-3 font-semibold transition " +
                (isActive(link.to)
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500")
              }
            >
              {link.label}
            </Link>
          ))}
        <Link
          to="/login"
          className="inline-flex items-center px-5 py-2 text-white font-semibold bg-blue-400 hover:bg-blue-600 active:bg-blue-800 transition rounded-xl"
          >Log in
        </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


