import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bell, Calendar } from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { UpdateNotice } from "../../Redux/Slice/Admin";

function EditNotice() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    notice_type: "",
    message: "",
    publish_date: "",
    createdAt: "",
    expiry_date: "",
  });
  useEffect(() => {
    if (state) {
      setFormData({
        title: state?.title || "",
        notice_type: state?.notice_type || "",
        publish_date: state?.publish_date || "",
        message: state?.message || "",
        createdAt: state?.createdAt || "",
        expiry_date: state?.expiry_date || "",
      });
    } else {
      navigate(-1);
    }
  }, [state, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await dispatch(UpdateNotice({ data: formData, id: id }));

    if (res?.payload?.success) {
      const newData = res?.payload?.data;
      toast.success(res?.payload?.message);
      setFormData({
        title: newData.title || "",
        notice_type: newData.notice_type || "",
        message: newData.message || "",
        createdAt: newData.createdAt || "",
        publish_date: newData.publish_date || "",
        expiry_date: newData.expiry_date || "",
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
              <h2 className="text-2xl font-bold text-gray-900">Edit Notice</h2>
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
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => navigate("/Admin/notices")}
                  className={`  ${
                    !loading ? "cursor-pointer" : "cursor-not-allowed"
                  }  px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={` ${
                    !loading ? "cursor-pointer" : "cursor-not-allowed"
                  }  px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {!loading ? "Update Notice" : "UpdateIng..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default EditNotice;
