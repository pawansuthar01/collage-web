import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { AboutUpdate } from "../Redux/Slice/Admin";
import LayoutAdmin from "../layout/AdminLayout";
import toast from "react-hot-toast";
import { getAboutData } from "../Redux/Slice/getData";

interface AboutInfo {
  photo: string;
  description: string;
}

export default function AdminAboutUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const [Data, setData] = useState<AboutInfo>();
  const [aboutInfo, setAboutInfo] = useState<AboutInfo>({
    photo: "",
    description: "",
  });
  const [DataLoad, setDataLoad] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handelDataLoad = async () => {
    setDataLoad(true);
    const res = await dispatch(getAboutData());
    if (res && res.payload) {
      const data = res.payload?.data[0];
      if (data) {
        setAboutInfo({
          photo: data.photo || "",
          description: data.description || "",
        });
      }
    }
    setDataLoad(false);
  };

  useEffect(() => {
    handelDataLoad();
  }, []);

  useEffect(() => {
    if (Data) {
    }
  }, [Data]);

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB.");
      return;
    }

    setPhoto(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      if (photo) {
        formData.append("photo", photo);
      }
      formData.append("description", aboutInfo.description);

      const response = await dispatch(AboutUpdate(formData));
      console.log(response);
      if (response.payload?.success) {
        setMessage("About page updated successfully!");
        setData(response?.payload?.data);
        setPhoto(null);
      } else {
        throw new Error(response.payload?.message || "Update failed");
      }
    } catch (error: any) {
      console.error("Error updating about info:", error);
      setMessage(error?.message || "Failed to update about information");
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
        <h1 className="text-2xl font-bold mb-6 text-[Var(--admin-text-Primary-color)]">
          Update About Page
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[Var(--admin-text-Secondary-color)] text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={aboutInfo.description}
                onChange={(e) =>
                  setAboutInfo({ ...aboutInfo, description: e.target.value })
                }
                className="w-full p-2 border border-[Var(--input-border-color)]  text-[Var(--input-text-color)] bg-[Var(--input-bg-color)] rounded min-h-[150px]"
                required
                placeholder="Enter the about page description..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[Var(--admin-text-Secondary-color)] mb-2">
                Upload Photo
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2  border-[Var(--input-border-color)] border-dashed rounded-lg">
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
                      className="relative cursor-pointer  rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                    <label htmlFor="file-upload" className="pl-1">
                      or drag and drop
                    </label>
                  </div>
                  <p className="text-xs text-[Var(--admin-text-Secondary-color)]">
                    PNG, JPG, JPEG up to 5MB
                  </p>
                </div>
              </div>
              {(photo || aboutInfo.photo) && (
                <div className="mt-2 flex justify-center">
                  <img
                    src={photo ? URL.createObjectURL(photo) : aboutInfo.photo}
                    alt="Preview"
                    className="h-32 object-cover rounded"
                  />
                </div>
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
            className={`w-full py-2 px-4 rounded font-medium text-[Var(--admin-text-Primary-color)] ${
              !loading ? " cursor-pointer" : " cursor-not-allowed "
            }  Admin_custom-hover Admin_custom-text bg-[Var(--dark-btnBg-color)]
              `}
          >
            {loading ? "Updating..." : "Update About Page"}
          </button>
        </form>
      </div>
    </LayoutAdmin>
  );
}
