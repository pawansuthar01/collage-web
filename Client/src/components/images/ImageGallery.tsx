import React from "react";
import ImageCard from "./ImageCard";

export interface Image {
  _id: number;
  url: string;
  title: string;
  caption: string;
}

interface ImageGalleryProps {
  images: Image[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex  justify-evenly flex-wrap gap-5 ">
        {images &&
          images.map((image) => <ImageCard key={image._id} image={image} />)}
      </div>
    </div>
  );
};

export default ImageGallery;
