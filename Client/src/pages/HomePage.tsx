import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Award, Users, BookOpen, X } from "lucide-react";
import Hero from "../components/Hero";
import NoticeBoard from "../components/NoticeBoard";
import FeedbackSystem from "../components/FeedbackSystem";

const HomePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "",
    message: "",
  });
  const testimonials = [
    {
      id: 1,
      name: "Sarah Parker",
      course: "B.A.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote:
        "The faculty and resources here have been instrumental in shaping my career in technology.",
    },
    {
      id: 2,
      name: "Michael Chang",
      course: "BBA",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote:
        "The practical approach to business education gave me real-world experience.",
    },
    {
      id: 3,
      name: "Emma Wilson",
      course: "B.tech",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote:
        "The hands-on laboratory experience has been invaluable for my engineering career.",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit",
      date: "March 25, 2024",
      time: "10:00 AM",
      location: "Main Auditorium",
    },
    {
      id: 2,
      title: "Career Fair 2024",
      date: "April 5, 2024",
      time: "9:00 AM",
      location: "University Campus",
    },
    {
      id: 3,
      title: "Cultural Festival",
      date: "April 15, 2024",
      time: "11:00 AM",
      location: "University Ground",
    },
  ];

  const stats = [
    { id: 1, icon: Users, label: "Students", value: "5000+" },
    { id: 2, icon: BookOpen, label: "Courses", value: "50+" },
    { id: 3, icon: Award, label: "Awards", value: "100+" },
    { id: 4, icon: Calendar, label: "Years of Excellence", value: "25+" },
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your request. We will call you back soon!");
    setFormData({ name: "", phone: "", course: "", message: "" });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <div
        className={`fixed   right-0 top-1/2 -translate-y-1/2 z-50 transition-transform duration-300 ${
          isFormOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-[var(--cardBg-color)] shadow-lg rounded-l-lg w-80 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[var(--icon-color)]">
              Request a Call Back
            </h3>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course Interest
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
              >
                <option value="">Select a course</option>
                <option value="bca">BCA</option>
                <option value="bba">BBA</option>
                <option value="bcom">B.Com</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--bg-color)] text-[var(--text-color)] py-2 px-4 rounded-md custom-hover focus:outline-none "
            >
              Submit Request
            </button>
          </form>
        </div>
        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="absolute -left-2 top-[20%] -translate-x-full -translate-y-[20%] bg-[var(--bg-color)] text-[var(--text-color)] py-2 pt-0 px-4 rounded-l-md transform -rotate-90 origin-right custom-hover"
          >
            Request Call Back
          </button>
        )}
      </div>
      {/* Stats Section */}
      <section className=" py-8 max-[600px]:pt-54      text-[var(--text-color)]">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: stat.id * 0.1 }}
                className="text-center flex flex-col justify-center items-center p-2 rounded-lg bg-[var(--bg-color)]"
              >
                <stat.icon className="h-8 w-8 mx-auto " />
                <div className="text-3xl font-bold m-2 pl-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <NoticeBoard />
      </section>

      {/* Featured Programs */}
      <section className="py-16 bg-[var(--cardBg-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[var(--heading-color)]">
              Featured Programs
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover our most popular academic programs
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "RS-CIT",
                description:
                  "Learn cutting-edge technologies and software development",
                image:
                  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
              },
              {
                title: "BBA",
                description:
                  "Master data-driven decision making and business strategy",
                image:
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
              },
              {
                title: "BA",
                description: "Learn modern marketing techniques and strategies",
                image:
                  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
              },
            ].map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--cardBg-color)] rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--heading-color)] mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[var(--heading-color)]">
              Upcoming Events
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join us for these exciting events
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <Calendar className="h-8 w-8 text-[var(--icon-color)] mb-4" />
                <h3 className="text-xl font-semibold text-[var(--heading-color)] mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-1">{event.date}</p>
                <p className="text-gray-600 mb-1">{event.time}</p>
                <p className="text-gray-600">{event.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[var(--heading-color)]">
              Student Testimonials
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              What our students say about us
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--cardBg-color)] p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-[var(--heading-color)]">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600">{testimonial.course}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback System */}
      <FeedbackSystem />
    </motion.div>
  );
};

export default HomePage;
