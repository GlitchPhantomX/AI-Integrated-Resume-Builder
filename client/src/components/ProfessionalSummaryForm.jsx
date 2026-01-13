import { Loader2, Sparkles } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    if (!data || data.trim() === "") {
      toast.error("Please write something first!");
      return;
    }

    try {
      setIsGenerating(true);

      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Response received:", response.data);

      if (response.data?.enhanceContent) {
        setResumeData((prev) => ({
          ...prev,
          professional_summary: response.data.enhanceContent,
        }));
        toast.success("Summary enhanced successfully!");
      } else {
        toast.error("No enhanced content received");
      }
    } catch (error) {
      console.error("Error details:", error.response || error);
      toast.error(
        error?.response?.data?.message || "Failed to enhance summary"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">Add summary for your resume</p>
        </div>

        <button
          disabled={isGenerating || !data}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-[#f6e0fd] text-[#c03eeb] rounded hover:bg-[#f5d7ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-4">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-[#b32fdf] focus:border-[#b32fdf] outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />
        <p className="text-xs text-gray-500 mt-2 text-center">
          Tip: Keep it concise (3–4 sentences) and focus on your most relevant
          achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
