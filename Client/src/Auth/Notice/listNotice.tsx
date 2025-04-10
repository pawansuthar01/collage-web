import { Bell } from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";

function NoticeList() {
  return (
    <LayoutAdmin>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Bell className="h-8 w-8 text-blue-600" />
              Notices
            </h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add Notice
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 space-y-4">
              <p className="text-gray-600 text-center">No notices available</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default NoticeList;
