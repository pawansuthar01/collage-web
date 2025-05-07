import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { getDocumentData } from "../Redux/Slice/getData";
import Layout from "../layout/layout";
type Document = {
  _id: string;
  url: string;
};

export const Data = [
  {
    id: "askjcncj",

    url: "https://images.pexels.com/photos/30335531/pexels-photo-30335531/free-photo-of-charming-parisian-cafe-au-pied-de-cochon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: "askdcdsjcncj",
    url: "https://images.pexels.com/photos/31632320/pexels-photo-31632320/free-photo-of-bridal-portrait-on-rooftop-overlooking-historic-cityscape.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
];
export const DocumentPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const getDocument = async () => {
    setLoading(true);
    const res = await dispatch(getDocumentData());

    if (res && res?.payload?.success && typeof res?.payload == "object") {
      setDocuments(res?.payload?.data);
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    getDocument();
  }, []);
  if (loading) {
    return (
      <div className="flex p-2 justify-center rounded-xl overflow-hidden animate-pulse">
        <div className="w-full h-48 lg:w-[50%] bg-gray-300 rounded-lg"></div>
      </div>
    );
  }
  return (
    <Layout>
      <section className="w-full min-h-screen bg-gradient-to-tr from-indigo-50 to-purple-100 py-6 px-4 md:px-8">
        <h2 className="text-xl md:text-3xl pt-14 font-semibold text-gray-800 mb-6 text-center">
          Documents
        </h2>

        <div className="flex flex-col gap-4">
          {documents.length > 0 &&
            documents.map((doc) => (
              <div
                key={doc._id}
                className=" flex p-2 justify-center rounded-xl overflow-hidden "
              >
                <img
                  src={doc.url}
                  alt="Document"
                  className="w-full h-auto lg:w-[50%] object-cover rounded-lg "
                />
              </div>
            ))}
        </div>

        {documents.length == 0 && (
          <p className="text-center text-gray-500 mt-8">
            No image documents available.
          </p>
        )}
      </section>
    </Layout>
  );
};
