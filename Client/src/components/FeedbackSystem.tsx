import React, { useState } from "react";
import { MessageSquare, Star, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { submitFeedback } from "../Redux/Slice/UserSlice";

const FeedbackSystem = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("course");
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const Data = {
      feedbackType,
      name,
      rating,
      feedback,
    };
    await dispatch(submitFeedback(Data));
    setName("");
    setRating(0);
    setFeedback("");
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <MessageSquare className="h-12 w-12 text-[var(--icon-color)] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[var(--heading-color)]">
            Your Feedback Matters
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Help us improve our services
          </p>
        </motion.div>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-[var(--cardBg-color)] rounded-lg shadow-lg p-8"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold   mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              placeholder="Full name"
              onChange={(e) => setName(e.target.value)}
              className="block w-full   rounded-lg p-2  outline-none border-2  sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              What would you like to give feedback about?
            </label>
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md "
            >
              <option value="course">Course Content</option>
              <option value="teacher">Teaching Staff</option>
              <option value="facilities">Campus Facilities</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Share your experience and suggestions..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--bg-color)] text-[var(--text-color)] px-6 py-3 rounded-md custom-hover transition-colors flex items-center justify-center gap-2"
          >
            <Send className="h-5 w-5" />
            Submit Feedback
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default FeedbackSystem;
