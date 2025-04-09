import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import Layout from "../layout/layout";

const NoticesPage = () => {
  const notices = [
    {
      id: 1,
      date: "2024-03-15",
      title: "New Semester Registration",
      content:
        "Registration for the upcoming semester starts from March 20th, 2024.",
      category: "Academic",
    },
    {
      id: 2,
      date: "2024-03-14",
      title: "Annual Sports Meet",
      content:
        "Annual sports meet will be held from April 5th to April 7th, 2024.",
      category: "Sports",
    },
    {
      id: 3,
      date: "2024-03-13",
      title: "Guest Lecture Series",
      content:
        "Distinguished Professor Dr. Smith will deliver a lecture on AI on March 25th.",
      category: "Events",
    },
    // Add more notices here
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="pt-20 pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Bell className="h-8 w-8 text-[var(--icon-color)]" />
            <h2 className="ml-3 text-3xl font-bold text-[var(--heading-color)]">
              Latest Updates
            </h2>
          </div>

          <div className="grid gap-6">
            {notices.map((notice) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[var(--cardBg-color)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[var(--notice-bg-color)] text-[var(--notice-text-color)]">
                      {notice.category}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-[var(--heading-color)]">
                      {notice.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{notice.content}</p>
                  </div>
                  <div className="text-sm text-gray-500">{notice.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default NoticesPage;
