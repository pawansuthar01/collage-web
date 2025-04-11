import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Calendar } from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";
import { newNotice } from "../../Redux/Slice/Admin";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import toast from "react-hot-toast";

function AddNotice() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setNoticeData] = useState({
    title: "",
    notice_type: "",
    message: "",

    publish_date: "",
    expiry_date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await dispatch(newNotice(formData));
    console.log(res);
    if (res?.payload?.success) {
      toast.success(res?.payload?.message);
      setNoticeData({
        title: "",
        notice_type: "",
        message: "",

        publish_date: "",
        expiry_date: "",
      });
    }
    if (!res?.payload?.success) {
      toast.error(res?.payload?.message);
    }
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNoticeData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <LayoutAdmin>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button
              onClick={() => navigate("/Admin/notices")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Notices
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <Bell className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Notice
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Notice Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter notice title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="notice_type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Notice Type
                  </label>
                  <input
                    type="text"
                    name="notice_type"
                    id="notice_type"
                    required
                    value={formData.notice_type}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter type name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="publish_date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Publish Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      id="publish_date"
                      name="publish_date"
                      required
                      value={formData.publish_date}
                      onChange={handleChange}
                      className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="expiry_date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Expiry Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      id="expiry_date"
                      name="expiry_date"
                      required
                      value={formData.expiry_date}
                      onChange={handleChange}
                      className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter notice description..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => navigate("/Admin/notices")}
                  className={` ${
                    !loading ? "cursor-pointer" : "cursor-not-allowed"
                  }  px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className={` ${
                    !loading ? "cursor-pointer" : "cursor-not-allowed"
                  }  px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {!loading ? "Add Notice" : "Loading..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default AddNotice;
