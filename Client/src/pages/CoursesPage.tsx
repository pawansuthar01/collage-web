import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Layout from "../layout/layout";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { CourseApplySubmit } from "../Redux/Slice/UserSlice";
import { CourseCardSkeleton } from "../components/loadingPage/Skeleton";
import { getCourseData } from "../Redux/Slice/getData";
type Course = {
  _id: string;
  name_course: string;
  course_description: string;
  course_dur: string;
  course_fees: string;
  course_seats: string;
};
const CoursesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Course[]>([]);
  const [courseApplyData, setCourseApplyData] = useState({
    name: "",
    email: "",
    phone: "",
    courseName: "",
    courseFees: "",
    previousEducation: "",
    message: "",
  });
  async function getCourses() {
    setLoading(true);
    const res = await dispatch(getCourseData());
    if (res?.payload && typeof res.payload === "object") {
      const Data = res.payload;
      setData(Data);
    }
    setLoading(false);
  }
  useEffect(() => {
    getCourses();
  }, []);

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
      await dispatch(CourseApplySubmit(courseApplyData));
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
        className="pt-20 pb-16  min-h-[50%]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center mb-8">
            <GraduationCap className="h-8 w-8 text-[var(--icon-color)]" />
            <h2 className="ml-3 text-3xl font-bold  text-[var(--hading-color)]">
              Our Courses
            </h2>
          </div>

          <div className=" gap-6 flex justify-evenly  flex-wrap">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))
            ) : data.length > 0 ? (
              data.map((course) => (
                <motion.div
                  key={course._id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 min-w-[350px] border rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold  text-[var(--heading-color)]">
                    {course.name_course}
                  </h3>
                  <p className="mt-2  font-medium text-[var(--course-year-color)]">
                    Duration: {course.course_dur}
                  </p>
                  <p className="mt-2 text-gray-600">
                    {course.course_description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-[var(--course-fees-color)]">
                      Fees :₹{course.course_fees}
                    </span>
                    <span className="text-[var(--course-seat-color)]">
                      Seats: {course.course_seats}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handelFromOpen({
                        name: course.name_course,
                        fees: course.course_fees,
                      })
                    }
                    className="mt-4 w-full bg-[var(--btn-color)] custom-hover  text-[var(--text-color)] px-4 py-2 rounded-md  transition-colors"
                  >
                    Apply Now
                  </button>
                </motion.div>
              ))
            ) : (
              <div className=" rounded-lg ">
                <div className="p-6 space-y-4">
                  <p className="text-[var(--text-Secondary-color)] text-center">
                    No Course available
                  </p>
                </div>
              </div>
            )}
          </div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 pt-44  overflow-x-auto flex items-center justify-center p-8"
            >
              <div className="bg-[Var(--cardBg-color)] rounded-lg p-8  max-w-md w-full">
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
                      className=" block  w-full  rounded-lg p-1  outline-none border-2  border-gray-900 shadow-sm "
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
                      className=" block  w-full  rounded-lg p-1 outline-none border-2  border-gray-900 shadow-sm "
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
                      className=" block   w-full  rounded-lg p-1  outline-none border-2  border-gray-900 shadow-sm "
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
                      className=" block   w-full  rounded-lg p-1  outline-none border-2  border-gray-900 shadow-sm "
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
                      className=" block   w-full  rounded-lg   outline-none border-2  border-gray-900 shadow-sm "
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
