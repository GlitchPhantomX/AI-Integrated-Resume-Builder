import { GraduationCap, Plus } from "lucide-react";
import React from "react";
import { Trash } from "lucide-react";

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };
  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900">Education</h3>
            <p className="text-sm text-gray-500">Add your education details</p>
          </div>

          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-[#f6e0fd] text-[#c03eeb] rounded-lg hover:bg-[#f5d7ff] transition-colors "
          >
            <Plus className="size-4" />
            <span>Add Education</span>
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No education added yet.</p>
            <p className="text-sm">Click ""Add Education""to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((education, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3 "
              >
                <div className="flex justify-between items-start">
                  <h4>Education #{index + 1}</h4>
                  <button
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash className="size-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    value={education.institution || ""}
                    onChange={(e) =>
                      updateEducation(index, "institution", e.target.value)
                    }
                    type="text"
                    placeholder="Institution Name"
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-[#c03eeb] outline-none"
                  />

                  <input
                    value={education.degree || ""}
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                    type="text"
                    placeholder="Degree (e.g., Bachelor's , Master's)"
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-[#c03eeb] outline-none"
                  />

                  <input
                    value={education.field || ""}
                    onChange={(e) =>
                      updateEducation(index, "field", e.target.value)
                    }
                    type="text"
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-[#c03eeb] outline-none "
                    placeholder="Field of study"
                  />

                  <input
                    value={education.graduation_date || ""}
                    onChange={(e) =>
                      updateEducation(index, "graduation_date", e.target.value)
                    }
                    disabled={education.is_current}
                    type="month"
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-[#c03eeb] outline-none"
                  />
                </div>

               <input
  value={education.gpa || ""}
  onChange={(e) => updateEducation(index, "gpa", e.target.value)}
  type="text"
  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-[#c03eeb] outline-none"
  placeholder="GPA (optional)"
/>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EducationForm;
