import { X } from "lucide-react";
import { useState } from "react";

export const CallRequest = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "",
    message: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your request. We will call you back soon!");
    setFormData({ name: "", phone: "", course: "", message: "" });
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
  );
};
