import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import { Button } from "../components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/dialog";
import { Input } from "../components/input";
import { Label } from "../components/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  const createResume = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } }
      );

      setAllResumes((prev) => [
        ...prev,
        { _id: data.resumeId, title, updatedAt: new Date() },
      ]);

      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      setIsLoading(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      setIsLoading(false);
    }
  };

  const editTitle = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.put(
        "/api/resumes/update",
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: token } }
      );

      setAllResumes((prev) =>
        prev.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume
        )
      );
      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const { data } = await api.delete(`/api/resumes/delete/${deleteId}`, {
        headers: { Authorization: token },
      });

      setAllResumes((prev) => prev.filter((r) => r._id !== deleteId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setDeleteId(null);
    }
  };

  // useEffect(() => {
  //   loadALlResumes();
  // }, []);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-24 py-8 ">
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-[#cf50f9] hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-[#b32fdf] text-white rounded-full" />
            <p className="text-sm group-hover:text-[#cf50f9] transition-all duration-300">
              Create Resume
            </p>
          </button>
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-[#b32fdf] hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br to-[#ce4cf9]  from-[#ebaeff] text-white rounded-full" />
            <p className="text-sm group-hover:text-[#b32fdf] transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        {showCreateResume && (
          <Dialog open={showCreateResume} onOpenChange={setShowCreateResume}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Create a Resume
                </DialogTitle>
                <DialogDescription className="text-gray-500 dark:text-gray-400">
                  Enter a title for your new resume and click "Create".
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createResume(e);
                  setShowCreateResume(false);
                }}
                className="grid gap-4 mt-4"
              >
                <div className="grid gap-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Resume Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter resume title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border-gray-300 focus-visible:ring-[#b32fdf]"
                  />
                </div>

                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="bg-[#b32fdf] hover:bg-[#a81dd6] text-white"
                  >
                    Create Resume
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}

        <hr className="border-slate-300 my-6 sm:w-[305px]  " />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4 ">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 w-full text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <TrashIcon
                        onClick={() => setDeleteId(resume._id)}
                        className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors cursor-pointer"
                      />
                    </AlertDialogTrigger>
                    {deleteId === resume._id && (
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this resume?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. Your resume will be
                            permanently removed from your account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setDeleteId(null)}
                            className="text-gray-600"
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-gradient-to-r from-[#c446ee] to-[#ce68f0] text-white hover:opacity-90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    )}
                  </AlertDialog>
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {showUploadResume && (
          <Dialog open={showUploadResume} onOpenChange={setShowUploadResume}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Upload Resume
                </DialogTitle>
                <DialogDescription className="text-gray-500 dark:text-gray-400">
                  Select your existing resume file and give it a title before
                  uploading.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  uploadResume(e);
                  setShowUploadResume(false);
                }}
                className="grid gap-4 mt-4"
              >
                <div className="grid gap-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Resume Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter resume title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border-gray-300 focus-visible:ring-[#b32fdf]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="resume-input"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Upload Resume File
                  </Label>
                  <label
                    htmlFor="resume-input"
                    className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-400 rounded-md p-6 py-10 text-gray-500 hover:text-[#b32fdf] hover:border-[#b32fdf] cursor-pointer transition-all"
                  >
                    {resume ? (
                      <p className="text-[#b32fdf] font-medium">
                        {resume.name}
                      </p>
                    ) : (
                      <>
                        <UploadCloud className="size-12 stroke-1" />
                        <p>Click to upload PDF</p>
                      </>
                    )}
                  </label>
                  <input
                    id="resume-input"
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </div>

                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#b32fdf] hover:bg-[#a81dd6] text-white flex items-center justify-center gap-2"
                  >
                    {isLoading && (
                      <LoaderCircleIcon className="size-4 text-white animate-spin" />
                    )}
                    {isLoading ? "Uploading..." : "Upload Resume"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {editResumeId && (
          <Dialog
            open={!!editResumeId}
            onOpenChange={() => setEditResumeId("")}
          >
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Edit Resume Title
                </DialogTitle>
                <DialogDescription className="text-gray-500 dark:text-gray-400">
                  Update the title of your selected resume below.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editTitle(e);
                  setEditResumeId("");
                }}
                className="grid gap-4 mt-4"
              >
                <div className="grid gap-2">
                  <Label
                    htmlFor="edit-title"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Resume Title
                  </Label>
                  <Input
                    id="edit-title"
                    type="text"
                    placeholder="Enter new resume title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border-gray-300 focus-visible:ring-[#b32fdf]"
                  />
                </div>

                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="bg-[#b32fdf] hover:bg-[#a81dd6] text-white"
                  >
                    Update Title
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
