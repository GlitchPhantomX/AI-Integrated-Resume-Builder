"use client";
import React from "react";
import { Zap } from "lucide-react";
import Title from "./Title";

const Features = () => {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <>
      <div className="flex flex-col items-center scroll-mt-12" id="features">
        <div className="flex items-center gap-2 text-sm text-[#b43edb] bg-purple-400/10 border border-[#D78FEE] rounded-full px-4 py-1">
          <Zap width={14} />
          <span>Resume Builder Features</span>
        </div>

        <Title
          title="Build Your Resume Effortlessly"
          description="Create a modern, ATS-friendly resume in minutes using our intelligent AI-powered resume builder — designed for speed, simplicity, and professional polish."
        />

        <div className="flex flex-col md:flex-row items-center justify-center lg:-mt-10 lg:-ml-36">
          <img
            className="max-w-2xl w-full xl:-ml-32"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
            alt=""
          />

          <div
            className="px-4 md:px-0"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {/* Feature 1 */}
            <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
              <div
                className={`p-6 group-hover:bg-[#dc73ff]/30 border border-transparent group-hover:border-[#D78FEE] flex gap-4 rounded-xl transition-colors ${
                  !isHover ? "border-purple-300 bg-[#D78FEE]/30" : ""
                }`}
              >
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
                  className="size-6 stroke-[#ca64ec]"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                </svg>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-700">
                    AI-Powered Suggestions
                  </h3>
                  <p className="text-sm text-slate-600 max-w-xs">
                    Get smart content recommendations for skills, experience, and
                    achievements to make your resume stand out instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
              <div className="p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300 flex gap-4 rounded-xl transition-colors">
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
                  className="size-6 stroke-violet-600"
                >
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                </svg>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-700">
                    Fully Customizable Templates
                  </h3>
                  <p className="text-sm text-slate-600 max-w-xs">
                    Choose from sleek, modern templates and edit every section—
                    fonts, colors, layout — exactly the way you want.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
              <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
                <svg
                  className="size-6 stroke-orange-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 15V3" />
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="m7 10 5 5 5-5" />
                </svg>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-700">
                    Instant PDF Downloads
                  </h3>
                  <p className="text-sm text-slate-600 max-w-xs">
                    Export your resume in high-quality PDF format with one click —
                    clean, polished, and ready to apply anywhere.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}</style>
      </div>
    </>
  );
};

export default Features;
