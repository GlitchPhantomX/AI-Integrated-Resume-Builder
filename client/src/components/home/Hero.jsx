"use client";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logos } from "../../data/componentsData";
import Navbar from "../Navbar";
import HomeNavbar from "./HomeNavbar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <div className="min-h-screen pb-20 pt-[100px] relative">

        <HomeNavbar />

        <div
          className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#features" className="text-white">
            Features
          </a>
          <a href="#testimonials" className="text-white">
            Testimonials
          </a>
          <a href="#contact" className="text-white">
            Contact
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-[#D78FEE] hover:bg-[#D78FEE] transition text-white rounded-md flex"
          >
            X
          </button>
        </div>

        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-purple-300 blur-[100px] opacity-30"></div>

          <div className="flex items-center mt-16">
            <div className="flex -space-x-3 pr-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                    alt="user1"
                    className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1] cursor-pointer"
                    onError={(e) => {
                      e.target.src = "/src/assets/dummy_profile.png"; // Fallback to local image
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sarah Johnson</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                    alt="user2"
                    className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2 cursor-pointer"
                    onError={(e) => {
                      e.target.src = "/src/assets/dummy_profile.png"; // Fallback to local image
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Michael Lee</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                    alt="user3"
                    className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3] cursor-pointer"
                    onError={(e) => {
                      e.target.src = "/src/assets/dummy_profile.png"; // Fallback to local image
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Emily Davis</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                    alt="user4"
                    className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4] cursor-pointer"
                    onError={(e) => {
                      e.target.src = "/src/assets/dummy_profile.png"; // Fallback to local image
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chris Walker</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
                    alt="user5"
                    className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[5] cursor-pointer"
                    onError={(e) => {
                      e.target.src = "/src/assets/dummy_profile.png"; // Fallback to local image
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>James Anderson</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div>
              <div className="flex ">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star text-transparent fill-[#D78FEE]"
                      aria-hidden="true"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                  ))}
              </div>
              <p className="text-sm text-gray-700">Used by 10,000+ users</p>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
            Land your dream job with{" "}
            <span className=" bg-gradient-to-r from-[#d07cec] to-[#a756c2] bg-clip-text text-transparent text-nowrap">
              AI-powered{" "}
            </span>{" "}
            resumes.
          </h1>

          <p className="max-w-md text-center text-base my-7">
            Create, edit and download professional resumes with AI-powered
            assistance.
          </p>

          <div className="flex items-center gap-4 ">
            <Link
              to="/app"
              className="bg-[#c446ee] hover:bg-[#ce68f0] text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-purple-400 flex items-center transition-colors"
            >
              Get started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right ml-1 size-4"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
            <Link to={"/demoResumeBuilder"}>
              <button className="flex items-center gap-2 border border-slate-400 hover:bg-[#e6a2ff]/30 transition rounded-full px-7 h-12 text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-video size-5"
                  aria-hidden="true"
                >
                  <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                  <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                </svg>
                <span>Try demo</span>
              </button>
            </Link>
          </div>

          <p className="py-6 text-slate-600 mt-14">
            Trusting by leading brands, including
          </p>

    
        </div>
      </div>
      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
      </style>
    </>
  );
};

export default Hero;
