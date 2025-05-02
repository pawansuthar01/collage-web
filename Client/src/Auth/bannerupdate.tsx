import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { updateBanner } from "../Redux/Slice/Admin";
import LayoutAdmin from "../layout/AdminLayout";
import { getBannerData } from "../Redux/Slice/getData";
import toast from "react-hot-toast";
interface BannerStats {
  totalStudentCount: string;
  totalCourseCount: string;
  totalAwardsCount: string;
  Years_of_Excellence_count: string;
  photo: string;
}

export default function AdminBannerUpdate() {
  const dispatch = useDispatch<AppDispatch>();

  const [stats, setStats] = useState<BannerStats>({
    totalStudentCount: "",
    totalCourseCount: "",
    totalAwardsCount: "",
    Years_of_Excellence_count: "",
    photo: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [DataLoad, setDataLoad] = useState(false);
  const [message, setMessage] = useState("");
  const handelDataLoad = async () => {
    setDataLoad(true);
    const res = await dispatch(getBannerData());
    if (res && res.payload) {
      const data = res.payload[0] as BannerStats;

      setStats({
        totalStudentCount: data?.totalStudentCount || "",
        totalCourseCount: data?.totalCourseCount || "",
        totalAwardsCount: data?.totalAwardsCount || "",
        Years_of_Excellence_count: data?.Years_of_Excellence_count || "",
        photo: data?.photo || "",
      });
    }
    setDataLoad(false);
  };

  useEffect(() => {
    handelDataLoad();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB.");
        return;
      }
      setPhoto(file);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      if (photo) {
        formData.append("photo", photo);
      }

      formData.append("totalStudentCount", stats.totalStudentCount);
      formData.append("totalCourseCount", stats.totalCourseCount);
      formData.append("totalAwardsCount", stats.totalAwardsCount);
      formData.append(
        "Years_of_Excellence_count",
        stats.Years_of_Excellence_count
      );

      const response = await dispatch(updateBanner(formData));
      console.log(response);
      if (!response.payload.success) {
        throw new Error("Failed to update banner");
      }

      setMessage("Banner updated successfully!");
    } catch (error) {
      console.error("Error updating banner:", error);
      setMessage("Failed to update banner");
    } finally {
      setLoading(false);
    }
  }

  if (DataLoad) {
    return (
      <LayoutAdmin>
        <div className=" bg-[Var(--admin-bg-color)] flex justify-center h-screen items-center z-50">
          <div className="space-y-4">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <div className="text-white text-xl">Loading...</div>
          </div>
        </div>
      </LayoutAdmin>
    );
  }
  return (
    <LayoutAdmin>
      <div className="max-w-2xl bg-[Var(--admin-bg-color)] mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Update Banner Statistics</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Total Student Count
              </label>
              <input
                type="number"
                value={stats.totalStudentCount}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    totalStudentCount: e.target.value,
                  })
                }
                className="w-full p-2 border-[Var(--input-border-color)] text-[Var(--input-text-color)] bg-[Var(--input-bg-color)]  border rounded"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Total Course Count
              </label>
              <input
                type="number"
                value={stats.totalCourseCount}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    totalCourseCount: e.target.value,
                  })
                }
                className="w-full p-2  border-[Var(--input-border-color)] text-[Var(--input-text-color)] bg-[Var(--input-bg-color)] border rounded"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[Var(--admin-text-Secondary-color)] font-medium mb-1">
                Total Awards Count
              </label>
              <input
                type="number"
                value={stats.totalAwardsCount}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    totalAwardsCount: e.target.value,
                  })
                }
                className="w-full p-2 border border-[Var(--input-border-color)] text-[Var(--input-text-color)] bg-[Var(--input-bg-color)] rounded"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-[Var(--admin-text-Secondary-color)] text-sm font-medium mb-1">
                Years of Excellence
              </label>
              <input
                type="number"
                value={stats.Years_of_Excellence_count}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    Years_of_Excellence_count: e.target.value,
                  })
                }
                className="w-full p-2 border border-[Var(--input-border-color)] text-[Var(--input-text-color)] bg-[Var(--input-bg-color)] rounded"
                min="0"
                required
              />
            </div>

            {/* File Upload Section */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[Var(--admin-text-Secondary-color)] mb-2">
                Banner Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[Var(--input-border-color)]   border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-[Var(--admin-text-Secondary-color)]"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-[Var(--admin-text-Secondary-color)]">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">JPG, PNG, up to 5MB</p>
                </div>
              </div>

              {/* Image Preview */}
              {(photo || stats.photo) && (
                <img
                  src={photo ? URL.createObjectURL(photo) : stats.photo}
                  alt="Banner Preview"
                  className="w-32 h-32 object-cover mt-4 mx-auto rounded shadow"
                />
              )}
            </div>
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
            className={`w-full py-2 px-4 rounded font-medium text-[Var(--admin-text-Primary-color)] ${
              !loading ? " cursor-pointer" : " cursor-not-allowed "
            }  Admin_custom-hover Admin_custom-text bg-[Var(--dark-btnBg-color)]
            `}
          >
            {loading ? "Updating..." : "Update Banner"}
          </button>
        </form>
      </div>
    </LayoutAdmin>
  );
}
