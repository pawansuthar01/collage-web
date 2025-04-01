import { Bell } from "lucide-react";

const NoticeBoard = () => {
  const notices = [
    {
      id: 1,
      date: "2024-03-15",
      title: "New Semester Registration",
      content:
        "Registration for the upcoming semester starts from March 20th, 2024.",
    },
    {
      id: 2,
      date: "2024-03-14",
      title: "Annual Sports Meet",
      content:
        "Annual sports meet will be held from April 5th to April 7th, 2024.",
    },
    {
      id: 3,
      date: "2024-03-13",
      title: "Guest Lecture Series",
      content:
        "Distinguished Professor Dr. Smith will deliver a lecture on AI on March 25th.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-8">
        <Bell className="h-8 w-8 text-[var(--icon-color)]" />
        <h2 className="ml-3 text-3xl font-bold text-[var(--heading-color)]">
          Notice Board
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="bg-[var(--cardBg-color)] p-6 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-sm text-gray-500">{notice.date}</div>
            <h3 className="mt-2 text-xl font-semibold text-[var(--heading-color)]">
              {notice.title}
            </h3>
            <p className="mt-2 text-gray-600">{notice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
