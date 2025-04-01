import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Phone className="h-8 w-8 text-[var(--icon-color)]" />
          <h2 className="ml-3 text-3xl font-bold text-[var(--heading-color)]">
            Contact Us
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center"
              >
                <Phone className="h-6 w-6 text-[var(--icon-color)]" />
                <span className="ml-3 text-gray-600">+XXX XXX XX00</span>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center"
              >
                <Mail className="h-6 w-6 text-[var(--icon-color)]" />
                <span className="ml-3 text-gray-600">
                  info@mataGujri.gmail.com
                </span>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center"
              >
                <MapPin className="h-6 w-6 text-[var(--icon-color)]" />
                <span className="ml-3 text-gray-600">
                  Mata Gujri Khalsa College Of Education, sikh minority
                  institution 2 C, Rajasthan 335001
                </span>
              </motion.div>
            </div>

            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-[var(--btn-color)] text-white px-6 py-2 rounded-md custom-hover transition-colors"
              >
                Send Message
              </button>
            </motion.form>
          </div>

          <div className="space-y-6">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.3795502473035!2d73.81570597538658!3d29.93975947497645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917b52555555557%3A0x62a033836de3b51c!2sMata%20Gujri%20Khalsa%20College%20Of%20Education%2C%20sikh%20minority%20institution!5e0!3m2!1sen!2sin!4v1743320361689!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">
                Our campus is easily accessible by public transportation. We're
                located in the heart of Education City, with ample parking space
                available for visitors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
