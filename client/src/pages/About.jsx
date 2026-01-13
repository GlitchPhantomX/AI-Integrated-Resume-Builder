import React, { useState } from "react";
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
const About = () => {
  const [showMore, setShowMore] = useState(false);

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
                <BreadcrumbPage>About</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mt-8">
          <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-7">
            <div className="relative shadow-xl shadow-indigo-500/30 overflow-hidden shrink-0 rounded-2xl bg-gradient-to-r from-[#c446ee] to-[#ce68f0]">
              <img
                className="w-full max-w-[480px] md:max-w-[520px] lg:max-w-[580px] h-auto object-cover rounded-2xl transition-transform duration-700 hover:scale-[1.02] "
                src="/about-demo.png"
                alt="Resume Builder Demo"
                loading="lazy"
                style={{
                  filter: "brightness(1.02) contrast(1.1)",
                }}
              />

              <div className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex -space-x-4 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                    alt="profile"
                    className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                    alt="profile"
                    className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                    alt="profile"
                    className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition"
                  />
                  <div className="flex items-center justify-center text-xs text-white size-9 rounded-full border-[3px] border-white bg-[#c446ee] hover:bg-[#ce68f0] hover:-translate-y-1 transition">
                    50+
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-800">
                  Join our developer community
                </p>
              </div>
            </div>

            <div className="text-sm text-slate-600 max-w-lg">
              <h1 className="text-xl uppercase font-semibold text-slate-700">
                What we do?
              </h1>
              <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-[#d66cfa] to-[#f3cdff]"></div>

              <p className="mt-8">
                Our Resume Builder helps you create professional, ATS-friendly
                resumes in minutes. Whether you’re a student, a job seeker, or a
                working professional, we make resume building simple, fast, and
                impactful.
              </p>

              <p className="mt-4">
                With our easy-to-use templates and smart suggestions, you can
                highlight your skills, experience, and achievements in a clean,
                modern layout that impresses recruiters.
              </p>

              <p className="mt-4">
                From fresh graduates to experienced professionals, our Resume
                Builder empowers everyone to showcase their potential with
                confidence and style.
              </p>

              {showMore && (
                <div className="mt-4 transition-all duration-500 ease-in-out">
                  <p className="mt-4">
                    Our goal is to make resume creation effortless for everyone.
                    You can customize templates, update information anytime, and
                    even download or share your resume instantly.
                  </p>

                  <p className="mt-4">
                    We continuously improve our tools to help users stay ahead
                    in their career journey. Your success is our inspiration.
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-[#c446ee] to-[#ce68f0] py-3 px-8 rounded-full text-white"
              >
                <span>{showMore ? "Read Less" : "Read More"}</span>
                <svg
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    showMore ? "rotate-180" : ""
                  } transition-transform`}
                >
                  <path
                    d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                    fill="#fff"
                  />
                </svg>
              </button>
            </div>
          </section>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}</style>
      </>
    </Layout>
  );
};

export default About;
