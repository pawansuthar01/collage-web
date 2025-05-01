import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import Layout from "../layout/layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { useEffect, useState } from "react";
import { getSocialLinkData } from "../Redux/Slice/getData";
import { submitMessage } from "../Redux/Slice/UserSlice";
type formDataType = {
  message: string;
  phoneNumber: string;
  name: string;
  email: string;
};
type contactType = {
  phoneNumber: number;
  email: string;
  address: string;
};
const ContactPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState<contactType>();
  const [details, setDetails] = useState<formDataType>({
    name: "",
    email: "",
    message: "",
    phoneNumber: "",
  });
  async function contactDataLoad() {
    const res = await dispatch(getSocialLinkData());
    if (res?.payload) {
      setContact(res?.payload[0]);
    }
  }
  useEffect(() => {
    contactDataLoad();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
    const element = document.getElementById(name);
    if (element) {
      element.style.borderColor = "";
    }
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (
      details.name &&
      details.phoneNumber &&
      details.message &&
      details.email
    ) {
      try {
        const response = await dispatch(submitMessage(details));

        if (response.payload?.success) {
          setMessage("Send message  successfully!");
        } else {
          throw new Error(response.payload?.message || "Sending failed");
        }
      } catch (error: any) {
        console.error("Error message send info:", error);
        setMessage(error?.message || "Failed to Sending message");
      } finally {
        setLoading(false);
      }
    } else {
      Object.entries(details).forEach(([key, value]) => {
        const element = document.getElementById(key);
        if (element) {
          element.style.borderColor = value == "" ? "red" : "";
        }
      });
    }
    setLoading(false);
  };

  return (
    <Layout>
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
                  <span className="ml-3 text-gray-600">
                    {" "}
                    {contact?.phoneNumber}
                  </span>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center"
                >
                  <Mail className="h-6 w-6 text-[var(--icon-color)]" />
                  <span className="ml-3 text-gray-600">{contact?.email}</span>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center"
                >
                  <MapPin className="h-6 w-6 text-[var(--icon-color)]" />
                  <span className="ml-3 text-gray-600">{contact?.address}</span>
                </motion.div>
              </div>

              <motion.form
                onSubmit={handelSubmit}
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
                    name="name"
                    value={details.name}
                    onChange={handleChange}
                    className="mt-1 p-2 border outline-none block w-full rounded-md border-gray-300 shadow-sm "
                  />
                </div>
                <div>
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone number
                  </label>
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={details.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 p-2 border outline-none block w-full rounded-md border-gray-300 shadow-sm "
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
                    name="email"
                    value={details.email}
                    onChange={handleChange}
                    className="mt-1 p-2 border outline-none block w-full rounded-md border-gray-300 shadow-sm "
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
                    name="message"
                    rows={4}
                    value={details.message}
                    onChange={handleChange}
                    className="mt-1 p-2 border outline-none  block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                {message && (
                  <div
                    className={`p-3 rounded ${
                      message.includes("success")
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[var(--btn-color)] text-white px-6 py-2 rounded-md custom-hover transition-colors"
                >
                  {loading ? "Sending..." : " Send Message"}
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
                  Our campus is easily accessible by public transportation.
                  We're located in the heart of Education City, with ample
                  parking space available for visitors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ContactPage;
