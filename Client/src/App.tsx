import { Routes, Route } from "react-router-dom"; // No need for BrowserRouter here
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NoticesPage from "./pages/NoticesPage";
import AdminLogin from "./Auth/AdminLogin";
import EventList from "./Auth/Event/ListEvent";
import NoticeList from "./Auth/Notice/listNotice";
import EditEvent from "./Auth/Event/EditEvent";
import EditNotice from "./Auth/Notice/updateNotice";
import AddEvent from "./Auth/Event/Eventadd";
import AddNotice from "./Auth/Notice/NoticeAdd";
import CourseList from "./Auth/Course/ListCourse";
import EditCourse from "./Auth/Course/EditCourse";
import AddCourse from "./Auth/Course/AddCourse";
import CourseApplications from "./Auth/Course/CourseApplyList";
import ChangePassword from "./Auth/Password/changePassword";
import Dashboard from "./Auth/Dashborad/Dashbord";

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/Admin" element={<AdminLogin />} />
          <Route path="/Admin/Dashboard" element={<Dashboard />} />
          <Route path="/Admin/password-update" element={<ChangePassword />} />
          <Route path="/Admin/password-resat" element={<ChangePassword />} />
          <Route path="/Admin/course" element={<CourseList />} />
          <Route
            path="/admin/courses-Applications"
            element={<CourseApplications />}
          />
          <Route path="/Admin/course/edit" element={<EditCourse />} />
          <Route path="/Admin/course/add" element={<AddCourse />} />
          <Route path="/Admin/event" element={<EventList />} />
          <Route path="/Admin/Event/edit" element={<EditEvent />} />
          <Route path="/Admin/events/add" element={<AddEvent />} />
          <Route path="/Admin/notice" element={<NoticeList />} />
          <Route path="/Admin/notice/edit" element={<EditNotice />} />
          <Route path="/Admin/notice/add" element={<AddNotice />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
