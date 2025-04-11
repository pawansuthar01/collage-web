import { Bell, Pencil, Trash2 } from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNoticeData } from "../../Redux/Slice/getData";
import { DeleteNotice } from "../../Redux/Slice/Admin";
import { motion } from "framer-motion";
import { NoticeSkeleton } from "../../components/loadingPage/Skeleton";
import formatMongoDateToIndian from "../../../Helper/DateFormat";
type Notice = {
  _id: string;

  notice_type: string;
  title: string;
  message: string;
  publish_date: string;
  expiry_date: string;
  createdAt: string;
};

function NoticeList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Notice[]>([]);
  async function getNotices() {
    setLoading(true);
    const res = await dispatch(getNoticeData());
    if (res?.payload && typeof res.payload === "object") {
      const Data = res.payload;
      setData(Data);
    }
    setLoading(false);
  }
  useEffect(() => {
    getNotices();
  }, []);
  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this Notice?")) {
      await dispatch(DeleteNotice(id));

      setData((prev) => prev.filter((n) => n._id !== id));
    }
  };
  return (
    <LayoutAdmin>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Bell className="h-8 w-8 text-blue-600" />
              Notices
            </h1>
            <button
              onClick={() => navigate("/Admin/notices/add")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Notice
            </button>
          </div>
          <div className="flex justify-center flex-wrap gap-6">
            {loading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <NoticeSkeleton key={index} />
              ))
            ) : data.length > 0 ? (
              data.map((notice) => (
                <div key={notice._id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-3xl bg-white dark:bg-[var(--cardBg-color)] rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="bg-[var(--notice-bg-color)] text-[var(--notice-text-color)] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                            {notice?.notice_type}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--heading-color)]">
                          {notice?.title}
                        </h2>
                        <p className="mt-2 text-gray-600 ">{notice?.message}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600  ">
                        Post Time: <br />
                        {formatMongoDateToIndian(notice?.createdAt)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
                      <p>
                        <span className="font-medium">Start Date:</span>{" "}
                        {formatMongoDateToIndian(notice?.publish_date)}
                      </p>
                      <p>
                        <span className="font-medium">End Date:</span>{" "}
                        {formatMongoDateToIndian(notice?.expiry_date)}
                      </p>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() =>
                          navigate(`/Admin/notices/edit/${notice._id}`, {
                            state: notice,
                          })
                        }
                        className="flex items-center gap-1 px-4 py-2 text-sm text-blue-600 hover:text-white border border-blue-600 rounded-lg hover:bg-blue-600 transition-all"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(notice._id)}
                        className="flex items-center gap-1 px-4 py-2 text-sm text-red-600 hover:text-white border border-red-600 rounded-lg hover:bg-red-600 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 space-y-4">
                  <p className="text-gray-600 text-center">
                    No notices available
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default NoticeList;
