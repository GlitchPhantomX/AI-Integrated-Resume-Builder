// POST: /api/resumes/Create
import imageKit from "../configs/imageKit.js";
import Resume from "../models/resume.js";
import fs from "fs";
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;
    const newResume = await Resume.create({ userId, title });

    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;

    const { resumeId } = req.params;

    await Resume.findOneAndDelete({
      userId,
      _id: resumeId,
    });
    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// GET: /api/resumes/get

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;

    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      userId,
      _id: resumeId,
    });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// GET: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground, imageColor } = req.body;
    const image = req.file;

    let resumeDataCopy;
    if(typeof resumeData === "string") {
     resumeDataCopy = await JSON.parse(resumeData)
    } else {
      resumeDataCopy = structuredClone(resumeData)
    }
    
    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      let transformation = "w-400,h-400,fo-face,z-0.75"; 
      
      if (removeBackground === "yes") {
        transformation += ",e-bgremove";
      }
      
      if (imageColor && imageColor !== "original") {
        const cleanColor = imageColor.replace("#", "");
        transformation += `,e-colorize:${cleanColor}`;
      }

      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: `resume-${Date.now()}.png`,
        folder: "user-resumes",
        transformation: {
          pre: transformation,
        },
      });
      
      resumeDataCopy.personal_info.image = response.url;
      
      // Clean up temp file
      fs.unlinkSync(image.path);
    }

    const resume = await Resume.findOneAndUpdate(
      {
        userId,
        _id: resumeId,
      },
      resumeDataCopy,
      {
        new: true,
      }
    );

    return res.status(200).json({ 
      message: "Saved Successfully", 
      resume 
    });
  } catch (error) {
    console.error("Error updating resume:", error);
    return res.status(400).json({ message: error.message });
  }
};

