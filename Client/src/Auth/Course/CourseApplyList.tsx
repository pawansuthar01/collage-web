import React, { useState } from "react";
import {
  GraduationCap,
  CheckCircle,
  XCircle,
  User,
  BookOpen,
  Mail,
  Phone,
  School,
} from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";

// Define a type for the application data
type ApplicationStatus = "read" | "unread";

interface Application {
  id: number;
  studentName: string;
  email: string;
  phone: string;
  courseName: string;
  courseFees: number;
  previousEducation: string;
  message: string;
  status: ApplicationStatus;
  appliedDate: string;
}

// Initial data
const initialApplications: Application[] = [
  {
    id: 1,
    studentName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    courseName: "Web Development Bootcamp",
    courseFees: 599,
    previousEducation: "Bachelor in Computer Science",
    message:
      "I am very interested in learning web development and would love to join this course.",
    status: "unread",
    appliedDate: "2024-03-15",
  },
  {
    id: 2,
    studentName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1987654321",
    courseName: "Data Science Fundamentals",
    courseFees: 499,
    previousEducation: "Bachelor in Mathematics",
    message:
      "Looking forward to learning data science and pursuing a career in this field.",
    status: "read",
    appliedDate: "2024-03-14",
  },
];

const CourseApplications: React.FC = () => {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  const handleStatusChange = (id: number, newStatus: ApplicationStatus) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

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
            <div className="overflow-x-auto">
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
                  {applications.map((application) => (
                    <tr
                      key={application.id}
                      className={
                        application.status === "unread" ? "bg-blue-50" : ""
                      }
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="font-medium text-gray-900">
                              {application.studentName}
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
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="font-medium text-gray-900">
                              {application.courseName}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            Fees: ${application.courseFees}
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            Applied: {application.appliedDate}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
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
                            application.status === "unread"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {application.status === "unread" ? "Unread" : "Read"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {application.status === "unread" ? (
                            <button
                              onClick={() =>
                                handleStatusChange(application.id, "read")
                              }
                              className="text-green-600 hover:text-green-900"
                              title="Mark as Read"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleStatusChange(application.id, "unread")
                              }
                              className="text-blue-600 hover:text-blue-900"
                              title="Mark as Unread"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
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
