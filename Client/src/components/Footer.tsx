import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { getSocialLinkData } from "../Redux/Slice/getData";
type LinkDataType = {
  instagram: string;
  youtube: string;
  facebook: string;
};
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const dispatch = useDispatch<AppDispatch>();
  const LinkData = useSelector(
    (state: RootState) => state.storeData.SocialLinkData
  );
  const [link, setLink] = useState<LinkDataType>();
  async function contactDataLoad() {
    const res = await dispatch(getSocialLinkData());
    if (res?.payload) {
      setLink(res?.payload[0]);
    }
  }
  useEffect(() => {
    if (LinkData[0] == null) {
      contactDataLoad();
    } else {
      setLink(LinkData[0]);
    }
  }, []);
  return (
    <footer className="bg-[var(--bg-color)] text-[var(--text-color)] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center flex-col items-center  px-10 text-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">
              Mata Gujri Khalsa College
            </span>
          </div>
          <p className="mt-4 ">
            Mata Gujri Khalsa College Of Education, sikh minority institution 2
            C, Rajasthan 335001
          </p>
        </div>
        <div className="flex justify-between flex-wrap px-10">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="custom-hover-text">
                  Home
                </a>
              </li>
              <li>
                <a href="/courses" className="custom-hover-text">
                  Courses
                </a>
              </li>
              <li>
                <a href="/about" className="custom-hover-text">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="custom-hover-text">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={link?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-hover-text"
                >
                  Facebook
                </a>
              </li>

              <li>
                <a
                  href={link?.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-hover-text"
                >
                  Youtube
                </a>
              </li>
              <li>
                <a
                  href={link?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-hover-text"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-gray-300">
          <p>&copy; {year} Mata Gujri Khalsa College. All rights reserved.</p>
          <div className="mt-2 text-sm text-[var(--text-Secondary-color)] font-bold">
            Developed by{" "}
            <a
              href="https://pawansuthar.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-black transition-colors text-xl"
            >
              Pawan Kumar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
