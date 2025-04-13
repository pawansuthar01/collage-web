import { Routes, Route } from "react-router-dom"; // No need for BrowserRouter here
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NoticesPage from "./pages/NoticesPage";
import AdminLogin from "./Auth/AdminLogin";
import NoticeList from "./Auth/Notice/listNotice";
import EditNotice from "./Auth/Notice/updateNotice";
import AddNotice from "./Auth/Notice/NoticeAdd";
import CourseList from "./Auth/Course/ListCourse";
import EditCourse from "./Auth/Course/EditCourse";
import AddCourse from "./Auth/Course/AddCourse";
import CourseApplications from "./Auth/Course/CourseApplyList";
import ChangePassword from "./Auth/Password/changePassword";
import Dashboard from "./Auth/Dashborad/Dashbord";
import AdminBannerUpdate from "./Auth/bannerupdate";
import AdminAboutUpdate from "./Auth/AboutUpdate";
import FeedbackList from "./Auth/feedback";
import ContactList from "./Auth/ContactList";
import CallList from "./Auth/CalllistPage";
import SocialUpdate from "./Auth/SociolLink";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/Error" element={<ErrorPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/Admin" element={<AdminLogin />} />
          <Route path="/Admin/Dashboard" element={<Dashboard />} />
          <Route path="/Admin/call-requests" element={<CallList />} />
          <Route path="/Admin/feedback" element={<FeedbackList />} />
          <Route path="/Admin/contacts" element={<ContactList />} />
          <Route path="/Admin/update-banner" element={<AdminBannerUpdate />} />
          <Route path="/Admin/update-About" element={<AdminAboutUpdate />} />
          <Route path="/Admin/password-update" element={<ChangePassword />} />
          <Route path="/Admin/SociolLink-update" element={<SocialUpdate />} />
          <Route path="/Admin/password-resat" element={<ChangePassword />} />
          <Route path="/Admin/courses" element={<CourseList />} />
          <Route
            path="/admin/courses-Applications"
            element={<CourseApplications />}
          />
          <Route path="/Admin/courses/edit/:id" element={<EditCourse />} />
          <Route path="/Admin/courses/add" element={<AddCourse />} />
          <Route path="/Admin/notices" element={<NoticeList />} />
          <Route path="/Admin/notices/edit/:id" element={<EditNotice />} />
          <Route path="/Admin/notices/add" element={<AddNotice />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
