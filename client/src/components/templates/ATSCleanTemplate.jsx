import React from "react";

const ATSProTemplate = ({ data, accentColor = "#1E3A8A" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 p-6 sm:p-10 font-sans leading-relaxed">
      {/* Header */}
      <header className="border-b border-gray-300 pb-4 mb-6 text-center">
        <h1
          className="text-3xl font-bold tracking-wide"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          {data.personal_info?.email && `${data.personal_info.email} | `}
          {data.personal_info?.phone && `${data.personal_info.phone} | `}
          {data.personal_info?.location}
        </p>
      </header>

      {/* Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2
            className="text-lg font-semibold border-b-2 pb-1 mb-3 uppercase tracking-wider"
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
        <section className="mb-6">
          <h2
            className="text-lg font-semibold border-b-2 pb-1 mb-3 uppercase tracking-wider"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {exp.position}
                  </h3>
                  <span className="text-sm text-gray-500">
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
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-lg font-semibold border-b-2 pb-1 mb-3 uppercase tracking-wider"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Projects
          </h2>
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-semibold">{proj.name}</h3>
              {proj.type && (
                <p className="text-sm font-medium" style={{ color: accentColor }}>
                  {proj.type}
                </p>
              )}
              {proj.description && (
                <p className="text-sm text-gray-700 mt-1 leading-snug">
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-lg font-semibold border-b-2 pb-1 mb-3 uppercase tracking-wider"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Education
          </h2>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold text-gray-900">
                {edu.degree} {edu.field && `in ${edu.field}`}
              </p>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500">
                {formatDate(edu.graduation_date)}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <h2
            className="text-lg font-semibold border-b-2 pb-1 mb-3 uppercase tracking-wider"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full border"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                  backgroundColor: "#F9FAFB",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ATSProTemplate;
