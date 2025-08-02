"use client";
import ReactImageGallery from "react-image-gallery";

function ImageGallery({ images }) {
  return <ReactImageGallery items={images} showPlayButton={false} />;
}

export default ImageGallery;
