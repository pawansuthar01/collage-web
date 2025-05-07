import React from "react";
import { Maximize2 } from "lucide-react";

export interface Image {
  _id: number;
  url: string;
  title: string;
  caption: string;
}

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const handleFullscreen = () => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => {
      const fullscreenContainer = document.createElement("div");
      fullscreenContainer.className =
        "fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center";

      const fullscreenImage = document.createElement("img");
      fullscreenImage.src = image.url;
      fullscreenImage.className =
        "h-screen p-12 w-screen-xl mx-auto object-contain";

      fullscreenContainer.appendChild(fullscreenImage);

      fullscreenContainer.addEventListener("click", () => {
        document.body.removeChild(fullscreenContainer);
      });

      document.body.appendChild(fullscreenContainer);
    };
  };

  return (
    <div className="group w-[320px] h-[450px] relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <img
        src={image.url}
        alt={image.caption}
        className="w-full h-full object-cover transition-all duration-500"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform transition-all duration-300">
        <h3 className="text-white font-medium text-lg mb-1">{image.title}</h3>
        <p className="text-gray-200 text-sm">{image.caption}</p>
      </div>
      <button
        onClick={handleFullscreen}
        className="absolute top-4 right-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
        aria-label="View fullscreen"
      >
        <Maximize2 className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default ImageCard;
