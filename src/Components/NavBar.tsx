import React from "react";

type Page = "home" | "chat" | "friends" | "about";

interface NavbarProps {
    current: Page; 
}

const Navbar: React.FC<NavbarProps> = ({current}) => {
    const links: {id: Page; label: string; href: string}[] = [
    {id: "home", label: "Home", href: "#home"},
    { id: "chat", label: "Chat", href: "#chat" },
    { id: "friends", label: "Find friends", href: "#friends" },
     { id: "about", label: "About", href: "#about" },
    ];

return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex justify-between px-4 py-2">
        <div >
          <img
            src="/logo.png"
            alt="logo"
            width={200}
            height={50} 
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {links.map((link) =>
            link.id === current ? null : (      
              <a
                key={link.id}
                href={link.href}
                className="px-3 text-gray-600 font-semibold hover:text-blue-500"
              >
                {link.label}
              </a>
            )
          )}

          <a
            href="#login"
            className="inline-flex items-center px-5 py-2 text-white font-semibold bg-blue-400 hover:bg-blue-600 active:bg-blue-800 transition rounded-xl"
          >Log in
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


