import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  CheckCircle,
  User,
  BookOpen,
  Mail,
  Phone,
  School,
} from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import {
  CourseApplyMarkAsRead,
  GetAllCourseApply,
} from "../../Redux/Slice/Admin";
import formatMongoDateToIndian from "../../../Helper/DateFormat";
import { CourseApplySkeleton } from "../../components/loadingPage/Skeleton";

// Define a type for the application data

interface Application {
  _id: string;
  name: string;
  email: string;
  phone: string;
  courseName: string;
  courseFees: number;
  previousEducation: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const CourseApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (id: string) => {
    await dispatch(CourseApplyMarkAsRead(id));

    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app._id === id ? { ...app, read: true } : app
      )
    );
  };
  const handelLoadApplication = async () => {
    setLoading(true);
    const res = await dispatch(GetAllCourseApply());
    setLoading(false);
    const data = res?.payload?.data;
    setApplications(data);
  };
  useEffect(() => {
    handelLoadApplication();
  }, []);

  return (
    <LayoutAdmin>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Course Applications
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className=" overflow-x-scroll p-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Previous Education
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <CourseApplySkeleton />
                  ) : applications.length > 0 ? (
                    applications.map((application) => (
                      <tr
                        key={application._id}
                        className={
                          application.read === true ? "bg-blue-50" : ""
                        }
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="font-medium text-gray-900">
                                {application.name}
                              </span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Mail className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm text-gray-500">
                                {application.email}
                              </span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Phone className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm text-gray-500">
                                {application.phone}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6  whitespace-nowrap max-w-xs overflow-hidden text-ellipsis   py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="font-medium text-gray-900">
                                {application.courseName}
                              </span>
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              Fees: {application.courseFees}
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              Applied:{" "}
                              {formatMongoDateToIndian(application.createdAt)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 ">
                          <div className="flex items-center">
                            <School className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-900">
                              {application.previousEducation}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-500 max-w-xs truncate">
                            {application.message}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              application.read === false
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {application.read === false ? "Unread" : "Read"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              disabled={application.read}
                              onClick={() =>
                                handleStatusChange(application._id)
                              }
                              className={`${
                                application.read === true
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              } text-green-600 hover:text-green-900`}
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No course applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default CourseApplications;
