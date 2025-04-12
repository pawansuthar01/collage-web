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
      <div className="min-h-screen bg-[Var(--admin-bg-color)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button
              onClick={() => navigate("/Admin/notices")}
              className="flex items-center text-[Var(--admin-text-Primary-color)] Admin_custom-text"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Notices
            </button>
          </div>

          <div className="bg-[Var(--admin-bg-card-color)] rounded-xl shadow-md p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <Bell className="h-8 w-8 text-[var(--dark-icon-color)] mr-3" />
              <h2 className="text-2xl font-bold text-[Var(--admin-text-Primary-color)]">
                Add New Notice
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-[Var(--admin-text-Secondary-color)] mb-2"
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
                    className="block w-full rounded-lg shadow-sm border p-2 outline-none  text-[Var(--input-text-color)] border-[Var(--input-border-color)] bg-[Var(--input-bg-color)] sm:text-sm"
                    placeholder="Enter notice title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="notice_type"
                    className="block text-sm font-medium text-[Var(--admin-text-Secondary-color)] mb-2"
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
                    className="block w-full rounded-lg border p-2 outline-none  text-[Var(--input-text-color)] border-[Var(--input-border-color)] bg-[Var(--input-bg-color)] shadow-sm  sm:text-sm"
                    placeholder="Enter type name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="publish_date"
                    className="block text-sm font-medium text-[Var(--admin-text-Secondary-color)] mb-2"
                  >
                    Publish Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[Var(--admin-text-Secondary-color)]" />
                    <input
                      type="date"
                      id="publish_date"
                      name="publish_date"
                      required
                      value={formData.publish_date}
                      onChange={handleChange}
                      className="block w-full pl-10 rounded-lg border p-2 outline-none  text-[Var(--input-text-color)] border-[Var(--input-border-color)] bg-[Var(--input-bg-color)] shadow-sm  sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="expiry_date"
                    className="block text-sm font-medium text-[Var(--admin-text-Secondary-color)] mb-2"
                  >
                    Expiry Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[Var(--admin-text-Secondary-color)]" />
                    <input
                      type="date"
                      id="expiry_date"
                      name="expiry_date"
                      required
                      value={formData.expiry_date}
                      onChange={handleChange}
                      className="block w-full pl-10 rounded-lg border p-2 outline-none  text-[Var(--input-text-color)] border-[Var(--input-border-color)] bg-[Var(--input-bg-color)] shadow-sm  sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[Var(--admin-text-Secondary-color)] mb-2"
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
                    className="block w-full rounded-lg border p-2 outline-none  text-[Var(--input-text-color)] border-[Var(--input-border-color)] bg-[Var(--input-bg-color)] shadow-sm  sm:text-sm"
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
                  }  px-4 py-2 border      rounded-lg text-[Var(--admin-text-Secondary-color)] Admin_custom-hover Admin_custom-text`}
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className={` ${
                    !loading ? "cursor-pointer" : "cursor-not-allowed"
                  }  px-4 py-2 border  border-[Var(--dark-btnBorder-color)] bg-[Var(--dark-btnBg-color)] text-[Var(--admin-text-Primary-color)] rounded-lg Admin_custom-hover Admin_custom-text`}
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
