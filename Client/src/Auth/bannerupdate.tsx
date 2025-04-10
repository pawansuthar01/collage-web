import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store";
import { updateBanner } from "../Redux/Slice/Admin";
import LayoutAdmin from "../layout/AdminLayout";

interface BannerStats {
  totalStudentCount: number;
  totalCourseCount: number;
  totalAwardsCount: number;
  yearsOfExcellence: number;
  photo: string;
}

export default function AdminBannerUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { bannerData } = useSelector((state: RootState) => state?.storeData);
  const [Data, setData] = useState<BannerStats>(bannerData[0]);
  const [stats, setStats] = useState<BannerStats>({
    totalStudentCount: 0,
    totalCourseCount: 0,
    totalAwardsCount: 0,
    yearsOfExcellence: 0,
    photo: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (Data) {
      setStats({
        totalStudentCount: Data.totalStudentCount || 0,
        totalCourseCount: Data.totalCourseCount || 0,
        totalAwardsCount: Data.totalAwardsCount || 0,
        yearsOfExcellence: Data.yearsOfExcellence || 0,
        photo: Data.photo || "",
      });
    }
  }, [Data]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      formData.append("stats", JSON.stringify(stats));

      const response = await dispatch(updateBanner(formData));

      if (!response.payload.success) {
        throw new Error("Failed to update banner");
      }

      setMessage("Banner updated successfully!");
      setData(response?.payload?.data);
    } catch (error) {
      console.error("Error updating banner:", error);
      setMessage("Failed to update banner");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LayoutAdmin>
      <div className="max-w-2xl mx-auto p-6">
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
                    totalStudentCount: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
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
                    totalCourseCount: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Total Awards Count
              </label>
              <input
                type="number"
                value={stats.totalAwardsCount}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    totalAwardsCount: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Years of Excellence
              </label>
              <input
                type="number"
                value={stats.yearsOfExcellence}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    yearsOfExcellence: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                min="0"
                required
              />
            </div>

            {/* File Upload Section */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
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
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
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
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded font-medium text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update Banner"}
          </button>
        </form>
      </div>
    </LayoutAdmin>
  );
}
