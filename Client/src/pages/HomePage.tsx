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
import { getBannerData } from "../Redux/Slice/getData";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const handelBannerDataLoad = async () => {
    try {
      setLoading(true);
      await dispatch(getBannerData());

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handelBannerDataLoad();
  }, []);
  const testimonials = [
    {
      id: 1,
      name: "Sarah Parker",
      course: "B.A.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote:
        "The faculty and resources here have been instrumental in shaping my career in technology.",
    },
    {
      id: 2,
      name: "Michael Chang",
      course: "BBA",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote:
        "The practical approach to business education gave me real-world experience.",
    },
    {
      id: 3,
      name: "Emma Wilson",
      course: "B.tech",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote:
        "The hands-on laboratory experience has been invaluable for my engineering career.",
    },
  ];

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
        <section className="py-16 bg-[var(--cardBg-color)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-[var(--heading-color)]">
                Featured Programs
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Discover our most popular academic programs
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "RS-CIT",
                  description:
                    "Learn cutting-edge technologies and software development",
                  image:
                    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                },
                {
                  title: "BBA",
                  description:
                    "Master data-driven decision making and business strategy",
                  image:
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                },
                {
                  title: "BA",
                  description:
                    "Learn modern marketing techniques and strategies",
                  image:
                    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                },
              ].map((program, index) => (
                <motion.div
                  key={program.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[var(--cardBg-color)] rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[var(--heading-color)] mb-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-600">{program.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[var(--cardBg-color)] p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-[var(--heading-color)]">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600">{testimonial.course}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback System */}
        <FeedbackSystem />
      </motion.div>
    </Layout>
  );
};

export default HomePage;
