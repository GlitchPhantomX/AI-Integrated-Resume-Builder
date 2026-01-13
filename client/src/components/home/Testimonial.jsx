import React, { useState, useEffect } from "react";
import { BookUserIcon } from "lucide-react";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import { Textarea } from "../textarea";

const Testimonial = () => {
  const dummyTestimonials = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@briarmartin",
      date: "April 20, 2025",
      feedback:
        "The AI Resume Builder completely transformed how I present myself professionally — it’s intuitive and efficient!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@averyjohnson",
      date: "May 10, 2025",
      feedback:
        "Creating a polished resume has never been this easy. The templates are clean and ATS-friendly!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Jordan Lee",
      handle: "@jordanlee",
      date: "June 5, 2025",
      feedback:
        "I landed two interviews within a week using my AI-generated resume. The experience was seamless!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Chris Taylor",
      handle: "@christaylor",
      date: "July 1, 2025",
      feedback:
        "The customization options and instant suggestions make this the best resume tool I’ve ever used.",
    },
  ];

  const [cardsData, setCardsData] = useState(dummyTestimonials);

  const [formData, setFormData] = useState({
    name: "",
    handle: "",
    feedback: "",
    image: "",
    imageFile: null,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCardsData((prev) => [...prev, ...data]);
        }
      })
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        image: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCard = {
      image:
        formData.image ||
        `https://api.dicebear.com/7.x/thumbs/svg?seed=${formData.name || "guest"}`,
      name: formData.name || "Anonymous",
      handle: formData.handle || "@guest",
      feedback: formData.feedback || "No feedback provided.",
    };

    try {
      const res = await fetch("http://localhost:5000/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCard),
      });

      const data = await res.json();
      if (data.success) {
        setCardsData((prev) => [data.data, ...prev]);
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }

    setFormData({
      name: "",
      handle: "",
      feedback: "",
      image: "",
      imageFile: null,
    });
    setOpen(false);
  };

  const CreateCard = ({ card }) => (
    <div className="px-4 py-2 rounded-lg mx-2 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-2">
        <img className="size-11 rounded-full" src={card.image} alt="User" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p>{card.name}</p>
            <div className="bg-[#b43edb] rounded-full flex items-center justify-center w-4 h-4">
              <svg
                width="9"
                height="9"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.5 8L2 5.5L2.7 4.8L4.5 6.6L9.3 1.8L10 2.5L4.5 8Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-800">{card.feedback}</p>
      <div className="flex items-center justify-between text-slate-500 text-xs">
        <span>Posted on</span>
        <p>{card.date || "—"}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col items-center scroll-mt-12 mt-3">
        <div className="flex items-center gap-2 text-sm text-[#b43edb] bg-purple-400/10 border border-[#D78FEE] rounded-full px-4 py-1 mb-2">
          <BookUserIcon className="size-4.5 stroke-[#b43edb]" />
          <span>Testimonials</span>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">
          Don’t just take our word for it
        </h2>

        <div className="flex justify-center items-center gap-2 flex-row">
          <p className="text-gray-600 text-center max-w-xl">
            Hear what our users say about us — and feel free to share your own
            experience!{" "}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="text-[#cb39fc] underline text-[14px] hover:text-[#d479f3] cursor-pointer transition-all">
                  Your Feedback
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[400px] mt-10 max-h-[65vh] overflow-y-auto rounded-xl">
                <DialogHeader>
                  <DialogTitle>Share Your Experience</DialogTitle>
                  <DialogDescription>
                    We'd love to hear what you think about our Resume Builder.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <Label>Name</Label>
                    <Input
                      className="outline-none mt-2 border-gray-200 focus:border-[#cb39fc] focus:ring-2 focus:ring-[#cb39fc]/30 transition-all duration-200"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label>Username</Label>
                    <Input
                      className="outline-none mt-2 border-gray-200 focus:border-[#cb39fc] focus:ring-2 focus:ring-[#cb39fc]/30 transition-all duration-200"
                      value={formData.handle}
                      onChange={(e) =>
                        setFormData({ ...formData, handle: e.target.value })
                      }
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <Label>Feedback</Label>
                    <Textarea
                      className="outline-none mt-2 focus:border-[#cb39fc] focus:ring-2 focus:ring-[#cb39fc]/30 transition-all duration-200"
                      rows={3}
                      value={formData.feedback}
                      onChange={(e) =>
                        setFormData({ ...formData, feedback: e.target.value })
                      }
                      placeholder="Write your feedback..."
                    />
                  </div>
                  <div>
                    <Label>Profile Image</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        className="outline-none mt-2 focus:ring-2 focus:ring-[#cb39fc]/30 focus:border-[#cb39fc] transition-all duration-200"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="preview"
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      )}
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="bg-[#cb39fc] text-white hover:bg-[#a221cd]"
                    >
                      Submit
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </p>
        </div>
      </div>

      {/* Testimonials rows */}
      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative mt-10 mb-0">
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      </div>

      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative mb-0">
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </>
  );
};

export default Testimonial;
