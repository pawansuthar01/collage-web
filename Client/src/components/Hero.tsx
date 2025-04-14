import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Calendar, Award, Users, BookOpen } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const bannerData = useSelector(
    (state: RootState) => state.storeData.bannerData
  );

  const circularTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = "Mata gujri khlasa shikshan sansthan  • WELCOME •  ";
    if (circularTextRef.current) {
      circularTextRef.current.innerHTML = text
        .split("")
        .map((char, i) => {
          return `<span style="transform: rotate(${
            (i * 360) / text.length
          }deg)">${char}</span>`;
        })
        .join("");
    }

    if (
      !bannerData[0] ||
      bannerData[0].Years_of_Excellence_count == null ||
      bannerData[0].totalCourseCount == null ||
      bannerData[0].totalAwardsCount == null ||
      bannerData[0].Years_of_Excellence_count == null
    ) {
      navigate("/Error");
    }
  }, []);

  const stats = [
    {
      id: 1,
      icon: Users,
      label: "Students",
      value: bannerData[0]?.totalStudentCount,
    },
    {
      id: 2,
      icon: BookOpen,
      label: "Courses",
      value: bannerData[0]?.totalCourseCount,
    },
    {
      id: 3,
      icon: Award,
      label: "Awards",
      value: bannerData[0]?.totalAwardsCount,
    },
    {
      id: 4,
      icon: Calendar,
      label: "Years of Excellence",
      value: bannerData[0]?.Years_of_Excellence_count,
    },
  ];

  return (
    <div>
      <div className="relative pt-16 max-[600px]:pt-14">
        <div className="absolute inset-0">
          <img
            className="w-full h-screen object-cover"
            src={bannerData[0]?.photo}
            alt="College campus"
          />
          <div className="absolute h-screen inset-0 bg-[var(--bg-color)] opacity-[var(--opacity)] mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto  pt-24 pb-14 px-4  text-center">
          <div
            style={{
              margin: "0 auto",
              position: "relative",
            }}
            className="w-[310px] h-[310px] max-[600px]:w-[250px] max-[600px]:h-[250px]"
          >
            <div
              className="circular-text capitalize  text-[var(--hero-text-color)] font-medium "
              ref={circularTextRef}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <img
                  src={bannerData[0]?.photo}
                  alt="College Logo"
                  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
                />
              </div>
            </div>
          </div>

          <p className="my-8 max-[600px]:my-4 max-[600px]:text-[16px] text-xl text-[var(--text-color)] max-w-3xl mx-auto">
            Empowering minds through excellence in education, rooted in values
            and tradition.
          </p>
          <div className=" flex items-center max-[650px]:flex-col justify-center text-[var(--text-color)]">
            <MapPin className="h-6 w-6" />
            <span className="ml-2 text-lg max-[650px]:text-[17px]">
              {" "}
              Mata Gujri Khalsa College Of Education, sikh minority institution
              2 C, Rajasthan 335001
            </span>
          </div>
        </div>
      </div>
      <section className=" py-8  relative top-20  text-[var(--text-color)]">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: stat.id * 0.1 }}
                className="text-center flex flex-col justify-center items-center p-2 rounded-lg bg-[var(--bg-color)]"
              >
                <stat.icon className="h-8 w-8 mx-auto " />
                <div className="text-3xl font-bold m-2 pl-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
