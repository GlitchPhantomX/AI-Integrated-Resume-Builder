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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Contact = () => {
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
                <BreadcrumbPage>Contact</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="pt-8 px-4">
          <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4">
            <div className="relative rounded-2xl bg-gradient-to-r from-[#c446ee] to-[#ce68f0] shadow-lg shadow-indigo-600/30">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/contact-demo.png"
                  alt="Contact illustration"
                  loading="lazy"
                  className="w-full max-w-[460px] md:max-w-[500px] lg:max-w-[540px] h-auto object-cover rounded-2xl 
                             hover:scale-[1.03] transition-transform duration-700 ease-out 
                             brightness-[1.05] contrast-[1.08] saturate-[1.1]"
                  style={{
                    filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
                  }}
                />
              </div>
            </div>

            <div className="text-sm text-slate-600 max-w-lg">
              <h1 className="text-xl uppercase font-semibold text-slate-700">
                Get in Touch
              </h1>
              <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-[#d66cfa] to-[#f3cdff]"></div>

              <p className="mt-8">
                Have questions or need help with your resume? We’d love to hear
                from you. Whether it’s support, feedback, or a new idea — just
                drop us a message below.
              </p>

              <form className="mt-8 flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-0 focus:border-[#c446ee] transition"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-0 focus:border-[#c446ee] transition"
                  required
                />
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-0 focus:border-[#c446ee] transition"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#c446ee] to-[#ce68f0] py-3 px-8 rounded-full text-white font-medium hover:-translate-y-0.5 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* === FAQ Section === */}
        <div className="mt-24 px-4 md:px-0">
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
            <h1 className="text-xl uppercase font-semibold text-slate-700">
              Frequently Asked Questions
            </h1>
            <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-[#d66cfa] to-[#f3cdff] mt-1"></div>

            <p className="text-sm text-slate-500 mt-6 mb-10 max-w-md">
              Find quick answers to the most common questions about our Resume
              Builder.
            </p>

            <div className="w-full text-left">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base font-normal text-gray-600 hover:text-gray-900 transition">
                    Is this Resume Builder free to use?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-sm leading-relaxed">
                    Yes! You can create and download your professional resume
                    for free. We offer premium templates as well, but the core
                    features are completely free.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-base font-normal text-gray-600 hover:text-gray-900 transition">
                    Can I download my resume as a PDF?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-sm leading-relaxed">
                    Absolutely! Once you finish editing your resume, you can
                    download it in high-quality PDF format with just one click.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-base font-normal text-gray-600 hover:text-gray-900 transition">
                    Do I need to create an account?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-sm leading-relaxed">
                    You can build a resume without signing up, but creating an
                    account allows you to save, edit, and access your resumes
                    anytime.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-base font-normal text-gray-600 hover:text-gray-900 transition">
                    Is the resume design ATS-friendly?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-sm leading-relaxed">
                    Yes, all our templates are ATS (Applicant Tracking System)
                    friendly, ensuring your resume passes automated screenings
                    easily.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}</style>
      </>
    </Layout>
  );
};

export default Contact;
