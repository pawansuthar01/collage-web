import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { useNavigate } from "react-router-dom";
export const Course = () => {
  const navigate = useNavigate();
  const courseData = useSelector(
    (state: RootState) => state.storeData.courseData
  );
  return (
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
        <div className="flex justify-evenly flex-wrap gap-8">
          {courseData.length > 0 &&
            courseData.map((program, index) => (
              <motion.div
                onClick={() => navigate("/courses")}
                key={program._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--cardBg-color)] w-[380px] rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={program.photo}
                  alt={program.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--heading-color)] mb-2">
                    {program.name_course}
                  </h3>
                  <p className="text-gray-600">{program.course_description}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
