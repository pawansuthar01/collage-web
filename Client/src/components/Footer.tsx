import { BookOpen } from "lucide-react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-[var(--bg-color)] text-[var(--text-color)] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <BookOpen className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">
                Mata Gujri Khalsa College
              </span>
            </div>
            <p className="mt-4 ">
              Mata Gujri Khalsa College Of Education, sikh minority institution
              2 C, Rajasthan 335001
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="custom-hover-text">
                  Home
                </a>
              </li>
              <li>
                <a href="#courses" className="custom-hover-text">
                  Courses
                </a>
              </li>
              <li>
                <a href="#about" className="custom-hover-text">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="custom-hover-text">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="custom-hover-text">
                  Student Portal
                </a>
              </li>
              <li>
                <a href="#" className="custom-hover-text">
                  Library
                </a>
              </li>
              <li>
                <a href="#" className="custom-hover-text">
                  Research
                </a>
              </li>
              <li>
                <a href="#" className="custom-hover-text">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="custom-hover-text">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="custom-hover-text">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="custom-hover-text">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="custom-hover-text">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-gray-300">
          <p>&copy; {year} Mata Gujri Khalsa College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
