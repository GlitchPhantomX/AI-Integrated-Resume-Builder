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
const DemoResumePreview = () => {
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
                <BreadcrumbPage>Demo</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className=" pb-16 pt-3.5">
          <section className="flex flex-col items-center justify-center gap-10 max-md:px-4 text-center">
            <div className="max-w-3xl text-slate-600">
              <h1 className="text-2xl uppercase font-semibold text-slate-700">
                Explore Our Demo
              </h1>
              <div className="mx-auto mt-2 w-24 h-[3px] rounded-full bg-gradient-to-r from-[#d66cfa] to-[#f3cdff]"></div>

              <p className="mt-8 text-sm text-slate-600">
                Take a quick look at how <strong>resume.</strong> makes creating
                your dream resume easier than ever. From modern templates to
                live previews — our builder is designed for simplicity, speed,
                and style.
              </p>

              <p className="mt-4 text-sm text-slate-600">
                Whether you’re just starting your career or updating your
                professional profile, our builder helps you create a polished,
                ATS-friendly resume in minutes — no design skills needed.
              </p>

              {showMore && (
                <div className="mt-4 transition-all duration-500 ease-in-out">
                  <p className="mt-4 text-sm text-slate-600">
                    Our goal is to simplify resume creation while maintaining
                    top-tier design quality. Choose from multiple templates,
                    preview instantly, and download your resume in high-quality
                    PDF format — all from one intuitive platform.
                  </p>
                  <p className="mt-4 text-sm text-slate-600">
                    Designed by{" "}
                    <span className="text-[#c446ee] font-semibold">
                      Areesha
                    </span>
                    , this builder ensures every user can craft a resume that
                    speaks professionalism and personality with ease.
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center justify-center gap-2 mx-auto mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-[#c446ee] to-[#ce68f0] py-3 px-8 rounded-full text-white"
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

            <div className="relative max-w-[850px] w-full rounded-2xl bg-white shadow-lg shadow-purple-300/40 border overflow-hidden mt-6">
              <div className="flex items-center gap-2 px-4 py-3 bg-black border-b">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                <p className="ml-3 text-xs text-white">Resume Builder Demo</p>
              </div>

              <video
                src="/resume-demo.mp4"
                controls
                playsInline
                preload="auto"
                className="w-full h-auto"
              />
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

export default DemoResumePreview;
