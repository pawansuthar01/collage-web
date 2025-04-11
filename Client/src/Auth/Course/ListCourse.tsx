import { useNavigate } from "react-router-dom";
import { PlusCircle, Pencil, Trash2, GraduationCap } from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { useEffect, useState } from "react";
import { getCourseData } from "../../Redux/Slice/getData";
import { CourseSkeleton } from "../../components/loadingPage/Skeleton";
import { DeleteCourse } from "../../Redux/Slice/Admin";

type Course = {
  _id: string;
  photo: string;
  name_course: string;
  course_description: string;
  course_dur: number;
  course_fees: number;
  course_seats: number;
};
function CourseList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Course[]>([]);
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
  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await dispatch(DeleteCourse(id));

      setData((prev) => prev.filter((course) => course._id !== id));
    }
  };

  return (
    <LayoutAdmin>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <GraduationCap className="h-8 max-[600px]:w-5 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900 max-[600px]:text-lg">
                Course Management
              </h1>
            </div>
            <button
              onClick={() => navigate("/Admin/courses/add")}
              className="flex items-center px-4 py-2 max-[600px]:text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add New Course
            </button>
          </div>

          <div className="flex justify-center flex-wrap gap-6">
            {loading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            ) : data.length > 0 ? (
              data.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img
                    src={course.photo}
                    alt={course.name_course}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {course.name_course}
                    </h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-600">
                        Duration: {course.course_dur}
                      </p>
                      <p className="text-sm text-gray-600">
                        Fees: ${course.course_fees}
                      </p>
                      <p className="text-sm text-gray-600">
                        Total Seats: {course.course_seats}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {course.course_description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/Admin/courses/edit/${course._id}`, {
                            state: course,
                          })
                        }
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className=" flex justify-center w-full">
                <div className="p-6 space-y-4">
                  <p className="text-gray-600 text-center">
                    No Course available
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default CourseList;
