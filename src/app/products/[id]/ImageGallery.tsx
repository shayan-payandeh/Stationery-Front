"use client";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function ImageGallery({ images }) {
  const renderLeftNav = (onClick, disabled) => (
    <button
      type="button"
      className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white"
      onClick={onClick}
      disabled={disabled}
    >
      ›
    </button>
  );

  const renderRightNav = (onClick, disabled) => (
    <button
      type="button"
      className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white"
      onClick={onClick}
      disabled={disabled}
    >
      ‹
    </button>
  );
  return (
    <>
      <style jsx global>{`
        .image-gallery-slide-wrapper {
          padding-top: 30px !important;
        }
        .image-gallery-content .image-gallery-image {
          max-width: 80vw !important;
          max-height: 80vh !important;
          margin: auto !important;
        }

        .image-gallery-thumbnail {
          border: 2px solid #00aab2 !important;
          border-radius: 0.5rem;
          padding: 2px;
          box-sizing: border-box;
        }

        /* border و سایه thumbnail انتخاب شده */
        .image-gallery-thumbnail.active,
        .image-gallery-thumbnail:focus {
          border-color: #2c889a !important;
        }
      `}</style>
      <ReactImageGallery
        items={images}
        showPlayButton={false}
        showFullscreenButton={true}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
      />
    </>
  );
}

export default ImageGallery;
