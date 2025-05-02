import React, { useState, useEffect } from "react";
import DocumentCard from "./documentCart";
import { Upload, Grid, List, Download, Trash2, Eye } from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { getDocumentData } from "../../Redux/Slice/getData";
import toast from "react-hot-toast";
import { DeleteDocument, newDocument } from "../../Redux/Slice/Admin";
export interface DocumentData {
  _id: string;
  url: string;
}

const DocumentsPage: React.FC = () => {
  const { documentData } = useSelector((state: RootState) => state?.storeData);
  const dispatch = useDispatch<AppDispatch>();
  const [documents, setDocuments] = useState<DocumentData[]>(documentData);

  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleDelete = async (id: string) => {
    const res = await dispatch(DeleteDocument(id));
    if (res?.payload?.success) {
      toast.success(res?.payload?.message);
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc._id !== id));
    }
    if (!res?.payload?.success) {
      toast.error(res?.payload?.message);
    }
  };
  const getDocument = async () => {
    const res = await dispatch(getDocumentData());

    if (res && typeof res.payload == "object") {
      setDocuments(res?.payload?.data);
    }
  };
  useEffect(() => {
    getDocument();
  }, []);
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];

    if (!file) {
      setLoading(false);

      return;
    }

    const formData = new FormData();

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setLoading(false);
        toast.error("File size must be less than 10MB.");
        return;
      }

      formData.append("photo", file);
      const res = await dispatch(newDocument(formData));
      console.log(res);

      if (res && res?.payload.data && res?.payload?.success) {
        setLoading(false);

        setDocuments((prev) => {
          console.log("prev:", prev); // Log to see the prev value
          return [res?.payload?.data, ...(Array.isArray(prev) ? prev : [])];
        });
      }
    }
    setLoading(false);
    e.target.value = "";
  };
  return (
    <LayoutAdmin>
      <div className="flex-1 min-h-screen ">
        {/* <Header title="Document Management" /> */}
        <main className="p-6">
          <div className="bg-[Var(--admin-bg-card-color)] border border-[Var(--admin-Border-color)] rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-[Var(--admin-text-Primary-color)] mb-4">
              Upload New Document
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center text-[Var(--admin-text-Primary-color)]">
              <input
                id="upload_image"
                type="file"
                disabled={loading}
                className="hidden"
                onChange={handleUpload}
                accept="image/*"
              />
              <label
                htmlFor="upload_image"
                className={` ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                } w-full sm:w-auto flex items-center justify-center text-[Var(--admin-text--Primary-color)]  bg-[Var(--dark-btnBg-color)]  px-6 py-3 rounded-md Admin_custom-hover Admin_custom-text transition-colors`}
              >
                <Upload size={18} className="mr-2" />
                {loading ? "File is Uploading..." : "Select Files to Upload"}
              </label>

              <p className="text-sm  text-[Var(--admin-text-Secondary-color)]">
                Supported formats: Images
              </p>
            </div>
          </div>

          <div className="bg-[Var(--admin-bg-color)] border border-[Var(--admin-Border-color)] rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-lg font-bold text-[Var(--admin-text-Primary-color)] ">
                All Documents
              </h2>
            </div>

            {documents && documents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {documents.map((doc) => (
                  <DocumentCard
                    key={doc._id}
                    document={doc}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No documents available.
              </div>
            )}
          </div>
        </main>
      </div>
    </LayoutAdmin>
  );
};

export default DocumentsPage;
