import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Layout from "../layout/layout";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { CourseApplySubmit } from "../Redux/Slice/UserSlice";

const CoursesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [courseApplyData, setCourseApplyData] = useState({
    name: "",
    email: "",
    phone: "",
    courseName: "",
    courseFees: "",
    previousEducation: "",
    message: "",
  });
  const courses = [
    {
      id: 1,
      name: "B.Tech",
      duration: "4 Years",
      description: "B.Tech in Computer Science and Engineering",
      fees: "₹2,50,000/year",
      seats: 60,
    },
    {
      id: 2,
      name: "BBA",
      duration: "3 Years",
      description: "Bachelor of Business Administration (BBA)",
      fees: "₹1,80,000/year",
      seats: 120,
    },
    {
      id: 3,
      name: "B.Tech",
      duration: "4 Years",
      description: "B.Tech in Mechanical Engineering",
      fees: "₹2,20,000/year",
      seats: 60,
    },
    {
      id: 4,
      name: "Arts & Humanities",
      duration: "3 Years",
      description: "Bachelor of Arts (BA)",
      fees: "₹1,20,000/year",
      seats: 180,
    },
  ];
  function handelFromOpen({ name, fees }: { name: string; fees: string }) {
    if (!name || !fees) {
      toast.error("Something went wrong...");
      return;
    }

    setCourseApplyData((prev) => ({
      ...prev,
      courseName: name,
      courseFees: fees,
    }));

    setShowForm(true);
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseApplyData((prev) => ({ ...prev, [name]: value }));
    const element = document.getElementById(name);
    if (element) {
      element.style.borderColor = "";
    }
  };

  const handelCourseApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (
      courseApplyData.name &&
      courseApplyData.email &&
      courseApplyData.message &&
      courseApplyData.phone &&
      courseApplyData.courseFees &&
      courseApplyData.courseName &&
      courseApplyData.previousEducation
    ) {
      const res = await dispatch(CourseApplySubmit(courseApplyData));
      console.log(res);
    } else {
      Object.entries(courseApplyData).forEach(([key, value]) => {
        const element = document.getElementById(key);
        if (element) {
          element.style.borderColor = value == "" ? "red" : "";
        }
      });
    }
    setLoading(false);
  };
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-20 pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <GraduationCap className="h-8 w-8 text-[var(--icon-color)]" />
            <h2 className="ml-3 text-3xl font-bold  text-[var(--hading-color)]">
              Our Courses
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold  text-[var(--heading-color)]">
                  {course.name}
                </h3>
                <p className="mt-2  font-medium text-[var(--course-year-color)]">
                  {course.duration}
                </p>
                <p className="mt-2 text-gray-600">{course.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-[var(--course-fees-color)]">
                    Fees: {course.fees}
                  </span>
                  <span className="text-[var(--course-seat-color)]">
                    Seats: {course.seats}
                  </span>
                </div>
                <button
                  onClick={() =>
                    handelFromOpen({ name: course.name, fees: course.fees })
                  }
                  className="mt-4 w-full bg-[var(--btn-color)] custom-hover  text-[var(--text-color)] px-4 py-2 rounded-md  transition-colors"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-8"
            >
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h3 className="text-2xl font-bold mb-4">
                  Apply for {courseApplyData.courseName}
                </h3>
                <form onSubmit={handelCourseApplySubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      className="mt-1 block  w-full  rounded-lg p-1  outline-none border-2  border-gray-900 shadow-sm "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      className="mt-1 block  w-full  rounded-lg p-1 outline-none border-2  border-gray-900 shadow-sm "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      onChange={handleChange}
                      className="mt-1 block   w-full  rounded-lg p-1  outline-none border-2  border-gray-900 shadow-sm "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="previousEducation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Previous Education
                    </label>
                    <input
                      type="text"
                      id="previousEducation"
                      name="previousEducation"
                      onChange={handleChange}
                      className="mt-1 block   w-full  rounded-lg p-1  outline-none border-2  border-gray-900 shadow-sm "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      message
                    </label>
                    <textarea
                      rows={4}
                      id="message"
                      name="message"
                      onChange={handleChange}
                      className="mt-1 block   w-full  rounded-lg   outline-none border-2  border-gray-900 shadow-sm "
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setShowForm(false)}
                      className={` ${
                        !loading ? " cursor-pointer" : "cursor-not-allowed"
                      } px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={` ${
                        !loading ? " cursor-pointer" : "cursor-not-allowed"
                      } px-4 py-2 bg-[var(--btn-color)] custom-hover  text-[var(--text-color)]  rounded-md `}
                    >
                      {!loading ? "Submit Application" : "Loading.."}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default CoursesPage;
