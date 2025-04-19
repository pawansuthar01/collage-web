import { motion } from "framer-motion";

import Hero from "../components/Hero";
import NoticeBoard from "../components/NoticeBoard";
import FeedbackSystem from "../components/FeedbackSystem";
import Layout from "../layout/layout";
import { CallRequest } from "./CallRequest";
import { SkeletonBox } from "../components/loadingPage/Skeleton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { useEffect, useState } from "react";
import { getAllData } from "../Redux/Slice/getData";
import { Course } from "../components/Course";
import { AllFeedback, BastFeedback } from "../components/feedbackPage";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const handelBannerDataLoad = async () => {
    try {
      setLoading(true);
      await dispatch(getAllData());

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handelBannerDataLoad();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <SkeletonBox className="h-64 w-full mb-6" /> {/* Hero Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SkeletonBox key={idx} className="h-32" />
          ))}
        </div>
        <div className="mb-6">
          <SkeletonBox className="h-10 w-1/3 mb-4" />
          <SkeletonBox className="h-6 w-2/3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <SkeletonBox key={idx} className="h-72" />
          ))}
        </div>
        <div className="mb-6">
          <SkeletonBox className="h-10 w-1/3 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonBox key={idx} className="h-48" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <CallRequest />
        {/* Stats Section */}

        <section className="py-16 bg-gray-50">
          <NoticeBoard />
        </section>

        {/* Featured Programs */}
        <Course />

        {/* Testimonials */}

        <BastFeedback />
        {/* Feedback System */}
        <FeedbackSystem />
        <AllFeedback />
      </motion.div>
    </Layout>
  );
};

export default HomePage;
