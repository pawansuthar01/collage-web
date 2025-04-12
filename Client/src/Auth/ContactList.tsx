import { Mail, MessageSquare, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetAllMessage, messageMarkAsRead } from "../Redux/Slice/Admin";
import { AppDispatch } from "../Redux/Store";
import LayoutAdmin from "../layout/AdminLayout";

type MessageType = {
  _id: string;
  fullName: string;
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

function ContactList() {
  const dispatch = useDispatch<AppDispatch>();
  // const [loading, setLoading] = useState(false);
  const [filteredMessages, setFilteredMessages] = useState<MessageType[]>([]);
  const [filterRead, setFilterRead] = useState<"true" | "false" | "all" | null>(
    null
  );
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handelLoadMessage = async () => {
    const res = await dispatch(GetAllMessage());
    const fetchedMessages = res?.payload?.data || [];
    setMessages(fetchedMessages);
    setFilteredMessages(fetchedMessages);
  };

  useEffect(() => {
    handelLoadMessage();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "true" | "false" | "all";
    setFilterRead(value);

    if (value === "all") {
      setFilteredMessages(messages);
    } else {
      setFilteredMessages(
        messages.filter((msg) => msg.read.toString() === value)
      );
    }
  };

  const handelMarkRead = async (id: string) => {
    setFilteredMessages((prev) =>
      prev.map((message) =>
        message._id === id ? { ...message, read: true } : message
      )
    );
    await dispatch(messageMarkAsRead(id));
  };

  return (
    <LayoutAdmin>
      <div className="p-5 bg-[Var(--admin-bg-color)] min-h-screen max-sm:p-0 mt-5">
        <div className="w-full">
          <div className=" p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-6 flex text-[Var(--dark-text-Primary-color)] items-center gap-2">
              <MessageSquare className="text-[Var(--dark-icon-color)]" />
              Messages ({messages.length})
            </h2>
            <div className="mb-6 flex items-center space-x-4">
              <label className="text-lg max-sm:text-sm text-[Var(--admin-text-Secondary-color)]">
                Filter by Read Status:
              </label>
              <select
                className="border  border-gray-300 bg-[Var(--input-bg-color)] rounded-lg p-3 max-sm:p-2 mt-2 "
                value={filterRead || "all"}
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
              </select>
            </div>
            {filteredMessages.length > 0 ? (
              <div className="space-y-6">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg._id}
                    className="bg-[Var(--admin-bg-card-color)] border-[Var(--admin-border-color)] border rounded-lg p-6 border-l-4 "
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <div className="flex items-center gap-3 mb-2 md:mb-0">
                        <User
                          className="text-[Var(--dark-icon-color)]"
                          size={20}
                        />
                        <span className="font-semibold">{msg.fullName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail
                          className="text-[Var(--dark-icon-color)]"
                          size={20}
                        />
                        <a
                          className="text-[Var(--admin-text-Secondary-color)] max-sm:text-sm"
                          href={`mailto:${msg.email}`}
                        >
                          {msg.email}
                        </a>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-[Var(--admin-text-Secondary-color)]">
                      {msg.subject}
                    </h3>
                    <p className="text-[Var(--admin-text-Secondary-color)] mb-4 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    {msg.createdAt && (
                      <p className="text-sm text-[Var(--admin-text-Secondary-color)] mt-2">
                        Sent on: {formatMongoDateToIndian(msg.createdAt)}
                      </p>
                    )}
                    <div className="flex justify-end">
                      <button
                        disabled={msg.read}
                        onClick={() => handelMarkRead(msg._id)}
                        className={`px-4 py-2 max-sm:py-1 max-sm:px-2 rounded-full ${
                          msg.read ? "bg-green-400" : "bg-red-400"
                        } text-white font-semibold text-sm`}
                      >
                        {msg.read ? "UnRead" : "Read"}
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

export default ContactList;
