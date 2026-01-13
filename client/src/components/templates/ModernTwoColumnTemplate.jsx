import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTwoColumnProTemplate = ({ data, accentColor = "#1E3A8A" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col sm:flex-row">
      {/* Left Column */}
      <aside className="sm:w-2/5 bg-gray-50 border-r border-gray-200 p-6 sm:p-8">
        {/* Header Info */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold leading-tight mb-2"
            style={{ color: accentColor }}
          >
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          {data.personal_info?.title && (
            <p className="text-sm text-gray-600">{data.personal_info.title}</p>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-sm text-gray-700 mb-8">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} style={{ color: accentColor }} />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} style={{ color: accentColor }} />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} style={{ color: accentColor }} />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={16} style={{ color: accentColor }} />
              <span className="break-all">{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-2">
              <Globe size={16} style={{ color: accentColor }} />
              <span className="break-all">{data.personal_info.website}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {data.skills?.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-base font-semibold mb-3 uppercase tracking-wider border-b pb-1"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-white border rounded-full"
                  style={{ borderColor: accentColor, color: accentColor }}
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
            <h2
              className="text-base font-semibold mb-3 uppercase tracking-wider border-b pb-1"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <p className="font-medium text-gray-900 text-sm">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  <p className="text-xs text-gray-700">{edu.institution}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(edu.graduation_date)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Right Column */}
      <main className="sm:w-3/5 p-6 sm:p-10 bg-white">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2
              className="text-lg font-semibold uppercase tracking-wider mb-3 border-b-2 pb-1"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
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
                  <ul className="list-disc ml-5 text-sm mt-1 text-gray-700 leading-snug">
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

export default ModernTwoColumnProTemplate;
