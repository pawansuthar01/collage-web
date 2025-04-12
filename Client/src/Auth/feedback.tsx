import { MessageSquare, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteFeedback, GetAllFeedback } from "../Redux/Slice/Admin";
import { AppDispatch } from "../Redux/Store";
import LayoutAdmin from "../layout/AdminLayout";

type MessageType = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
  read: boolean;
};

const formatMongoDateToIndian = (messageSubmitDate: string | Date): string => {
  const date = new Date(messageSubmitDate);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

function FeedbackList() {
  const dispatch = useDispatch<AppDispatch>();
  // const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<MessageType[]>([]);

  const handelLoadMessage = async () => {
    const res = await dispatch(GetAllFeedback());
    const fetchedMessages = res?.payload?.data || [];
    setFeedback(fetchedMessages);
  };

  useEffect(() => {
    handelLoadMessage();
  }, []);

  const handelDelete = async (id: string) => {
    console.log(id);
    await dispatch(DeleteFeedback(id));
  };

  return (
    <LayoutAdmin>
      <div className="p-3 min-h-screen max-sm:p-0 mt-3">
        <div className="w-full ">
          <div className=" p-3 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="text-blue-400" />
              Feedback ({feedback.length})
            </h2>

            {feedback.length > 0 ? (
              <div className="space-y-6">
                {feedback.map((msg) => (
                  <div
                    key={msg._id}
                    className="bg-gray-60/50 rounded-lg p-6 border-l-4 border-blue-500"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <div className="flex items-center gap-3 mb-2 md:mb-0">
                        <User className="text-blue-400" size={20} />
                        <span className="font-semibold">{msg.name}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-400">
                      {msg.subject}
                    </h3>
                    <p className="text-gray-300 mb-4 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    {msg.createdAt && (
                      <p className="text-sm text-gray-500 mt-2">
                        Sent on: {formatMongoDateToIndian(msg.createdAt)}
                      </p>
                    )}
                    <div className="flex justify-end">
                      <button
                        onClick={() => handelDelete(msg._id)}
                        className={`px-4 py-2 max-sm:py-1 max-sm:px-2 rounded-full 
                         bg-red-400
                         text-white font-semibold text-sm`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <MessageSquare size={40} className="mx-auto mb-4 opacity-50" />
                <p>No messages yet. Be the first to send a message!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default FeedbackList;
