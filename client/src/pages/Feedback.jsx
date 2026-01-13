"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, MessageCircleHeart } from "lucide-react";
import { Button } from "../components/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "../components/tooltip";
import AnimatedAlert from "../components/AnimatedAlert"; 


const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;

    const newReview = {
      id: Date.now(),
      rating,
      comment,
      name: "Anonymous User",
      date: new Date().toLocaleDateString(),
    };
    setReviews([newReview, ...reviews]);
    setShowAlert(true);
    setRating(0);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f5ff] to-[#eae6ff] py-20 px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <MessageCircleHeart className="mx-auto text-[#cb39fc] size-12 mb-3" />
        <h1 className="text-4xl font-bold text-[#2b1e4b]">
          Share Your Experience 💜
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Tell us how our AI Resume Builder helped you stand out — your opinion
          matters!
        </p>
      </motion.div>

      {/* Feedback Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-lg mx-auto bg-white/70 backdrop-blur-md border border-[#e79dff]/40 shadow-lg rounded-2xl p-6"
      >
        <label className="block text-sm font-medium text-[#6a4fa3] mb-2">
          How would you rate your experience?
        </label>

        {/* Star Rating */}
        <div className="flex justify-center mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`size-7 cursor-pointer transition-all ${
                star <= (hover || rating)
                  ? "fill-[#cb39fc] text-[#cb39fc]"
                  : "fill-transparent text-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Comment Box */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback..."
          rows="4"
          className="w-full border border-[#e79dff]/40 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#cb39fc] outline-none resize-none mb-5"
        />

        <Button
          type="submit"
          className="w-full bg-[#cb39fc] hover:bg-[#b62ce0] text-white rounded-lg flex items-center justify-center gap-2"
        >
          <Send className="size-4" /> Submit Feedback
        </Button>
      </motion.form>

      {/* Reviews List */}
      {reviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto mt-14 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-[#2b1e4b] text-center mb-4">
            Recent Feedback
          </h2>

          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-[#e79dff]/30 shadow-sm rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-[#4a2a78]">{review.name}</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
              <div className="flex mt-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < review.rating
                        ? "fill-[#cb39fc] text-[#cb39fc]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm">{review.comment}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatedAlert
        show={showAlert}
        onClose={() => setShowAlert(false)}
        title="Feedback Submitted!"
        description="Thank you for sharing your thoughts 💜"
      />
    </div>
  );
};

export default FeedbackPage;
