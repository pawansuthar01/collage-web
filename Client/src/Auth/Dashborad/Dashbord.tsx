import {
  Users,
  BookOpen,
  Bell,
  Calendar,
  MessageSquare,
  Phone,
} from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: any;
  color: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    { title: "Total Students", value: 1234, icon: Users, color: "bg-blue-500" },
    {
      title: "Active Courses",
      value: 45,
      icon: BookOpen,
      color: "bg-green-500",
    },
    { title: "New Notices", value: 12, icon: Bell, color: "bg-yellow-500" },
    {
      title: "Upcoming Events",
      value: 8,
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      title: "New Messages",
      value: 23,
      icon: MessageSquare,
      color: "bg-pink-500",
    },
    { title: "Call Requests", value: 15, icon: Phone, color: "bg-indigo-500" },
  ];

  return (
    <LayoutAdmin>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activities
            </h2>
            <div className="space-y-4">{/* Add recent activities here */}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Add quick action buttons here */}
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Dashboard;
