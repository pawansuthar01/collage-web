import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { CallReqSubmit } from "../Redux/Slice/UserSlice";

export const CallRequest = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "",
    message: "",
  });

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    if (!formData.course) {
      setLoading(false);
      setMessage("select course");
      return;
    }
    if (
      formData.name &&
      formData.course &&
      formData.phone &&
      formData.message
    ) {
      try {
        const response = await dispatch(CallReqSubmit(formData));
        if (response.payload?.success) {
          setMessage("Send message  successfully!");
          setFormData({
            name: "",
            phone: "",
            course: "",
            message: "",
          });
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
      Object.entries(formData).forEach(([key, value]) => {
        const element = document.getElementById(key);
        if (element) {
          element.style.borderColor = value == "" ? "red" : "";
        }
      });
    }
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage("");
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const element = document.getElementById(name);
    if (element) {
      element.style.borderColor = "";
    }
  };

  return (
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
        <form noValidate onSubmit={handelSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 p-1 border text-sm outline-none block w-full rounded-md border-gray-300 shadow-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="mt-1 p-1 border text-sm outline-none block w-full rounded-md border-gray-300 shadow-sm"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Interest
            </label>
            <select
              onClick={() => setMessage("")}
              className="mt-1 p-1 border text-sm outline-none block w-full rounded-md border-gray-300 shadow-sm"
              value={formData.course}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, course: e?.target.value }))
              }
            >
              <option value="" className="bg-transparent">
                {" "}
                Select a course
              </option>
              <option value="B.A">B.A</option>
              <option value="RS-CIT">RS-CIT</option>
              <option value="B.A.Ed">B.A.Ed</option>
              <option value="B.Ed">B.Ed</option>
              <option value="other">Other</option>
            </select>
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
              className="mt-1 p-1 border text-sm outline-none block w-full rounded-md border-gray-300 shadow-sm"
              rows={3}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          {message && (
            <div
              className={`p-1 rounded ${
                message.includes("success")
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[var(--bg-color)] text-[var(--text-color)] py-2 px-4 rounded-md custom-hover focus:outline-none "
          >
            {!loading ? "Submit Request" : "Loading..."}
          </button>
        </form>
      </div>

      {!isFormOpen && (
        <button
          onClick={() => setIsFormOpen(true)}
          className={`absolute    -left-2 top-[20%] -translate-x-full -translate-y-[20%] bg-[var(--bg-color)] text-[var(--text-color)] py-4 pt-0 px-4 rounded-l-md transform -rotate-90 origin-right custom-hover`}
        >
          Request Call Back
        </button>
      )}
    </div>
  );
};
