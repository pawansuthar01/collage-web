import {
  Users,
  BookOpen,
  Bell,
  Calendar,
  MessageSquare,
  Phone,
} from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { AdminDashboardData } from "../../Redux/Slice/Admin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const StatCard = ({
  title,
  url,
  value,
  icon: Icon,
  color,
}: {
  url: any;
  title: string;
  value: number;
  icon: any;
  color: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(url)}
      className=" cursor-pointer bg-[Var(--admin-bg-card-color)] border m-2  border-[var(--admin-border-color)] p-6 rounded-lg shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[Var(--admin-text-Primary-color)] text-sm">
            {title}
          </p>
          <h3 className="text-2xl font-semibold text-[Var(--admin-text-Secondary-color)]  mt-1">
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};
type DashBordDataType = {
  CountFeedback: number;
  CountCallReq: number;
  CountMessage: number;
  CountCourse: number;
  NoticeCount: number;
  courseApplyApplication: number;
};

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [DashBoard, setDashboard] = useState<DashBordDataType>();
  const HandelDataLoad = async () => {
    setLoading(true);
    const res = await dispatch(AdminDashboardData());
    if (res && res?.payload?.data) {
      setDashboard(res?.payload?.data);
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    HandelDataLoad();
  }, []);
  const stats = [
    {
      url: "/Admin/feedback",
      title: "Total Feedback",
      value: DashBoard?.CountFeedback || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      url: "/Admin/courses",
      title: "Active Courses",
      value: DashBoard?.CountCourse || 0,
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      url: "/Admin/notices",
      title: "New Notices",
      value: DashBoard?.NoticeCount || 0,
      icon: Bell,
      color: "bg-yellow-500",
    },
    {
      url: "/Admin/courses-Applications",
      title: "Course Apply Count ",
      value: DashBoard?.courseApplyApplication || 0,
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      url: "/Admin/contacts",
      title: "New Messages",
      value: DashBoard?.CountMessage || 0,
      icon: MessageSquare,
      color: "bg-pink-500",
    },
    {
      url: "/Admin/call-requests",
      title: "Call Requests",
      value: DashBoard?.CountCallReq || 0,
      icon: Phone,
      color: "bg-indigo-500",
    },
  ];

  if (loading) {
    return (
      <LayoutAdmin>
        <div className="bg-[Var(--admin-bg-color)] pt-12 animate-pulse">
          <div className="text-2xl pl-2 font-semibold text-[Var(--admin-text-Primary-color)] mb-6 h-6 w-40 bg-gray-300 rounded-md"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="p-4 rounded-xl shadow bg-[Var(--admin-box-bg-color)] flex flex-col gap-4"
              >
                <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
                <div className="h-8 w-full bg-gray-300 rounded-md"></div>
                <div className="h-3 w-1/3 bg-gray-300 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </LayoutAdmin>
    );
  }
  return (
    <LayoutAdmin>
      <div className="bg-[Var(--admin-bg-color)] pt-12">
        <h1 className="text-2xl pl-2 font-semibold text-[Var(--admin-text-Primary-color)] mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Dashboard;
