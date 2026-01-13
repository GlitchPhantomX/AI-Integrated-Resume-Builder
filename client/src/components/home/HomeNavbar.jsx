import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <nav className="fixed top-[40px] left-0 z-[100] flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm bg-white/80 backdrop-blur-md shadow-sm">
        <a href="/">
          <img src="/final-logo.png" alt="logo" className="h-7 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8 text-slate-800">
          <a href="/" className="hover:text-[#b43edb] transition">
            Home
          </a>
          <a href="/about" className="hover:text-[#b43edb] transition">
            About
          </a>
          <a href="/expertise" className="hover:text-[#b43edb] transition">
            Expertise
          </a>
          <a href="/contact" className="hover:text-[#b43edb] transition">
            Contact
          </a>
        </div>

        <div className="hidden md:flex gap-2">
          {!user ? (
            <>
              <Link
                to="/app?state=register"
                className="px-6 py-2 bg-[#c446ee] hover:bg-[#ce68f0] active:scale-95 transition-all rounded-full text-white"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900"
              >
                Login
              </Link>
            </>
          ) : (
            <Link
              to="/app"
              className="px-8 py-2 bg-[#c446ee] hover:bg-[#ce68f0] active:scale-95 transition-all rounded-full text-white"
            >
              Dashboard
            </Link>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden active:scale-90 transition "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 5h16M4 12h16M4 19h16" />
          </svg>
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[200] bg-black/40 backdrop-blur transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-full z-[260] bg-transparent 
        transform transition-transform duration-500 ease-out
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[78%] max-w-[310px] z-[300]
        bg-[#e5a8f9]/15 backdrop-blur-xl
        p-8 flex flex-col gap-6 text-white shadow-xl 
        transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ transitionDelay: menuOpen ? "150ms" : "0ms" }}
      >
        <div className="flex items-center justify-between mb-6">
          <img
            src="/final-logo.png"
            alt="logo"
            className="h-6 w-auto animate-[fadeIn_0.4s_ease]"
          />

          <button
            onClick={() => setMenuOpen(false)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-transform duration-300 hover:rotate-180 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="23"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

      <div className="flex flex-col gap-6 mt-2">
  {["Home", "About", "Expertise", "Contact"].map((item, index) => {
    const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
    return (
      <a
        key={item}
        href={href}
        className={`transform transition-all duration-500 opacity-0
        ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
        style={{ transitionDelay: `${200 + index * 120}ms` }}
      >
        <span className="relative group inline-block">
          {item}
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
        </span>
      </a>
    );
  })}
</div>

        <div className="mt-8 flex flex-col gap-3 animate-[fadeIn_0.7s_ease]">
          {!user ? (
            <>
              <Link
                to="/login"
                className="w-full text-center py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur transition active:scale-95"
              >
                Login
              </Link>

              <Link
                to="/app?state=register"
                className="w-full text-center py-3 rounded-full bg-[#c446ee] hover:bg-[#ce68f0] transition active:scale-95"
              >
                Get Started
              </Link>
            </>
          ) : (
            <Link
              to="/app"
              className="w-full text-center py-3 rounded-full bg-[#c446ee] hover:bg-[#ce68f0] transition active:scale-95"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeNavbar;
