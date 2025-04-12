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

          <div className="bg-[Var(--admin-bg-card-color)] border border-[Var(--admin-border-color)] rounded-xl shadow-md p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <Bell className="h-8 w-8 text-[Var(--dark-icon-color)] mr-3" />
              <h2 className="text-2xl font-bold text-[Var(--admin-text-Primary-color)]">
                Edit Notice
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
                    className="block w-full rounded-lg border p-2 outline-none  text-[Var(--input-text-color)] border-[Var(--input-border-color)] bg-[Var(--input-bg-color)] sm:text-sm"
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
                    className="block w-full rounded-lg border p-2 outline-none  text-[Var(--input-text-color)] border-[Var(--input-border-color)] bg-[Var(--input-bg-color)] sm:text-sm"
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
                      className="block w-full pl-10 rounded-lg border p-2 outline-none  text-[Var(--input-text-color)] border-[Var(--input-border-color)] bg-[Var(--input-bg-color)] sm:text-sm"
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
                      className="block w-full pl-10 rounded-lg  border p-2 outline-none  text-[Var(--input-text-color)] border-[Var(--input-border-color)] bg-[Var(--input-bg-color)] sm:text-sm"
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
                    className="block w-full border p-2 outline-none  rounded-lg text-[Var(--input-text-color)] border-[Var(--input-border-color)] bg-[Var(--input-bg-color)] shadow-sm  sm:text-sm"
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
                  }  px-4 py-2 border border-[Var(--dark-btnBorder-color)] rounded-lg text-[Var(--admin-text-Secondary-color)] Admin_custom-hover `}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={` ${
                    !loading ? "cursor-pointer" : "cursor-not-allowed"
                  }  px-4 py-2 bg-[Var(--dark-btnBg-color)] text-[Var(--admin-text-Primary-color)] rounded-lg Admin_custom-hover`}
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
