import { useEffect, useState } from "react";
import { Phone, CheckCircle, Circle } from "lucide-react";
import LayoutAdmin from "../layout/AdminLayout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { CallMarkAsRead, GetAllCallReq } from "../Redux/Slice/Admin";
import { MessageSkeleton } from "../components/loadingPage/Skeleton";

// Type for call request
interface CallRequest {
  _id: string;
  name: string;
  course_Interest: string;
  message: string;
  number: string;
  read: boolean;
}

function CallList() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [CallRequest, SetCallRequest] = useState<CallRequest[]>([]);
  // Sample data - in a real app, this would come from an API

  async function LoadCallRequest() {
    setLoading(true);
    const res = await dispatch(GetAllCallReq());
    if (res?.payload?.success) {
      SetCallRequest(res?.payload?.data);
    }
    setLoading(false);
  }
  useEffect(() => {
    LoadCallRequest();
  }, []);

  // Toggle read/unread status
  const toggleReadStatus = async (id: string) => {
    await dispatch(CallMarkAsRead(id));
    SetCallRequest((requests) =>
      requests.map((request) =>
        request._id === id ? { ...request, read: !request.read } : request
      )
    );
  };

  return (
    <LayoutAdmin>
      <div className="min-h-screen bg-[Var(--admin-bg-color)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[Var(--admin-text-Primary-color)]">
              Call Requests
            </h1>
            <Phone className="text-[Var(--dark-icon-color)] w-8 h-8" />
          </div>

          <div className="bg-[Var(--admin-bg-color)] shadow-md rounded-lg overflow-hidden">
            {loading ? (
              <MessageSkeleton />
            ) : (
              CallRequest?.length > 0 &&
              CallRequest.map((request) => (
                <div
                  key={request._id}
                  className={`border border-[Var(--admin-border-color)]  rounded-lg m-1 p-6 ${
                    request.read
                      ? "bg-[Var(--read-message-bg-color)]"
                      : "bg-[Var(--unread-message-bg-color)]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[Var(--admin-text-Secondary-color)]">
                        {request.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[Var(--dark-icon-color)]">
                        {request.course_Interest}
                      </p>
                      <p className="mt-2 text-[Var(--admin-text-Secondary-color)]">
                        {request.message}
                      </p>
                      <p className="mt-2 text-sm text-[Var(--admin-text-Secondary-color)] flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {request.number}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleReadStatus(request._id)}
                      className="flex items-center text-sm font-medium px-3 py-1 rounded-full transition-colors"
                    >
                      {request.read ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default CallList;
