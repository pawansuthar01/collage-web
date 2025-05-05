import React, { useEffect, useState } from "react";

import NoticeItem from "./NoticeItem";
import { PlusCircle, Filter, SortAsc, SortDesc } from "lucide-react";
import LayoutAdmin from "../../layout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import {
  DeleteBannerNotice,
  newBannerNotice,
  UpdateBannerNotice,
} from "../../Redux/Slice/Admin";
import toast from "react-hot-toast";
import { getBannerNoticeData } from "../../Redux/Slice/getData";
export interface NoticeData {
  notice: string;
  _id: string;
}

const BannerNotice: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { BannerNoticeData } = useSelector(
    (state: RootState) => state?.storeData
  );
  const [notices, setNotices] = useState<NoticeData[]>(BannerNoticeData);
  const [newNotice, setNewNotice] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (_id: string) => {
    const res = await dispatch(DeleteBannerNotice(_id));
    if (!res?.payload?.success) {
      toast.error(res?.payload.message);
    }

    if (res?.payload?.success) {
      toast.success(res?.payload.message);
      setNotices((prevNotices) =>
        prevNotices.filter((notice) => notice._id !== _id)
      );
    }
  };

  const handleUpdate = async (_id: string, updatedNotice: string) => {
    const res = await dispatch(
      UpdateBannerNotice({ id: _id, notice: updatedNotice })
    );

    if (!res?.payload?.success) {
      toast.error(res?.payload.message);
    }
    if (res?.payload?.success) {
      toast.success(res?.payload.message);
      setNotices((prevNotices) =>
        prevNotices.map((notice) =>
          notice._id === _id ? { ...notice, notice: updatedNotice } : notice
        )
      );
    }
  };
  const getNotice = async () => {
    const res = await dispatch(getBannerNoticeData());
   
    if (res && typeof res.payload === "object") {
      setNotices(res?.payload);
    }
  };
  useEffect(() => {
    getNotice();
  }, []);
  const handleAddNotice = async () => {
    const res = await dispatch(newBannerNotice({ notice: newNotice }));
    if (!res?.payload?.success) {
      toast.error(res?.payload.message);
    }
    if (res?.payload?.success) {
      toast.success(res?.payload.message);
      if (newNotice.trim()) {
        const newNoticeItem: NoticeData = {
          _id: Math.random().toString(36).substring(7),
          notice: newNotice,
        };
        setNotices([newNoticeItem, ...notices]);
        setNewNotice("");
      }
    }
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredNotices = notices.filter(
    (notice) =>
      notice.notice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (sortDirection === "asc") {
      return a.notice.localeCompare(b.notice);
    } else {
      return b.notice.localeCompare(a.notice);
    }
  });

  return (
    <LayoutAdmin>
      <div className="flex-1 min-h-screen ">
        <main className="p-6">
          <div className="bg-[Var(--admin-bg-card-color)] border border-[Var(--admin-Border-color)] rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-[Var(--admin-text-Primary-color)]  mb-4">
              Add New Notice
            </h2>
            <div className="flex flex-col md:flex-row gap-4 text-[Var(--admin-text-Primary-color)]">
              <textarea
                value={newNotice}
                onChange={(e) => setNewNotice(e.target.value)}
                placeholder="Enter new notice text..."
                className="flex-grow p-3 border border-[(--input-border-color)] bg-[Var(--input-bg-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <button
                onClick={handleAddNotice}
                className="flex items-center justify-center text-[Var(--admin-text--Primary-color)]  bg-[Var(--dark-btnBg-color)]  px-5 py-3 rounded-md Admin_custom-hover Admin_custom-text transition-colors md:self-end"
              >
                <PlusCircle size={18} className="mr-2" />
                Add Notice
              </button>
            </div>
          </div>

          <div className="bg-[Var(--admin-bg-color)]  border border-[Var(--admin-border-color)] rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-lg font-bold text-[Var(--admin-text-Secondary-color)]">
                All Notices
              </h2>

              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search notices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[(--input-border-color)] bg-[Var(--input-bg-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Filter
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[Var(--admin-text-Secondary-color)]"
                  />
                </div>

                <button
                  onClick={toggleSortDirection}
                  className="flex items-center text-[Var(--admin-text--Primary-color)]  bg-[Var(--dark-btnBg-color)] px-4 py-2 rounded-md Admin_custom-hover Admin_custom-text transition-colors"
                >
                  {sortDirection === "asc" ? (
                    <>
                      <SortAsc size={16} className="mr-2" />
                      Sort A-Z
                    </>
                  ) : (
                    <>
                      <SortDesc size={16} className="mr-2" />
                      Sort Z-A
                    </>
                  )}
                </button>
              </div>
            </div>

            {sortedNotices.length > 0 ? (
              <div className="space-y-4">
                {sortedNotices.map((notice) => (
                  <NoticeItem
                    key={notice._id}
                    notice={notice}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[Var(--admin-text-Secondary-color)]">
                {searchTerm
                  ? "No notices found matching your search."
                  : "No notices available."}
              </div>
            )}
          </div>
        </main>
      </div>
    </LayoutAdmin>
  );
};

export default BannerNotice;
