import { useNavigate } from "react-router-dom";
import { PlusCircle, Pencil, Trash2, GraduationCap } from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";

// Mock data for demonstration
const courses = [
  {
    id: 1,
    name: "Web Development Bootcamp",
    duration: "6 months",
    fees: 599,
    totalSeats: 30,
    description:
      "Comprehensive web development course covering frontend and backend technologies.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Data Science Fundamentals",
    duration: "4 months",
    fees: 499,
    totalSeats: 25,
    description:
      "Learn the basics of data science, statistics, and machine learning.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  },
];

function CourseList() {
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      console.log("Deleting course:", id);
    }
  };

  return (
    <LayoutAdmin>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Course Management
              </h1>
            </div>
            <button
              onClick={() => navigate("/courses/add")}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add New Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {course.name}
                  </h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-600">
                      Duration: {course.duration}
                    </p>
                    <p className="text-sm text-gray-600">
                      Fees: ${course.fees}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total Seats: {course.totalSeats}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => navigate(`/courses/edit/${course.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default CourseList;
