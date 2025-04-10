import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store";
import { AboutUpdate } from "../Redux/Slice/Admin";

interface AboutInfo {
  photo: string;
  description: string;
}

export default function AdminAboutUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { aboutData } = useSelector((state: RootState) => state?.storeData);
  const [Data, setData] = useState<AboutInfo>(aboutData[0]);
  const [aboutInfo, setAboutInfo] = useState<AboutInfo>({
    photo: "",
    description: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (Data) {
      setAboutInfo({
        photo: Data.photo || "",
        description: Data.description || "",
      });
    }
  }, [Data]);

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Photo size must be less than 5MB");
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

      // Send form data to backend API
      const response = await dispatch(AboutUpdate(formData));

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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Update About Page</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={aboutInfo.description}
              onChange={(e) =>
                setAboutInfo({ ...aboutInfo, description: e.target.value })
              }
              className="w-full p-2 border rounded min-h-[200px]"
              required
              placeholder="Enter the about page description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input
              type="file"
              onChange={handlePhotoUpload}
              accept="image/*"
              className="w-full p-2 border rounded"
            />
            {aboutInfo.photo && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-2">Current photo:</p>
                <img
                  src={aboutInfo.photo}
                  alt="Current about photo"
                  className="max-h-40 object-cover rounded"
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
          className={`w-full py-2 px-4 rounded font-medium text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : "Update About Page"}
        </button>
      </form>
    </div>
  );
}
