import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store";
import { getBannerNoticeData } from "../Redux/Slice/getData";

type NoticeData = {
  notice: string;
  _id: string;
};

export const NoticeLine = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [notice, setNotice] = useState<NoticeData[]>([]);
  const { BannerNoticeData } = useSelector(
    (state: RootState) => state?.storeData
  );
  useEffect(() => {
    const fetchNotice = async () => {
      if (BannerNoticeData.length > 0) {
        try {
          const res = await dispatch(getBannerNoticeData());
          if (res && typeof res?.payload == "object") {
            setNotice(res?.payload);
          }
        } catch (error) {
          console.error("Failed to fetch notice:", error);
        }
      }
    };

    fetchNotice();
  }, []);

  return (
    <div className="notice-bar  text-[Var(--notice-line-text-color)] p-2 font-bold overflow-hidden whitespace-nowrap">
      <marquee
        behavior="scroll"
        direction="left"
        scrollamount="6"
        className="text-[var(--notice-line-text-color)] bg-[Var(--notice-line-bg-color)] p-2 rounded-lg"
      >
        {notice?.length > 0 ? (
          notice.map((not) => (
            <span key={not._id} className="mx-5 inline-block">
              <span className="mx-2 text-gray-400">•</span>
              {not.notice}
              <span className="mx-2 text-gray-400">•</span>
            </span>
          ))
        ) : (
          <span>No notices available.</span>
        )}
      </marquee>
    </div>
  );
};
