import React from "react";
import { Trash2, Download, Eye } from "lucide-react";
export interface DocumentData {
  _id: string;
  url: string;
}
interface DocumentCardProps {
  document: DocumentData;
  onDelete: (_id: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onDelete }) => {
  return (
    <div className="bg-[Var(--admin-bg-card-color)] rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-full h-40 overflow-hidden bg-gray-200">
        <img
          src={document.url}
          alt={`Document ${document._id}`}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500 truncate">ID: {document._id}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => window.open(document.url, "_blank")}
              className="p-1 text-blue-600 Admin_custom-hover rounded transition-colors"
              title="View"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => window.open(document.url, "_blank")}
              className="p-1 text-green-600 Admin_custom-hover rounded transition-colors"
              title="Download"
            >
              <Download size={16} />
            </button>
            <button
              onClick={() => onDelete(document._id)}
              className="p-1 text-red-600 Admin_custom-hover rounded transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
