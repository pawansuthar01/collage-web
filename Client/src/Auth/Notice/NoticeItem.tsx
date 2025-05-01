import React, { useState } from "react";
import { Pencil, Trash2, Save, X } from "lucide-react";
export interface NoticeData {
  notice: string;
  _id: string;
}

interface NoticeItemProps {
  notice: NoticeData;
  onDelete: (_id: string) => void;
  onUpdate: (_id: string, newNotice: string) => void;
}

const NoticeItem: React.FC<NoticeItemProps> = ({
  notice,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(notice.notice);

  const handleSave = () => {
    if (editValue.trim()) {
      onUpdate(notice._id, editValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(notice.notice);
    setIsEditing(false);
  };

  return (
    <div className="bg-[Var(--admin-bg-card-color)]  border border-[Var(--admin-border-color)] rounded-lg shadow-sm p-4 mb-3 hover:shadow-md transition-shadow">
      {isEditing ? (
        <div className="flex flex-col space-y-3">
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full p-2 border bg-[Var(--input-bg-color)] border-[Var(--input-border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            autoFocus
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-[Var(--admin-text--Primary-color)]  bg-[Var(--dark-btnBg-color)] rounded-md Admin_custom-hover transition-colors flex items-center"
            >
              <X size={16} className="mr-1" /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <Save size={16} className="mr-1" /> Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <p className="text-[Var(--admin-text-Primary-color)]">
              {notice.notice}
            </p>
            <p className="text-xs text-[Var(--admin-text-Secondary-color)] mt-1">
              ID: {notice._id}
            </p>
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 Admin_custom-hover rounded transition-colors"
              title="Edit"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => onDelete(notice._id)}
              className="p-1 text-red-600 Admin_custom-hover rounded transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeItem;
