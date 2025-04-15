import { Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { formatMongoDate } from "../../Helper/DateFormat";
import { useNavigate } from "react-router-dom";

const NoticeBoard = () => {
  const navigate = useNavigate();
  const NoticeData = useSelector(
    (state: RootState) => state.storeData.NoticeData
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-8">
        <Bell className="h-8 w-8 text-[var(--icon-color)]" />
        <h2 className="ml-3 text-3xl font-bold text-[var(--heading-color)]">
          Notice Board
        </h2>
      </div>
      <div className=" gap-6 flex  justify-evenly  flex-wrap">
        {NoticeData.length ? (
          NoticeData.map((notice) => (
            <div key={notice._id}>
              <div
                onClick={() => navigate("/notices")}
                className=" max-w-2xl bg-[var(--cardBg-color)]  rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border "
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-[var(--heading-color)]">
                      {notice?.title}
                    </h2>
                    <p className="mt-2 text-gray-600 ">{notice?.message}</p>
                  </div>
                </div>

                <div className="flex  justify-between flex-wrap gap-2 text-sm text-gray-600 mb-4">
                  <p>
                    <span className="font-medium">Start Date:</span>{" "}
                    {formatMongoDate(notice?.publish_date)}
                  </p>
                  <p>
                    <span className="font-medium">End Date:</span>{" "}
                    {formatMongoDate(notice?.expiry_date)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 space-y-4">
            <p className="text-gray-600 text-center">No notices available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
