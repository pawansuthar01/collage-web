import { useDispatch } from "react-redux";
import ImageGallery from "../components/images/ImageGallery";

import { AppDispatch } from "../Redux/Store";
import { useEffect, useState } from "react";
import { getFacilitiesData } from "../Redux/Slice/getData";
import Layout from "../layout/layout";

export interface Image {
  _id: number;
  url: string;
  title: string;
  caption: string;
}

function Facilities() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [facilities, setFacilities] = useState<Image[] | null>(null);
  useEffect(() => {
    const loadFacilities = async () => {
      setLoading(true);
      const res = await dispatch(getFacilitiesData());
      if (res?.payload?.success || typeof res?.payload.data == "object") {
        setFacilities(res?.payload?.data);

        setLoading(false);
      }
      setLoading(false);
    };
    loadFacilities();
  }, []);

  if (loading) {
    return (
      <div className="py-8 md:py-12 animate-pulse">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <div className="h-8 md:h-10 w-48 md:w-64 bg-gray-300 mx-auto rounded"></div>
          </div>

          {/* Skeleton for Facilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-full h-48 bg-gray-300 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <Layout>
      <div className="py-8 md:py-12  min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 pt-12">
              Facilities and Activities
            </h2>
          </div>
        </div>
        {facilities && facilities?.length > 0 ? (
          <ImageGallery images={facilities} />
        ) : (
          <div>
            <p className="text-center text-gray-500 mt-8">
              No image Facilities available.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Facilities;
