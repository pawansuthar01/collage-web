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
      <div className="min-h-screen bg-[Var(--admin-bg-color)]">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-[var(--dark-icon-color)]" />
              <h1 className="ml-3 text-2xl font-bold text-[Var(--admin-text-Primary-color)]">
                Course Applications
              </h1>
            </div>
          </div>

          <div className="bg-[Var(--admin-bg-card-color)] border border-[Var(--admin-border-color)] rounded-md shadow-md overflow-hidden">
            <div className=" overflow-x-scroll p-2 ">
              <table className="min-w-full divide-y bg-[Var(--admin-bg-card-color)]">
                <thead className="bg-[Var(--admin-bg-card-color)] ">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[Var(--admin-text-Primary-color)] uppercase tracking-wider">
                      Student Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[Var(--admin-text-Primary-color)] uppercase tracking-wider">
                      Course Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[Var(--admin-text-Primary-color)] uppercase tracking-wider">
                      Previous Education
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[Var(--admin-text-Primary-color)] uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[Var(--admin-text-Primary-color)] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[Var(--admin-text-Primary-color)] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[Var(--admin-bg-color)]   ">
                  {loading ? (
                    <CourseApplySkeleton />
                  ) : applications.length > 0 ? (
                    applications.map((application) => (
                      <tr
                        key={application._id}
                        className={`${
                          application.read === true
                            ? "bg-[Var(--read-message-bg-color)]"
                            : "bg-[Var(--unread-message-bg-color)]"
                        } border border-[Var(--admin-border-color)] rounded-lg m-1`}
                      >
                        <td className="px-6 py-4 ">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-[Var(--admin-text-Secondary-color)] mr-2" />
                              <span className="font-medium text-[Var(--admin-text-Secondary-color)]">
                                {application.name}
                              </span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Mail className="h-4 w-4 text-[Var(--admin-text-Secondary-color)] mr-2" />
                              <span className="text-sm text-[Var(--admin-text-Secondary-color)]">
                                {application.email}
                              </span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Phone className="h-4 w-4 text-[Var(--admin-text-Secondary-color)] mr-2" />
                              <span className="text-sm text-[Var(--admin-text-Secondary-color)]">
                                {application.phone}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6  whitespace-nowrap max-w-xs overflow-hidden text-ellipsis   py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <BookOpen className="h-4 w-4 text-[Var(--admin-text-Secondary-color)] mr-2" />
                              <span className="font-medium text-[Var(--admin-text-Secondary-color)]">
                                {application.courseName}
                              </span>
                            </div>
                            <div className="mt-1 text-sm text-[Var(--admin-text-Secondary-color)]">
                              Fees: {application.courseFees}
                            </div>
                            <div className="mt-1 text-sm text-[Var(--admin-text-Secondary-color)]">
                              Applied:{" "}
                              {formatMongoDateToIndian(application.createdAt)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 ">
                          <div className="flex items-center">
                            <School className="h-4 w-4 text-[Var(--admin-text-Secondary-color)] mr-2" />
                            <span className="text-sm text-[Var(--admin-text-Secondary-color)]">
                              {application.previousEducation}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-[Var(--admin-text-Secondary-color)] max-w-xs truncate">
                            {application.message}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              application.read === false
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-200 text-green-800"
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
                        className="px-6 py-4 text-center text-[Var(--admin-text-Secondary-color)]"
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
