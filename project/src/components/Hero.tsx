import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

const Hero = () => {
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
  }, []);
  return (
    <div className="relative pt-16 max-[600px]:pt-14">
      <div className="absolute inset-0">
        <img
          className="w-full h-screen object-cover"
          src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="College campus"
        />
        <div className="absolute h-screen inset-0 bg-[var(--bg-color)] opacity-[var(--opacity)] mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto  pt-24 pb-14 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
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
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80"
                alt="College Logo"
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
              />
            </div>
          </div>
        </div>

        <p className="my-8 max-[600px]:my-4 max-[600px]:text-[16px] text-xl text-[var(--text-color)] max-w-3xl mx-auto">
          Empowering minds through excellence in education, rooted in values and
          tradition.
        </p>
        <div className=" flex items-center max-[600px]:flex-col justify-center text-[var(--text-color)]">
          <MapPin className="h-6 w-6" />
          <span className="ml-2 text-lg max-[600px]:text-[17px]">
            {" "}
            Mata Gujri Khalsa College Of Education, sikh minority institution 2
            C, Rajasthan 335001
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
