import React, { useEffect, useState } from "react";
import { Upload, Plus, Trash2, AlertCircle } from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";
import toast from "react-hot-toast";
import { getFacilitiesData } from "../../Redux/Slice/getData";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { DeleteFacilities, newFacilities } from "../../Redux/Slice/Admin";
export interface Image {
  _id: number;
  url: string;
  title: string;
  caption: string;
}

function FacilitiesUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<Image | null>(null);
  const [uploadImageLoading, setImageUploadLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [facilities, setFacilities] = useState<Image[] | null>(null);
  useEffect(() => {
    const loadFacilities = async () => {
      setLoading(true);
      const res = await dispatch(getFacilitiesData());
      if (res?.payload?.success || typeof res?.payload.data == "object") {
        setFacilities(res?.payload?.data);

        setLoading(false);
      }
      setLoading(false);
    };
    loadFacilities();
  }, []);
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setImageUploadLoading(true);
    // Here you would typically handle the upload to your backend
    if (selectedFile && title && caption) {
      const fromData = new FormData();
      fromData.append("image", selectedFile);
      fromData.append("title", title);
      fromData.append("caption", caption);
      const res = await dispatch(newFacilities(fromData));
      if (res && res?.payload.data && res?.payload?.success) {
        setLoading(false);

        setFacilities((prev) => {
          return [res?.payload?.data, ...(Array.isArray(prev) ? prev : [])];
        });
      }

      setSelectedFile(null);
      setImagePreview(null);
      setTitle("");
      setCaption("");
      setImageUploadLoading(false);
    } else {
      setImageUploadLoading(false);
      toast.error("Give All Data to upload image");
    }
  };

  const handleDeleteClick = (image: Image) => {
    setImageToDelete(image);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteConfirm(false);
    setImageToDelete(null);
    if (imageToDelete && imageToDelete?._id) {
      const res = await dispatch(DeleteFacilities(imageToDelete?._id));
      if (res?.payload?.success) {
        toast.success(res?.payload.message);
        if (!facilities) return;
        setFacilities(
          facilities.filter((img) => img._id !== imageToDelete._id)
        );
      }
    }
  };

  return (
    <LayoutAdmin>
      <div className="py-8 md:py-12 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Upload Form */}
          <div className="bg-[var(--admin-CardBg-color)] rounded-lg shadow-md p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[var(--admin-text-Primary-color)]">
                Image Upload
              </h2>
              <Upload className="w-6 h-6 text-gray-600" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--admin-text-Secondary-color)]">
                  Image
                </label>
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setImagePreview(null);
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer border-[var(--input-border-color)] hover:bg-[var(--input-bg-color)]">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Plus className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="mb-2 text-sm text-[var(--admin-text-Secondary-color)]">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-[var(--admin-text-Secondary-color)]">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileSelect}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-[var(--admin-text-Secondary-color)]"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--input-border-color)] bg-[var(--input-bg-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="caption"
                  className="block text-sm font-medium text-[var(--admin-text-Secondary-color)]"
                >
                  Caption
                </label>
                <textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-[var(--input-border-color)] bg-[var(--input-bg-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                disabled={uploadImageLoading}
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>
                  {" "}
                  {!uploadImageLoading
                    ? `Upload Image`
                    : `Uploading image wait...`}{" "}
                </span>
              </button>
            </form>
          </div>

          {/* Gallery Management */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--admin-text-Primary-color)] mb-8">
              Manage Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading && <p className="text-center">loading...</p>}
              {!loading && facilities && facilities.length > 0 ? (
                facilities.map((image) => (
                  <div key={image._id} className="relative group">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteClick(image)}
                        className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-[var(--admin-text-Secondary-color)]">
                        {image.title}
                      </h3>
                      <p className="text-sm text-[var(--admin-text-Secondary-color)] truncate">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 mt-8">
                  No image Facilities available.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[var(--admin-text-Secondary-color)] rounded-lg p-6 max-w-sm mx-4">
              <div className="flex items-center space-x-3 text-red-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Confirm Delete</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{imageToDelete?.title}"? This
                action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
}

export default FacilitiesUpdate;
