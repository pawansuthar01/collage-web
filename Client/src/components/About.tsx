import { Users } from "lucide-react";
import { getAboutData } from "../Redux/Slice/getData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store";
type AboutDataType = {
  photo: string;
  description: string;
};
const About = () => {
  const dispatch = useDispatch<AppDispatch>();
  const AboutData = useSelector(
    (state: RootState) => state.storeData.AboutData
  );
  const [About, setAbout] = useState<AboutDataType>({
    photo: "",
    description: "",
  });

  async function contactDataLoad() {
    const res = await dispatch(getAboutData());
    if (res && res?.payload != undefined) {
      setAbout(res?.payload[0]);
    }
  }
  useEffect(() => {
    if (AboutData == null) {
      contactDataLoad();
    } else {
      setAbout({
        photo: AboutData[0]?.photo || "",
        description: AboutData[0]?.description || "",
      });
    }
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-8">
        <Users className="h-8 w-8  text-[var(--icon-color)]" />
        <h2 className="ml-3 text-3xl font-bold text-[var(--heading-color)]">
          About Us
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold text-[var(--heading-color)] mb-4">
            Our Vision
          </h3>
          <p className="text-gray-600">
            {About.description ||
              ` To be a leading institution of higher education, recognized globally
            for academic excellence, innovative research, and the development of
            leaders who make a positive impact on society.`}
          </p>
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Key Features
            </h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>State-of-the-art infrastructure</li>
              <li>Experienced faculty members</li>
              <li>Industry partnerships</li>
              <li>Research opportunities</li>
            </ul>
          </div>
        </div>
        <div className="relative h-[400px]">
          <img
            src={
              About.photo ||
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            }
            alt="College campus"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
