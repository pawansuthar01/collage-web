import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { newCourse } from "../../Redux/Slice/Admin";
import toast from "react-hot-toast";
import { getCourseData } from "../../Redux/Slice/getData";

interface courseData {
  name: string;
  duration: number;
  fees: number;
  totalSeats: number;
  description: string;
  image: File | null;
}
function AddCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [newCourseData, setNewCourseData] = useState<courseData>({
    name: "",
    duration: 0,
    fees: 0,
    totalSeats: 0,
    description: "",
    image: null,
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCourseData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (newCourseData.image) {
      formData.append("photo", newCourseData.image);
    }
    formData.append("year", String(newCourseData.duration));
    formData.append("name", newCourseData.name);
    formData.append("description", newCourseData.description);
    formData.append("seats", String(newCourseData.totalSeats));
    formData.append("fees", String(newCourseData.fees));

    if (formData) {
      const res = await dispatch(newCourse(formData));

      if (res?.payload?.success) {
        toast.success(res?.payload?.message);
        setNewCourseData({
          name: "",
          duration: 0,
          fees: 0,
          totalSeats: 0,
          description: "",
          image: null,
        });
      }
      if (!res?.payload?.success) {
        toast.error(res?.payload?.message);
        await dispatch(getCourseData());
      }
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCourseData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <LayoutAdmin>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button
              onClick={() => navigate("/courses")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Courses
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Add New Course
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="flex  justify-center  text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative  cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image-upload"
                        name="image"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <label htmlFor="image-upload" className="pl-1 ">
                      or drag and drop
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  {newCourseData.image && (
                    <img
                      src={URL.createObjectURL(newCourseData?.image)}
                      alt="Banner Preview"
                      className="w-32 h-32 object-cover mt-4 mx-auto rounded shadow"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={newCourseData.name}
                    onChange={handleChange}
                    className="block w-full rounded-lg p-2  outline-none border-2  border-gray-900  sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    required
                    value={newCourseData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 6 months"
                    className="block w-full rounded-lg border-2 p-2 outline-none  border-gray-900 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fees"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Course Fees ($)
                  </label>
                  <input
                    type="number"
                    id="fees"
                    name="fees"
                    required
                    value={newCourseData.fees}
                    onChange={handleChange}
                    className="block w-full rounded-lg  border-2 p-2 outline-none  border-gray-900 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="totalSeats"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Total Seats
                  </label>
                  <input
                    type="number"
                    id="totalSeats"
                    name="totalSeats"
                    required
                    value={newCourseData.totalSeats}
                    onChange={handleChange}
                    className="block w-full rounded-lg  border-2 p-2 outline-none  border-gray-900 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Course Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={newCourseData.description}
                  onChange={handleChange}
                  className="block w-full rounded-lg min-h-10 border-2 p-2 outline-none  border-gray-900 sm:text-sm"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/Admin/courses")}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className={` ${
                    !loading ? "cursor-pointer" : "cursor-not-allowed"
                  } px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {loading ? "Uploading..." : "Add Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default AddCourse;
