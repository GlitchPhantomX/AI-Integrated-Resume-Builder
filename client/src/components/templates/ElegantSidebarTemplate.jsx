import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ElegantSidebarProTemplate = ({ data, accentColor = "#1E3A8A" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md flex flex-col sm:flex-row overflow-hidden rounded-lg border border-gray-200">
      {/* Sidebar */}
      <aside
        className="sm:w-1/3 p-6 text-white flex-shrink-0"
        style={{ backgroundColor: accentColor }}
      >
        {/* Profile Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 leading-tight">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          {data.personal_info?.title && (
            <p className="text-sm text-gray-200">{data.personal_info.title}</p>
          )}
        </div>

        {/* Contact */}
        <div className="space-y-3 text-sm mb-8">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={16} />
              <span className="break-all">{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span className="break-all">{data.personal_info.website}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {data.skills?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 border-b border-gray-300/40 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-white/10 px-3 py-1 rounded-full text-xs font-light"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3 border-b border-gray-300/40 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <p className="font-medium text-white">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  <p className="text-xs text-gray-200">{edu.institution}</p>
                  <p className="text-xs text-gray-300">
                    {formatDate(edu.graduation_date)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="sm:w-2/3 p-6 sm:p-10 bg-gray-50">
        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2
              className="text-lg font-semibold uppercase tracking-wider mb-2 border-b-2 pb-1"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-lg font-semibold uppercase tracking-wider mb-3 border-b-2 pb-1"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Experience
            </h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-5">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <p
                  className="text-sm text-gray-700 font-medium"
                  style={{ color: accentColor }}
                >
                  {exp.company}
                </p>
                {exp.description && (
                  <ul className="list-disc ml-5 text-sm mt-1 text-gray-700">
                    {exp.description.split("\n").map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section>
            <h2
              className="text-lg font-semibold uppercase tracking-wider mb-3 border-b-2 pb-1"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Projects
            </h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold text-gray-800">{proj.name}</h3>
                {proj.type && (
                  <p
                    className="text-sm font-medium"
                    style={{ color: accentColor }}
                  >
                    {proj.type}
                  </p>
                )}
                <p className="text-sm text-gray-700 mt-1 leading-snug">
                  {proj.description}
                </p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default ElegantSidebarProTemplate;
