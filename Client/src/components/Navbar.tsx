import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Home,
  Phone,
  Users,
  Menu,
  X,
  Bell,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { GrDocumentUser } from "react-icons/gr";
import { HiAcademicCap } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: Home, to: "/" },
    { name: "Notices", icon: Bell, to: "/notices" },
    { name: "Courses", icon: BookOpen, to: "/courses" },
    { name: "About", icon: Users, to: "/about" },
    { name: "Contact", icon: Phone, to: "/contact" },
    { name: "Document", icon: GrDocumentUser, to: "/documents" },
    { name: "Facilities", icon: GrDocumentUser, to: "/facilities" },
    {
      name: "Faculty ",
      icon: HiAcademicCap,
      to: "/documents",
    },
    {
      name: "Students ",
      icon: User,
      to: "/documents",
    },
  ];

  return (
    <motion.nav className="bg-[var(--bg-color)] text-[var(--text-color)] fixed w-full z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 max-[600px]:h-5" />
              <span className="ml-2 max-[400px]:hidden  flex text-[15px] capitalize max-[600px]:text-sm font-bold">
                Mata gujri khalsa shikshan sansthan
              </span>
              <span className="ml-2 text-xl   max-[400px]:flex hidden capitalize max-[600px]:text-sm font-bold">
                Mata gujri khalsa shikshan
              </span>
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium custom-hover transition-colors"
                >
                  <item.icon className="h-4 w-4 mr-1" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md custom-hover"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium custom-hover"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
