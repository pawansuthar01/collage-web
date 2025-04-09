import { useParams } from "react-router-dom";

function EditNotice() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Notice</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Edit notice form for ID: {id}</p>
        </div>
      </div>
    </div>
  );
}

export default EditNotice;
