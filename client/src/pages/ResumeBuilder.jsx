import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import PersonalInfoFrom from "../components/PersonalInfoFrom";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import api from "../configs/api";
import AnimatedAlert from "../components/AnimatedAlert";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [imageColor, setImageColor] = useState("original");
  const [removeBackground, setRemoveBackground] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alertData, setAlertData] = useState({
    show: false,
    title: "",
    description: "",
  });

  const triggerAlert = (title, description) => {
    setAlertData({ show: true, title, description });
  };

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#cb39fc",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  const showAlert = (type, title, message) => {
    setAlert({ type, title, message });
    setTimeout(() => setAlert(null), 4000);
  };

  const loadExixtingResume = async () => {
  try {
    setIsLoading(true);
    const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
      headers: { 
        Authorization: `Bearer ${token}` // Added "Bearer " prefix
      },
    });
    
    if (data?.resume) {
      setResumeData(data.resume);
      document.title = data.resume.title;
      triggerAlert(
        "Resume Loaded Successfully",
        "Your resume details have been loaded for editing."
      );
    }
  } catch (error) {
    console.error("Load Resume Error:", error);
    triggerAlert(
      "Failed to Load Resume",
      error?.response?.data?.message || "There was an issue loading your resume. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};

// saveResume function - Updated
const saveResume = async () => {
  try {
    let updatedResumeData = structuredClone(resumeData);
    if (typeof resumeData.personal_info.image === "object") {
      delete updatedResumeData.personal_info.image;
    }

    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append("resumeData", JSON.stringify(updatedResumeData));

    const { data } = await api.put("/api/resumes/update", formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });

    if (data?.resume) {
      setResumeData(data.resume);
      triggerAlert(
        "Resume Saved Successfully!",
        "Your latest updates have been securely saved. You can now preview or download your resume."
      );
    }
  } catch (error) {
    console.error("Save Resume Error:", error);
    triggerAlert(
      "Save Failed",
      error?.response?.data?.message || "An unexpected error occurred. Please try saving again."
    );
  }
};

// changeResumeVisibility function - Updated
const changeResumeVisibility = async () => {
  try {
    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append(
      "resumeData",
      JSON.stringify({ public: !resumeData.public })
    );

    const { data } = await api.put(`/api/resumes/update`, formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });

    setResumeData({ ...resumeData, public: !resumeData.public });
    triggerAlert(
      "Visibility Updated",
      `Your resume is now ${!resumeData.public ? "publicly accessible" : "private"} to others.`
    );
  } catch (error) {
    console.error("Visibility Update Error:", error);
    triggerAlert(
      "Update Failed",
      error?.response?.data?.message || "Could not change the resume visibility. Try again later."
    );
  }
};

  const downloadResume = () => {
  // Wait a bit for styles to apply
  setTimeout(() => {
    window.print();
    triggerAlert(
      "Download Started",
      "Your resume is being prepared for download as a PDF."
    );
  }, 300);
};

  const handleShare = () => {
    const frontUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({
        url: resumeUrl,
        text: "My Resume",
      });
    } else {
      showAlert("error", "Unsupported", "Share not supported on this browser.");
    }
  };

  // const downloadResume = () => {
  //   window.print();
  //   showAlert("success", "Download Started", "Your resume is downloading...");
  // };

  // const saveResume = async () => {
  //   try {
  //     let updatedResumeData = structuredClone(resumeData);

  //     if (typeof resumeData.personal_info.image === "object") {
  //       delete updatedResumeData.personal_info.image;
  //     }

  //     const formData = new FormData();
  //     formData.append("resumeId", resumeId);
  //     formData.append("resumeData", JSON.stringify(updatedResumeData));

  //     if (removeBackground) formData.append("removeBackground", "yes");
  //     if (imageColor && imageColor !== "original")
  //       formData.append("imageColor", imageColor);
  //     if (typeof resumeData.personal_info.image === "object")
  //       formData.append("image", resumeData.personal_info.image);

  //     const { data } = await api.put("/api/resumes/update", formData, {
  //       headers: { Authorization: token },
  //     });

  //     if (data?.resume) {
  //       setResumeData(data.resume);
  //       showAlert("success", "Saved!", data.message || "Resume saved successfully!");
  //     }
  //   } catch (error) {
  //     showAlert("error", "Error", "Failed to save resume");
  //   }
  // };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <>
      <AnimatedAlert
        show={alertData.show}
        title={alertData.title}
        description={alertData.description}
        onClose={() => setAlertData({ ...alertData, show: false })}
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-24 py-8">
        <Link
          to={`/app`}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto lg:px-24 px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              <div
                className="absolute top-0 left-0 h-1 bg-[#cb39fc] transition-all duration-300 ease-out"
                style={{
                  width: `${
                    (activeSectionIndex / (sections.length - 1)) * 100
                  }%`,
                }}
              ></div>

              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1)
                      )
                    }
                    className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoFrom
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                    imageColor={imageColor}
                    setImageColor={setImageColor}
                  />
                )}
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, experience: data }))
                    }
                  />
                )}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, education: data }))
                    }
                  />
                )}
                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.projects}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, projects: data }))
                    }
                  />
                )}
                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, skills: data }))
                    }
                  />
                )}
              </div>

              <button
                onClick={saveResume}
                className="bg-gradient-to-br from-[#f7e1ff] to-[#e1a2f8]/20 ring-[#e79dff] text-[#cb39fc] ring hover:ring-[#db6fff] transition-all rounded-md px-6 py-2 mt-6 text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="absolute lg:top-[-45px] left-0 right-0 flex items-center justify-end gap-2 ">
              {resumeData.public && (
                <button
                  onClick={handleShare}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-blue-100 text-blue-700 rounded-lg hover:ring hover:ring-blue-300"
                >
                  <Share2Icon className="size-4" /> Share
                </button>
              )}

              <button
                onClick={changeResumeVisibility}
                className="flex items-center p-2 px-4 gap-2 text-xs bg-pink-100 text-pink-600 rounded-lg hover:ring hover:ring-pink-300"
              >
                {resumeData.public ? (
                  <EyeIcon className="size-4" />
                ) : (
                  <EyeOffIcon className="size-4" />
                )}
                {resumeData.public ? "Public" : "Private"}
              </button>

              <button
                onClick={downloadResume}
                className="flex items-center p-2 px-4 gap-2 text-xs bg-purple-100 text-purple-600 rounded-lg hover:ring hover:ring-purple-300"
              >
                <DownloadIcon className="size-4" />
                Download
              </button>
            </div>

            <div className="mt-14 md:mt-0">
              <ResumePreview
                data={resumeData}
                template={resumeData?.template || "classic"}
                accentColor={resumeData?.accent_color || "#3b82f6"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;
