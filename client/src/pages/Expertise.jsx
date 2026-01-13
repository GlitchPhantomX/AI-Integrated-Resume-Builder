import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";


const Expertise = () => {
  return (
    <Layout>
      <>
        <div className="pt-[140px] px-8 md:px-24">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}</style>

        <section className="max-w-6xl mx-auto pt-5 px-4 text-center">
          <h1 className="text-2xl uppercase font-semibold text-slate-700">
            Our Expertise & Innovation
          </h1>
          <div className="w-24 h-[3px] mx-auto mt-2 rounded-full bg-gradient-to-r from-[#d66cfa] to-[#f3cdff]"></div>
          <p className="text-sm text-slate-500 mt-6 max-w-lg mx-auto">
            Explore a collection of projects that represent our expertise in
            Prompt Engineering, AI development, and MERN stack solutions. Each
            creation reflects a commitment to innovation, performance, and
            exceptional user experience.
          </p>
        </section>

        <div className="flex items-center gap-6 h-[400px] w-full max-w-5xl mx-auto mt-10">
          <div className="relative group flex-grow transition-all w-56 h-[400px] duration-500 hover:w-full">
            <img
              className="h-full w-full object-cover object-center"
              src="https://img.freepik.com/free-photo/mother-daughter-using-laptop_1170-2707.jpg?semt=ais_hybrid&w=740&q=80"
              alt="image"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h1 className="text-3xl">Prompt Engineering</h1>
              <p className="text-sm">
                Building intelligent prompts that enhance AI understanding and
                unlock accurate, meaningful responses.
              </p>
            </div>
          </div>

          {/* AI Developer */}
          <div className="relative group flex-grow transition-all w-56 h-[400px] duration-500 hover:w-full">
            <img
              className="h-full w-full object-cover "
              src="https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=612x612&w=0&k=20&c=mt-Bsap56B_7Lgx1fcLqFVXTeDbIOILVjTdOqrDS54s="
              alt="image"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h1 className="text-3xl">AI Developer</h1>
              <p className="text-sm">
                Crafting powerful AI-driven systems that solve real-world
                problems with automation and intelligence.
              </p>
            </div>
          </div>

          {/* Full-Stack Developer */}
          <div className="relative group flex-grow transition-all w-56 h-[400px] duration-500 hover:w-full">
            <img
              className="h-full w-full object-cover "
              src="https://img.freepik.com/free-photo/elegant-smiling-woman-glasses-striped-shirt-using-laptop-computer-while-siting-table-kitchen_171337-13030.jpg?semt=ais_hybrid&w=740&q=80"
              alt="image"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h1 className="text-3xl">Full-Stack Developer</h1>
              <p className="text-sm">
                Delivering seamless end-to-end web applications with robust
                frontend and backend engineering.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 mb-10">
          <button className="bg-gradient-to-r from-[#c446ee] to-[#ce68f0] text-white px-8 py-3 rounded-full text-sm font-medium hover:-translate-y-0.5 transition">
            Explore More Templates
          </button>
        </div>
      </>
    </Layout>
  );
};

export default Expertise;
