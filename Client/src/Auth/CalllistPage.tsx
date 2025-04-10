import React, { useState } from "react";
import { Phone, CheckCircle, Circle } from "lucide-react";
import LayoutAdmin from "../layout/AdminLayout";

// Type for call request
interface CallRequest {
  id: number;
  fullName: string;
  courseName: string;
  message: string;
  phoneNumber: string;
  isRead: boolean;
}

function CallList() {
  // Sample data - in a real app, this would come from an API
  const [callRequests, setCallRequests] = useState<CallRequest[]>([
    {
      id: 1,
      fullName: "John Doe",
      courseName: "Web Development",
      message: "Interested in learning more about the course structure",
      phoneNumber: "+1 234-567-8900",
      isRead: false,
    },
    {
      id: 2,
      fullName: "Jane Smith",
      courseName: "Data Science",
      message: "Would like to know about the prerequisites",
      phoneNumber: "+1 234-567-8901",
      isRead: true,
    },
    {
      id: 3,
      fullName: "Mike Johnson",
      courseName: "Mobile App Development",
      message: "Need information about the course duration",
      phoneNumber: "+1 234-567-8902",
      isRead: false,
    },
  ]);

  // Toggle read/unread status
  const toggleReadStatus = (id: number) => {
    setCallRequests((requests) =>
      requests.map((request) =>
        request.id === id ? { ...request, isRead: !request.isRead } : request
      )
    );
  };

  return (
    <LayoutAdmin>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Call Requests</h1>
            <Phone className="text-blue-600 w-8 h-8" />
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {callRequests.map((request) => (
              <div
                key={request.id}
                className={`border-b border-gray-200 p-6 ${
                  request.isRead ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request.fullName}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-blue-600">
                      {request.courseName}
                    </p>
                    <p className="mt-2 text-gray-600">{request.message}</p>
                    <p className="mt-2 text-sm text-gray-500 flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {request.phoneNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleReadStatus(request.id)}
                    className="flex items-center text-sm font-medium px-3 py-1 rounded-full transition-colors"
                  >
                    {request.isRead ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default CallList;
