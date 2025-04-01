import { motion } from "framer-motion";
import About from "../components/About";

const AboutPage = () => {
  const teachers = [
    {
      name: "Dr. Sarah Johnson",
      position: "Dean of Computer Science",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Prof. Michael Chen",
      position: "Head of Business School",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Dr. Emily Williams",
      position: "Director of Research",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Prof. David Brown",
      position: "Head of Engineering",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 pb-16"
    >
      <About />

      <div className="mt-16 p-8">
        <h3 className="text-2xl font-semibold text-[var(--heading-color)] mb-8">
          Our Faculty
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[var(--cardBg-color)] cursor-pointer rounded-lg hover:shadow-lg shadow-md overflow-hidden"
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-[var(--heading-color)]">
                  {teacher.name}
                </h4>
                <p className="text-gray-600">{teacher.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
