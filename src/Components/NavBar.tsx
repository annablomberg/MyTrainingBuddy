import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";


function Navbar() {

  const location = useLocation();
  const { user } = useAuth();

  const links = [
    { id: "landingpage", label: "Home", to: "/" },
    { id: "aboutpage", label: "About", to: "/about" },
    { id: "chatpage", label: "Chat", to: "/chatpage/:id" },
    { id: "friendspage", label: "Find friends", to: "/friendspage/:id" },
  ];

  const isActive = (to: string) => {
    return location.pathname === to;
  };

  const userInitial = user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <nav className="shadow-xl fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex justify-between px-5">
        <div className= "mt-3 mb-3">
          <img
            src="/new_logo.png"
            alt="logo"
            width={325}
            height={38} />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className={"px-3 font-semibold transition " +
                (isActive(link.to)
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500")}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            // Profile button when logged in
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                {userInitial}
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {user.name}
              </span>
            </Link>
          ) : (
            // Log in button when logged out
            <Link
              to="/login"
              className="inline-flex items-center px-5 py-2 text-white font-semibold bg-blue-400 hover:bg-blue-600 active:bg-blue-800 transition rounded-xl"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


