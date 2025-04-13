import { motion } from "framer-motion";
import { RootState } from "../Redux/Store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi"; // ✅ Use a specific icon
import { Star } from "lucide-react";

type feedbackType = {
  _id: string;
  name: string;
  rating: string;
  giveFeedback: string;
  message: string;
  image?: string; // optional, if available
};

export const BastFeedback = () => {
  const FeedbackData = useSelector(
    (state: RootState) => state.storeData.feedbackData
  );

  const [Feedback, setFeedback] = useState<feedbackType[]>([]);

  useEffect(() => {
    if (
      FeedbackData &&
      typeof FeedbackData === "object" &&
      "bast" in FeedbackData &&
      Array.isArray(FeedbackData.bast)
    ) {
      setFeedback(FeedbackData.bast);
    }
  }, [FeedbackData]);

  return (
    <section className="py-16  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[var(--heading-color)]">
            Student Testimonials
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            What our students say about us
          </p>
        </motion.div>
        <div className="flex justify-evenly flex-wrap gap-8 ">
          {Feedback.map((feedback, index) => (
            <motion.div
              key={feedback._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[var(--cardBg-color)] min-w-[320px]  border p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <BiUserCircle className="w-12 h-12 text-gray-400" />

                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[var(--heading-color)]">
                    {feedback.name}
                  </h4>
                  <p className="text-gray-600">
                    <span className="font-bold text-[var(--heading-color)]">
                      For :
                    </span>{" "}
                    {feedback.giveFeedback}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{feedback.message}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AllFeedback = () => {
  const FeedbackData = useSelector(
    (state: RootState) => state.storeData.feedbackData
  );

  const [Feedback, setFeedback] = useState<feedbackType[]>([]);

  useEffect(() => {
    if (
      FeedbackData &&
      typeof FeedbackData === "object" &&
      "allFeedback" in FeedbackData &&
      Array.isArray(FeedbackData.allFeedback)
    ) {
      setFeedback(FeedbackData.allFeedback);
    }
  }, [FeedbackData]);

  return (
    <section className="py-16  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[var(--heading-color)]">
            Feedback
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            What our students say about us
          </p>
        </motion.div>
        <div className="flex justify-evenly flex-wrap gap-8 ">
          {Feedback.map((feedback, index) => (
            <motion.div
              key={feedback._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[var(--cardBg-color)]  min-w-[320px] border p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <BiUserCircle className="w-12 h-12 text-gray-400" />

                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[var(--heading-color)]">
                    {feedback.name}
                  </h4>
                  <p className="text-gray-600">
                    <span className="font-bold text-[var(--heading-color)]">
                      For :
                    </span>{" "}
                    {feedback.giveFeedback}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < parseInt(feedback.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">"{feedback.message}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
