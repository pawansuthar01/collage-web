import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import Layout from "../layout/layout";
import formatMongoDateToIndian, {
  formatMongoDate,
} from "../../Helper/DateFormat";
import { NoticeToStudentSkeleton } from "../components/loadingPage/Skeleton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { useEffect, useState } from "react";
import { getNoticeData } from "../Redux/Slice/getData";
type Notice = {
  _id: string;

  notice_type: string;
  title: string;
  message: string;
  publish_date: string;
  expiry_date: string;
  createdAt: string;
};

const NoticesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="pt-20 pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Bell className="h-8 w-8 text-[var(--icon-color)]" />
            <h2 className="ml-3 text-3xl font-bold text-[var(--heading-color)]">
              Latest Updates
            </h2>
          </div>

          <div className="flex gap-6  justify-evenly ">
            {loading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <NoticeToStudentSkeleton key={index} />
              ))
            ) : data.length > 0 ? (
              data.map((notice) => (
                <div key={notice._id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-3xl bg-[var(--CardBg-color)]  rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="bg-[var(--notice-bg-color)] text-[var(--notice-text-color)] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                            {notice?.notice_type}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-[var(--heading-color)]">
                          {notice?.title}
                        </h2>
                        <p className="mt-2 text-[var(--text-Secondary-color)] ">
                          {notice?.message}
                        </p>
                      </div>
                      <div className="text-right text-sm  text-[var(--text-Secondary-color)] whitespace-nowrap max-w-xs ">
                        Post Time: {formatMongoDate(notice?.createdAt)}
                      </div>
                    </div>

                    <div className=" flex justify-between flex-wrap gap-2 text-sm text-[var(--text-Secondary-color)] mb-4">
                      <p>
                        <span className="font-medium text-sm">Start Date:</span>{" "}
                        {formatMongoDateToIndian(notice?.publish_date)}
                      </p>
                      <p>
                        <span className="font-medium text-sm">End Date:</span>{" "}
                        {formatMongoDateToIndian(notice?.expiry_date)}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              <div className="bg-[var(--admin-bg-color)] rounded-lg shadow-md">
                <div className="p-6 space-y-4">
                  <p className="text-[var(--text-Secondary-color)] text-center">
                    No notices available
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default NoticesPage;
