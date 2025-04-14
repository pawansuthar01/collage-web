import { ReactNode } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  Bell,
  MessageSquare,
  Phone,
  Users,
  Image,
  Info,
  Lock,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { BiSolidColorFill } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { logout } from "../Redux/Slice/Admin";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const location = useLocation();
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);
  const [noticeMenuOpen, setNoticeMenuOpen] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/Admin/DashBoard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Courses",
      icon: <BookOpen className="w-5 h-5" />,
      submenu: [
        { path: "/Admin/courses", label: "Course List" },
        { path: "/Admin/courses/add", label: "Add Course" },
        {
          path: "/Admin/courses-Applications",
          label: "Course Apply App",
        },
      ],
      isOpen: courseMenuOpen,
      setOpen: setCourseMenuOpen,
    },
    {
      title: "Notices",
      icon: <Bell className="w-5 h-5" />,
      submenu: [
        { path: "/Admin/notices", label: "Notice List" },
        { path: "/Admin/notices/add", label: "Add Notice" },
      ],
      isOpen: noticeMenuOpen,
      setOpen: setNoticeMenuOpen,
    },

    {
      path: "/Admin/feedback",
      title: "Feedback",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      path: "/Admin/call-requests",
      title: "Call Requests",
      icon: <Phone className="w-5 h-5" />,
    },
    {
      path: "/Admin/contacts",
      title: "Contacts",
      icon: <Users className="w-5 h-5" />,
    },
    {
      path: "/Admin/update-banner",
      title: "Banners",
      icon: <Image className="w-5 h-5" />,
    },
    {
      path: "/Admin/update-about",
      title: "About",
      icon: <Info className="w-5 h-5" />,
    },
    {
      path: "/Admin/password-update",
      title: "Change Password",
      icon: <Lock className="w-5 h-5" />,
    },
    {
      path: "/Admin/SociolLink-update",
      title: "Sociol Link",
      icon: <BiSolidColorFill className="w-5 h-5" />,
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-[Var(--admin-nav-bg-color)]   transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}
    >
      <div className="flex items-center justify-between h-16 px-4  bg-[Var(--admin-nav-bg-color)]">
        <Link to="/Admin" className="flex items-center space-x-2">
          <LayoutDashboard className="w-8 h-8" />
          <span className="text-xl font-bold    text-[Var(--admin-text-Primary-color)]">
            Admin Panel
          </span>
        </Link>
        <button onClick={toggleSidebar} className="lg:hidden">
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => item.setOpen(!item.isOpen)}
                    className="flex items-center justify-between  w-full px-4 py-2 Admin_custom-text Admin_custom-hover rounded"
                  >
                    <div className="flex items-center space-x-2">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        item.isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {item.isOpen && (
                    <ul className="pl-8 mt-2 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm ${
                              location.pathname === subItem.path
                                ? "text-[Var(--admin-text-Primary-color)] bg-[Var(--admin-bg-color)] "
                                : "text-gray-400 Admin_custom-text Admin_custom-hover"
                            } rounded`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path || "/"}
                  className={`flex items-center space-x-2 px-4 py-2 ${
                    location.pathname === item.path
                      ? "text-[Var(--admin-text-Primary-color)] bg-gray-800"
                      : "text-gray-300 Admin_custom-text Admin_custom-hover "
                  } rounded`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

type LayoutProps = {
  children: ReactNode;
};

const LayoutAdmin = ({ children }: LayoutProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handelLogout = async () => {
    await dispatch(logout());
  };
  return (
    <div className="min-h-screen  text-[Var(--admin-text-Primary-color)] bg-[Var(--admin-bg-color)] ">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="lg:pl-64 flex   flex-col min-h-screen">
        <header className="bg-[Var(--admin-nav-bg-color)] w-full  fixed z-30 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div onClick={handelLogout} className="flex items-center space-x-4">
              <span className="text-red-500 pl-2 flex gap-2">
                <LogOut /> LogOut
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1  mt-12">{children}</main>

        <footer className="bg-[var(--admin-nav-bg-color)] shadow-sm mt-auto">
          <div className="text-center py-4 text-sm text-[Var(--admin-text-Primary-color)]">
            © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LayoutAdmin;
